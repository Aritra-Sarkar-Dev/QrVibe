/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { QRGenerator } from '../components/QRGenerator.tsx';
import { Translations } from '../utils/i18n.ts';
import { SITE_URL } from '../utils/config.ts';

interface BnHomePageProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

export const BnHomePage: React.FC<BnHomePageProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const navigate = useNavigate();
  const canonicalUrl = `${SITE_URL}/bn`;
  const pageTitle = 'ফ্রি কিউআর কোড জেনারেটর – লোগো ও কালার সহ | QRVibe';
  const pageDesc = 'ওয়েবসাইট, ওয়াইফাই, হোয়াটসঅ্যাপ এবং পেমেন্টের জন্য বিনামূল্যে কিউআর কোড তৈরি করুন। লোগো যুক্ত করুন, রঙ কাস্টমাইজ করুন এবং এইচডি পিএনজি বা এসভিজি ডাউনলোড করুন।';

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" href={SITE_URL} hrefLang="en" />
        <link rel="alternate" href={canonicalUrl} hrefLang="bn" />
        <link rel="alternate" href={SITE_URL} hrefLang="x-default" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="bn_BD" />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span>বাংলা কিউআর স্টুডিও</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            ফ্রি কিউআর কোড জেনারেটর – লোগো ও কালার সহ
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {pageDesc}
          </p>
        </div>

        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <QRGenerator
            t={t}
            currentLang={currentLang}
            onOpenBulkModal={onOpenBulkModal}
            onOpenWatchAdModal={onOpenWatchAdModal}
            onOpenProModal={onOpenProModal}
            isHdUnlocked={isHdUnlocked}
            onHistoryUpdated={onHistoryUpdated}
          />
        </div>
      </div>
    </div>
  );
};
