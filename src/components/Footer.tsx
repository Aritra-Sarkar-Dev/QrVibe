/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Translations } from '../utils/i18n.ts';

interface FooterProps {
  t: Translations;
  onOpenPage?: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="border-t border-white/10 bg-[#08050e] py-12 pb-36 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

          {/* Nav & Legal Links (Min 44px touch height, proper spacing) */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-slate-300">
            <Link
              to="/"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              Terms
            </Link>
            <Link
              to="/contact"
              className="min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition flex items-center justify-center font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Feature Tools Internal Linking Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-400">
          <span className="text-slate-500 font-semibold uppercase tracking-wider mr-2">Free QR Types:</span>
          <Link to="/qr/url" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            URL QR Code
          </Link>
          <Link to="/qr/wifi" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            WiFi QR Code
          </Link>
          <Link to="/qr/whatsapp" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            WhatsApp QR
          </Link>
          <Link to="/qr/vcard" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            vCard Contact QR
          </Link>
          <Link to="/qr/payment" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            Payment QR
          </Link>
          <Link to="/qr/image" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            Image QR
          </Link>
          <Link to="/qr/text" className="min-h-[36px] px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-cyan-300 transition flex items-center">
            Text QR
          </Link>
        </div>
      </div>
    </footer>
  );
};
