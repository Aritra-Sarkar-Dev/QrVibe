import React from 'react';
import { Translations } from '../utils/i18n.ts';

interface HowItWorksProps {
  t: Translations;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  const steps = [
    {
      step: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      step: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      step: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      gradient: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <section className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            {t.howItWorks.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-violet-500/20 bg-black/30 p-8 backdrop-blur-xl relative group hover:border-violet-500/40 transition"
            >
              <div
                className={`text-4xl font-black font-mono mb-4 text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
              >
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">{item.title}</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
