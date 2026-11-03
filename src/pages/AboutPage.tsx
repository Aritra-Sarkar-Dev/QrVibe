/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Building, ArrowLeft, ShieldCheck, Zap, Sparkles, CheckCircle2, Globe, Heart } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>About QRVibe – Free QR Code Generator & Creator Studio</title>
        <meta name="description" content="Learn about QRVibe, our mission to provide lightning-fast, secure, and 100% free QR code generation for creators, businesses, and developers worldwide." />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:title" content="About QRVibe – Free QR Code Generator & Creator Studio" />
        <meta property="og:description" content="Learn about QRVibe, our mission to provide lightning-fast, secure, and 100% free QR code generation for creators, businesses, and developers worldwide." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About QRVibe",
          "url": `${SITE_URL}/about`,
          "description": "Learn about QRVibe's mission to provide secure, beautiful, and free QR codes.",
          "publisher": {
            "@type": "Organization",
            "name": "QRVibe",
            "url": SITE_URL
          }
        })}
      </script>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-fuchsia-400 transition">Home</Link>
          <span>/</span>
          <span className="text-fuchsia-300 font-medium">About QRVibe</span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to Generator</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <Building className="w-4 h-4 text-fuchsia-400" />
            <span>About Our Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            Empowering Physical-to-Digital Connection with QRVibe
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            QRVibe was built to solve a glaring problem in the digital landscape: existing QR generators are plagued by intrusive ads, hidden subscription paywalls, and bland, cookie-cutter black-and-white barcodes that fail to inspire modern brand engagement.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">Our Core Mission</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              To deliver an uncompromised, lightning-fast, 100% free QR code studio that combines high-precision matrix math with stunning aesthetic customization and instant vector exports.
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">Local-First Privacy</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your sensitive data—such as Wi-Fi passwords, private vCards, and personal notes—is processed entirely inside your browser memory. We never store your personal records on remote servers.
            </p>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Outfit']">What Makes QRVibe Different?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Real-Time Scan-Verify™:</strong> Every color and logo change is instantly verified by our built-in optical scanner checker to guarantee high scannability.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Vector SVG & Print PDF:</strong> Export infinite-resolution SVG files or print-ready business card PDFs instantly without watermarks.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">15+ QR Code Types:</strong> Comprehensive support for URLs, WiFi, vCards, WhatsApp, payment UPI links, geo-location, and bulk CSV batching.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Signature Presets:</strong> Instantly apply 12+ pre-designed aesthetic themes created by professional UI designers.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
