import React from 'react';
import { Zap, UserX, Palette, CheckCircle } from 'lucide-react';

export const WhyQRVibe: React.FC = () => {
  const benefits = [
    {
      icon: <Zap className="w-6 h-6 text-fuchsia-400" />,
      title: 'Blazing Fast Speed',
      badge: '< 50ms Render',
      description:
        'Client-side real-time rendering engine generates pixel-perfect vector and canvas QR codes instantly as you type with zero server roundtrip lag.',
      highlights: ['Instant live preview', 'Instant PNG/SVG export', 'Optimized client-side builds'],
      gradient: 'from-fuchsia-500/20 to-purple-500/10',
      border: 'border-fuchsia-500/30',
    },
    {
      icon: <UserX className="w-6 h-6 text-cyan-400" />,
      title: 'Zero Sign-up or Paywalls',
      badge: '100% Free Forever',
      description:
        'No account required, no email subscriptions, and no credit cards. Jump straight to generating, testing, and downloading without friction.',
      highlights: ['No registration needed', 'No hidden scan expiration limits', 'Full commercial rights included'],
      gradient: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30',
    },
    {
      icon: <Palette className="w-6 h-6 text-violet-400" />,
      title: 'Deeply Customizable Vibe',
      badge: 'Aesthetic First',
      description:
        'Break free from standard harsh black-and-white barcodes. Personalize dot patterns, corner squircles, vibrant two-tone gradients, and center brand logos.',
      highlights: ['8 Trendy curated presets', 'Automated contrast guard for 100% scannability', 'Lossless 2048px & Vector SVG'],
      gradient: 'from-violet-500/20 to-pink-500/10',
      border: 'border-violet-500/30',
    },
  ];

  return (
    <section id="why-qrvibe" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-semibold mb-3">
            <span>Built For Creators & Modern Brands</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            Why Choose QRVibe?
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Traditional QR code generators trap you behind subscriptions or expire your codes. QRVibe gives you unrestricted power, aesthetic style, and permanent reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border ${b.border} bg-gradient-to-b ${b.gradient} p-7 backdrop-blur-xl relative flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center">
                    {b.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10 font-bold">
                    {b.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2.5">{b.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {b.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                {b.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
