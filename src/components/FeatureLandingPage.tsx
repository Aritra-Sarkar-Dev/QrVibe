import React from 'react';
import {
  Type,
  Link2,
  Contact,
  Wifi,
  Mail,
  Phone,
  Palette,
  Home,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { QRType, HistoryItem, PresetName } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import { QRGenerator } from './QRGenerator.tsx';

export type FeaturePageId =
  | 'text-to-qr'
  | 'url-to-qr'
  | 'contact-qr'
  | 'wifi-qr'
  | 'email-qr'
  | 'phone-qr'
  | 'custom-qr';

interface FeatureLandingPageProps {
  featureId: FeaturePageId;
  onNavigate: (route: string) => void;
  t: Translations;
  currentLang: any;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
  reopenItem: HistoryItem | null;
  heroPreset: PresetName | null;
}

interface FeatureMeta {
  title: string;
  h1: string;
  subtitle: string;
  qrType: QRType;
  description: string;
  benefits: string[];
  tips: string[];
  faqs: { q: string; a: string }[];
  related: { id: FeaturePageId; label: string }[];
}

export const FEATURE_PAGES_DATA: Record<FeaturePageId, FeatureMeta> = {
  'text-to-qr': {
    title: 'Text to QR Code Generator – Convert Plain Text to QR Online | QR Vibe',
    h1: 'Text to QR Code Generator',
    subtitle: 'Convert plain text, notes, passwords, and serial numbers into scannable QR codes that work 100% offline.',
    qrType: 'text',
    description:
      'A Text QR code directly embeds characters into the matrix barcode. When someone scans it with any smartphone camera, the exact text displays on their screen instantly—no internet connection, browser redirect, or mobile data required.',
    benefits: [
      'Works 100% offline without cellular data or WiFi',
      'No URL redirects or link expiration risks',
      'Perfect for product serial numbers, notes, and instructions',
      'Customizable with gradients, dot styles, and center icons',
    ],
    tips: [
      'Keep text concise (under 300 characters) for faster scanning on older phone cameras.',
      'Always test contrast when using custom colored dots against dark backgrounds.',
      'Export in vector SVG format if you intend to print on physical product packaging.',
    ],
    faqs: [
      {
        q: 'Do text QR codes require an internet connection to scan?',
        a: 'No. Because the raw text is stored directly inside the black-and-white modules of the QR code, smartphones decode and display the text locally on-device without accessing the web.',
      },
      {
        q: 'What is the character limit for a text QR code?',
        a: 'Technically, QR Version 40 can store up to 7,089 numeric or 4,296 alphanumeric characters. However, for reliable scanning on smartphone cameras, we recommend keeping text under 300 characters.',
      },
      {
        q: 'Can I customize the colors of my text QR code?',
        a: 'Yes! You can choose custom dot patterns, corner squares, two-tone gradients, or upload your emblem in the Style tab.',
      },
    ],
    related: [
      { id: 'url-to-qr', label: 'URL to QR Code' },
      { id: 'wifi-qr', label: 'WiFi QR Code' },
      { id: 'custom-qr', label: 'Custom Color QR Studio' },
    ],
  },
  'url-to-qr': {
    title: 'URL to QR Code Generator – Create Website Link QR Codes Free | QR Vibe',
    h1: 'URL to QR Code Generator',
    subtitle: 'Generate scannable QR codes for websites, landing pages, menus, blogs, and social profiles.',
    qrType: 'link',
    description:
      'Create high-resolution, branded QR codes that direct customers straight to your website, online restaurant menu, booking page, or social profiles with a single camera scan.',
    benefits: [
      'Direct link encoding with zero intermediary redirect ads',
      'Instant mobile phone camera detection and browser opening',
      'Supports high-res PNG, vector SVG, and printable 300 DPI PDF',
      'Overlay your brand logo or website favicon in the center',
    ],
    tips: [
      'Include the full protocol (https://) for instant browser launching.',
      'Shorter URLs create cleaner, less dense QR matrices that scan from greater distances.',
      'Always test your link to ensure there are no 404 errors or typos before printing.',
    ],
    faqs: [
      {
        q: 'Will my website QR code ever expire?',
        a: 'Never. QR Vibe generates static QR codes where your website URL is baked directly into the graphic. As long as your website exists, the QR code will work forever.',
      },
      {
        q: 'Can I add my business logo to the center of the QR code?',
        a: 'Yes. In the Style tab, open Center Logo to upload your brand mark. Error correction automatically scales to Level H (High) so scans remain reliable.',
      },
      {
        q: 'What is the best format for restaurant menus?',
        a: 'Download vector SVG for acrylic table stands or use the Print PDF button for instant laminated table cards.',
      },
    ],
    related: [
      { id: 'custom-qr', label: 'Gradient & Color Customizer' },
      { id: 'contact-qr', label: 'vCard Business Contact' },
      { id: 'text-to-qr', label: 'Plain Text QR' },
    ],
  },
  'contact-qr': {
    title: 'Contact QR Code Generator – Free vCard 3.0 Digital Business Card | QR Vibe',
    h1: 'vCard Contact QR Code Generator',
    subtitle: 'Share your name, phone number, email, company, and website as an instant downloadable address book card.',
    qrType: 'contact',
    description:
      'Standard vCard 3.0 digital business card generator. When people scan your card, their phone prompts them with "Save to Contacts" with all your info pre-filled.',
    benefits: [
      'Universal vCard 3.0 format supported on iPhone iOS & Android',
      'Saves name, phone, email, organization, job title, and website',
      'Eliminates manual contact typing and spelling mistakes',
      'Ideal for business cards, resumes, email signatures, and conference badges',
    ],
    tips: [
      'Only include essential fields to keep the QR pattern clean and fast-scanning.',
      'Print on standard business cards at a minimum size of 2.5 × 2.5 cm (1 × 1 inch).',
      'Test scanning on both iPhone Contacts and Google Contacts.',
    ],
    faqs: [
      {
        q: 'How does a vCard QR code save to a smartphone?',
        a: 'When scanned with the default camera app, the phone recognizes the standard vCard payload and opens a native prompt to "Add to Contacts".',
      },
      {
        q: 'Do vCard QR codes require an app to be downloaded?',
        a: 'No. All modern iOS and Android cameras have built-in vCard contact parsing.',
      },
    ],
    related: [
      { id: 'phone-qr', label: 'Phone Number QR' },
      { id: 'email-qr', label: 'Email mailto QR' },
      { id: 'url-to-qr', label: 'Website Link QR' },
    ],
  },
  'wifi-qr': {
    title: 'WiFi QR Code Generator – Connect to WiFi Without Typing Passwords | QR Vibe',
    h1: 'WiFi QR Code Generator',
    subtitle: 'Allow guests, customers, and team members to join your WiFi network with one simple camera scan.',
    qrType: 'wifi',
    description:
      'Generate secure standard WIFI:T:WPA;S:...;P:...;; barcodes. Guests simply point their camera at the code and tap "Join Network"—no more spelling long complex passwords aloud.',
    benefits: [
      'Eliminates typing long, complex WiFi passwords',
      'Supports WPA/WPA2/WPA3, WEP, and Unencrypted open networks',
      'Supports hidden network SSID configuration',
      '100% private: WiFi passwords are never transmitted to our servers',
    ],
    tips: [
      'SSID names and passwords are case-sensitive—check your router settings accurately.',
      'Place laminated WiFi QR codes on cafe tables, guest bedrooms, and office receptions.',
      'Ensure the print is kept clean and free from coffee or grease stains.',
    ],
    faqs: [
      {
        q: 'Is it safe to generate a WiFi QR code on QR Vibe?',
        a: 'Yes, 100% safe. QR Vibe processes everything client-side in your browser. Your WiFi SSID and password are never sent across the network.',
      },
      {
        q: 'How do guests scan to connect to WiFi?',
        a: 'On iPhone or Android, guests simply open the default Camera app, point it at the code, and tap the yellow "Join Network" banner that appears.',
      },
    ],
    related: [
      { id: 'url-to-qr', label: 'Website Link QR' },
      { id: 'text-to-qr', label: 'Plain Text QR' },
      { id: 'custom-qr', label: 'Brand Color Customizer' },
    ],
  },
  'email-qr': {
    title: 'Email QR Code Generator – Pre-fill Mailto Subject & Body | QR Vibe',
    h1: 'Email QR Code Generator',
    subtitle: 'Generate mailto QR codes that open a pre-filled email draft with recipient, subject, and message.',
    qrType: 'email',
    description:
      'Make customer feedback, support inquiries, and lead inquiries effortless. When scanned, the user’s default mail app opens with your support address and subject line already drafted.',
    benefits: [
      'Pre-fills recipient email address, subject line, and body text',
      'Works with Apple Mail, Gmail, Outlook, and all default email clients',
      'Great for product feedback labels, warranty claims, and RSVP responses',
      'Zero spam bots scraping your email as plain web text',
    ],
    tips: [
      'Keep subject lines concise to prevent unnecessary matrix complexity.',
      'Provide a short greeting or prompt in the body so the sender only has to fill in their details.',
    ],
    faqs: [
      {
        q: 'Which email client will open when scanned?',
        a: 'The scanner’s smartphone will automatically open whichever email app is configured as their device default (such as Apple Mail, Gmail, or Outlook).',
      },
    ],
    related: [
      { id: 'contact-qr', label: 'vCard Business Contact' },
      { id: 'phone-qr', label: 'Phone Call QR' },
      { id: 'url-to-qr', label: 'Website Link QR' },
    ],
  },
  'phone-qr': {
    title: 'Phone Number QR Code Generator – Instant Call Dialing | QR Vibe',
    h1: 'Phone Number QR Code Generator',
    subtitle: 'Generate tel: QR codes that let customers call your business with a single tap.',
    qrType: 'phone',
    description:
      'Encode your business hotline or customer service phone number into a scannable code. One camera scan loads your number directly into the phone keypad ready to call.',
    benefits: [
      '1-tap dialing without mistyped phone digits',
      'Ideal for store windows, taxi services, emergency helplines, and flyers',
      'Includes international country code formatting support',
      'Works on all mobile devices with a dialer',
    ],
    tips: [
      'Always include the international country code prefix (e.g. +1 for US/Canada, +44 for UK, +91 for India).',
      'Do not include spaces, dashes, or parentheses in the raw phone number payload.',
    ],
    faqs: [
      {
        q: 'Will the QR code place the phone call automatically without asking?',
        a: 'No, smartphone operating systems prompt the user to confirm the call first for security and privacy.',
      },
    ],
    related: [
      { id: 'contact-qr', label: 'Full vCard Contact' },
      { id: 'email-qr', label: 'Email QR' },
      { id: 'url-to-qr', label: 'Website Link QR' },
    ],
  },
  'custom-qr': {
    title: 'Custom Color & Gradient QR Code Generator – Aesthetic QR Studio | QR Vibe',
    h1: 'Custom Color & Gradient QR Code Studio',
    subtitle: 'Design aesthetic QR codes that match your brand with custom colors, gradients, dot styles, and logos.',
    qrType: 'link',
    description:
      'Ditch harsh, boring black-and-white barcodes. QR Vibe lets you customize every element: dot matrix shapes, corner squircle finders, vibrant linear gradients, and custom center logo emblems.',
    benefits: [
      '8 Curated aesthetic presets (Neon, Cyberpunk, Sunset, Mint, Pastel, Glass)',
      'Custom dot patterns: dots, rounded, classy, squircle, and extra-rounded',
      'Two-tone linear gradients with custom color stops',
      'Automated WCAG contrast guard prevents unreadable color combinations',
    ],
    tips: [
      'Always ensure dark dots against light backgrounds or verify contrast with the built-in scanner guard.',
      'Use 2048px Ultra-HD or SVG vector export for large scale high-end printing.',
      'Keep center logo padding clean so edge dots remain crisp.',
    ],
    faqs: [
      {
        q: 'Can custom colored and gradient QR codes be scanned reliably?',
        a: 'Yes! As long as sufficient luminance contrast exists between the pattern and background, modern optical cameras scan gradient QR codes just as quickly as standard black-and-white ones.',
      },
      {
        q: 'What does the contrast warning badge mean?',
        a: 'QR Vibe automatically calculates the color contrast ratio. If contrast is under safe threshold, a warning badge alerts you before downloading.',
      },
    ],
    related: [
      { id: 'url-to-qr', label: 'Website Link QR' },
      { id: 'text-to-qr', label: 'Plain Text QR' },
      { id: 'wifi-qr', label: 'WiFi QR Code' },
    ],
  },
};

export const FeatureLandingPage: React.FC<FeatureLandingPageProps> = ({
  featureId,
  onNavigate,
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
  reopenItem,
  heroPreset,
}) => {
  const meta = FEATURE_PAGES_DATA[featureId] || FEATURE_PAGES_DATA['url-to-qr'];

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-white flex items-center gap-1 transition"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-white transition"
        >
          Tools
        </button>
        <span>/</span>
        <span className="text-fuchsia-400 font-semibold">{meta.h1}</span>
      </nav>

      {/* Hero Header for this Feature */}
      <header className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold border border-violet-500/30">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Specialized Free QR Utility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight">
          {meta.h1}
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          {meta.subtitle}
        </p>
      </header>

      {/* Interactive Generator Embedded Directly with Pre-selected Type */}
      <section aria-label="Interactive QR Generator" className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Live Interactive Studio (Pre-configured for {meta.h1})
          </span>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>View All 15 Formats</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <QRGenerator
          t={t}
          currentLang={currentLang}
          onOpenBulkModal={onOpenBulkModal}
          onOpenWatchAdModal={onOpenWatchAdModal}
          onOpenProModal={onOpenProModal}
          isHdUnlocked={isHdUnlocked}
          onHistoryUpdated={onHistoryUpdated}
          reopenItem={reopenItem}
          onPresetSelectedFromHero={heroPreset}
          initialType={meta.qrType}
        />
      </section>

      {/* Deep Explanatory Content & Use Cases */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/10">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-white font-['Outfit']">
            How This QR Code Works
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {meta.description}
          </p>

          <div className="rounded-2xl border border-violet-500/25 bg-black/40 p-6 space-y-3">
            <h3 className="text-base font-bold text-white font-['Outfit']">
              Key Benefits & Capabilities
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {meta.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-500/25 bg-amber-950/15 p-6 space-y-3">
            <h3 className="text-base font-bold text-amber-300 font-['Outfit']">
              Best Practices for Scannability
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {meta.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feature-specific FAQ and Related Tools */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#120d24] p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-fuchsia-400" />
              <span>Questions About This Tool</span>
            </h3>
            <div className="space-y-4">
              {meta.faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1.5 pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-white">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 space-y-3">
            <h3 className="text-sm font-bold text-white font-['Outfit'] uppercase tracking-wider text-slate-400">
              Related Generator Tools:
            </h3>
            <div className="flex flex-col gap-2">
              {meta.related.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition text-left"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
