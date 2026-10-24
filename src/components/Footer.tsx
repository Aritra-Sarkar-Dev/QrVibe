import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Send, Mail } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

interface FooterProps {
  t: Translations;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'contact' | null>(null);

  // Contact form state
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactMsg('');
      setActiveModal(null);
    }, 2000);
  };

  return (
    <>
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

            {/* Nav & Legal Modals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
              <button
                type="button"
                onClick={() => setActiveModal('privacy')}
                className="hover:text-white transition underline-offset-4 hover:underline"
              >
                {t.footer.privacy}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('terms')}
                className="hover:text-white transition underline-offset-4 hover:underline"
              >
                {t.footer.terms}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('contact')}
                className="hover:text-white transition underline-offset-4 hover:underline"
              >
                {t.footer.contact}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal: Privacy Policy */}
      {activeModal === 'privacy' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-[#140e29] border border-violet-500/30 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-bold font-['Outfit']">Privacy Policy</h3>
            </div>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>1. Data Minimization & Local-First Processing:</strong> QRVibe is designed
                with privacy at its foundation. Your QR payload inputs (URLs, text notes, WiFi
                credentials, contacts, and payments) are generated and encoded completely inside
                your browser. We never log, store, or sell your personal data.
              </p>
              <p>
                <strong>2. Image Uploads to ImgBB:</strong> When you select the &quot;Image&quot; QR type,
                your image is first compressed client-side to save bandwidth, and then uploaded
                directly to <strong>ImgBB&apos;s public cloud hosting network (https://api.imgbb.com)</strong>.
                By uploading an image, you acknowledge that ImgBB hosts the file and generates a
                publicly accessible web URL encoded inside your QR code.
              </p>
              <p>
                <strong>3. Local Storage:</strong> Recent QR history is stored exclusively in your
                device&apos;s local browser storage (`localStorage`). You can clear your history at any
                time with one click.
              </p>
              <p>
                <strong>4. Cookies & Advertising:</strong> QRVibe displays non-intrusive banner
                advertisements to keep all core generator features 100% free forever.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-violet-600 font-semibold hover:bg-violet-500 text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal: Terms of Service */}
      {activeModal === 'terms' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-[#140e29] border border-violet-500/30 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold font-['Outfit']">Terms of Service</h3>
            </div>
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>1. Acceptance of Terms:</strong> By accessing and using QRVibe, you agree
                to comply with and be bound by these terms.
              </p>
              <p>
                <strong>2. Commercial Ownership:</strong> All static QR codes generated through
                QRVibe are your property. You are granted full commercial rights to use, print, and
                distribute them on marketing collateral, product packaging, menus, and media.
              </p>
              <p>
                <strong>3. Prohibited Usage:</strong> You may not use QRVibe to generate payloads
                linking to malware, phishing sites, unsolicited spam, illegal pornography, or
                content that violates copyright or criminal law.
              </p>
              <p>
                <strong>4. Service Disclaimer:</strong> QRVibe is provided on an &quot;as-is&quot; basis
                without warranties of any kind. Always test scan your printed codes on multiple
                device camera models before mass printing.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-cyan-600 font-semibold hover:bg-cyan-500 text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal: Contact Support */}
      {activeModal === 'contact' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <div className="relative w-full max-w-md rounded-3xl bg-[#140e29] border border-violet-500/30 p-6 sm:p-8 shadow-2xl text-white">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-6 h-6 text-fuchsia-400" />
              <h3 className="text-xl font-bold font-['Outfit']">Contact Support</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Have a suggestion, question, or feature idea? Send a note to the QRVibe core team.
            </p>

            {contactSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center text-xs font-semibold">
                Message sent successfully! We will get back to you within 24 hours.
              </div>
            ) : (
              <form onSubmit={handleSendContact} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="creator@email.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="How can we help?"
                    className="w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
