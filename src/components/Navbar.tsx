import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Download, History, Menu, X, PlusCircle } from 'lucide-react';
import { Language, Theme } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';
import { StandalonePageId } from './StandalonePage.tsx';

interface NavbarProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenProModal: () => void;
  onOpenHistoryModal: () => void;
  historyCount: number;
  onOpenPage?: (page: StandalonePageId | 'home') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  t,
  currentLang,
  onLanguageChange,
  theme,
  onToggleTheme,
  onOpenProModal,
  onOpenHistoryModal,
  historyCount,
  onOpenPage,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: StandalonePageId | 'home', targetSection?: string) => {
    setMobileMenuOpen(false);
    if (onOpenPage) {
      onOpenPage(page);
    }
    if (targetSection) {
      setTimeout(() => {
        document.getElementById(targetSection)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-violet-900/30 bg-[#0b0813]/90 dark:bg-[#0b0813]/90 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand wordmark (Home click) */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('home');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-lg py-1 px-1.5 text-left"
            aria-label="QR Vibe Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-cyan-400 p-0.5 shadow-md shadow-fuchsia-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0b0813] rounded-[6px] flex items-center justify-center">
                <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
                  QR
                </span>
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white font-['Outfit']">
              QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Vibe</span>
            </span>
          </a>

          {/* Zone 2: Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#generator"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home', 'generator');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Create
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('about');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('privacy');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Privacy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('terms');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Terms
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Actions + Theme Toggle + primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* History Button */}
            <button
              onClick={onOpenHistoryModal}
              className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label={t.nav.history}
              title={t.nav.history}
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-fuchsia-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {historyCount}
                </span>
              )}
            </button>

            {/* Language Toggle: EN <-> বাংলা */}
            <button
              onClick={() => onLanguageChange(currentLang === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition whitespace-nowrap"
              aria-label="Toggle language between English and Bengali"
            >
              {currentLang === 'en' ? 'বাং' : 'EN'}
            </button>

            {/* Theme Toggle: Dark <-> Light */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle color theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* PWA Install Button (if installable and not already installed) */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.nav.installApp}</span>
              </button>
            )}

            {!isInstalled && isIOS && (
              <button
                onClick={() => setShowIOSModal(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition whitespace-nowrap"
              >
                <span>{t.nav.installOnIos}</span>
              </button>
            )}

            {/* Primary Action Button: Go Pro */}
            <button
              onClick={onOpenProModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-200" />
              <span>{t.nav.goPro}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0f091c]/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home');
              }}
              className="block w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              Home
            </a>
            <a
              href="#generator"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('home', 'generator');
              }}
              className="w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition flex items-center justify-between"
            >
              <span>Create (QR Generator)</span>
              <PlusCircle className="w-4 h-4 text-fuchsia-400" />
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('about');
              }}
              className="block w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              About
            </a>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('privacy');
              }}
              className="block w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              Privacy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('terms');
              }}
              className="block w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              Terms
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}
              className="block w-full text-left py-2 px-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/10 transition"
            >
              Contact
            </a>
            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProModal();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Go Pro Waitlist</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* iOS Safari PWA Install Modal */}
      {showIOSModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-sm rounded-2xl bg-[#160f29] border border-violet-500/30 p-6 shadow-2xl text-white">
            <h3 className="text-lg font-bold font-['Outfit']">Install QRVibe on iPhone</h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              1. Tap the <span className="font-semibold text-white">Share</span> button at the bottom of Safari.<br />
              2. Scroll down and tap <span className="font-semibold text-fuchsia-400">Add to Home Screen</span>.<br />
              3. Enjoy lightning-fast, offline-ready QR generations!
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-violet-600 font-semibold hover:bg-violet-500 transition text-sm"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
