import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface PricingProps {
  t: Translations;
  onOpenProModal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ t, onOpenProModal }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Start completely free. Upgrade whenever you need enterprise bulk volume or dynamic links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Card */}
          <div className="rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  {t.monetization.freeCard.title}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-slate-300 font-medium">
                  {t.monetization.freeCard.period}
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl sm:text-5xl font-black font-['Outfit'] text-white">
                  {t.monetization.freeCard.price}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                {t.monetization.freeCard.desc}
              </p>
              <div className="space-y-3 pt-4 border-t border-white/10">
                {t.monetization.freeCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-8 w-full py-3 px-4 rounded-xl font-semibold text-xs border border-white/10 bg-white/5 text-slate-300 cursor-default"
            >
              {t.monetization.freeCard.cta}
            </button>
          </div>

          {/* Pro Card */}
          <div className="rounded-3xl border border-fuchsia-500/40 bg-gradient-to-b from-[#1c1236] to-[#0e0a1f] p-8 backdrop-blur-xl flex flex-col justify-between relative shadow-2xl ring-1 ring-fuchsia-500/30">
            {/* Ribbon */}
            <div className="absolute -top-3 right-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-md">
                <Sparkles className="w-3 h-3" />
                <span>{t.monetization.proCard.badge}</span>
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  {t.monetization.proCard.title}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 font-medium">
                  {t.monetization.proCard.period}
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-4">
                <span className="text-4xl sm:text-5xl font-black font-['Outfit'] text-white">
                  {t.monetization.proCard.price}
                </span>
                <span className="text-xs text-slate-400">/mo</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                {t.monetization.proCard.desc}
              </p>
              <div className="space-y-3 pt-4 border-t border-violet-500/30">
                {t.monetization.proCard.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenProModal}
              className="mt-8 w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-fuchsia-600/25 hover:shadow-fuchsia-600/40 hover:brightness-110 active:scale-95 transition"
            >
              {t.monetization.proCard.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
