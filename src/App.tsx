/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
import { BulkQRModal } from './components/BulkQRModal.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { ProModal } from './components/ProModal.tsx';
import { WatchAdModal } from './components/WatchAdModal.tsx';
import { DEFAULT_STYLE_CONFIG } from './utils/presets.ts';

// New Pages
import { QRTypePage } from './pages/QRTypePage.tsx';
import { BlogIndexPage } from './pages/BlogIndexPage.tsx';
import { BlogPostPage } from './pages/BlogPostPage.tsx';
import { InfoPage } from './pages/InfoPage.tsx';

function MainLayout() {
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<Theme>(getStoredTheme());
  const [historyCount, setHistoryCount] = useState<number>(0);

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
  const navigate = useNavigate();
  const location = useLocation();

  const refreshHistoryCount = () => {
    setHistoryCount(getStoredHistory().length);
  };

  useEffect(() => {
    refreshHistoryCount();
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
    setReopenItem(item);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('generator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleHeroPresetSelect = (preset: PresetName) => {
    setHeroPreset(preset);
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('generator');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectGuideType = (type: QRType) => {
    navigate(`/qr/${type}`);
  };

  const handleOpenPage = (target: string) => {
    const clean = target.replace(/^\/+|\/+$/g, '').trim();
    if (!clean || clean === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (['about', 'contact', 'privacy', 'terms'].includes(clean)) {
      navigate(`/${clean}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (['blog'].includes(clean)) {
      navigate('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (['generator', 'how-it-works', 'why-qrvibe', 'pricing', 'guide', 'faq'].includes(clean)) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(clean)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    navigate(`/${clean}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        onOpenPage={handleOpenPage}
      />

      {/* Main Content with React Router */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-12">
                <Helmet>
                  <title>QR Vibe – Free QR Code Generator Online & Custom QR Studio</title>
                  <meta name="description" content="Create free custom QR codes for text, websites, Wi-Fi, contacts, email, phone numbers, and more. Customize colors, gradients, dots, and logos. Free high-res PNG, SVG, and PDF export." />
                  <meta property="og:title" content="QR Vibe – Free QR Code Generator Online & Custom QR Studio" />
                  <meta property="og:description" content="Create free custom QR codes for text, websites, Wi-Fi, contacts, email, phone numbers, and more. Customize colors, gradients, dots, and logos. Free high-res PNG, SVG, and PDF export." />
                  <meta property="og:url" content="https://qr-vibe.vercel.app/" />
                  <link rel="canonical" href="https://qr-vibe.vercel.app/" />
                </Helmet>

                {/* H1 immediately under header with 16px spacing */}
                <div className="pt-4 pb-1 text-center max-w-xl mx-auto px-4">
                  <h1 className="text-2xl sm:text-[28px] font-bold font-['Outfit'] tracking-tight text-white mb-1.5">
                    Free QR Code Generator{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                      With Logo
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Pick a type, add your logo and colors, check it scans, download in HD. No sign-up.
                  </p>
                </div>

                <div id="generator">
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
                </div>

                {/* Marketing & SEO sections below generator */}
                <div className="space-y-16 pt-8 border-t border-violet-500/10">
                  <Hero t={t} onSelectPreset={handleHeroPresetSelect} />
                  <HowItWorks t={t} />
                  <WhyQRVibe />
                  <BentoFeatures t={t} />
                  <div id="guide">
                    <HelpfulGuide onSelectType={handleSelectGuideType} onNavigate={handleOpenPage} />
                  </div>
                  <div id="pricing">
                    <Pricing t={t} onOpenProModal={() => setIsProModalOpen(true)} />
                  </div>
                  <div id="faq">
                    <FAQ t={t} />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/qr/:typeSlug"
            element={
              <QRTypePage
                t={t}
                currentLang={lang}
                onOpenBulkModal={() => setIsBulkModalOpen(true)}
                onOpenWatchAdModal={() => setIsWatchAdModalOpen(true)}
                onOpenProModal={() => setIsProModalOpen(true)}
                isHdUnlocked={isHdUnlocked}
                onHistoryUpdated={refreshHistoryCount}
              />
            }
          />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<InfoPage />} />
          <Route path="/contact" element={<InfoPage />} />
          <Route path="/privacy" element={<InfoPage />} />
          <Route path="/terms" element={<InfoPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
                <h1 className="text-6xl font-black text-fuchsia-400 font-['Outfit']">404</h1>
                <h2 className="text-2xl font-bold text-white font-['Outfit']">Page Not Found</h2>
                <p className="text-sm text-slate-300 max-w-md">
                  The page you are looking for doesn't exist or has been moved. Return to QRVibe studio to generate custom QR codes.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-fuchsia-500/25 hover:brightness-110 transition"
                >
                  Back to Home Studio
                </button>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer & Legal Links */}
      <Footer t={t} onOpenPage={handleOpenPage} />

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

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}
