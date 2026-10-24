import React, { useState } from 'react';
import { X, Sparkles, Check, Mail, Zap, ShieldCheck } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translations;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose, t }) => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[#140e29] border border-violet-500/40 p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge & Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-600/30 to-violet-600/30 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.monetization.proCard.badge}</span>
        </div>

        <h3 className="text-2xl font-black font-['Outfit'] tracking-tight">
          {t.monetization.proCard.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          {t.monetization.proCard.desc}
        </p>

        {/* Features Checklist */}
        <div className="my-6 space-y-2.5 rounded-2xl bg-black/30 border border-violet-500/20 p-4">
          {t.monetization.proCard.features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Waitlist Form or Success State */}
        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-white">{t.monetization.joinedSuccess}</p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <p className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider mb-1">
                {t.monetization.waitlistTitle}
              </p>
              <p className="text-xs text-slate-400">{t.monetization.waitlistDesc}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.monetization.emailPlaceholder}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none"
                />
              </div>
              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:brightness-110 active:scale-95 transition shadow-lg whitespace-nowrap text-white"
              >
                {t.monetization.joinWaitlist}
              </button>
            </div>
            {error && <p className="text-xs text-rose-400">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};
