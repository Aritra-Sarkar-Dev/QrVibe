/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, ChevronRight, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';
import { SITE_URL } from '../utils/config.ts';

interface GalleryPageProps {
  t: Translations;
  currentLang: string;
}

const GALLERY_ITEMS = [
  { file: 'wifi-qr-code-cafe-gradient.svg', category: 'WiFi', title: 'WiFi QR code with purple gradient for a cafe', caption: 'Scannable WiFi QR code designed for cafe tables with custom gradient.' },
  { file: 'wifi-qr-code-office-dark.svg', category: 'WiFi', title: 'Dark mode office WiFi QR code', caption: 'Professional dark aesthetic Wi-Fi QR code for corporate reception.' },
  { file: 'wifi-qr-code-hotel-modern.svg', category: 'WiFi', title: 'Modern hotel guest WiFi QR code', caption: 'Sleek guest network QR code for hotel rooms and lobbies.' },
  { file: 'whatsapp-qr-code-green-rounded.svg', category: 'WhatsApp', title: 'WhatsApp chat QR code with green rounded dots', caption: 'Instant WhatsApp click-to-chat QR code for customer support.' },
  { file: 'whatsapp-qr-code-chat-cyan.svg', category: 'WhatsApp', title: 'Cyan WhatsApp direct message QR code', caption: 'Direct messaging QR code for online store inquiries.' },
  { file: 'whatsapp-qr-code-business-violet.svg', category: 'WhatsApp', title: 'Violet branded WhatsApp business QR code', caption: 'Custom branded WhatsApp contact QR code.' },
  { file: 'payment-qr-code-upi-emerald.svg', category: 'Payment', title: 'Emerald UPI payment QR code for retail checkout', caption: 'Instant UPI and digital payment QR code for small shops.' },
  { file: 'payment-qr-code-paypal-blue.svg', category: 'Payment', title: 'PayPal payment link QR code', caption: 'Freelancer tip jar and payment checkout QR code.' },
  { file: 'payment-qr-code-counter-dark.svg', category: 'Payment', title: 'Dark aesthetic counter payment QR code', caption: 'Laminated checkout counter payment QR code.' },
  { file: 'vcard-qr-code-business-card-classic.svg', category: 'vCard', title: 'Classic vCard digital business card QR code', caption: 'Contactless vCard QR code for professional networking.' },
  { file: 'vcard-qr-code-executive-gradient.svg', category: 'vCard', title: 'Executive digital business card QR', caption: 'High-end corporate vCard QR code for executives.' },
  { file: 'vcard-qr-code-minimalist-white.svg', category: 'vCard', title: 'Minimalist white vCard contact QR code', caption: 'Clean minimalist contact details QR code.' },
  { file: 'url-qr-code-website-landing-neon.svg', category: 'URL', title: 'Neon website landing page URL QR code', caption: 'High-visibility website URL QR code for advertising.' },
  { file: 'url-qr-code-portfolio-violet.svg', category: 'URL', title: 'Portfolio website QR code with violet gradient', caption: 'Creative designer portfolio QR code.' },
  { file: 'url-qr-code-storefront-cyan.svg', category: 'URL', title: 'E-commerce storefront URL QR code', caption: 'Online shop direct link QR code.' },
  { file: 'image-qr-code-menu-restaurant.svg', category: 'Image', title: 'Restaurant menu image QR code', caption: 'Contactless digital menu QR code for dining tables.' },
  { file: 'image-qr-code-flyer-event.svg', category: 'Image', title: 'Event flyer image QR code', caption: 'Promotional event poster and flyer QR code.' },
  { file: 'image-qr-code-portfolio-gallery.svg', category: 'Image', title: 'Photography portfolio gallery QR code', caption: 'Visual gallery QR code for art exhibitions.' },
  { file: 'text-qr-code-secret-notes.svg', category: 'Text', title: 'Plain text secret notes QR code', caption: 'Offline alphanumeric text message QR code.' },
  { file: 'text-qr-code-serial-number.svg', category: 'Text', title: 'Product serial number QR code', caption: 'Inventory tracking and serial code QR matrix.' },
  { file: 'email-qr-code-inquiry-contact.svg', category: 'Email', title: 'Email mailto inquiry QR code', caption: 'Pre-filled customer support email QR code.' },
  { file: 'sms-qr-code-support-chat.svg', category: 'SMS', title: 'SMS text message support QR code', caption: 'Instant SMS text message trigger QR code.' },
  { file: 'location-qr-code-store-map.svg', category: 'Location', title: 'GPS store location map QR code', caption: 'Google Maps navigation location QR code.' },
  { file: 'calendar-qr-code-event-invite.svg', category: 'Event', title: 'Calendar event invite QR code', caption: 'Save-the-date calendar appointment QR code.' },
  { file: 'instagram-qr-code-profile-gradient.svg', category: 'Social', title: 'Instagram profile QR code with vibrant gradient', caption: 'Social media growth QR code for Instagram handle.' },
  { file: 'youtube-qr-code-channel-red.svg', category: 'Social', title: 'YouTube channel subscribe QR code', caption: 'Video channel subscription QR code.' },
  { file: 'restaurant-menu-qr-table-tent.svg', category: 'Use Case', title: 'Restaurant menu table tent QR code', caption: 'Dine-in menu QR code for restaurant tables.' },
  { file: 'cafe-wifi-qr-wall-sticker.svg', category: 'Use Case', title: 'Cafe WiFi wall sticker QR code', caption: 'Wall-mounted guest Wi-Fi QR code for coffee shops.' },
  { file: 'business-card-qr-back-print.svg', category: 'Use Case', title: 'Back print business card vCard QR code', caption: 'Physical business card reverse side QR code.' },
  { file: 'social-media-qr-hub-neon.svg', category: 'Use Case', title: 'Neon social media link-in-bio QR code', caption: 'All-in-one social media hub QR code.' }
];

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const canonicalUrl = `${SITE_URL}/qr-code-examples`;
  const pageTitle = 'QR Code Examples Gallery – 30+ Scannable Styles & Designs | QRVibe';
  const pageDesc = 'Explore 30+ high-contrast, scannable QR code design examples for WiFi, WhatsApp, restaurant menus, business cards, and social media. Free high-res PNG and SVG templates.';

  const categories = ['All', 'WiFi', 'WhatsApp', 'Payment', 'vCard', 'URL', 'Image', 'Text', 'Social', 'Use Case'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: pageTitle,
    description: pageDesc,
    url: canonicalUrl,
    image: GALLERY_ITEMS.map(item => `${SITE_URL}/images/qr-examples/${item.file}`),
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium">QR Code Examples Gallery</span>
        </nav>

        <div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to Generator Studio</span>
          </button>
        </div>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <ImageIcon className="w-4 h-4 text-fuchsia-400" />
            <span>Visual Design Gallery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            30+ Scannable QR Code Design Examples
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {pageDesc}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <figure
              key={item.file}
              className="rounded-2xl border border-violet-500/20 bg-[#120d24]/90 p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl group hover:border-fuchsia-500/50 transition"
            >
              <div className="aspect-square w-full rounded-xl bg-black/50 border border-white/10 p-3 flex items-center justify-center relative overflow-hidden">
                <img
                  src={`/images/qr-examples/${item.file}`}
                  alt={item.title}
                  width={512}
                  height={512}
                  loading={idx < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-bold text-fuchsia-300 border border-white/10">
                  {item.category}
                </span>
              </div>
              <figcaption className="mt-4 space-y-2">
                <h3 className="text-sm font-bold text-white font-['Outfit'] line-clamp-1">{item.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.caption}</p>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-xs font-semibold text-fuchsia-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Create this style</span>
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};
