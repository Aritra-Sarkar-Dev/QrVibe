/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy – QRVibe Data Protection & Security</title>
        <meta name="description" content="Read the QRVibe Privacy Policy. Learn how we protect your data with local-first processing, handle uploaded images, and utilize Google AdSense cookies." />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
        <meta property="og:title" content="Privacy Policy – QRVibe Data Protection & Security" />
        <meta property="og:description" content="Read the QRVibe Privacy Policy. Learn how we protect your data with local-first processing, handle uploaded images, and utilize Google AdSense cookies." />
        <meta property="og:url" content={`${SITE_URL}/privacy`} />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-fuchsia-400 transition">Home</Link>
          <span>/</span>
          <span className="text-fuchsia-300 font-medium">Privacy Policy</span>
        </nav>

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
            <Lock className="w-4 h-4 text-fuchsia-400" />
            <span>Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">Last updated: November 3, 2026</p>
        </div>

        {/* Content Body */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">1. Local-First Client Processing</h2>
            <p>
              QRVibe operates on a strict local-first model. When you generate QR codes for websites, text notes, Wi-Fi credentials, or vCard contact cards, your sensitive data is processed directly inside your web browser memory using HTML5 Canvas. We never transmit or store your private generator contents on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">2. Image Uploads & Hosting</h2>
            <p>
              If you utilize our Image QR code feature, your uploaded images are transmitted securely via serverless proxy to ImgBB cloud hosting solely to generate a public image URL for the QR matrix. Please review ImgBB&apos;s privacy terms regarding hosted image retention.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">3. Browser Local Storage</h2>
            <p>
              Your recent QR generation history is stored exclusively in your browser&apos;s local storage (`localStorage`) so you can access your past codes across sessions. You can clear your history anytime from the Saved tab or browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">4. Google AdSense & Third-Party Advertising Cookies</h2>
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
            </p>
            <p>
              Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 underline font-medium">Ads Settings</a>. You can also learn more about how Google uses data for advertising by visiting <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-fuchsia-400 underline font-medium">https://policies.google.com/technologies/ads</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">5. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please reach out via our <Link to="/contact" className="text-fuchsia-400 underline font-medium">Contact Page</Link>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
