import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface FAQProps {
  t: Translations;
}

export const FAQ: React.FC<FAQProps> = ({ t }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-violet-500/20 bg-black/30 backdrop-blur-md overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-fuchsia-300 transition"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-fuchsia-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-fuchsia-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
