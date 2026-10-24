/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Theme, HistoryItem, PresetName } from './types/index.ts';
import { translations } from './utils/i18n.ts';
import {
  getStoredLanguage,
  setStoredLanguage,
  getStoredTheme,
  setStoredTheme,
  getStoredHistory,
} from './utils/storage.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { QRGenerator } from './components/QRGenerator.tsx';
import { BentoFeatures } from './components/BentoFeatures.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { Pricing } from './components/Pricing.tsx';
import { FAQ } from './components/FAQ.tsx';
import { Footer } from './components/Footer.tsx';
import { BulkQRModal } from './components/BulkQRModal.tsx';
import { HistoryDrawer } from './components/HistoryDrawer.tsx';
import { ProModal } from './components/ProModal.tsx';
import { WatchAdModal } from './components/WatchAdModal.tsx';
import { DEFAULT_STYLE_CONFIG } from './utils/presets.ts';

export default function App() {
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [theme, setTheme] = useState<Theme>(getStoredTheme());
  const [historyCount, setHistoryCount] = useState<number>(0);

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
  }, []);

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
    const el = document.getElementById('generator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHeroPresetSelect = (preset: PresetName) => {
    setHeroPreset(preset);
    const el = document.getElementById('generator');
    el?.scrollIntoView({ behavior: 'smooth' });
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
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Live Teaser */}
        <Hero t={t} onSelectPreset={handleHeroPresetSelect} />

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
        />

        {/* Bento Features Section */}
        <BentoFeatures t={t} />

        {/* How It Works */}
        <HowItWorks t={t} />

        {/* Pricing Table (Free vs Pro) */}
        <Pricing t={t} onOpenProModal={() => setIsProModalOpen(true)} />

        {/* FAQ Accordion */}
        <FAQ t={t} />
      </main>

      {/* Footer & Legal Modals */}
      <Footer t={t} />

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
