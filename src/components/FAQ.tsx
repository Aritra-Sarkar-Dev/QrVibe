import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface FAQProps {
  t: Translations;
}

export const FAQ_QUESTIONS = [
  {
    q: 'What is a QR code?',
    a: 'A QR (Quick Response) code is a two-dimensional barcode capable of storing hundreds of characters of data—such as website links, text notes, WiFi credentials, vCard contact cards, or payment links. Any modern smartphone camera can point at the code and scan it in milliseconds without requiring dedicated barcode apps.',
  },
  {
    q: 'Is QRVibe free to use?',
    a: 'Yes, QRVibe is 100% free forever for all standard static QR code generation. You can create unlimited QR codes, personalize styles, test scanner contrast, and download high-resolution PNG, SVG vector, or PDF files with no hidden fees or forced subscriptions.',
  },
  {
    q: 'Can I customize my QR code colors, patterns, and style?',
    a: 'Absolutely! QRVibe provides unprecedented customization: choose from 8 signature aesthetic presets (Neon, Cyberpunk, Sunset, Pastel, and more), select custom dot patterns (dots, rounded, classy, squircle), customize corner squares and center dots, apply two-tone gradients, and set transparent backgrounds.',
  },
  {
    q: 'How do I download my QR code?',
    a: 'Once you enter your details in the Studio generator, your QR renders instantly in the preview box on the right. Below the preview, choose your desired format: click "Download PNG" for high-resolution bitmap, "Vector SVG" for infinite printing scalability, or "Export PDF" for print-ready documents.',
  },
  {
    q: 'Can I upload my own company or brand logo?',
    a: 'Yes! In the Style & Colors tab, open the Center Logo panel to upload your brand emblem or select standard social icons (Instagram, TikTok, LinkedIn, YouTube). QRVibe automatically upgrades scan reliability to Level H (High 30% error correction) so your code scans flawlessly with the logo overlay.',
  },
  {
    q: 'What QR types are supported on QRVibe?',
    a: 'QRVibe supports 15 different QR types: Web Links, Images (hosted via ImgBB), Plain Text, WiFi Networks, vCard Digital Business Cards, WhatsApp direct chat, Social Handles (Instagram, TikTok, X, YouTube, LinkedIn), Email mailto, SMS messaging, Phone Calls, GPS Geolocation, Calendar Events, Payment links (UPI, PayPal, cards), App Store links, and Bulk CSV batch generation.',
  },
  {
    q: 'Is my data secure and private?',
    a: 'Yes, QRVibe adheres to a strict local-first privacy architecture. All QR encoding and image compression are computed directly inside your browser client. Your private passwords, phone numbers, and notes are never stored or logged on any external server.',
  },
  {
    q: 'Do I need to sign up or create an account?',
    a: 'No sign-up is required. You can start generating, styling, and downloading QR codes instantly the moment you visit QRVibe. No credit cards, no passwords, and no marketing emails.',
  },
  {
    q: 'Can I generate QR codes in bulk via CSV?',
    a: 'Yes! QRVibe features a built-in Bulk QR generator. Simply upload a CSV file or paste multiple lines of text or URLs, click "Download All as ZIP", and our background processor will generate and zip all individual high-resolution QR files automatically.',
  },
  {
    q: 'Do the QR codes generated on QRVibe expire?',
    a: 'No! Static QR codes generated on QRVibe encode your payload directly into the pattern matrix and do not rely on an intermediary redirect server. Because of this, they will work forever with unlimited scans and will never expire.',
  },
];

export const FAQ: React.FC<FAQProps> = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-semibold mb-3">
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Everything you need to know about QR codes, customization, formatting, and commercial usage.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_QUESTIONS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-violet-500/20 bg-black/30 backdrop-blur-md overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-fuchsia-300 transition"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-fuchsia-400 shrink-0" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-fuchsia-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
