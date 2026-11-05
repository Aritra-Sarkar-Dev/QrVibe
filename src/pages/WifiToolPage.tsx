/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { Wifi, ArrowLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { QRGenerator } from '../components/QRGenerator.tsx';
import { Translations } from '../utils/i18n.ts';
import { SITE_URL } from '../utils/config.ts';

interface WifiToolPageProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

export const WifiToolPage: React.FC<WifiToolPageProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const navigate = useNavigate();
  const canonicalUrl = `${SITE_URL}/tools/wifi-qr-generator`;
  const pageTitle = 'Free WiFi QR Code Generator – Guest WiFi Maker No Sign Up | QRVibe';
  const pageDesc = 'Generate a free WiFi QR code for your home, office, cafe, or hotel. Guests scan with their phone camera to join secure WPA/WEP networks instantly without typing passwords.';

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/#guide` },
          { '@type': 'ListItem', position: 3, name: 'WiFi QR Code Generator', item: canonicalUrl },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to create a WiFi QR Code',
        description: pageDesc,
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select WiFi Tool', text: 'Select the WiFi QR type in the generator studio.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter SSID', text: 'Enter your exact wireless Network Name (SSID) as it appears on your router.' },
          { '@type': 'HowToStep', position: 3, name: 'Set Password & Security', text: 'Type your Wi-Fi password securely (computed entirely in your browser client).' },
          { '@type': 'HowToStep', position: 4, name: 'Download HD', text: 'Customize your dot patterns and colors, then download in high-res PNG, SVG, or print.' },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-400">Tools</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">WiFi QR Code Generator</span>
        </nav>

        {/* Back Button */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to Home Studio</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <Wifi className="w-4 h-4 text-fuchsia-400" />
            <span>WiFi QR Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            Free WiFi QR Code Generator – No Sign Up
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {pageDesc}
          </p>
        </div>

        {/* Embedded Generator */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <QRGenerator
            t={t}
            currentLang={currentLang}
            onOpenBulkModal={onOpenBulkModal}
            onOpenWatchAdModal={onOpenWatchAdModal}
            onOpenProModal={onOpenProModal}
            isHdUnlocked={isHdUnlocked}
            onHistoryUpdated={onHistoryUpdated}
            initialType="wifi"
          />
        </div>

        {/* SEO Educational Guide */}
        <div className="max-w-4xl mx-auto bg-violet-950/20 border border-violet-500/30 rounded-3xl p-8 sm:p-10 space-y-8 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
              <span>Why Use a WiFi QR Code Maker?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Sharing your wireless password with guests, cafe patrons, or office visitors can be tedious and error-prone. A WiFi QR code streamlines this completely. When a user points their smartphone camera at your printed QR code, their device decodes the network SSID and password instantly, prompting them to connect with a single tap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-fuchsia-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>How to Create in 3 Steps</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Enter your exact router SSID network name.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Type your wireless password securely in your browser.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Download print-ready PNG, SVG, or PDF instantly.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Pro Scannability Tips</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Ensure WPA/WPA2 security protocol for modern device compatibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Print on table tents or wall stickers near reception areas.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
