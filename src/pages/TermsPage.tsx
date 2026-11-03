/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FileText, ArrowLeft } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service – QRVibe Usage Agreement & Conditions</title>
        <meta name="description" content="Read the QRVibe Terms of Service. Understand our acceptable use policy, intellectual property guidelines, and free QR code generator usage terms." />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
        <meta property="og:title" content="Terms of Service – QRVibe Usage Agreement & Conditions" />
        <meta property="og:description" content="Read the QRVibe Terms of Service. Understand our acceptable use policy, intellectual property guidelines, and free QR code generator usage terms." />
        <meta property="og:url" content={`${SITE_URL}/terms`} />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-fuchsia-400 transition">Home</Link>
          <span>/</span>
          <span className="text-fuchsia-300 font-medium">Terms of Service</span>
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
            <FileText className="w-4 h-4 text-fuchsia-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-400">Last updated: November 3, 2026</p>
        </div>

        {/* Content Body */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">1. Acceptance of Terms</h2>
            <p>
              By accessing and using QRVibe (qrvibe.app), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">2. Free Usage & Permanence</h2>
            <p>
              Standard static QR code generation and high-resolution vector and bitmap exports are provided 100% free of charge. Static QR codes encode data directly into the barcode matrix and will function indefinitely without expiration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">3. Acceptable Use Policy</h2>
            <p>
              You agree not to use QRVibe to generate QR codes containing malicious URLs, phishing scams, malware payloads, deceptive links, or unlawful material. You are solely responsible for the content and destination of the QR codes you create and distribute.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">4. Intellectual Property</h2>
            <p>
              The QRVibe brand, interface design, logos, and software architecture are protected by intellectual property laws. You retain full ownership and copyright of any custom QR code designs and exported graphics you generate on our platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-['Outfit']">5. Limitation of Liability</h2>
            <p>
              QRVibe is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind. We shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our QR generator or scanned barcodes.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
};
