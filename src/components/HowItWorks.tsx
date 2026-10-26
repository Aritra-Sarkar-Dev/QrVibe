import React from 'react';
import { Translations } from '../utils/i18n.ts';

interface HowItWorksProps {
  t: Translations;
}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  const steps = [
    {
      step: 'Step 1',
      emoji: '🎯',
      title: 'Choose Type',
      desc: 'Select from 15+ QR types: URL, Text, WiFi, Payment, Contact, etc.',
      gradient: 'from-fuchsia-500/20 to-pink-500/20',
      border: 'border-fuchsia-500/30',
      accent: 'text-fuchsia-400',
    },
    {
      step: 'Step 2',
      emoji: '🎨',
      title: 'Customize',
      desc: 'Add your logo, pick colors, choose style. Match your brand.',
      gradient: 'from-violet-500/20 to-purple-500/20',
      border: 'border-violet-500/30',
      accent: 'text-violet-400',
    },
    {
      step: 'Step 3',
      emoji: '⬇️',
      title: 'Download',
      desc: 'Get high-res PNG, SVG, or PDF instantly. No limits.',
      gradient: 'from-cyan-500/20 to-teal-500/20',
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
    },
  ];

  return (
    <section id="how-it-works" className="py-14 sm:py-20 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-semibold mb-3">
            <span>Instant 3-Step Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Create stunning QR codes in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border ${item.border} bg-gradient-to-b ${item.gradient} to-black/40 p-6 sm:p-8 backdrop-blur-xl relative group hover:-translate-y-1 transition duration-300 flex flex-col justify-between shadow-lg`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs uppercase font-extrabold tracking-wider font-mono px-2.5 py-1 rounded-lg bg-white/10 ${item.accent}`}>
                    {item.step}
                  </span>
                  <span className="text-3xl select-none" role="img" aria-label={item.title}>
                    {item.emoji}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </div>

              {/* Progress connector indicator */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>Phase 0{idx + 1}</span>
                <span className="text-slate-500">Fast & Client-Side</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
