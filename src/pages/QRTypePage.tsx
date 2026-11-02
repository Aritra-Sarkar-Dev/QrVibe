/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Wifi,
  MessageCircle,
  CreditCard,
  Contact,
  Image as ImageIcon,
  Type,
  Link2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { QRGenerator } from '../components/QRGenerator.tsx';
import { Translations } from '../utils/i18n.ts';
import { QRType } from '../types/index.ts';
import { SITE_URL } from '../utils/config.ts';

interface QRTypePageProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

const QR_SEO_DATA: Record<
  string,
  {
    type: QRType;
    title: string;
    description: string;
    h1: string;
    icon: any;
    intro: string;
    steps: string[];
    tips: string[];
    relatedTypes: Array<{ slug: string; name: string }>;
    relatedBlogs: Array<{ slug: string; title: string }>;
  }
> = {
  wifi: {
    type: 'wifi',
    title: 'Free WiFi QR Code Generator – Connect Guests Instantly | QRVibe',
    description: 'Generate a free WiFi QR code for your home, office, cafe, or hotel. Guests scan with their phone camera to join secure WPA/WEP networks instantly without typing passwords.',
    h1: 'Free WiFi QR Code Generator',
    icon: Wifi,
    intro: 'Sharing your Wi-Fi password with guests or patrons can be tedious and prone to typos. A WiFi QR code streamlines this entirely. When a customer or guest points their smartphone camera at your printed QR code, their device instantly decodes the network name (SSID), security type, and password, prompting them to connect with a single tap. No more spelling out complex alphanumeric passwords or writing them on sticky notes.',
    steps: [
      'Select the WiFi QR type in the generator studio.',
      'Enter your exact wireless Network Name (SSID) as it appears in your router settings.',
      'Choose your network security protocol (WPA/WEP or nopass for open guest networks).',
      'Type your Wi-Fi password securely (computed entirely in your browser client).',
      'Customize your dot patterns, corner shapes, and brand colors, then download in high-res PNG, SVG, or print via the Business Card studio.',
    ],
    tips: [
      'Always verify encryption is set to WPA/WPA2 for optimal modern smartphone compatibility.',
      'Print your WiFi QR code on table tents or wall stickers near reception or seating areas.',
      'Test scanning with multiple devices (iOS and Android) before bulk printing.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'whatsapp', name: 'WhatsApp Chat QR' },
      { slug: 'vcard', name: 'vCard Digital Business Card' },
    ],
    relatedBlogs: [
      { slug: 'cafe-wifi-qr-code', title: 'How to Make a WiFi QR Code for a Cafe, Restaurant, or Office' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  whatsapp: {
    type: 'whatsapp',
    title: 'Free WhatsApp QR Code Generator – Direct Chat Link | QRVibe',
    description: 'Create a free WhatsApp click-to-chat QR code. Customers can scan to start an instant conversation with your business phone number with a pre-filled greeting message.',
    h1: 'Free WhatsApp QR Code Generator',
    icon: MessageCircle,
    intro: 'WhatsApp is the premier messaging channel for global commerce, customer support, and direct client engagement. A WhatsApp QR code removes friction by eliminating the need for customers to manually save your phone number before sending a message. By embedding your international phone number and an optional pre-written greeting message (such as "Hi, I would like to inquire about your menu"), users connect with your business instantly.',
    steps: [
      'Choose the WhatsApp QR option in the generator suite.',
      'Enter your full international phone number including country code (e.g., +1 for US, +44 for UK, +91 for India).',
      'Type an optional custom welcome message that will automatically populate in the user chat box.',
      'Personalize your QR code with vibrant gradients, rounded dots, and a WhatsApp logo overlay.',
      'Download your high-resolution QR code as a vector SVG or print-ready PNG file.',
    ],
    tips: [
      'Include a friendly call-to-action frame around the code like "Scan to Chat with Us on WhatsApp".',
      'Ideal for product packaging, storefront windows, business cards, and Instagram highlights.',
      'Ensure your WhatsApp Business app is configured to respond promptly to incoming scanner inquiries.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'wifi', name: 'WiFi QR Code' },
      { slug: 'payment', name: 'Payment QR Code' },
    ],
    relatedBlogs: [
      { slug: 'small-shop-payment-qr', title: 'Payment QR Codes for Small Shops, Creators & Freelancers' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  payment: {
    type: 'payment',
    title: 'Free Payment QR Code Generator – UPI, PayPal & Links | QRVibe',
    description: 'Generate free payment QR codes for UPI, PayPal.me, or custom checkout links. Accept tips, donations, and invoices seamlessly with instant scanning.',
    h1: 'Free Payment QR Code Generator',
    icon: CreditCard,
    intro: 'Digital transactions have revolutionized commerce, and payment QR codes are at the forefront. Whether you are a freelance creator accepting tips via PayPal.me, a small shop owner accepting UPI payments, or an entrepreneur linking to online checkout portals, a payment QR code ensures frictionless transactions. Customers simply open their banking or payment app, scan your code, verify the amount, and complete payment in seconds.',
    steps: [
      'Select the Payment QR type in the creator studio.',
      'Choose your preferred payment gateway (UPI Virtual Payment Address, PayPal.me username, or custom payment URL).',
      'Enter your payee ID, business name, and optional default payment amount or transaction note.',
      'Customize your QR code aesthetics with high-contrast colors and secure dot matrices.',
      'Download print-ready vector files for checkout counters, invoices, and menus.',
    ],
    tips: [
      'Always test your payment QR code with a small transaction before deploying it publicly.',
      'Laminate your printed payment QR codes to withstand liquid spills and daily wear at retail counters.',
      'Ensure high contrast between payment QR dots and background for lightning-fast camera recognition.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'whatsapp', name: 'WhatsApp Chat QR' },
      { slug: 'vcard', name: 'vCard Contact QR' },
    ],
    relatedBlogs: [
      { slug: 'small-shop-payment-qr', title: 'Payment QR Codes for Small Shops, Creators & Freelancers' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  vcard: {
    type: 'contact',
    title: 'Free vCard QR Code Generator – Digital Business Card | QRVibe',
    description: 'Create a free vCard digital business card QR code. When scanned, it saves your name, phone, email, website, and office address directly to the user smartphone contacts.',
    h1: 'Free vCard Digital Business Card QR Code',
    icon: Contact,
    intro: 'Traditional paper business cards are frequently lost, damaged, or discarded. A vCard QR code bridges physical and digital networking by instantly downloading your complete contact portfolio—including phone numbers, email addresses, job titles, company websites, and physical addresses—directly into the recipient smartphone address book with a single tap. It is the ultimate eco-friendly networking tool for modern professionals.',
    steps: [
      'Select the vCard Contact type in the QR generator.',
      'Fill in your professional details: First Name, Last Name, Organization, Job Title, and Phone numbers.',
      'Add your direct email address, website portfolio, and office location coordinates.',
      'Customize your digital business card QR style with professional gradients and logo overlays.',
      'Export in high-resolution vector SVG or PNG format to print on paper business cards or display on your smartphone screen.',
    ],
    tips: [
      'Keep your vCard information updated; static vCard QRs encode the info directly so ensure details are correct before printing thousands of cards.',
      'Add a clean corporate logo in the center of your vCard QR code for enhanced brand recall.',
      'Place your vCard QR code on the back of physical business cards for seamless digital synchronization.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'wifi', name: 'WiFi QR Code' },
      { slug: 'whatsapp', name: 'WhatsApp Chat QR' },
    ],
    relatedBlogs: [
      { slug: 'how-qr-codes-work', title: 'How QR Codes Work: Technology, Matrix Patterns & Error Correction' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  image: {
    type: 'image',
    title: 'Free Image QR Code Generator – Cloud Hosted Photo QR | QRVibe',
    description: 'Upload any photo, artwork, or poster and generate a free shareable QR code powered by secure ImgBB cloud hosting and client-side compression.',
    h1: 'Free Image QR Code Generator',
    icon: ImageIcon,
    intro: 'Transform any visual asset—such as event flyers, photography portfolios, restaurant menus, product diagrams, or digital artwork—into an interactive QR code. QRVibe securely uploads your compressed image to reliable ImgBB cloud hosting and encodes the direct public image link into a gorgeous, customized QR code. When scanned, users view your high-resolution image instantly on their phone browsers.',
    steps: [
      'Choose the Image QR type in the creation studio.',
      'Upload your image file (JPEG, PNG, WebP, or GIF) or paste a direct image URL.',
      'Our system automatically compresses your photo for lightning-fast loading while maintaining crisp visual quality.',
      'Customize your QR code aesthetics with matching color palettes and custom dot styles.',
      'Download your finished image QR code for digital sharing or physical printing.',
    ],
    tips: [
      'Ensure your uploaded image dimensions are clear and legible for mobile viewers.',
      'Great for art exhibitions, photography galleries, real estate property flyers, and restaurant specials.',
      'Use the built-in direct image URL option if your photo is already hosted on Unsplash, Imgur, or your own server.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'whatsapp', name: 'WhatsApp Chat QR' },
      { slug: 'payment', name: 'Payment QR Code' },
    ],
    relatedBlogs: [
      { slug: 'restaurant-menu-qr-code', title: 'Restaurant Menu QR Code: Best Practices for Seamless Dining' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  text: {
    type: 'text',
    title: 'Free Plain Text QR Code Generator – Instant Text Notes | QRVibe',
    description: 'Generate a free plain text QR code. Encode up to 300+ characters of secret notes, WiFi keys, poetry, serial numbers, or instructions readable without internet.',
    h1: 'Free Plain Text QR Code Generator',
    icon: Type,
    intro: 'Plain text QR codes store alphanumeric messages directly inside the barcode matrix without requiring an active internet connection. Perfect for encoding offline serial numbers, Wi-Fi configuration strings, secret notes, promotional coupon codes, or scavenger hunt clues. Anyone with a smartphone camera can scan the code to instantly read the decrypted text on their screen.',
    steps: [
      'Select the Plain Text option in the generator studio.',
      'Type or paste your desired text message (supports multi-line notes and unicode symbols).',
      'Watch the live QR preview update instantly as you type.',
      'Personalize the visual style with custom corner markers, gradients, and frames.',
      'Download your high-resolution PNG or SVG code for instant offline scanning.',
    ],
    tips: [
      'Keep text concise to prevent the QR matrix from becoming too dense for older smartphone cameras.',
      'Works 100% offline—no web server or internet connection required to read the decoded text.',
      'Ideal for product labeling, inventory tracking, and educational puzzles.',
    ],
    relatedTypes: [
      { slug: 'url', name: 'Website URL QR Code' },
      { slug: 'wifi', name: 'WiFi QR Code' },
      { slug: 'vcard', name: 'vCard Contact QR' },
    ],
    relatedBlogs: [
      { slug: 'how-qr-codes-work', title: 'How QR Codes Work: Technology, Matrix Patterns & Error Correction' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
  url: {
    type: 'link',
    title: 'Free Website URL QR Code Generator – Link to Any Page | QRVibe',
    description: 'Create a free website URL QR code for landing pages, portfolios, social links, or online stores. Fully scannable with built-in contrast and quiet zone verification.',
    h1: 'Free Website URL QR Code Generator',
    icon: Link2,
    intro: 'Website URLs are the most widely used type of QR code in the world. Whether you are directing visitors to your e-commerce storefront, portfolio website, YouTube channel, podcast, or booking calendar, a website URL QR code bridges the gap between offline print media and online digital destinations. QRVibe automatically validates your link and ensures optimal error correction and scannability.',
    steps: [
      'Select the Website Link type in the creator studio.',
      'Enter your destination URL (e.g. https://yourdomain.com). HTTPS protocol is automatically added if omitted.',
      'Customize your QR code appearance using our trendy presets or custom color pickers.',
      'Verify the live self-test scan status badge below the preview.',
      'Download your print-ready PNG, SVG, or PDF file.',
    ],
    tips: [
      'Always use secure HTTPS links for professional credibility and seamless mobile browser loading.',
      'Track scan performance by appending UTM analytics parameters to your destination URL.',
      'Ensure adequate contrast between your QR dots and background for lightning-fast autofocus recognition.',
    ],
    relatedTypes: [
      { slug: 'wifi', name: 'WiFi QR Code' },
      { slug: 'whatsapp', name: 'WhatsApp Chat QR' },
      { slug: 'vcard', name: 'vCard Contact QR' },
    ],
    relatedBlogs: [
      { slug: 'restaurant-menu-qr-code', title: 'Restaurant Menu QR Code: Best Practices for Seamless Dining' },
      { slug: 'qr-code-best-practices', title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability' },
    ],
  },
};

export const QRTypePage: React.FC<QRTypePageProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const { typeSlug } = useParams<{ typeSlug: string }>();
  const navigate = useNavigate();

  const seoData = QR_SEO_DATA[typeSlug || 'url'] || QR_SEO_DATA['url'];
  const IconComponent = seoData.icon;
  const canonicalUrl = `${SITE_URL}/qr/${typeSlug || 'url'}`;

  // Structured Data JSON-LD (BreadcrumbList & HowTo)
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'QR Types', item: `${SITE_URL}/#guide` },
          { '@type': 'ListItem', position: 3, name: seoData.h1, item: canonicalUrl },
        ],
      },
      {
        '@type': 'HowTo',
        name: `How to create a ${seoData.h1}`,
        description: seoData.description,
        step: seoData.steps.map((stepText, idx) => ({
          '@type': 'HowToStep',
          position: idx + 1,
          name: `Step ${idx + 1}`,
          text: stepText,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:site_name" content="QRVibe" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Visible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-400">QR Types</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">{seoData.h1}</span>
        </nav>

        {/* Back Button */}
        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition"
            aria-label="Back to All Generators"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to All Generators</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <IconComponent className="w-4 h-4 text-fuchsia-400" aria-hidden="true" />
            <span className="capitalize">{seoData.type} QR Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white">
            {seoData.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {seoData.description}
          </p>
        </div>

        {/* Functional Generator Component Preloaded */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <QRGenerator
            t={t}
            currentLang={currentLang}
            onOpenBulkModal={onOpenBulkModal}
            onOpenWatchAdModal={onOpenWatchAdModal}
            onOpenProModal={onOpenProModal}
            isHdUnlocked={isHdUnlocked}
            onHistoryUpdated={onHistoryUpdated}
            initialType={seoData.type}
          />
        </div>

        {/* SEO Educational Content Section (300-400 words) */}
        <div className="max-w-4xl mx-auto bg-violet-950/20 border border-violet-500/30 rounded-3xl p-8 sm:p-10 space-y-8 backdrop-blur-md">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-['Outfit'] text-white flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-fuchsia-400" aria-hidden="true" />
              <span>What is a {seoData.h1}?</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {seoData.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Step-by-Step Guide */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-fuchsia-300 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                <span>How to Create Step-by-Step</span>
              </h3>
              <ul className="space-y-3">
                {seoData.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Tips */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                <span>Pro Scannability Tips</span>
              </h3>
              <ul className="space-y-3">
                {seoData.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related QR Types & Related Blog Guides (Internal Linking) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-violet-950/35 border border-violet-500/30 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit']">Related QR Generators</h4>
            <div className="flex flex-wrap gap-2">
              {seoData.relatedTypes.map((rt) => (
                <Link
                  key={rt.slug}
                  to={`/qr/${rt.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-500 text-xs font-semibold text-fuchsia-300 transition"
                >
                  {rt.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-violet-950/35 border border-violet-500/30 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>Related Guides</span>
            </h4>
            <div className="space-y-2">
              {seoData.relatedBlogs.map((rb) => (
                <Link
                  key={rb.slug}
                  to={`/blog/${rb.slug}`}
                  className="block text-xs font-semibold text-cyan-300 hover:underline line-clamp-1"
                >
                  {rb.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
