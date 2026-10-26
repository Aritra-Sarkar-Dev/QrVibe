import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  FileText,
  Send,
  Mail,
  Info,
  ExternalLink,
  CheckCircle,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Lock,
} from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

export type PageId = 'about' | 'privacy' | 'terms' | 'contact';

interface ContentPagesModalProps {
  activePage: PageId | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  t: Translations;
}

export const ContentPagesModal: React.FC<ContentPagesModalProps> = ({
  activePage,
  onClose,
  onNavigate,
}) => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!activePage) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="page-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#120c24] border border-violet-500/30 p-6 sm:p-10 shadow-2xl text-slate-100 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Internal Navigation Tabs */}
        <nav
          aria-label="Legal and Information Pages"
          className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-white/10 pb-4 mb-6 pr-10"
        >
          <button
            onClick={() => onNavigate('about')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePage === 'about'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            About QRVibe
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePage === 'privacy'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePage === 'terms'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Terms of Service
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePage === 'contact'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            Contact Us
          </button>
        </nav>

        {/* Page Content: ABOUT */}
        {activePage === 'about' && (
          <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <header className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h1 id="page-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                  About QRVibe
                </h1>
                <p className="text-xs text-slate-400">
                  Empowering creators, entrepreneurs, and brands with free, permanent, aesthetic QR codes.
                </p>
              </div>
            </header>

            <section className="space-y-4">
              <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>Our Mission: Break the Paywall Monopoly</span>
              </h2>
              <p>
                QRVibe was created to solve a deeply frustrating problem that millions of creators,
                event planners, restaurant owners, and small businesses face every day: traditional
                QR code generators lure users in with &ldquo;free&rdquo; promises, only to hold their
                printed materials hostage weeks later behind recurring $35/month subscription paywalls.
                Once a QR code is printed on thousands of menus, brochures, packaging boxes, or business
                cards, finding out that the link was deactivated is unacceptable.
              </p>
              <p>
                Our mission at QRVibe is simple: restore the open, decentralized ethos of the web by
                delivering a production-grade QR code generator that is <strong>100% free forever</strong>,
                aesthetically stunning, and completely permanent. We believe essential internet utility
                tools should inspire creativity rather than enforce digital ransom.
              </p>
            </section>

            <section className="space-y-3 rounded-2xl bg-white/5 border border-white/10 p-5">
              <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>Why is QRVibe 100% Free?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                QRVibe sustains its infrastructure through non-intrusive creator advertisements and
                voluntary pro upgrades rather than penalizing free users. All static QR codes generated
                on our studio encode your data directly into the two-dimensional matrix itself. Because
                there is no intermediary redirect server required to translate your destination, your
                QR codes belong entirely to you, support unlimited lifetime scans, and will never expire.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-emerald-400">Zero Expiration</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Codes work indefinitely with no monthly renewals</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-cyan-400">Client-Side Speed</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Render in &lt; 50ms right inside your web browser</div>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <div className="font-bold text-fuchsia-400">Commercial Ready</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Full commercial print & packaging usage rights</div>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Lock className="w-4 h-4 text-violet-400" />
                <span>Modern Aesthetic Craftsmanship</span>
              </h2>
              <p>
                We engineered QRVibe with modern design standards in mind. Gone are the harsh, generic
                black-and-white barcodes of the early 2000s. With QRVibe, creators can blend signature
                two-tone color gradients, style custom squircle dots, upload their company emblems with
                automated Level-H error correction, and export ultra-sharp vector SVG and printable PDF files.
              </p>
            </section>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                <span>Start Creating Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="text-xs text-slate-400">
                Word count: ~230 words · Free & Open Utility
              </div>
            </div>
          </article>
        )}

        {/* Page Content: PRIVACY POLICY */}
        {activePage === 'privacy' && (
          <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <header className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 id="page-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                  Privacy Policy
                </h1>
                <p className="text-xs text-slate-400">
                  Last Updated: October 2026 · Committed to local-first privacy and absolute transparency
                </p>
              </div>
            </header>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                1. Local-First Processing & Data Minimization
              </h2>
              <p>
                At QRVibe (accessible at https://qrvibe.app), we believe your data belongs solely to you.
                Our architecture operates on a strict <strong>local-first computing model</strong>. When you
                generate a QR code for text, website links, WiFi credentials, vCard contact cards, WhatsApp
                messages, calendar events, SMS, phone numbers, or payment links, all encoding calculations
                are executed directly within your client browser using HTML5 Canvas and SVG technologies.
                Your sensitive credentials, passwords, and private notes are never sent to, collected by, or
                logged on any central server.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                2. Image QR Uploads via ImgBB API Integration
              </h2>
              <p>
                QRVibe provides an &ldquo;Image QR&rdquo; capability allowing creators to share photo files
                via a scannable barcode. To provide instant global accessibility without maintaining private
                backend file servers, images uploaded to this tool are first compressed client-side to minimize
                bandwidth, and then transmitted directly to <strong>ImgBB&apos;s public image hosting network</strong>{' '}
                via their official API (https://api.imgbb.com).
              </p>
              <p className="text-xs sm:text-sm bg-violet-950/40 border border-violet-500/30 p-3.5 rounded-xl text-slate-200">
                <strong>Important Notice:</strong> Once an image is uploaded through ImgBB, a public web URL is
                generated and embedded inside your QR code. Anyone who scans your QR code or accesses the URL will
                be able to view that photograph. Please do not upload confidential identification documents,
                unauthorized personal photos, or sensitive intellectual property. Image hosting is subject to
                ImgBB&apos;s terms and storage policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                3. Browser Local Storage (localStorage)
              </h2>
              <p>
                To provide convenient access to your recent QR creations, favorite starred items, personal notes,
                and download counters, QRVibe stores metadata directly in your device&apos;s browser using
                HTML5 <code>localStorage</code>. This data remains on your physical device and is never synchronized
                to external trackers or third parties. You can clear your entire history at any time with a single tap
                in the History Drawer.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                4. Cookies and Advertising Partners (Google AdSense)
              </h2>
              <p>
                To ensure all core generator features remain completely free for individuals and businesses,
                QRVibe displays non-intrusive banner advertisements through partners such as Google AdSense.
                Third-party advertising vendors may use cookies or web beacons to display personalized advertisements
                based on your previous visits to this and other websites. You may opt out of personalized
                advertising at any time by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  Google Ad Settings
                </a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                5. Contact & Data Inquiries
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request information, please reach
                out via our Contact page or send an email to{' '}
                <a href="mailto:privacy@qrvibe.app" className="text-cyan-400 underline">
                  privacy@qrvibe.app
                </a>.
              </p>
            </section>
          </article>
        )}

        {/* Page Content: TERMS OF SERVICE */}
        {activePage === 'terms' && (
          <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <header className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 id="page-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                  Terms of Service
                </h1>
                <p className="text-xs text-slate-400">
                  Clear terms protecting your commercial rights and ensuring platform safety.
                </p>
              </div>
            </header>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                1. Acceptance of Terms
              </h2>
              <p>
                By visiting, accessing, or utilizing QRVibe (including web, PWA, or bulk processing tools), you
                agree to be legally bound by these Terms of Service. If you do not agree with any part of these
                terms, please discontinue use immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                2. 100% Commercial Ownership & Intellectual Property
              </h2>
              <p>
                You retain complete, unencumbered ownership of all static QR codes, artwork, SVG vector files,
                PNG images, and PDF documents you generate on QRVibe. You are granted an unrestricted, perpetual,
                royalty-free commercial license to reproduce, print, display, and distribute generated codes on
                any medium—including merchandise, food menus, product packaging, billboards, and digital ads. No
                attribution to QRVibe is legally required.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                3. Acceptable Use Policy
              </h2>
              <p>
                You agree not to use QRVibe to create payloads, direct links, or distributed materials intended for:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300">
                <li>Phishing attacks, malware distribution, or deceptive credential harvesting.</li>
                <li>Defamation, harassment, threatening communications, or hate speech.</li>
                <li>Fraudulent financial schemes, illegal contraband, or copyright-infringing content.</li>
                <li>Any activity that violates local, state, national, or international telecommunications law.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                4. Print Verification & Disclaimer of Warranty
              </h2>
              <p>
                QRVibe is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While QRVibe
                provides built-in WCAG contrast validation meters and supports Level-H error correction for logo
                embeds, you are solely responsible for conducting physical scan tests on sample prints across
                multiple smartphone camera lenses before initiating mass commercial print runs. QRVibe is not
                liable for printing costs incurred due to scannability failures.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-bold text-white font-['Outfit']">
                5. Service Continuity
              </h2>
              <p>
                Because static QR codes encode data directly into their pattern without server redirection, your
                downloaded codes will function permanently regardless of the online status of QRVibe.
              </p>
            </section>
          </article>
        )}

        {/* Page Content: CONTACT FORM */}
        {activePage === 'contact' && (
          <article className="space-y-6 text-sm text-slate-300 leading-relaxed">
            <header className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h1 id="page-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                  Contact Support & Feedback
                </h1>
                <p className="text-xs text-slate-400">
                  Have a suggestion, bug report, or business partnership idea? We would love to hear from you.
                </p>
              </div>
            </header>

            {isSent ? (
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/40 p-6 sm:p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white font-['Outfit']">Thank you, {name || 'Creator'}!</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Your message has been received. Our support team typically replies within 24 business hours to{' '}
                  <strong className="text-emerald-300">{email}</strong>.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Vibe"
                      className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Email <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/50 text-xs text-white focus:border-fuchsia-500 outline-none"
                  >
                    <option value="General Inquiry">General Question or Feedback</option>
                    <option value="Feature Request">Feature Request / Preset Idea</option>
                    <option value="Bug Report">Technical Bug or Issue</option>
                    <option value="Commercial Partnership">Commercial / Brand Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message <span className="text-fuchsia-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind, what feature you need, or how we can help..."
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                  <a
                    href={`mailto:support@qrvibe.app?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(message)}`}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
                  >
                    <span>Or email directly: support@qrvibe.app</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>
            )}
          </article>
        )}

        {/* Bottom Internal Cross-Links */}
        <footer className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              ← Back to Home Studio
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-white transition ${activePage === 'about' ? 'text-fuchsia-400 font-bold' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`hover:text-white transition ${activePage === 'privacy' ? 'text-violet-400 font-bold' : ''}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`hover:text-white transition ${activePage === 'terms' ? 'text-cyan-400 font-bold' : ''}`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-white transition ${activePage === 'contact' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Contact Us
            </button>
          </div>
          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} QRVibe Studio
          </div>
        </footer>
      </div>
    </div>
  );
};
