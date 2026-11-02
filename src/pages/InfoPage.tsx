import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ShieldCheck, Mail, Building, FileText, Lock } from 'lucide-react';

const INFO_CONTENTS: Record<string, { title: string; icon: any; content: React.ReactNode }> = {
  about: {
    title: 'About QRVibe – The Modern QR Code Generator for Creators',
    icon: Building,
    content: (
      <>
        <p>
          QRVibe was born out of a simple frustration: existing QR code generators are either cluttered with annoying intrusive ads, charge hidden monthly subscription fees for static codes, or produce boring, harsh black-and-white barcodes that clash with modern brand aesthetics.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">Our Mission</h2>
        <p>
          We set out to build the premier, lightning-fast, 100% free QR code studio tailored specifically for Gen Z creators, entrepreneurs, hospitality brands, and small businesses. We combine state-of-the-art optical matrix generation with advanced color gradients, dot styles, center logos, and instant high-resolution PNG, SVG, and PDF exports.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">Local-First Privacy Architecture</h2>
        <p>
          Your data belongs to you. QRVibe processes all QR code matrix generation and image compression directly inside your web browser. We never log or store your private Wi-Fi passwords, personal contact vCards, notes, or payment links on external servers.
        </p>
      </>
    ),
  },
  contact: {
    title: 'Contact Us – QRVibe Support & Feedback',
    icon: Mail,
    content: (
      <>
        <p>
          Have questions, feature requests, or need assistance with enterprise QR campaigns or bulk generation? We would love to hear from you!
        </p>
        <div className="p-6 rounded-2xl bg-black/40 border border-violet-500/30 my-6 space-y-3">
          <p className="text-sm text-white font-semibold">Get in touch directly with our founder & engineering lead:</p>
          <p className="text-sm font-mono text-fuchsia-300">Email: aritrasarkar293@gmail.com</p>
          <p className="text-xs text-slate-400">Response time: Usually within 24 hours on business days.</p>
        </div>
      </>
    ),
  },
  privacy: {
    title: 'Privacy Policy – QRVibe Data Protection & Security',
    icon: Lock,
    content: (
      <>
        <p>Last updated: November 1, 2026</p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">1. Information We Do Not Collect</h2>
        <p>
          QRVibe operates on a strict local-first client-side model. When you generate QR codes for text, URLs, Wi-Fi credentials, or vCards, your input data is processed entirely in your browser memory and is never transmitted to or stored on our servers.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">2. Image Uploads</h2>
        <p>
          If you use our Image QR code feature, your uploaded images are transmitted securely via serverless proxy to ImgBB cloud hosting solely to generate a public image URL. Please refer to ImgBB privacy policies regarding hosted image retention.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">3. Local Storage</h2>
        <p>
          Your recent QR generation history is stored exclusively in your browser&apos;s local storage (`localStorage`) so you can access your past codes across sessions. You can clear your history anytime.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">4. Advertising & Google AdSense Cookies</h2>
        <p>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may learn more about how Google uses data by visiting <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 underline font-medium">https://policies.google.com/technologies/ads</a>.
        </p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service – QRVibe Usage Agreement',
    icon: FileText,
    content: (
      <>
        <p>Last updated: November 1, 2026</p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using QRVibe (qrvibe.app), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use immediately.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">2. Free Usage & Static Permanence</h2>
        <p>
          Standard static QR code generation and high-resolution exports are provided 100% free of charge. Static QR codes encode data directly into the matrix and will function indefinitely without expiration.
        </p>
        <h2 className="text-xl font-bold text-white font-['Outfit'] mt-6 mb-3">3. Acceptable Use</h2>
        <p>
          You agree not to encode malicious URLs, phishing links, malware payloads, or unlawful content into QR codes generated through our platform.
        </p>
      </>
    ),
  },
};

export const InfoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = INFO_CONTENTS[slug || 'about'] || INFO_CONTENTS['about'];
  const IconComponent = page.icon;
  const canonicalUrl = `https://qr-vibe.vercel.app/${slug || 'about'}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{page.title} – QRVibe</title>
        <meta name="description" content={page.title} />
        <meta property="og:title" content={`${page.title} – QRVibe`} />
        <meta property="og:description" content={page.title} />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to Generator</span>
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <IconComponent className="w-4 h-4 text-fuchsia-400" />
            <span>QRVibe Information</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            {page.title}
          </h1>
        </div>

        {/* Body Content */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl prose prose-invert max-w-none text-slate-300 space-y-4 leading-relaxed">
          {page.content}
        </div>

      </div>
    </div>
  );
};
