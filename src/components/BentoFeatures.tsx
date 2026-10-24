import React from 'react';
import {
  Sparkles,
  Layers,
  Cloud,
  FileCode,
  WifiOff,
  Eye,
} from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface BentoFeaturesProps {
  t: Translations;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({ t }) => {
  return (
    <section id="features" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            {t.features.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            {t.features.subtitle}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: 8 Signature Vibe Presets (col-span-2) */}
          <div className="md:col-span-2 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-fuchsia-950/20 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group hover:border-violet-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              {t.features.cards.presetsTitle}
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-md leading-relaxed">
              {t.features.cards.presetsDesc}
            </p>
            {/* Visual accent */}
            <div className="flex gap-2 mt-6">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 font-mono">
                Neon
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono">
                Cyberpunk
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono">
                Sunset
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono">
                Pastel
              </span>
            </div>
          </div>

          {/* Card 2: Batch CSV Generator */}
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/20 p-6 sm:p-8 backdrop-blur-xl group hover:border-cyan-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {t.features.cards.bulkTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {t.features.cards.bulkDesc}
            </p>
          </div>

          {/* Card 3: ImgBB Cloud Hosting */}
          <div className="rounded-3xl border border-violet-500/20 bg-black/30 p-6 sm:p-8 backdrop-blur-xl hover:border-violet-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
              <Cloud className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {t.features.cards.imgbbTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {t.features.cards.imgbbDesc}
            </p>
          </div>

          {/* Card 4: Crisp Vector SVG & PDF */}
          <div className="rounded-3xl border border-violet-500/20 bg-black/30 p-6 sm:p-8 backdrop-blur-xl hover:border-violet-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {t.features.cards.vectorTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {t.features.cards.vectorDesc}
            </p>
          </div>

          {/* Card 5: Smart Contrast Guard (col-span-1) */}
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-amber-950/20 to-purple-950/20 p-6 sm:p-8 backdrop-blur-xl hover:border-amber-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              {t.features.cards.scannableTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {t.features.cards.scannableDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
