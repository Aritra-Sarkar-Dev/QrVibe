import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Play, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface WatchAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlocked: () => void;
  t: Translations;
}

export const WatchAdModal: React.FC<WatchAdModalProps> = ({
  isOpen,
  onClose,
  onUnlocked,
  t,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(5);
      setIsPlaying(true);
      setIsCompleted(false);
    }
  }, [isOpen]);

  // Handle countdown interval and completion side effects cleanly in useEffect
  useEffect(() => {
    if (!isOpen) return;

    if (secondsLeft <= 0) {
      if (!isCompleted) {
        setIsCompleted(true);
        setIsPlaying(false);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // Ignore confetti errors if any
        }
        onUnlocked();
      }
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, secondsLeft, isCompleted, onUnlocked]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-[#140e29] border border-amber-500/30 p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button (only active after completion or with warning) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
            {t.monetization.adSponsored}
          </span>
          <span className="text-xs text-slate-400 font-mono">HD Unlocker</span>
        </div>

        <h3 className="text-xl font-bold font-['Outfit'] mb-1">
          {t.monetization.watchAdTitle}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {t.monetization.watchAdDesc}
        </p>

        {/* Mock Ad Video Frame */}
        <div className="relative aspect-video w-full rounded-2xl bg-black border border-white/10 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
          {/* Top video bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              <span>Sponsor: CyberFlow Cloud</span>
            </div>
            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Center Graphic */}
          <div className="text-center space-y-1">
            <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-['Outfit']">
              CyberFlow 2026
            </span>
            <p className="text-[11px] text-slate-400">High-Performance Hosting for Gen Z Web</p>
          </div>

          {/* Bottom Countdown & Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-mono text-slate-300">
              <span>{isPlaying ? t.monetization.adPlaying : 'Complete'}</span>
              <span>
                {secondsLeft > 0 ? `${secondsLeft} ${t.monetization.secondsRemaining}` : 'Reward Ready!'}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-fuchsia-500 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {isCompleted ? (
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>{t.monetization.unlockedHd}</span>
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
            >
              Continue to 2048px Download
            </button>
          </div>
        ) : (
          <p className="text-center text-[11px] text-slate-500 mt-4">
            Ad playing ({secondsLeft}s)... reward unlocks automatically.
          </p>
        )}
      </div>
    </div>
  );
};
