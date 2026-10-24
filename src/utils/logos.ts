/**
 * Built-in Social & Brand SVG Logos for Center QR Overlays
 * All logos have clean contrasting backgrounds (white or brand pill) and are formatted
 * as SVG data URIs for crisp lossless rendering in qr-code-styling.
 */

export interface BuiltinLogo {
  id: string;
  name: string;
  category: 'social' | 'utility';
  dataUrl: string;
}

// Helper to convert SVG markup into a data URL
function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

// 1. Instagram Logo
const instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <radialGradient id="igG" r="150%" cx="30%" cy="107%">
      <stop offset="0" stop-color="#fdf497"/>
      <stop offset="0.05" stop-color="#fdf497"/>
      <stop offset="0.45" stop-color="#fd5949"/>
      <stop offset="0.6" stop-color="#d6249f"/>
      <stop offset="0.9" stop-color="#285AEB"/>
    </radialGradient>
  </defs>
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="url(#igG)"/>
  <rect x="22" y="22" width="56" height="56" rx="16" fill="none" stroke="#ffffff" stroke-width="6"/>
  <circle cx="50" cy="50" r="14" fill="none" stroke="#ffffff" stroke-width="6"/>
  <circle cx="66" cy="34" r="3.5" fill="#ffffff"/>
</svg>`;

// 2. TikTok Logo
const tiktokSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#000000"/>
  <path d="M68 37.5c-4.8-.8-8.6-4.3-9.5-9h-7.8v34.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8 4.4-9.8 9.8-9.8c1.3 0 2.5.3 3.6.7V25c-1.2-.2-2.4-.3-3.6-.3-10 0-18 8.1-18 18.1s8.1 18.1 18 18.1c9.7 0 17.6-7.7 18-17.3v-15c4 2.8 8.8 4.4 14 4.5v-7.8c-1.7 0-3.3-.4-4.9-1.3z" fill="#25F4EE"/>
  <path d="M66 35.5c-4.8-.8-8.6-4.3-9.5-9h-7.8v34.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8 4.4-9.8 9.8-9.8c1.3 0 2.5.3 3.6.7V23c-1.2-.2-2.4-.3-3.6-.3-10 0-18 8.1-18 18.1s8.1 18.1 18 18.1c9.7 0 17.6-7.7 18-17.3v-15c4 2.8 8.8 4.4 14 4.5v-7.8c-1.7 0-3.3-.4-4.9-1.3z" fill="#FE2C55"/>
  <path d="M67 36.5c-4.8-.8-8.6-4.3-9.5-9h-7.8v34.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8 4.4-9.8 9.8-9.8c1.3 0 2.5.3 3.6.7V24c-1.2-.2-2.4-.3-3.6-.3-10 0-18 8.1-18 18.1s8.1 18.1 18 18.1c9.7 0 17.6-7.7 18-17.3v-15c4 2.8 8.8 4.4 14 4.5v-7.8c-1.7 0-3.3-.4-4.9-1.3z" fill="#ffffff"/>
</svg>`;

// 3. LinkedIn Logo
const linkedinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#0A66C2"/>
  <path d="M29 38h9v30h-9V38zm4.5-14.5c2.9 0 5.2 2.3 5.2 5.2s-2.3 5.2-5.2 5.2-5.2-2.3-5.2-5.2 2.3-5.2 5.2-5.2zM44 38h8.6v4.1h.1c1.2-2.3 4.2-4.7 8.6-4.7 9.2 0 10.9 6.1 10.9 14V68h-9V53.8c0-3.4-.1-7.8-4.7-7.8-4.7 0-5.4 3.7-5.4 7.5V68H44V38z" fill="#ffffff"/>
</svg>`;

// 4. WhatsApp Logo
const whatsappSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#25D366"/>
  <path d="M50 20c-16.5 0-30 13.5-30 30 0 5.3 1.4 10.2 3.8 14.5L20 80l16-4.2C40.2 78 45 79 50 79c16.5 0 30-13.5 30-30s-13.5-29-30-29zm0 53.5c-4.4 0-8.6-1.2-12.3-3.3l-.9-.5-9.5 2.5 2.5-9.2-.6-.9c-2.3-3.7-3.6-8.1-3.6-12.6 0-13.5 11-24.5 24.5-24.5S74.5 36 74.5 49.5 63.5 73.5 50 73.5zm13.4-18.3c-.7-.4-4.4-2.2-5.1-2.4-.7-.3-1.2-.4-1.7.4-.5.7-2 2.4-2.4 3-.5.5-.9.6-1.7.2-.7-.4-3.1-1.1-5.9-3.6-2.2-1.9-3.6-4.3-4-5.1-.4-.7 0-1.1.4-1.5.3-.4.7-.9 1.1-1.3.4-.4.5-.7.8-1.2.3-.5.1-.9-.1-1.3-.1-.4-1.7-4.2-2.4-5.7-.6-1.5-1.3-1.3-1.7-1.3h-1.5c-.5 0-1.3.2-2 1-.7.7-2.7 2.6-2.7 6.4s2.8 7.5 3.2 8c.4.5 5.5 8.4 13.3 11.8 1.9.8 3.3 1.3 4.5 1.7 1.9.6 3.6.5 5 .3 1.5-.2 4.4-1.8 5-3.5.7-1.8.7-3.3.5-3.6-.2-.3-.7-.5-1.5-.9z" fill="#ffffff"/>
</svg>`;

