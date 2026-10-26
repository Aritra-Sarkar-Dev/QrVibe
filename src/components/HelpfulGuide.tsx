import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Palette,
  Download,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Layers,
  Printer,
  Smartphone,
  Eye,
} from 'lucide-react';
import { QRType } from '../types/index.ts';

interface HelpfulGuideProps {
  onSelectType?: (type: QRType) => void;
  onNavigate?: (route: string) => void;
}

export const HelpfulGuide: React.FC<HelpfulGuideProps> = ({ onSelectType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'formats' | 'troubleshooting' | 'privacy'>('workflow');

  const scrollToGeneratorWithType = (type: QRType) => {
    if (onSelectType) {
      onSelectType(type);
    }
    const el = document.getElementById('generator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="guide" className="py-16 sm:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Complete Creator & Business Handbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            The Complete Guide to Making Perfect QR Codes
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Everything you need to know about QR generation, color styling, print specifications, error correction, and scannability best practices.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('workflow')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'workflow'
                ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-fuchsia-300" />
            <span>How to Create (Step-by-Step)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('formats')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'formats'
                ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Download className="w-4 h-4 text-cyan-300" />
            <span>Export Formats (PNG, SVG, PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('troubleshooting')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'troubleshooting'
                ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>Troubleshooting & Scannability</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Privacy & Data Handling</span>
          </button>
        </div>

        {/* Tab Content 1: Workflow */}
        {activeTab === 'workflow' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#150e2b] to-[#0d091a] p-6 sm:p-7 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center font-black font-mono mb-4 text-sm">
                  01
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">1. Choose Your QR Type</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Select the appropriate template for your payload. QR Vibe supports 15+ formats including Website Links, Plain Text, WiFi Logins, Digital vCards, WhatsApp messages, Phone calls, and PayPal/UPI payments.
                </p>
                <div className="text-[11px] text-fuchsia-300 font-medium">Tip: Use URL for websites and vCard for contact saving.</div>
              </div>

              <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#150e2b] to-[#0d091a] p-6 sm:p-7 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-black font-mono mb-4 text-sm">
                  02
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">2. Enter Data & Style</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Enter your content with instant validation. Open the Style Studio to choose from 8 aesthetic presets, customize dot matrix shapes (dots, rounded, classy, squircle), and blend vibrant two-tone gradients.
                </p>
                <div className="text-[11px] text-violet-300 font-medium">Tip: Maintain high contrast between dots and background.</div>
              </div>

              <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#150e2b] to-[#0d091a] p-6 sm:p-7 backdrop-blur-xl">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black font-mono mb-4 text-sm">
                  03
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-2">3. Download & Test Scan</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Download crisp 1024px/2048px PNG, infinite vector SVG for packaging and posters, or A4 PDF for immediate printing. Always scan the downloaded file on a real phone before mass printing.
                </p>
                <div className="text-[11px] text-cyan-300 font-medium">Tip: Test scan from 1 meter distance for posters.</div>
              </div>
            </div>

            {/* Quick Type Selection Grid */}
            <div className="rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-base font-bold text-white font-['Outfit'] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-400" />
                <span>Jump Straight into Popular QR Types:</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('link')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">Website URL</div>
                  <div className="text-[11px] text-slate-400">Landing pages & links</div>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('text')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">Plain Text</div>
                  <div className="text-[11px] text-slate-400">Offline readable notes</div>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('wifi')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">WiFi Login</div>
                  <div className="text-[11px] text-slate-400">Scan to connect</div>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('contact')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">vCard Contact</div>
                  <div className="text-[11px] text-slate-400">1-tap address book</div>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('whatsapp')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">WhatsApp Chat</div>
                  <div className="text-[11px] text-slate-400">Pre-filled chat link</div>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToGeneratorWithType('payment')}
                  className="p-3 rounded-2xl border border-violet-500/20 bg-violet-950/20 hover:bg-violet-950/40 text-left transition group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-fuchsia-300">UPI / PayPal</div>
                  <div className="text-[11px] text-slate-400">Direct instant pay</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Formats */}
        {activeTab === 'formats' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
            <div className="rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-[#0e1a2b] to-[#0a101f] p-6 sm:p-8 backdrop-blur-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold font-mono">
                PNG Bitmap
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">PNG Export (1024px & 2048px)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Standard raster bitmap format with lossless compression and optional transparent background. Ideal for digital screens, email footers, social media stories, mobile applications, and web landing pages.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Supports transparent alpha channel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Compatible with every image viewer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Ultra-HD 2048px available via quick 5s ad reward</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-fuchsia-500/25 bg-gradient-to-b from-[#240e2b] to-[#120817] p-6 sm:p-8 backdrop-blur-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold font-mono">
                SVG Vector
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Scalable Vector Graphics (SVG)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Resolution-independent mathematical vector curves. You can scale an SVG to the size of a giant commercial billboard or shrink it to a postage stamp without any pixelation or quality loss.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Infinite resolution with zero blur</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Preferred format for Adobe Illustrator / Figma</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Perfect for merchandise, packaging, and banners</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-violet-500/25 bg-gradient-to-b from-[#1b0e2b] to-[#0e0717] p-6 sm:p-8 backdrop-blur-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold font-mono">
                PDF Document
              </div>
              <h3 className="text-xl font-bold text-white font-['Outfit']">Print-Ready PDF (300 DPI)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Pre-formatted single-page document formatted for direct sending to home, office, and commercial laser printers on standard A4 or US Letter paper with clean framing and margins.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>300 DPI print calibration standard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Ready for restaurant table tents & counter displays</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>One-click export directly via Ctrl+P shortcut</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content 3: Troubleshooting */}
        {activeTab === 'troubleshooting' && (
          <div className="rounded-3xl border border-amber-500/20 bg-black/40 p-6 sm:p-8 backdrop-blur-xl space-y-6 animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>5 Reasons a QR Code Fails to Scan (and How to Fix It)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs">1</span>
                  <span>Insufficient Color Contrast</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Optical cameras read QR codes by detecting the difference between light and dark modules. If you use yellow dots on white paper or navy dots on black paper, phone cameras will struggle. QR Vibe includes an automated contrast guard that alerts you if contrast falls below WCAG safe thresholds.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs">2</span>
                  <span>Physical Print Size is Too Small</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  For handheld scanning (e.g. flyers, business cards), never print a QR code smaller than 2 × 2 cm (0.8 × 0.8 inches). For posters viewed from 1 meter, use at least 10 × 10 cm (4 × 4 inches). Follow the 10:1 scanning ratio: distance divided by 10 = minimum QR size.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs">3</span>
                  <span>Center Logo Overly Large or Dense</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  When adding a brand logo, QR Vibe automatically sets Error Correction to Level H (High), allowing up to 30% of the code to be covered. However, if the logo exceeds 30% width or lacks a clean padding margin, vital data blocks are destroyed. Always use the built-in logo margin slider.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-xs">4</span>
                  <span>Broken URLs or Expired Redirect Services</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Many commercial generators encode temporary redirect links that stop working when your subscription ends. QR Vibe static codes encode the destination URL directly into the matrix with zero middleman servers. Always double-check your destination link for typing errors before printing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Privacy */}
        {activeTab === 'privacy' && (
          <div className="rounded-3xl border border-emerald-500/20 bg-black/40 p-6 sm:p-8 backdrop-blur-xl space-y-5 animate-in fade-in duration-200">
            <h3 className="text-xl font-bold text-white font-['Outfit'] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Transparent Privacy & Local-First Processing</span>
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Local-First Generation:</strong> When you generate a Website, Text, WiFi password, or vCard contact QR code on QR Vibe, 100% of the data processing and canvas rendering happens directly inside your web browser using HTML5 Canvas. Your sensitive information is never transmitted to, logged on, or analyzed by our servers.
              </p>
              <p>
                <strong>Image QR & ImgBB Integration:</strong> If you use the Image QR tool, the selected picture is compressed client-side and then uploaded directly to ImgBB&apos;s public API so that scanners can download the photo. Please avoid uploading private or confidential documents to public image hosting.
              </p>
              <p>
                <strong>Browser Storage:</strong> Your generation history is saved strictly to your device&apos;s browser <code className="text-emerald-300 font-mono">localStorage</code>. You can star items, add private notes, or clear your entire history with one click anytime.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
