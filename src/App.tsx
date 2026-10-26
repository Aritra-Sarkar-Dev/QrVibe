/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Language, Theme, HistoryItem, PresetName, QRType } from './types/index.ts';
import { translations } from './utils/i18n.ts';
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredTheme,
  setStoredTheme,
  getStoredHistory,
} from './utils/storage.ts';
import { initGoogleAnalytics } from './utils/analytics.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WhyQRVibe } from './components/WhyQRVibe.tsx';
import { QRGenerator } from './components/QRGenerator.tsx';
import { BentoFeatures } from './components/BentoFeatures.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { HelpfulGuide } from './components/HelpfulGuide.tsx';
import { Pricing } from './components/Pricing.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Footer } from './components/Footer.tsx';
import { StandalonePage, StandalonePageId } from './components/StandalonePage.tsx';
import {
  FeatureLandingPage,
  FeaturePageId,
  FEATURE_PAGES_DATA,
} from './components/FeatureLandingPage.tsx';
import { BulkQRModal } from './components/BulkQRModal.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { ProModal } from './components/ProModal.tsx';
import { WatchAdModal } from './components/WatchAdModal.tsx';
import { DEFAULT_STYLE_CONFIG } from './utils/presets.ts';

const FEATURE_ROUTES: FeaturePageId[] = [
  'text-to-qr',
  'url-to-qr',
  'contact-qr',
  'wifi-qr',
  'email-qr',
  'phone-qr',
  'custom-qr',
];

const STANDALONE_ROUTES: StandalonePageId[] = [
  'about',
  'privacy',
  'terms',
  'contact',
  '404',
];

const CANONICAL_BASE = 'https://qr-vibe.vercel.app';

