import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Download, History } from 'lucide-react';
import { Language, Theme } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

interface NavbarProps {
  t: Translations;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenProModal: () => void;
  onOpenHistoryModal: () => void;
  historyCount: number;
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
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-violet-900/30 bg-[#0b0813]/85 dark:bg-[#0b0813]/85 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 rounded-lg py-1 px-1.5"
            aria-label="QRVibe Home"
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

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a
              href="#generator"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.generator}
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.features}
            </a>
            <a
              href="#bulk"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.bulk}
            </a>
            <a
              href="#pricing"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.pricing}
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Zone 3: Actions + 1 primary CTA */}
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fuchsia-200" />
              <span>{t.nav.goPro}</span>
            </button>
          </div>
        </div>
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
