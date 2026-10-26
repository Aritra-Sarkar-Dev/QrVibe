import React from 'react';
import { Translations } from '../utils/i18n.ts';
import { StandalonePageId } from './StandalonePage.tsx';

interface FooterProps {
  t: Translations;
  onOpenPage: (page: StandalonePageId | 'home') => void;
}

export const Footer: React.FC<FooterProps> = ({ t, onOpenPage }) => {
  return (
    <footer className="border-t border-white/10 bg-[#08050e] py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Rights */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="font-extrabold text-base text-white font-['Outfit']">
                QR<span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Vibe</span>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">{t.tagline}</span>
            </div>
            <p className="text-slate-500 max-w-md">
              © {new Date().getFullYear()} QRVibe. {t.footer.rights}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">{t.footer.imgNotice}</p>
          </div>

          {/* Nav & Legal Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onOpenPage('home');
              }}
              className="hover:text-white transition underline-offset-4 hover:underline"
            >
              Home
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onOpenPage('about');
              }}
              className="hover:text-white transition underline-offset-4 hover:underline"
            >
              About
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onOpenPage('privacy');
              }}
              className="hover:text-white transition underline-offset-4 hover:underline"
            >
              Privacy
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onOpenPage('terms');
              }}
              className="hover:text-white transition underline-offset-4 hover:underline"
            >
              Terms
            </a>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenPage('contact');
              }}
              className="hover:text-white transition underline-offset-4 hover:underline"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Feature Tools Internal Linking Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-400">
          <span className="text-slate-500 font-semibold uppercase tracking-wider">Free Tools:</span>
          <a
            href="/url-to-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('url-to-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            URL to QR
          </a>
          <span>·</span>
          <a
            href="/text-to-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('text-to-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            Text to QR
          </a>
          <span>·</span>
          <a
            href="/wifi-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('wifi-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            WiFi Password QR
          </a>
          <span>·</span>
          <a
            href="/contact-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('contact-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            vCard Contact QR
          </a>
          <span>·</span>
          <a
            href="/email-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('email-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            Email QR
          </a>
          <span>·</span>
          <a
            href="/phone-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('phone-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            Phone Call QR
          </a>
          <span>·</span>
          <a
            href="/custom-qr"
            onClick={(e) => {
              e.preventDefault();
              onOpenPage('custom-qr' as any);
            }}
            className="hover:text-cyan-300 transition"
          >
            Custom Color Studio
          </a>
        </div>
      </div>
    </footer>
  );
};
