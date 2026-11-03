/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_URL } from '../utils/config.ts';

export const SUPPORT_EMAIL = 'support@qrvibe.app';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields before submitting.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact QRVibe – Support & Feedback</title>
        <meta name="description" content="Get in touch with the QRVibe support and engineering team. Send us your feedback, bug reports, or partnership inquiries." />
        <link rel="canonical" href={`${SITE_URL}/contact`} />
        <meta property="og:title" content="Contact QRVibe – Support & Feedback" />
        <meta property="og:description" content="Get in touch with the QRVibe support and engineering team. Send us your feedback, bug reports, or partnership inquiries." />
        <meta property="og:url" content={`${SITE_URL}/contact`} />
      </Helmet>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-fuchsia-400 transition">Home</Link>
          <span>/</span>
          <span className="text-fuchsia-300 font-medium">Contact Us</span>
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
            <Mail className="w-4 h-4 text-fuchsia-400" />
            <span>Customer Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-white leading-tight">
            Get in Touch With Us
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have a question about QR code generation, enterprise bulk batching, or advertising partnerships? We would love to hear from you.
          </p>
        </div>

        {/* Direct Email Box */}
        <div className="p-6 rounded-2xl bg-black/40 border border-violet-500/30 space-y-2">
          <p className="text-sm text-slate-300 font-medium">Direct Support Email:</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-base font-mono text-fuchsia-300 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          <p className="text-xs text-slate-400">Average response time: Within 24 hours on business days.</p>
        </div>

        {/* Contact Form */}
        <div className="bg-gradient-to-b from-[#140e2b]/80 to-[#0e0a1f]/90 border border-violet-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white font-['Outfit']">Message Sent Successfully!</h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for reaching out, <span className="text-white font-semibold">{name}</span>. Our support team has received your message and will reply to <span className="text-fuchsia-300">{email}</span> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition shadow-lg shadow-violet-600/30"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-violet-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-fuchsia-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-violet-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-fuchsia-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-violet-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-fuchsia-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 hover:from-fuchsia-500 hover:to-violet-500 text-white font-bold text-sm transition shadow-lg shadow-fuchsia-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Support Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
