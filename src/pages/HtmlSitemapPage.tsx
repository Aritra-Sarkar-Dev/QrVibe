/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Globe, BookOpen, ShieldCheck } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const HtmlSitemapPage: React.FC = () => {
  const navigate = useNavigate();
  const canonicalUrl = `${SITE_URL}/sitemap`;
  const pageTitle = 'HTML Sitemap – All Pages & Tools | QRVibe';
  const pageDesc = 'Browse the complete HTML sitemap of QRVibe. Easily discover all free QR code generator tools, use cases, design galleries, and educational blog articles.';

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">HTML Sitemap</span>
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

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            QRVibe HTML Sitemap
          </h1>
          <p className="text-sm text-slate-300">
            {pageDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Core Tools */}
          <div className="p-6 rounded-3xl bg-[#120d24]/90 border border-violet-500/20 space-y-4">
            <h2 className="text-lg font-bold font-['Outfit'] text-fuchsia-300 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Core QR Generator Tools</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li><Link to="/" className="hover:text-fuchsia-400 transition">Home Studio Generator</Link></li>
              <li><Link to="/tools/wifi-qr-generator" className="hover:text-fuchsia-400 transition">WiFi QR Code Generator</Link></li>
              <li><Link to="/tools/image-to-qr-code" className="hover:text-fuchsia-400 transition">Image to QR Code Generator</Link></li>
              <li><Link to="/qr/url" className="hover:text-fuchsia-400 transition">Website URL QR Code</Link></li>
              <li><Link to="/qr/whatsapp" className="hover:text-fuchsia-400 transition">WhatsApp Chat QR Code</Link></li>
              <li><Link to="/qr/payment" className="hover:text-fuchsia-400 transition">Payment & UPI QR Code</Link></li>
              <li><Link to="/qr/vcard" className="hover:text-fuchsia-400 transition">vCard Digital Business Card QR</Link></li>
              <li><Link to="/qr/text" className="hover:text-fuchsia-400 transition">Plain Text QR Code</Link></li>
              <li><Link to="/qr-code-examples" className="hover:text-fuchsia-400 transition">30+ QR Code Examples Gallery</Link></li>
            </ul>
          </div>

          {/* Blog & Information */}
          <div className="p-6 rounded-3xl bg-[#120d24]/90 border border-violet-500/20 space-y-4">
            <h2 className="text-lg font-bold font-['Outfit'] text-cyan-300 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-fuchsia-400" />
              <span>Guides, Blog & Legal</span>
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li><Link to="/blog" className="hover:text-cyan-400 transition">QRVibe Expert Blog Hub</Link></li>
              <li><Link to="/blog/how-qr-codes-work" className="hover:text-cyan-400 transition">How QR Codes Work: Technology & Reed-Solomon</Link></li>
              <li><Link to="/blog/cafe-wifi-qr-code" className="hover:text-cyan-400 transition">How to Make a WiFi QR Code for Cafes & Offices</Link></li>
              <li><Link to="/blog/restaurant-menu-qr-code" className="hover:text-cyan-400 transition">Restaurant Menu QR Code Best Practices</Link></li>
              <li><Link to="/blog/small-shop-payment-qr" className="hover:text-cyan-400 transition">Payment QR Codes for Small Shops & Creators</Link></li>
              <li><Link to="/blog/qr-code-best-practices" className="hover:text-cyan-400 transition">QR Code Contrast, Quiet Zones & Scannability</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition">About QRVibe</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-400 transition">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact Support</Link></li>
              <li><Link to="/embed" className="hover:text-cyan-400 transition">Embed QR Generator Widget</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