// 5. X (formerly Twitter) Logo
const xSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#000000"/>
  <path d="M57.9 44.8L76.5 23.2h-4.4L55.9 42.1 43 23.2H28.1l19.5 28.4L28.1 74.8h4.4l17.1-19.9L63.3 74.8h14.9L57.9 44.8zm-6 7L49.9 49 34.1 26.4h6.8l12.7 18.1 2 2.9 16.5 23.6h-6.8L51.9 51.8z" fill="#ffffff"/>
</svg>`;

// 6. YouTube Logo
const youtubeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#FF0000"/>
  <path d="M72.5 36.8c-.8-3-3.2-5.4-6.2-6.2C60.8 29.3 50 29.3 50 29.3s-10.8 0-16.3 1.3c-3 .8-5.4 3.2-6.2 6.2C26.2 42.3 26.2 50 26.2 50s0 7.7 1.3 13.2c.8 3 3.2 5.4 6.2 6.2 5.5 1.3 16.3 1.3 16.3 1.3s10.8 0 16.3-1.3c3-.8 5.4-3.2 6.2-6.2 1.3-5.5 1.3-13.2 1.3-13.2s0-7.7-1.3-13.2zM45.2 58.4V41.6L59.8 50l-14.6 8.4z" fill="#ffffff"/>
</svg>`;

// 7. Facebook Logo
const facebookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#1877F2"/>
  <path d="M57 51.5h8.5l1.3-10h-9.8V35c0-2.9.8-4.9 5-4.9h5.3v-8.9c-.9-.1-4.1-.4-7.8-.4-7.7 0-13 4.7-13 13.4v6.3H38v10h8.5V76h10.5V51.5z" fill="#ffffff"/>
</svg>`;

// 8. Website / Globe
const globeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#4F46E5"/>
  <circle cx="50" cy="50" r="24" fill="none" stroke="#ffffff" stroke-width="5"/>
  <line x1="26" y1="50" x2="74" y2="50" stroke="#ffffff" stroke-width="5"/>
  <ellipse cx="50" cy="50" rx="12" ry="24" fill="none" stroke="#ffffff" stroke-width="5"/>
</svg>`;

// 9. WiFi Icon
const wifiSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="28" fill="#ffffff"/>
  <rect x="6" y="6" width="88" height="88" rx="22" fill="#0EA5E9"/>
  <path d="M26 38c13.3-13.3 34.7-13.3 48 0" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <path d="M34 48c8.8-8.8 23.2-8.8 32 0" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <path d="M42 58c4.4-4.4 11.6-4.4 16 0" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  <circle cx="50" cy="68" r="4.5" fill="#ffffff"/>
</svg>`;

export const BUILTIN_LOGOS: BuiltinLogo[] = [
  { id: 'instagram', name: 'Instagram', category: 'social', dataUrl: svgToDataUrl(instagramSvg) },
  { id: 'tiktok', name: 'TikTok', category: 'social', dataUrl: svgToDataUrl(tiktokSvg) },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', dataUrl: svgToDataUrl(linkedinSvg) },
  { id: 'whatsapp', name: 'WhatsApp', category: 'social', dataUrl: svgToDataUrl(whatsappSvg) },
  { id: 'x', name: 'X', category: 'social', dataUrl: svgToDataUrl(xSvg) },
  { id: 'youtube', name: 'YouTube', category: 'social', dataUrl: svgToDataUrl(youtubeSvg) },
  { id: 'facebook', name: 'Facebook', category: 'social', dataUrl: svgToDataUrl(facebookSvg) },
  { id: 'globe', name: 'Website', category: 'utility', dataUrl: svgToDataUrl(globeSvg) },
  { id: 'wifi', name: 'WiFi', category: 'utility', dataUrl: svgToDataUrl(wifiSvg) },
];

export function getLogoForPlatform(platform: string): string | undefined {
  const match = BUILTIN_LOGOS.find((l) => l.id.toLowerCase() === platform.toLowerCase());
  return match?.dataUrl;
}
