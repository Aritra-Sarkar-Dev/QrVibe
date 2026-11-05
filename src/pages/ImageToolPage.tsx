/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { QRGenerator } from '../components/QRGenerator.tsx';
import { Translations } from '../utils/i18n.ts';
import { SITE_URL } from '../utils/config.ts';

interface ImageToolPageProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

export const ImageToolPage: React.FC<ImageToolPageProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const navigate = useNavigate();
  const canonicalUrl = `${SITE_URL}/tools/image-to-qr-code`;
  const pageTitle = 'Free Image to QR Code Generator – Convert Photos to QR | QRVibe';
  const pageDesc = 'Upload any photo, flyer, artwork, or menu and generate a free shareable QR code powered by secure cloud hosting. Download high-res PNG or SVG instantly without sign-up.';

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/#guide` },
          { '@type': 'ListItem', position: 3, name: 'Image to QR Code Generator', item: canonicalUrl },
        ],
      },
      {
        '@type': 'HowTo',
        name: 'How to convert an image into a QR Code',
        description: pageDesc,
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select Image Tool', text: 'Select the Image QR type in the creator studio.' },
          { '@type': 'HowToStep', position: 2, name: 'Upload Photo', text: 'Upload your image file (JPEG, PNG, WebP) or paste a direct image URL.' },
          { '@type': 'HowToStep', position: 3, name: 'Customize QR', text: 'Personalize your QR code with matching color palettes and custom dot styles.' },
          { '@type': 'HowToStep', position: 4, name: 'Download HD', text: 'Export your finished image QR code for digital sharing or physical printing.' },
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
          <span className="text-fuchsia-400 font-medium">Image to QR Code Generator</span>
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
            <ImageIcon className="w-4 h-4 text-fuchsia-400" />
            <span>Image QR Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            Free Image to QR Code Generator Online
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
            initialType="image"
          />
        </div>

        {/* SEO Educational Guide */}
        <div className="max-w-4xl mx-auto bg-violet-950/20 border border-violet-500/30 rounded-3xl p-8 sm:p-10 space-y-8 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
              <span>How Image to QR Codes Work</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Transform any visual asset—such as event flyers, photography portfolios, restaurant menus, product diagrams, or digital artwork—into an interactive QR code. QRVibe securely uploads your compressed image to reliable cloud hosting and encodes the direct public image link into a gorgeous, customized QR code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-fuchsia-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span>Conversion Steps</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">1</span>
                  <span>Upload your image file (PNG, JPEG, WebP).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">2</span>
                  <span>Our system compresses and hosts your asset securely.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0">3</span>
                  <span>Download print-ready PNG or vector SVG files.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Best Use Cases</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Restaurant menus and cocktail lists for contactless dining.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Real estate property flyers and art exhibition catalogs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