export default function App() {
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<Theme>(getStoredTheme());
  const [historyCount, setHistoryCount] = useState<number>(0);

  // Routing state
  const [activeStandalone, setActiveStandalone] = useState<StandalonePageId | null>(null);
  const [activeFeature, setActiveFeature] = useState<FeaturePageId | null>(null);

  // Selected QR type when navigating from guide or external trigger
  const [selectedGeneratorType, setSelectedGeneratorType] = useState<QRType | undefined>(undefined);

  // Modals
  const [isBulkModalOpen, setIsBulkModalOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [isWatchAdModalOpen, setIsWatchAdModalOpen] = useState<boolean>(false);
  const [isHdUnlocked, setIsHdUnlocked] = useState<boolean>(false);

  // Reopen item from history
  const [reopenItem, setReopenItem] = useState<HistoryItem | null>(null);

  // Selected preset from Hero teaser
  const [heroPreset, setHeroPreset] = useState<PresetName | null>(null);

  const t = translations[lang];

  // Refresh history count on load
  const refreshHistoryCount = () => {
    setHistoryCount(getStoredHistory().length);
  };

  useEffect(() => {
    refreshHistoryCount();
    // Initialize privacy-friendly Google Analytics 4 (if measurement ID provided)
    initGoogleAnalytics();
  }, []);

  // Parse current URL (supports both clean paths e.g. /about, /text-to-qr and hash #about)
  const resolveRoute = useCallback(() => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase().trim();
    const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    const target = rawPath || rawHash;

    if (!target || target === 'home' || target === 'index.html') {
      setActiveStandalone(null);
      setActiveFeature(null);
      return;
    }

    if (STANDALONE_ROUTES.includes(target as StandalonePageId)) {
      setActiveStandalone(target as StandalonePageId);
      setActiveFeature(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (FEATURE_ROUTES.includes(target as FeaturePageId)) {
      setActiveFeature(target as FeaturePageId);
      setActiveStandalone(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Anchor tags on home page
    if (['generator', 'how-it-works', 'why-qrvibe', 'pricing', 'guide', 'faq'].includes(target)) {
      setActiveStandalone(null);
      setActiveFeature(null);
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }

    // Fallback unknown route to 404
    setActiveStandalone('404');
    setActiveFeature(null);
  }, []);

  useEffect(() => {
    resolveRoute();
    window.addEventListener('popstate', resolveRoute);
    window.addEventListener('hashchange', resolveRoute);
    return () => {
      window.removeEventListener('popstate', resolveRoute);
      window.removeEventListener('hashchange', resolveRoute);
    };
  }, [resolveRoute]);

  // Navigate helper that updates browser history cleanly
  const navigateTo = (target: string) => {
    const cleanTarget = target.replace(/^\/+|\/+$/g, '').trim();

    if (!cleanTarget || cleanTarget === 'home') {
      window.history.pushState(null, '', '/');
      setActiveStandalone(null);
      setActiveFeature(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (STANDALONE_ROUTES.includes(cleanTarget as StandalonePageId)) {
      window.history.pushState(null, '', `/${cleanTarget}`);
      setActiveStandalone(cleanTarget as StandalonePageId);
      setActiveFeature(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (FEATURE_ROUTES.includes(cleanTarget as FeaturePageId)) {
      window.history.pushState(null, '', `/${cleanTarget}`);
      setActiveFeature(cleanTarget as FeaturePageId);
      setActiveStandalone(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (cleanTarget.startsWith('#') || ['generator', 'how-it-works', 'why-qrvibe', 'pricing', 'guide', 'faq'].includes(cleanTarget)) {
      const anchorId = cleanTarget.replace('#', '');
      if (activeStandalone || activeFeature) {
        window.history.pushState(null, '', `/#${anchorId}`);
        setActiveStandalone(null);
        setActiveFeature(null);
        setTimeout(() => {
          document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        window.location.hash = anchorId;
        document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Default 404
    window.history.pushState(null, '', `/${cleanTarget}`);
    setActiveStandalone('404');
    setActiveFeature(null);
  };

  // Intercept click on internal <a> tags for seamless SPA navigation without full page reloads
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank", or download links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.getAttribute('target') === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      // Handle anchor hash or clean internal route
      e.preventDefault();
      navigateTo(href);
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [activeStandalone, activeFeature]);

  // Update dynamic page SEO title, canonical link, and meta tags
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }

    let pageTitle = 'QR Vibe – Free QR Code Generator Online';
    let pageDesc =
      'Create free custom QR codes for text, websites, Wi-Fi, contacts, email, phone numbers, and more. Customize colors, gradients, dots, and logos. Free high-res PNG, SVG, and PDF export.';
    let pageCanonical = `${CANONICAL_BASE}/`;

    if (activeFeature && FEATURE_PAGES_DATA[activeFeature]) {
      const meta = FEATURE_PAGES_DATA[activeFeature];
      pageTitle = meta.title;
      pageDesc = meta.description;
      pageCanonical = `${CANONICAL_BASE}/${activeFeature}`;
    } else if (activeStandalone === 'about') {
      pageTitle = 'About QR Vibe – Free Online QR Code Generator & Mission';
      pageDesc =
        "Learn about QR Vibe's mission to provide beautiful, customizable QR codes without paywalls, sign-ups, or watermarks. Built with client-side privacy.";
      pageCanonical = `${CANONICAL_BASE}/about`;
    } else if (activeStandalone === 'privacy') {
      pageTitle = 'Privacy Policy – QR Vibe';
      pageDesc =
        'QR Vibe respects your privacy. Learn how all QR code generation runs locally in your browser with zero tracking cookies and client-side processing.';
      pageCanonical = `${CANONICAL_BASE}/privacy`;
    } else if (activeStandalone === 'terms') {
      pageTitle = 'Terms of Service – QR Vibe';
      pageDesc =
        'Review the QR Vibe Terms of Service. QR Vibe is 100% free for personal and commercial use without subscription fees.';
      pageCanonical = `${CANONICAL_BASE}/terms`;
    } else if (activeStandalone === 'contact') {
      pageTitle = 'Contact QR Vibe – Feedback, Bug Reports & Support';
      pageDesc =
        'Have a question, feature request, or partnership inquiry? Contact the QR Vibe team. We respond within 24 hours.';
      pageCanonical = `${CANONICAL_BASE}/contact`;
    } else if (activeStandalone === '404') {
      pageTitle = '404 – Page Not Found | QR Vibe';
      pageDesc =
        'The requested page was not found. Return to QR Vibe Studio to create vibrant, custom QR codes for free.';
      pageCanonical = `${CANONICAL_BASE}/`;
    }

    document.title = pageTitle;
    metaDesc?.setAttribute('content', pageDesc);
    ogTitle?.setAttribute('content', pageTitle);
    ogDesc?.setAttribute('content', pageDesc);
    ogUrl?.setAttribute('content', pageCanonical);
    twitterTitle?.setAttribute('content', pageTitle);
    twitterDesc?.setAttribute('content', pageDesc);
    canonicalLink.setAttribute('href', pageCanonical);
  }, [activeStandalone, activeFeature]);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
  };

  const handleLanguageChange = (nextLang: Language) => {
    setLang(nextLang);
    setStoredLanguage(nextLang);
  };

  const handleReopen = (item: HistoryItem) => {
    setActiveStandalone(null);
    setActiveFeature(null);
    setReopenItem(item);
    setTimeout(() => {
      const el = document.getElementById('generator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleHeroPresetSelect = (preset: PresetName) => {
    setActiveStandalone(null);
    setActiveFeature(null);
    setHeroPreset(preset);
    setTimeout(() => {
      const el = document.getElementById('generator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectGuideType = (type: QRType) => {
    setSelectedGeneratorType(type);
    setTimeout(() => {
      document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'bg-slate-900 text-slate-100' : 'bg-[#0b0813] text-slate-100'}`}>
      {/* Top Navigation */}
      <Navbar
        t={t}
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenProModal={() => setIsProModalOpen(true)}
        onOpenHistoryModal={() => setIsHistoryDrawerOpen(true)}
        historyCount={historyCount}
        onOpenPage={navigateTo}
      />

      {/* Main Content */}
      <main className="flex-1">
        {activeFeature ? (
          <FeatureLandingPage
            featureId={activeFeature}
            onNavigate={navigateTo}
            t={t}
            currentLang={lang}
            onOpenBulkModal={() => setIsBulkModalOpen(true)}
            onOpenWatchAdModal={() => setIsWatchAdModalOpen(true)}
            onOpenProModal={() => setIsProModalOpen(true)}
            isHdUnlocked={isHdUnlocked}
            onHistoryUpdated={refreshHistoryCount}
            reopenItem={reopenItem}
            heroPreset={heroPreset}
          />
        ) : activeStandalone ? (
          <StandalonePage pageId={activeStandalone} onNavigate={navigateTo as any} t={t} />
        ) : (
          <>
            {/* Hero Section with Live Teaser */}
            <Hero t={t} onSelectPreset={handleHeroPresetSelect} />

            {/* How It Works (on home page, after hero) */}
            <HowItWorks t={t} />

            {/* Why QRVibe (3 Key Benefits) */}
            <WhyQRVibe />

            {/* Studio Generator Section */}
            <QRGenerator
              t={t}
              currentLang={lang}
              onOpenBulkModal={() => setIsBulkModalOpen(true)}
              onOpenWatchAdModal={() => setIsWatchAdModalOpen(true)}
              onOpenProModal={() => setIsProModalOpen(true)}
              isHdUnlocked={isHdUnlocked}
              onHistoryUpdated={refreshHistoryCount}
              reopenItem={reopenItem}
              onPresetSelectedFromHero={heroPreset}
              initialType={selectedGeneratorType}
            />

            {/* Bento Features Section */}
            <BentoFeatures t={t} />

            {/* Helpful Guide & Comparison (People-first SEO content) */}
            <HelpfulGuide onSelectType={handleSelectGuideType} onNavigate={navigateTo} />

            {/* Pricing Table (Free vs Pro) */}
            <Pricing t={t} onOpenProModal={() => setIsProModalOpen(true)} />

            {/* FAQ Accordion (10 common SEO questions) */}
            <FAQ t={t} />
          </>
        )}
      </main>

      {/* Footer & Legal Links */}
      <Footer t={t} onOpenPage={navigateTo} />

      {/* Bulk QR CSV Modal */}
      <BulkQRModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        styleConfig={DEFAULT_STYLE_CONFIG}
        t={t}
        onOpenProModal={() => setIsProModalOpen(true)}
      />

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        onReopen={handleReopen}
        t={t}
        onHistoryChanged={refreshHistoryCount}
      />

      {/* Pro Waitlist Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        t={t}
      />

      {/* Watch Ad to Unlock HD Modal */}
      <WatchAdModal
        isOpen={isWatchAdModalOpen}
        onClose={() => setIsWatchAdModalOpen(false)}
        onUnlocked={() => {
          setIsHdUnlocked(true);
        }}
        t={t}
      />
    </div>
  );
}
