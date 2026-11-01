import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Sparkles, ArrowRight, Calendar, Clock, ArrowLeft } from 'lucide-react';

export const BLOG_POSTS = [
  {
    slug: 'how-qr-codes-work',
    title: 'How QR Codes Work: Technology, Matrix Patterns & Error Correction',
    excerpt: 'Dive deep into the fascinating engineering behind Quick Response codes. Learn how data is stored in black and white squares, finder patterns, and Reed-Solomon error correction.',
    date: 'October 24, 2026',
    readTime: '6 min read',
    category: 'Technology',
    imageBg: 'from-fuchsia-600 to-violet-600',
  },
  {
    slug: 'cafe-wifi-qr-code',
    title: 'How to Make a WiFi QR Code for a Cafe, Restaurant, or Office',
    excerpt: 'Stop typing out complex router passwords for customers. Learn how to generate a secure WPA WiFi QR code, print professional table tents, and delight patrons.',
    date: 'October 26, 2026',
    readTime: '5 min read',
    category: 'Business Guide',
    imageBg: 'from-cyan-600 to-blue-600',
  },
  {
    slug: 'restaurant-menu-qr-code',
    title: 'Restaurant Menu QR Code: Best Practices for Seamless Dining',
    excerpt: 'Digital menus are here to stay. Discover how to design scannable table QR codes that load instantly, enhance hygiene, and boost guest satisfaction.',
    date: 'October 28, 2026',
    readTime: '7 min read',
    category: 'Hospitality',
    imageBg: 'from-amber-600 to-orange-600',
  },
  {
    slug: 'small-shop-payment-qr',
    title: 'Payment QR Codes for Small Shops, Creators & Freelancers',
    excerpt: 'Accept instant mobile payments without expensive POS hardware. A comprehensive guide to setting up UPI, PayPal, and digital checkout QR codes.',
    date: 'October 30, 2026',
    readTime: '6 min read',
    category: 'E-Commerce',
    imageBg: 'from-emerald-600 to-teal-600',
  },
  {
    slug: 'qr-code-best-practices',
    title: 'QR Code Best Practices: Contrast, Quiet Zones, Sizing & Scannability',
    excerpt: 'Are your QR codes failing to scan? Avoid common mistakes like low color contrast, missing quiet zones, oversized logos, and poor print sizing.',
    date: 'November 1, 2026',
    readTime: '8 min read',
    category: 'Design & UX',
    imageBg: 'from-violet-600 to-fuchsia-600',
  },
];

export const BlogIndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>QR Code Creator Blog & Guides – QRVibe</title>
        <meta name="description" content="Explore expert guides, tutorials, and best practices for creating scannable QR codes for businesses, restaurants, cafes, and creators." />
        <meta property="og:title" content="QR Code Creator Blog & Guides – QRVibe" />
        <meta property="og:description" content="Explore expert guides, tutorials, and best practices for creating scannable QR codes for businesses, restaurants, cafes, and creators." />
        <meta property="og:url" content="https://qr-vibe.vercel.app/blog" />
        <link rel="canonical" href="https://qr-vibe.vercel.app/blog" />
      </Helmet>
      <div className="max-w-5xl mx-auto space-y-12">
        
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
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-fuchsia-300">
            <BookOpen className="w-4 h-4 text-fuchsia-400" />
            <span>QRVibe Creator Blog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-['Outfit'] tracking-tight text-white">
            Expert Guides & QR Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Master the art of QR code creation, design optimization, and seamless physical-to-digital integration for your brand.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 hover:border-fuchsia-500/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold px-3 py-1 rounded-full bg-fuchsia-600/20 text-fuchsia-300 border border-fuchsia-500/30">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-bold font-['Outfit'] text-white group-hover:text-fuchsia-300 transition leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-2 text-xs font-bold text-fuchsia-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};
