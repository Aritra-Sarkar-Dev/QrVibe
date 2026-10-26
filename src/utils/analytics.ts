/**
 * QR Vibe Privacy-First Analytics Helper
 *
 * This utility handles optional Google Analytics 4 (GA4) event tracking.
 * Strictly adheres to privacy guidelines:
 * - NO raw QR payload data, URLs, passwords, or contact notes are transmitted.
 * - Only generic metadata (format, feature used, error type) is recorded.
 * - If VITE_GA_MEASUREMENT_ID is not set, tracking calls silently no-op.
 *
 * Configuration:
 * To enable GA4, add your valid Measurement ID to .env or Vercel Environment Variables:
 * VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type TrackableEvent =
  | { name: 'generator_type_selected'; params: { qr_type: string } }
  | { name: 'qr_code_generated'; params: { qr_type: string } }
  | { name: 'qr_code_downloaded'; params: { format: 'png' | 'svg' | 'pdf' | 'zip'; resolution?: number } }
  | { name: 'qr_customization_used'; params: { feature: 'preset' | 'dots' | 'corner' | 'gradient' | 'logo' } }
  | { name: 'generator_error'; params: { error_type: string } };

export const initGoogleAnalytics = (): void => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === 'undefined') return;

  // Prevent duplicate script injection
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  });
};

export const trackEvent = (event: TrackableEvent): void => {
  if (typeof window === 'undefined' || !window.gtag) return;
  try {
    window.gtag('event', event.name, event.params);
  } catch (err) {
    // Fail silently to never disrupt user experience
  }
};
