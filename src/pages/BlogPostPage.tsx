/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from './BlogIndexPage.tsx';
import { SITE_URL } from '../utils/config.ts';

const ARTICLE_CONTENTS: Record<string, { title: string; subtitle: string; content: React.ReactNode }> = {
  'how-qr-codes-work': {
    title: 'How QR Codes Work: Technology, Matrix Patterns & Error Correction',
    subtitle: 'An exhaustive engineering breakdown of the anatomy of Quick Response codes, Reed-Solomon algorithms, and matrix optics.',
    content: (
      <>
        <p>
          Quick Response (QR) codes have become an invisible infrastructure of modern commerce. From boarding passes and restaurant menus to cryptocurrency transfers and Wi-Fi pairing, we encounter them dozens of times a day. But beneath their deceptively simple arrangement of black and white squares lies a masterclass in optical data storage and error resilience.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">The Anatomy of a QR Code Matrix</h2>
        <p>
          Unlike traditional 1D barcodes that store information along a single horizontal axis (limiting capacity to around 20-25 characters), QR codes are two-dimensional matrix symbols capable of encoding thousands of characters of alphanumeric data, binary byte streams, or Kanji characters.
        </p>
        <p className="mt-4">
          Every standard QR code contains several critical anchor structures:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-300">
          <li><strong>Finder Patterns:</strong> The three large square bullseyes located at the top-left, top-right, and bottom-left corners. These allow smartphone cameras to instantly detect the presence, orientation, and perspective skew of the QR code regardless of the scanning angle.</li>
          <li><strong>Alignment Patterns:</strong> Smaller concentric squares located near the bottom-right corner. In larger QR versions, these ensure that warped or curved surfaces (like soda cans or cylindrical bottles) can still be mathematically corrected and decoded.</li>
          <li><strong>Timing Patterns:</strong> Alternating black and white module rows running horizontally and vertically between the finder patterns, allowing the decoder to establish the grid coordinate matrix size.</li>
          <li><strong>Quiet Zone:</strong> The critical 4-module wide white margin surrounding the entire symbol. Without this blank border, optical scanners cannot distinguish the code from surrounding background imagery.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Reed-Solomon Error Correction Explained</h2>
        <p>
          One of the most genius innovations built into the QR code standard (ISO/IEC 18004) is its robust error correction capability. Using advanced Reed-Solomon polynomial error correction mathematics, QR codes can remain 100% readable even when scratched, stained, or partially obscured by center brand logos.
        </p>
        <p className="mt-4">
          There are four distinct error correction levels available in QR generation:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-300">
          <li><strong>Level L (Low):</strong> Recovers approx. 7% of damaged data.</li>
          <li><strong>Level M (Medium):</strong> Recovers approx. 15% of damaged data (industry standard for clean text and URLs).</li>
          <li><strong>Level Q (Quartile):</strong> Recovers approx. 25% of damaged data.</li>
          <li><strong>Level H (High):</strong> Recovers approx. 30% of damaged data. Essential when embedding center logo overlays or publishing in industrial environments.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Conclusion & Best Practices</h2>
        <p>
          Understanding how QR codes work empowers creators and businesses to design custom, aesthetic codes without sacrificing reliability. By maintaining high color contrast, adequate quiet zones, and appropriate error correction levels, your audience enjoys instant, frictionless scanning every single time.
        </p>
      </>
    ),
  },
  'cafe-wifi-qr-code': {
    title: 'How to Make a WiFi QR Code for a Cafe, Restaurant, or Office',
    subtitle: 'Eliminate password typos, improve customer satisfaction, and secure your wireless network with a custom WiFi QR code.',
    content: (
      <>
        <p>
          In hospitality, retail, and modern office spaces, providing fast and reliable internet access is no longer a luxury—it is an absolute expectation. However, asking patrons to type out a 24-character alphanumeric Wi-Fi password containing uppercase letters, numbers, and symbols is a recipe for frustration and bottlenecked queues.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Why Every Business Needs a WiFi QR Code</h2>
        <p>
          When you place a neatly designed WiFi QR code on cafe tables, reception desks, or conference room walls, guests simply open their smartphone camera, tap the on-screen prompt, and connect to the network instantly. There is zero friction, zero staff interruption, and zero miscommunicated passwords.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">The Standard WIFI: Payload Format</h2>
        <p>
          Behind the scenes, a Wi-Fi QR code encodes a standardized plaintext string defined by the Wi-Fi Alliance and ZXing specifications. The format follows this precise syntax:
        </p>
        <div className="bg-black/60 p-4 rounded-xl font-mono text-xs text-fuchsia-300 my-4 border border-violet-500/30">
          WIFI:T:WPA;S:MyCoffeeShop_Guest;P:secure_password123;H:false;;
        </div>
        <p>
          Where <code>T</code> represents the encryption type (WPA, WEP, or nopass), <code>S</code> is the SSID network name, <code>P</code> is the password, and <code>H</code> indicates whether the network is hidden.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Step-by-Step Implementation Guide</h2>
        <ol className="list-decimal pl-6 space-y-3 mt-3 text-slate-300">
          <li><strong>Gather Network Credentials:</strong> Confirm your exact router SSID and wireless password.</li>
          <li><strong>Use QRVibe Creator Studio:</strong> Navigate to the WiFi generator tool.</li>
          <li><strong>Customize Brand Aesthetics:</strong> Match your cafe color palette, apply rounded dots, and upload your cafe logo in the center.</li>
          <li><strong>Test Before Printing:</strong> Scan the code with both iPhone and Android devices to verify automatic connection.</li>
          <li><strong>Laminate Table Tents:</strong> Print and laminate your cards to withstand coffee spills and daily cleaning.</li>
        </ol>
      </>
    ),
  },
  'restaurant-menu-qr-code': {
    title: 'Restaurant Menu QR Code: Best Practices for Seamless Dining',
    subtitle: 'Discover how QR code menus elevate guest experiences, reduce printing overhead, and update culinary offerings in real-time.',
    content: (
      <>
        <p>
          The contactless dining revolution transformed restaurant menus forever. Paper menus are costly to reprint whenever prices fluctuate or daily specials change. Digital QR code menus allow restaurant owners to update dishes, wines, and allergen information instantly while delivering a sleek, modern touch to the dining experience.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Designing Scannable Table Tents</h2>
        <p>
          A menu QR code is only as good as its placement and physical design. If table lighting is dim or table tents are too small, diners will struggle to scan the code, leading to frustration before they even order.
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-300">
          <li><strong>Minimum Physical Size:</strong> Print your table tent QR codes at least 2 inches by 2 inches (5cm x 5cm) so phone cameras can autofocus effortlessly from a distance.</li>
          <li><strong>Clear Call to Action:</strong> Always accompany the QR code with clear instructions, such as &ldquo;Scan to View Interactive Menu & Wine List&rdquo;.</li>
          <li><strong>High-Speed Hosting:</strong> Ensure your digital menu PDF or landing page loads in under 2 seconds on mobile 4G/5G networks.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Dynamic Updates & Analytics</h2>
        <p>
          By linking your restaurant menu QR code to a stable web URL, you can update your seasonal lunch specials or cocktail menus on the fly without ever needing to reprint physical table markers.
        </p>
      </>
    ),
  },
  'small-shop-payment-qr': {
    title: 'Payment QR Codes for Small Shops, Creators & Freelancers',
    subtitle: 'Accept instant mobile payments without expensive card swipers or POS lease fees using secure payment QR codes.',
    content: (
      <>
        <p>
          For boutique retailers, weekend market vendors, independent artists, and mobile service providers, traditional credit card terminals often carry steep monthly rental fees and high per-transaction commissions. Payment QR codes offer an ultra-low-cost, frictionless alternative.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">How Payment QRs Work</h2>
        <p>
          A payment QR code encodes your merchant payment handle (such as a UPI VPA ID, PayPal.me link, or custom checkout gateway). When a buyer scans the code with their banking app, the payee ID and optional invoice amount are auto-populated. The customer simply authenticates with FaceID or their PIN, and funds transfer immediately into your merchant account.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">Best Practices for Retail Checkout Counters</h2>
        <ul className="list-disc pl-6 space-y-2 mt-3 text-slate-300">
          <li>Mount your payment counter stand at eye level near the cash register.</li>
          <li>Use matte lamination to eliminate overhead glare from store lighting.</li>
          <li>Include your business legal name clearly below the QR code so customers have 100% confidence before sending funds.</li>
        </ul>
      </>
    ),
  },
  'qr-code-best-practices': {
    title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability',
    subtitle: 'Master the technical rules of optical scannability to ensure 100% read rates across all iOS and Android camera sensors.',
    content: (
      <>
        <p>
          Have you ever generated a gorgeous QR code only to find that some phones refuse to scan it? Optical scannability is governed by strict mathematical and physical optics rules. Violating these principles results in broken, frustrating user experiences.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">1. Contrast is King</h2>
        <p>
          QR code scanners rely on sharp luminance contrast between the dark matrix modules and the light background. Always maintain a WCAG contrast ratio of at least 4:1. Avoid light gray dots on white backgrounds or inverted light-on-dark color schemes, as many older camera firmware struggle to decode inverted matrices.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">2. Respect the Quiet Zone</h2>
        <p>
          The quiet zone is the blank margin surrounding the QR code. It must be at least 4 modules wide on all four sides. Placing graphic borders, text, or background textures too close to the QR dots will blind optical decoders.
        </p>

        <h2 className="text-2xl font-bold text-white font-['Outfit'] mt-8 mb-4">3. Center Logo Constraints</h2>
        <p>
          When adding brand logos to the center of your QR code, keep the logo size under 20% of the total symbol area and ensure high error correction level (Level H) is enabled. QRVibe automates this safety check for you.
        </p>
      </>
    ),
  },
};

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = ARTICLE_CONTENTS[slug || 'how-qr-codes-work'] || ARTICLE_CONTENTS['how-qr-codes-work'];
  const postMeta = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];
  const canonicalUrl = `${SITE_URL}/blog/${slug || 'how-qr-codes-work'}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Valid JSON-LD BlogPosting schema (no personal email, no fake ratings)
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.subtitle,
    image: `${SITE_URL}/og-image.png`,
    datePublished: '2026-10-24T09:00:00+00:00',
    dateModified: '2026-11-01T12:00:00+00:00',
    author: {
      '@type': 'Organization',
      name: 'QRVibe Editorial Team',
      url: `${SITE_URL}/contact`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'QRVibe',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{post.title} – QRVibe Blog</title>
        <meta name="description" content={post.subtitle} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={`${post.title} – QRVibe Blog`} />
        <meta property="og:description" content={post.subtitle} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:site_name" content="QRVibe" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} – QRVibe Blog`} />
        <meta name="twitter:description" content={post.subtitle} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Visible Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link to="/blog" className="hover:text-white transition">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-fuchsia-400 font-medium line-clamp-1">{post.title}</span>
        </nav>

        {/* Back Link */}
        <div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4 text-fuchsia-400" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold px-3 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30">
              {postMeta.category}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              {postMeta.date}
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {postMeta.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
            {post.subtitle}
          </p>
        </div>

        {/* Article Body Content */}
        <article className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl prose prose-invert max-w-none text-slate-300 space-y-6 leading-relaxed">
          {post.content}
        </article>

        {/* Reserved Ad Slot in Blog Article */}
        <div className="w-full">
          <div className="border border-dashed border-violet-500/30 rounded-2xl p-4 bg-violet-950/10 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-white/5">
              Sponsored · Reserved Ad Space
            </span>
          </div>
        </div>

        {/* Bottom CTA to Generator */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-fuchsia-950/50 via-violet-950/50 to-cyan-950/50 border border-fuchsia-500/30 text-center space-y-4">
          <h3 className="text-xl font-bold text-white font-['Outfit']">Ready to Create Your Custom QR Code?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Design gorgeous, high-contrast, scannable QR codes with gradients, logos, and instant high-res downloads in seconds.
          </p>
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg shadow-fuchsia-500/25 hover:brightness-110 transition"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Launch QRVibe Studio</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
