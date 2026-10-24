/**
 * QR Payload Builders & Validators
 * Decoupled, pure functions for generating standard scannable QR payloads.
 */

export interface WifiData {
  ssid: string;
  password?: string;
  security: 'WPA' | 'WEP' | 'nopass';
  isHidden?: boolean;
}

export interface VCardData {
  firstName: string;
  lastName?: string;
  organization?: string;
  jobTitle?: string;
  phone?: string;
  cellPhone?: string;
  email?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  note?: string;
}

export interface CalendarData {
  title: string;
  location?: string;
  description?: string;
  startDate: string; // ISO or YYYY-MM-DDTHH:mm
  endDate: string;
  allDay?: boolean;
}

export interface PaymentData {
  type: 'upi' | 'paypal' | 'custom';
  // UPI
  upiId?: string;
  name?: string;
  amount?: string;
  note?: string;
  currency?: string;
  // PayPal
  paypalUsername?: string;
  // Custom link (bKash, Nagad, Stripe, etc.)
  customUrl?: string;
}

/**
 * Escapes special characters for WiFi payloads according to ZXing / MeCard standards
 * Characters to escape: \ ; , : "
 */
export function escapeWifiString(str: string): string {
  if (!str) return '';
  return str.replace(/([\\;,:"\\])/g, '\\$1');
}

/**
 * Builds standard WIFI: payload
 * Format: WIFI:T:WPA;S:my_ssid;P:my_pass;H:false;;
 */
export function buildWifiPayload(data: WifiData): string {
  const ssid = escapeWifiString(data.ssid.trim());
  const security = data.security || 'WPA';
  const hidden = data.isHidden ? 'true' : 'false';

  if (!ssid) return '';

  if (security === 'nopass') {
    return `WIFI:T:nopass;S:${ssid};H:${hidden};;`;
  }

  const pass = escapeWifiString(data.password || '');
  return `WIFI:T:${security};S:${ssid};P:${pass};H:${hidden};;`;
}

/**
 * Normalizes and validates a URL. Auto-prepends https:// if missing protocol.
 */
export function buildLinkPayload(rawUrl: string): { url: string; isValid: boolean } {
  let trimmed = rawUrl.trim();
  if (!trimmed) return { url: '', isValid: false };

  // If missing protocol, prepend https://
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  try {
    const parsed = new URL(trimmed);
    const isValid = ['http:', 'https:'].includes(parsed.protocol) && parsed.hostname.includes('.');
    return { url: trimmed, isValid };
  } catch {
    return { url: trimmed, isValid: false };
  }
}

/**
 * Builds standard vCard 3.0 format for Contact
 */
export function buildVCardPayload(data: VCardData): string {
  const first = data.firstName?.trim() || '';
  const last = data.lastName?.trim() || '';
  if (!first && !last && !data.phone && !data.email) return '';

  const fullName = [first, last].filter(Boolean).join(' ') || first || 'Contact';

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${last};${first};;;`,
    `FN:${fullName}`,
  ];

  if (data.organization?.trim()) {
    lines.push(`ORG:${data.organization.trim()}`);
  }
  if (data.jobTitle?.trim()) {
    lines.push(`TITLE:${data.jobTitle.trim()}`);
  }
  if (data.phone?.trim()) {
    lines.push(`TEL;TYPE=WORK,VOICE:${data.phone.trim()}`);
  }
  if (data.cellPhone?.trim()) {
    lines.push(`TEL;TYPE=CELL,VOICE:${data.cellPhone.trim()}`);
  }
  if (data.email?.trim()) {
    lines.push(`EMAIL;TYPE=PREF,INTERNET:${data.email.trim()}`);
  }
  if (data.website?.trim()) {
    const { url } = buildLinkPayload(data.website);
    lines.push(`URL:${url}`);
  }
  if (data.street || data.city || data.state || data.zip || data.country) {
    const street = data.street?.trim() || '';
    const city = data.city?.trim() || '';
    const state = data.state?.trim() || '';
    const zip = data.zip?.trim() || '';
    const country = data.country?.trim() || '';
    lines.push(`ADR;TYPE=HOME:;;${street};${city};${state};${zip};${country}`);
  }
  if (data.note?.trim()) {
    lines.push(`NOTE:${data.note.trim()}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * WhatsApp Click-to-Chat payload
 */
export function buildWhatsAppPayload(phone: string, message?: string): string {
  // Strip non-digits from phone (except leading +)
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }
  if (!cleaned) return '';

  const encodedMsg = message?.trim() ? `?text=${encodeURIComponent(message.trim())}` : '';
  return `https://wa.me/${cleaned}${encodedMsg}`;
}

/**
 * Social Profile link builder
 */
export type SocialPlatform =
  | 'instagram'
  | 'tiktok'
  | 'linkedin'
  | 'whatsapp'
  | 'x'
  | 'telegram'
  | 'facebook'
  | 'youtube';

export function buildSocialPayload(platform: SocialPlatform, handleOrUrl: string): string {
  let cleaned = handleOrUrl.trim();
  if (!cleaned) return '';

  // If user already pasted a full URL
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }

  // Strip leading @
  if (cleaned.startsWith('@')) {
    cleaned = cleaned.substring(1);
  }

  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${cleaned}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleaned}`;
    case 'linkedin':
      return cleaned.startsWith('in/') || cleaned.startsWith('company/')
        ? `https://linkedin.com/${cleaned}`
        : `https://linkedin.com/in/${cleaned}`;
    case 'whatsapp':
      return `https://wa.me/${cleaned}`;
    case 'telegram':
      return `https://t.me/${cleaned}`;
    case 'x':
      return `https://x.com/${cleaned}`;
    case 'facebook':
      return `https://facebook.com/${cleaned}`;
    case 'youtube':
      return cleaned.startsWith('channel/') || cleaned.startsWith('c/')
        ? `https://youtube.com/${cleaned}`
        : `https://youtube.com/@${cleaned}`;
    default:
      return `https://${cleaned}`;
  }
}

