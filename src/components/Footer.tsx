import React from 'react';
import { Link } from 'react-router-dom';
import { Translations } from '../utils/i18n.ts';

interface FooterProps {
  t: Translations;
  onOpenPage?: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
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
            <Link to="/" className="hover:text-white transition underline-offset-4 hover:underline">
              Home
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link to="/blog" className="hover:text-white transition underline-offset-4 hover:underline">
              Blog
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link to="/about" className="hover:text-white transition underline-offset-4 hover:underline">
              About
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link to="/privacy" className="hover:text-white transition underline-offset-4 hover:underline">
              Privacy
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link to="/terms" className="hover:text-white transition underline-offset-4 hover:underline">
              Terms
            </Link>
            <span className="text-slate-600" aria-hidden="true">|</span>
            <Link to="/contact" className="hover:text-white transition underline-offset-4 hover:underline">
              Contact
            </Link>
          </nav>
        </div>

        {/* Feature Tools Internal Linking Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-slate-400">
          <span className="text-slate-500 font-semibold uppercase tracking-wider">Free QR Types:</span>
          <Link to="/qr/url" className="hover:text-cyan-300 transition">
            URL QR Code
          </Link>
          <span>·</span>
          <Link to="/qr/wifi" className="hover:text-cyan-300 transition">
            WiFi QR Code
          </Link>
          <span>·</span>
          <Link to="/qr/whatsapp" className="hover:text-cyan-300 transition">
            WhatsApp QR
          </Link>
          <span>·</span>
          <Link to="/qr/vcard" className="hover:text-cyan-300 transition">
            vCard Contact QR
          </Link>
          <span>·</span>
          <Link to="/qr/payment" className="hover:text-cyan-300 transition">
            Payment QR
          </Link>
          <span>·</span>
          <Link to="/qr/image" className="hover:text-cyan-300 transition">
            Image QR
          </Link>
          <span>·</span>
          <Link to="/qr/text" className="hover:text-cyan-300 transition">
            Text QR
          </Link>
        </div>
      </div>
    </footer>
  );
};
