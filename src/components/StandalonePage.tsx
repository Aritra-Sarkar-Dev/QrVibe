import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Mail,
  Info,
  ExternalLink,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Github,
  Twitter,
  Send,
  Code2,
  AlertCircle,
  Home,
  Check,
  X as XIcon,
} from 'lucide-react';
import { Translations } from '../utils/i18n.ts';

export type StandalonePageId = 'about' | 'privacy' | 'terms' | 'contact' | '404';

interface StandalonePageProps {
  pageId: StandalonePageId;
  onNavigate: (page: StandalonePageId | 'home') => void;
  t: Translations;
}

export const StandalonePage: React.FC<StandalonePageProps> = ({
  pageId,
  onNavigate,
}) => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<'Bug Report' | 'Feature Request' | 'Partnership' | 'Other'>('Feature Request');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 10) {
      setFormError('Message must be at least 10 characters long.');
      return;
    }

    setFormError(null);
    setIsSent(true);
  };

  const pageNavLabels: Record<StandalonePageId, string> = {
    about: 'About',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    '404': 'Page Not Found',
  };

  const todayDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-white flex items-center gap-1 transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <span className="text-fuchsia-400 font-semibold">{pageNavLabels[pageId]}</span>
      </nav>

      <div className="rounded-3xl bg-[#130d26]/90 border border-violet-500/25 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        {/* Navigation Tabs Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 transition"
            >
              Create
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                pageId === 'about'
                  ? 'bg-fuchsia-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                pageId === 'privacy'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                pageId === 'terms'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                pageId === 'contact'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              Contact
            </button>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Generator</span>
          </button>
        </div>

        {/* ----------------- ABOUT PAGE ----------------- */}
        {pageId === 'about' && (
          <article className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-semibold border border-fuchsia-500/30">
                <Info className="w-3.5 h-3.5" />
                <span>Mission & Story</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                About QRVibe
              </h1>
            </header>

            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-300">
              <p className="text-base sm:text-lg text-white font-medium">
                QRVibe was born from a simple idea: everyone deserves beautiful, customizable QR codes without barriers.
              </p>
              <p>
                Traditional QR generators are outdated—boring black and white grids. We built QRVibe for creators, small business owners, and modern brands who want QR codes that match their style.
              </p>
              <p>
                <strong>Why free?</strong> We believe in removing barriers to creativity. Whether you&apos;re a solopreneur, content creator, or business owner, you shouldn&apos;t pay for basic tools.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  What makes QRVibe different:
                </h2>
                <ul className="space-y-2 text-sm text-slate-200">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>15+ QR types</strong> (not just URLs)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Full customization</strong> (colors, gradients, logos)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Multiple export formats</strong> (PNG, SVG, PDF)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>No sign-up, no watermarks, no limits</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Ultra-fast</strong>, runs 100% in your browser</span>
                  </li>
                </ul>
              </div>

              <p>
                Built with React, TypeScript, and modern web tech. Your QR codes are generated locally—we never store your data.
              </p>

              <p>
                Questions?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="text-cyan-400 underline font-semibold hover:text-cyan-300"
                >
                  Contact us anytime.
                </button>
              </p>
            </div>

            {/* AUTHOR SECTION */}
            <section className="rounded-2xl border border-violet-500/40 bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-black/60 p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-cyan-400 p-0.5 shrink-0 shadow-lg shadow-fuchsia-500/20">
                  <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-300">
                    AS
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Author & Creator
                  </div>
                  <h3 className="text-xl font-black text-white font-['Outfit']">
                    Aritra Sarkar <span className="text-slate-500 font-normal">|</span> <span className="text-fuchsia-400 font-semibold text-sm">Full-Stack Engineer</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    Passionate about building fast, beautiful, and accessible web tools for creators and small businesses.
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                    <a
                      href="mailto:aritrasarkar293@gmail.com"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>aritrasarkar293@gmail.com</span>
                    </a>
                    <a
                      href="https://github.com/aritra-sarkar-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                    >
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition"
                    >
                      <Twitter className="w-3.5 h-3.5 text-sky-400" />
                      <span>Twitter / X</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                <span>Create Free QR →</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        )}

        {/* ----------------- PRIVACY POLICY PAGE ----------------- */}
        {pageId === 'privacy' && (
          <article className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security & Privacy</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                Privacy Policy
              </h1>
            </header>

            <div className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  1. INTRODUCTION
                </h2>
                <p>QRVibe is committed to protecting your privacy.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  2. DATA WE COLLECT
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Browser/device info (for optimization)</li>
                  <li>QR code generation logs (stored locally)</li>
                  <li>Image uploads (temporarily, sent to ImgBB API for logo processing)</li>
                </ul>
                <div className="pt-2">
                  <p className="font-semibold text-white">We DO NOT collect:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-300">
                    <li>Personal information without consent</li>
                    <li>Cookies for tracking</li>
                    <li>Email addresses (unless you contact us)</li>
                    <li>Payment information (we&apos;re free!)</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-2 rounded-2xl bg-violet-950/30 border border-violet-500/30 p-4">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  3. IMAGE UPLOADS & IMGBB
                </h2>
                <p>
                  When you upload a logo, it&apos;s sent to ImgBB for temporary processing. Images are NOT permanently stored.
                  See:{' '}
                  <a
                    href="https://imgbb.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline hover:text-cyan-300"
                  >
                    https://imgbb.com/privacy
                  </a>
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  4. LOCAL DATA STORAGE
                </h2>
                <p>
                  Your QR code history is stored in your browser&apos;s localStorage. Only you can access it. We can&apos;t see or retrieve it.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  5. THIRD-PARTY SERVICES
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li><strong>ImgBB:</strong> Image hosting (logo uploads)</li>
                  <li><strong>GitHub Pages:</strong> Website hosting</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  6. YOUR RIGHTS
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Access your data</li>
                  <li>Delete your local history anytime</li>
                  <li>Contact us with privacy questions</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  7. SECURITY
                </h2>
                <p>
                  Your data is secure. QR codes generated locally in browser. HTTPS encrypts communications.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  8. CONTACT
                </h2>
                <p>
                  Questions? Email:{' '}
                  <a href="mailto:aritrasarkar293@gmail.com" className="text-cyan-400 underline font-semibold">
                    aritrasarkar293@gmail.com
                  </a>
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  Last updated: {todayDate}
                </p>
              </section>
            </div>
          </article>
        )}

        {/* ----------------- TERMS OF SERVICE PAGE ----------------- */}
        {pageId === 'terms' && (
          <article className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                <FileText className="w-3.5 h-3.5" />
                <span>Usage & Ownership</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                Terms of Service
              </h1>
            </header>

            <div className="space-y-6">
              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  1. ACCEPTANCE OF TERMS
                </h2>
                <p>By using QRVibe, you agree to these Terms.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  2. USE LICENSE
                </h2>
                <p>QRVibe is free to use for personal and commercial purposes.</p>
              </section>

              <section className="space-y-2 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 p-4">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  3. PERMITTED USES
                </h2>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Create QR codes for personal/business/commercial use</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Customize QR codes with your branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Download QR codes in multiple formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Embed QR codes in marketing materials</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  4. PROHIBITED USES
                </h2>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-2 text-rose-300">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Encode illegal content</span>
                  </li>
                  <li className="flex items-center gap-2 text-rose-300">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Create QR codes for phishing/fraud</span>
                  </li>
                  <li className="flex items-center gap-2 text-rose-300">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Violate intellectual property rights</span>
                  </li>
                  <li className="flex items-center gap-2 text-rose-300">
                    <XIcon className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Reverse engineer QRVibe code</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  5. QR CODE OWNERSHIP
                </h2>
                <p>You own all QR codes you create.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  6. NO WARRANTIES
                </h2>
                <p>QRVibe provided &apos;as-is&apos; without warranties.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  7. LIABILITY DISCLAIMER
                </h2>
                <p>QRVibe not responsible for data loss or broken codes.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  8. CHANGES TO TERMS
                </h2>
                <p>We may update Terms anytime. Continued use = acceptance.</p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white font-['Outfit']">
                  9. CONTACT
                </h2>
                <p>
                  Questions? Email:{' '}
                  <a href="mailto:aritrasarkar293@gmail.com" className="text-cyan-400 underline font-semibold">
                    aritrasarkar293@gmail.com
                  </a>
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  Last updated: {todayDate}
                </p>
              </section>
            </div>
          </article>
        )}

        {/* ----------------- CONTACT US PAGE ----------------- */}
        {pageId === 'contact' && (
          <article className="space-y-8 text-sm text-slate-300 leading-relaxed">
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <Mail className="w-3.5 h-3.5" />
                <span>Direct Support</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
                Get In Touch
              </h1>
              <p className="text-sm text-slate-400">
                Have questions, feedback, or feature requests?
              </p>
            </header>

            {isSent ? (
              <div className="rounded-2xl bg-emerald-950/40 border border-emerald-500/40 p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white font-['Outfit']">
                  Thanks for reaching out! We&apos;ll respond within 24 hours.
                </h2>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Your message regarding &ldquo;<strong>{subject}</strong>&rdquo; has been received. A member of our team will get back to <strong className="text-emerald-300">{email}</strong> shortly.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Name <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Email <span className="text-fuchsia-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                    Subject <span className="text-fuchsia-400">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/50 text-xs text-white focus:border-fuchsia-500 outline-none"
                  >
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-200">
                      Message <span className="text-fuchsia-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {message.length < 10 ? `Min 10 chars (${10 - message.length} needed)` : `${message.length} chars`}
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message (minimum 10 characters)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white placeholder-slate-500 focus:border-fuchsia-500 outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message →</span>
                  </button>

                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span>Response time: 24 hours</span>
                  </div>
                </div>

                {/* Direct Mailto Fallback */}
                <div className="pt-4 border-t border-white/10 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                  <span>Prefer sending directly from your email app?</span>
                  <a
                    href="mailto:aritrasarkar293@gmail.com?subject=QRVibe%20Inquiry"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>aritrasarkar293@gmail.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </form>
            )}
          </article>
        )}

        {/* ----------------- 404 NOT FOUND PAGE ----------------- */}
        {pageId === '404' && (
          <article className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-violet-950/60 border border-violet-500/30 text-fuchsia-400 flex items-center justify-center mx-auto shadow-xl">
              <span className="text-3xl font-black font-['Outfit']">404</span>
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                Oops! Page not found
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                The page you are looking for doesn&apos;t exist or has moved. Explore our core features or return to the Studio generator.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-lg hover:brightness-110 transition"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return to Home</span>
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
              >
                About QRVibe
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
              >
                Contact Support
              </button>
            </div>
          </article>
        )}

        {/* Internal Cross Links */}
        <footer className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-slate-300 hover:text-white underline underline-offset-4"
            >
              Home
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-white transition ${pageId === 'about' ? 'text-fuchsia-400 font-bold' : ''}`}
            >
              About
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`hover:text-white transition ${pageId === 'privacy' ? 'text-violet-400 font-bold' : ''}`}
            >
              Privacy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`hover:text-white transition ${pageId === 'terms' ? 'text-cyan-400 font-bold' : ''}`}
            >
              Terms
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-white transition ${pageId === 'contact' ? 'text-emerald-400 font-bold' : ''}`}
            >
              Contact
            </button>
          </div>
          <div className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} QRVibe Studio · Aritra Sarkar
          </div>
        </footer>
      </div>
    </div>
  );
};
