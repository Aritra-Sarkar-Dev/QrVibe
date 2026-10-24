import React from 'react';
import { Sparkles } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface AdSlotProps {
  position: 'top-banner' | 'below-preview';
  t: Translations;
  onUpgradeClick?: () => void;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position, t, onUpgradeClick }) => {
  if (position === 'top-banner') {
    return (
      <div className="w-full max-w-5xl mx-auto my-4 px-4">
        <div className="relative overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/40 via-fuchsia-950/30 to-cyan-950/40 p-3 sm:p-4 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 text-slate-400">
                {t.monetization.adSponsored}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Supercharge your brand with lossless 4K QR codes and dynamic links.
              </p>
            </div>
            <button
              onClick={onUpgradeClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white hover:brightness-110 transition shadow-sm whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Go Pro · 50% Off</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Below-preview ad slot
  return (
    <div className="w-full mt-4">
      <div className="relative rounded-xl border border-dashed border-violet-500/30 bg-violet-950/20 p-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold px-1.5 py-0.5 rounded bg-white/5">
            {t.monetization.adSponsored}
          </span>
          <span className="text-xs text-slate-300">Creator Toolkit & Printing</span>
        </div>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Need high-quality stickers, tags, or menus printed with your QR?{' '}
          <button
            onClick={onUpgradeClick}
            className="text-fuchsia-400 hover:text-fuchsia-300 underline font-medium"
          >
            Explore print bundles
          </button>
        </p>
      </div>
    </div>
  );
};
