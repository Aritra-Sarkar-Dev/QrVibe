/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, ChevronRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { QRGenerator } from '../components/QRGenerator.tsx';
import { Translations } from '../utils/i18n.ts';
import { SITE_URL } from '../utils/config.ts';

interface UseCasePageProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

const USE_CASES: Record<string, { title: string; desc: string; h1: string; type: any }> = {
  'restaurant-menu-qr': {
    title: 'Restaurant Menu QR Code Generator – Free Digital Menu Maker | QRVibe',
    desc: 'Create free contactless QR code menus for restaurants, bars, and cafes. Update your dishes in real-time and provide instant smartphone menu access.',
    h1: 'Restaurant Menu QR Code Generator',
    type: 'image',
  },
  'cafe-wifi-qr': {
    title: 'Cafe WiFi QR Code Generator – Free Guest Network Maker | QRVibe',
    desc: 'Generate scannable guest Wi-Fi QR codes for coffee shops, cafes, and restaurants. Customers scan to connect instantly without typing passwords.',
    h1: 'Cafe WiFi QR Code Generator',
    type: 'wifi',
  },
  'business-card-qr': {
    title: 'Digital Business Card QR Code Maker – Free vCard Creator | QRVibe',
    desc: 'Create contactless vCard digital business cards. Save your name, phone, email, and website directly to recipient contacts with a single scan.',
    h1: 'Digital Business Card QR Code Maker',
    type: 'contact',
  },
  'shop-payment-qr': {
    title: 'Shop Payment QR Code Generator – UPI & PayPal Maker | QRVibe',
    desc: 'Accept instant mobile payments and tips at retail counters with free payment QR codes. Fast, secure, and zero terminal rental fees.',
    h1: 'Shop Payment QR Code Generator',
    type: 'payment',
  },
  'social-media-qr': {
    title: 'Social Media QR Code Generator – Instagram, TikTok & YouTube | QRVibe',
    desc: 'Grow your social media followers with all-in-one link-in-bio and profile QR codes for Instagram, TikTok, YouTube, and X.',
    h1: 'Social Media QR Code Generator',
    type: 'social',
  },
};

export const UseCasePage: React.FC<UseCasePageProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const { caseSlug } = useParams<{ caseSlug: string }>();
  const navigate = useNavigate();

  const data = USE_CASES[caseSlug || 'restaurant-menu-qr'] || USE_CASES['restaurant-menu-qr'];
  const canonicalUrl = `${SITE_URL}/use-cases/${caseSlug || 'restaurant-menu-qr'}`;

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.desc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-400">Use Cases</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">{data.h1}</span>
        </nav>

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

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            {data.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {data.desc}
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
            initialType={data.type}
          />
        </div>
      </div>
    </div>
  );
};