/**
 * Formats a Date object or ISO string to iCal UTC format (YYYYMMDDTHHmmssZ)
 */
export function formatIcalDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

/**
 * Builds standard iCalendar VEVENT payload
 */
export function buildCalendarPayload(data: CalendarData): string {
  const title = data.title?.trim();
  if (!title) return '';

  const startUtc = formatIcalDate(data.startDate);
  const endUtc = formatIcalDate(data.endDate || data.startDate);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//QRVibe//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
  ];

  if (startUtc) lines.push(`DTSTART:${startUtc}`);
  if (endUtc) lines.push(`DTEND:${endUtc}`);
  if (data.location?.trim()) lines.push(`LOCATION:${data.location.trim()}`);
  if (data.description?.trim()) lines.push(`DESCRIPTION:${data.description.trim()}`);

  lines.push('END:VEVENT', 'END:VCALENDAR');
  return lines.join('\n');
}

/**
 * Payment payloads: UPI (India / Global UPI), PayPal.me, Custom Links (bKash, Nagad, Stripe)
 */
export function buildPaymentPayload(data: PaymentData): string {
  if (data.type === 'upi') {
    const vpa = data.upiId?.trim();
    if (!vpa) return '';
    const params = new URLSearchParams();
    params.set('pa', vpa);
    if (data.name?.trim()) params.set('pn', data.name.trim());
    if (data.amount?.trim() && !isNaN(Number(data.amount))) params.set('am', data.amount.trim());
    params.set('cu', data.currency || 'INR');
    if (data.note?.trim()) params.set('tn', data.note.trim());
    return `upi://pay?${params.toString()}`;
  }

  if (data.type === 'paypal') {
    const username = data.paypalUsername?.replace(/^@/, '').trim();
    if (!username) return '';
    const amt = data.amount?.trim() ? `/${encodeURIComponent(data.amount.trim())}` : '';
    return `https://paypal.me/${username}${amt}`;
  }

  if (data.type === 'custom') {
    return buildLinkPayload(data.customUrl || '').url;
  }

  return '';
}

/**
 * Location payload - returns Google Maps search coordinates link
 */
export function buildLocationPayload(lat: number | string, lng: number | string): string {
  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;

  if (isNaN(latitude) || isNaN(longitude)) return '';
  return `https://maps.google.com/?q=${latitude},${longitude}`;
}

/**
 * App store links
 */
export function buildAppLinkPayload(type: 'ios' | 'android', idOrUrl: string): string {
  const val = idOrUrl.trim();
  if (!val) return '';
  if (val.startsWith('http://') || val.startsWith('https://')) return val;

  if (type === 'ios') {
    // If user passed bundle ID or app id (e.g. id123456789)
    if (/^\d+$/.test(val)) return `https://apps.apple.com/app/id${val}`;
    return `https://apps.apple.com/app/${val}`;
  } else {
    // Play Store package id (e.g. com.spotify.music)
    return `https://play.google.com/store/apps/details?id=${val}`;
  }
}
