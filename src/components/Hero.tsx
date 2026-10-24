import React, { useEffect, useState } from 'react';
import { ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';
import { PresetName } from '../types/index.ts';

interface HeroProps {
  t: Translations;
  onSelectPreset: (preset: PresetName) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, onSelectPreset }) => {
  const [activeDemoPreset, setActiveDemoPreset] = useState<PresetName>('neon');

  // Rotate demo presets gently every 4 seconds
  useEffect(() => {
    const presets: PresetName[] = ['neon', 'cyberpunk', 'sunset', 'mint', 'pastel', 'glass'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % presets.length;
      setActiveDemoPreset(presets[idx]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient glowing blobs */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-fuchsia-600/20 via-violet-600/20 to-cyan-400/20 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Value Prop, CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Editorial kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-semibold mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
              <span>{t.hero.pill}</span>
            </div>

            {/* Main Headline with clamp and balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] tracking-tight text-white leading-[1.1] text-balance mb-6">
              {t.hero.title1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.title2}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href="#generator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-fuchsia-600/30 hover:shadow-fuchsia-600/50 hover:brightness-110 active:scale-95 transition whitespace-nowrap"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowDown className="w-4 h-4" />
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('generator');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm border border-violet-500/30 bg-white/5 hover:bg-white/10 text-slate-200 transition whitespace-nowrap"
              >
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Micro proof markers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{t.hero.stats.free}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{t.hero.stats.highRes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />
                <span>{t.hero.stats.scans}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Interactive Teaser Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Glow border ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-400 opacity-60 blur-lg transition duration-1000 group-hover:opacity-100" />

              <div className="relative rounded-3xl border border-white/15 bg-[#120d24]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Live Interactive Preview
                    </span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-fuchsia-300 font-medium">
                    {activeDemoPreset.toUpperCase()}
                  </span>
                </div>

                {/* Stylized QR Mock Canvas with animated drawing effect */}
                <div className="aspect-square w-full rounded-2xl bg-[#0b0813] border border-violet-500/20 p-5 flex items-center justify-center relative overflow-hidden shadow-inner">
                  {/* Decorative corner finders based on active preset */}
                  <div className="relative w-full h-full flex flex-col justify-between p-2">
                    <div className="flex justify-between">
                      <div className="w-16 h-16 rounded-xl border-4 border-fuchsia-500 p-2 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-fuchsia-500 to-cyan-400" />
                      </div>
                      <div className="w-16 h-16 rounded-xl border-4 border-cyan-400 p-2 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-cyan-400 to-violet-500" />
                      </div>
                    </div>

                    {/* Center Gen Z Vibe badge */}
                    <div className="self-center flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-violet-950/80 border border-violet-500/40 shadow-lg">
                      <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-cyan-400 font-['Outfit']">
                        SCAN ME
                      </span>
                      <span className="text-[10px] text-slate-300">qrvibe.app</span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="w-16 h-16 rounded-xl border-4 border-purple-500 p-2 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-purple-500 to-fuchsia-500" />
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 p-2">
                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                        <div className="w-3 h-3 rounded-full bg-fuchsia-400" />
                        <div className="w-3 h-3 rounded-full bg-violet-400" />
                        <div className="w-3 h-3 rounded-full bg-pink-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preset Switcher Chips on Hero */}
                <div className="mt-5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Try Instant Aesthetic Presets:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(['neon', 'cyberpunk', 'sunset', 'mint', 'pastel', 'glass'] as PresetName[]).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setActiveDemoPreset(p);
                            onSelectPreset(p);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            activeDemoPreset === p
                              ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
