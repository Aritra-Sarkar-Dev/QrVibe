/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Code, Copy, Check, Sparkles } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const EmbedPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const canonicalUrl = `${SITE_URL}/embed`;
  const pageTitle = 'Embed Free QR Code Generator Widget on Your Site | QRVibe';
  const pageDesc = 'Add a free, responsive QR code generator widget to your blog, portfolio, or business website with our clean iframe embed code snippet.';

  const embedCode = `<iframe src="${SITE_URL}/embed" width="100%" height="650" style="border:none; border-radius:16px;" title="QRVibe Free QR Code Generator"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">Embed Generator Widget</span>
        </nav>

        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to Home Studio</span>
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <Code className="w-4 h-4 text-fuchsia-400" />
            <span>Embeddable Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            Embed QRVibe Generator on Your Website
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {pageDesc}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#120d24]/90 border border-violet-500/20 space-y-6 shadow-2xl backdrop-blur-xl">
          <h2 className="text-lg font-bold font-['Outfit'] text-white">Copy Embed Snippet</h2>
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-fuchsia-300 break-all select-all">
            {embedCode}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-bold text-xs shadow-lg shadow-fuchsia-500/25 flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Embed Code!' : 'Copy Embed Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
