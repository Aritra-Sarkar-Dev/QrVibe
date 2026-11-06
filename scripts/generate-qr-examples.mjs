import fs from 'fs';
import path from 'path';

const examples = [
  { name: 'wifi-qr-code-cafe-gradient.svg', title: 'WiFi QR code with purple gradient for a cafe', caption: 'Scannable WiFi QR code designed for cafe tables with custom gradient.' },
  { name: 'wifi-qr-code-office-dark.svg', title: 'Dark mode office WiFi QR code', caption: 'Professional dark aesthetic Wi-Fi QR code for corporate reception.' },
  { name: 'wifi-qr-code-hotel-modern.svg', title: 'Modern hotel guest WiFi QR code', caption: 'Sleek guest network QR code for hotel rooms and lobbies.' },
  { name: 'whatsapp-qr-code-green-rounded.svg', title: 'WhatsApp chat QR code with green rounded dots', caption: 'Instant WhatsApp click-to-chat QR code for customer support.' },
  { name: 'whatsapp-qr-code-chat-cyan.svg', title: 'Cyan WhatsApp direct message QR code', caption: 'Direct messaging QR code for online store inquiries.' },
  { name: 'whatsapp-qr-code-business-violet.svg', title: 'Violet branded WhatsApp business QR code', caption: 'Custom branded WhatsApp contact QR code.' },
  { name: 'payment-qr-code-upi-emerald.svg', title: 'Emerald UPI payment QR code for retail checkout', caption: 'Instant UPI and digital payment QR code for small shops.' },
  { name: 'payment-qr-code-paypal-blue.svg', title: 'PayPal payment link QR code', caption: 'Freelancer tip jar and payment checkout QR code.' },
  { name: 'payment-qr-code-counter-dark.svg', title: 'Dark aesthetic counter payment QR code', caption: 'Laminated checkout counter payment QR code.' },
  { name: 'vcard-qr-code-business-card-classic.svg', title: 'Classic vCard digital business card QR code', caption: 'Contactless vCard QR code for professional networking.' },
  { name: 'vcard-qr-code-executive-gradient.svg', title: 'Executive digital business card QR', caption: 'High-end corporate vCard QR code for executives.' },
  { name: 'vcard-qr-code-minimalist-white.svg', title: 'Minimalist white vCard contact QR code', caption: 'Clean minimalist contact details QR code.' },
  { name: 'url-qr-code-website-landing-neon.svg', title: 'Neon website landing page URL QR code', caption: 'High-visibility website URL QR code for advertising.' },
  { name: 'url-qr-code-portfolio-violet.svg', title: 'Portfolio website QR code with violet gradient', caption: 'Creative designer portfolio QR code.' },
  { name: 'url-qr-code-storefront-cyan.svg', title: 'E-commerce storefront URL QR code', caption: 'Online shop direct link QR code.' },
  { name: 'image-qr-code-menu-restaurant.svg', title: 'Restaurant menu image QR code', caption: 'Contactless digital menu QR code for dining tables.' },
  { name: 'image-qr-code-flyer-event.svg', title: 'Event flyer image QR code', caption: 'Promotional event poster and flyer QR code.' },
  { name: 'image-qr-code-portfolio-gallery.svg', title: 'Photography portfolio gallery QR code', caption: 'Visual gallery QR code for art exhibitions.' },
  { name: 'text-qr-code-secret-notes.svg', title: 'Plain text secret notes QR code', caption: 'Offline alphanumeric text message QR code.' },
  { name: 'text-qr-code-serial-number.svg', title: 'Product serial number QR code', caption: 'Inventory tracking and serial code QR matrix.' },
  { name: 'email-qr-code-inquiry-contact.svg', title: 'Email mailto inquiry QR code', caption: 'Pre-filled customer support email QR code.' },
  { name: 'sms-qr-code-support-chat.svg', title: 'SMS text message support QR code', caption: 'Instant SMS text message trigger QR code.' },
  { name: 'location-qr-code-store-map.svg', title: 'GPS store location map QR code', caption: 'Google Maps navigation location QR code.' },
  { name: 'calendar-qr-code-event-invite.svg', title: 'Calendar event invite QR code', caption: 'Save-the-date calendar appointment QR code.' },
  { name: 'instagram-qr-code-profile-gradient.svg', title: 'Instagram profile QR code with vibrant gradient', caption: 'Social media growth QR code for Instagram handle.' },
  { name: 'youtube-qr-code-channel-red.svg', title: 'YouTube channel subscribe QR code', caption: 'Video channel subscription QR code.' },
  { name: 'restaurant-menu-qr-table-tent.svg', title: 'Restaurant menu table tent QR code', caption: 'Dine-in menu QR code for restaurant tables.' },
  { name: 'cafe-wifi-qr-wall-sticker.svg', title: 'Cafe WiFi wall sticker QR code', caption: 'Wall-mounted guest Wi-Fi QR code for coffee shops.' },
  { name: 'business-card-qr-back-print.svg', title: 'Back print business card vCard QR code', caption: 'Physical business card reverse side QR code.' },
  { name: 'social-media-qr-hub-neon.svg', title: 'Neon social media link-in-bio QR code', caption: 'All-in-one social media hub QR code.' }
];

const dir = path.join(process.cwd(), 'public', 'images', 'qr-examples');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

examples.forEach((ex, i) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d946ef" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="#0b0813" rx="32"/>
  <rect x="48" y="48" width="416" height="416" fill="#ffffff" rx="24"/>
  <!-- Finder patterns -->
  <rect x="80" y="80" width="112" height="112" fill="url(#grad${i})" rx="16"/>
  <rect x="104" y="104" width="64" height="64" fill="#ffffff" rx="8"/>
  <rect x="120" y="120" width="32" height="32" fill="url(#grad${i})" rx="4"/>
  
  <rect x="320" y="80" width="112" height="112" fill="url(#grad${i})" rx="16"/>
  <rect x="344" y="104" width="64" height="64" fill="#ffffff" rx="8"/>
  <rect x="360" y="120" width="32" height="32" fill="url(#grad${i})" rx="4"/>
  
  <rect x="80" y="320" width="112" height="112" fill="url(#grad${i})" rx="16"/>
  <rect x="104" y="344" width="64" height="64" fill="#ffffff" rx="8"/>
  <rect x="120" y="360" width="32" height="32" fill="url(#grad${i})" rx="4"/>
  
  <!-- Data modules mock -->
  <rect x="224" y="80" width="64" height="32" fill="#111" rx="4"/>
  <rect x="224" y="144" width="32" height="48" fill="#111" rx="4"/>
  <rect x="288" y="128" width="32" height="64" fill="#111" rx="4"/>
  <rect x="224" y="224" width="64" height="64" fill="url(#grad${i})" rx="12"/>
  <rect x="320" y="224" width="48" height="48" fill="#111" rx="8"/>
  <rect x="400" y="224" width="32" height="64" fill="#111" rx="6"/>
  <rect x="80" y="464" width="352" height="16" fill="#d946ef" rx="8"/>
  <text x="256" y="440" font-family="system-ui" font-size="16" font-weight="bold" fill="#0b0813" text-anchor="middle">QRVibe Example #${i + 1}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, ex.name), svg);
});

console.log(`Generated ${examples.length} example QR SVGs in public/images/qr-examples/`);
