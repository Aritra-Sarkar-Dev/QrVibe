import test from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeWifiString,
  buildWifiPayload,
  buildLinkPayload,
  buildVCardPayload,
  buildWhatsAppPayload,
  buildSocialPayload,
  buildCalendarPayload,
  buildPaymentPayload,
  buildLocationPayload,
  buildAppLinkPayload,
} from './payloads.ts';
import { checkQRContrast, getContrastRatio } from './contrast.ts';

test('escapeWifiString escapes special characters properly', () => {
  assert.equal(escapeWifiString('My:Wifi;Net"work\\'), 'My\\:Wifi\\;Net\\"work\\\\');
});

test('buildWifiPayload produces standard format', () => {
  const payload = buildWifiPayload({
    ssid: 'Home_Fiber',
    password: 'secret;pass:123',
    security: 'WPA',
    isHidden: false,
  });
  assert.equal(payload, 'WIFI:T:WPA;S:Home_Fiber;P:secret\\;pass\\:123;H:false;;');

  const openWifi = buildWifiPayload({
    ssid: 'Free_Public',
    security: 'nopass',
    isHidden: true,
  });
  assert.equal(openWifi, 'WIFI:T:nopass;S:Free_Public;H:true;;');
});

test('buildLinkPayload adds protocol and validates', () => {
  const result1 = buildLinkPayload('qrvibe.app');
  assert.equal(result1.url, 'https://qrvibe.app');
  assert.equal(result1.isValid, true);

  const result2 = buildLinkPayload('http://custom-url.org/page');
  assert.equal(result2.url, 'http://custom-url.org/page');
  assert.equal(result2.isValid, true);

  const invalid = buildLinkPayload('');
  assert.equal(invalid.isValid, false);
});

test('buildVCardPayload produces standard vCard 3.0', () => {
  const vcard = buildVCardPayload({
    firstName: 'Alex',
    lastName: 'Vibe',
    organization: 'QRVibe Inc',
    jobTitle: 'Lead Designer',
    phone: '+1234567890',
    email: 'alex@qrvibe.app',
    website: 'qrvibe.app',
  });

  assert.ok(vcard.includes('BEGIN:VCARD'));
  assert.ok(vcard.includes('VERSION:3.0'));
  assert.ok(vcard.includes('N:Vibe;Alex;;;'));
  assert.ok(vcard.includes('FN:Alex Vibe'));
  assert.ok(vcard.includes('ORG:QRVibe Inc'));
  assert.ok(vcard.includes('TEL;TYPE=WORK,VOICE:+1234567890'));
  assert.ok(vcard.includes('EMAIL;TYPE=PREF,INTERNET:alex@qrvibe.app'));
  assert.ok(vcard.includes('URL:https://qrvibe.app'));
  assert.ok(vcard.includes('END:VCARD'));
});

test('buildWhatsAppPayload strips characters and encodes message', () => {
  const wa = buildWhatsAppPayload('+1 (555) 019-2834', 'Hey there! Check this out');
  assert.equal(wa, 'https://wa.me/15550192834?text=Hey%20there!%20Check%20this%20out');
});

test('buildSocialPayload handles platforms and usernames', () => {
  assert.equal(buildSocialPayload('instagram', '@genz_creator'), 'https://instagram.com/genz_creator');
  assert.equal(buildSocialPayload('telegram', 'cool_channel'), 'https://t.me/cool_channel');
  assert.equal(buildSocialPayload('tiktok', '@dance_trend'), 'https://tiktok.com/@dance_trend');
  assert.equal(buildSocialPayload('linkedin', 'alex-vibe'), 'https://linkedin.com/in/alex-vibe');
  assert.equal(buildSocialPayload('x', '@tech_vibes'), 'https://x.com/tech_vibes');
  assert.equal(buildSocialPayload('youtube', 'mrbeast'), 'https://youtube.com/@mrbeast');
});

test('buildPaymentPayload builds UPI and PayPal links', () => {
  const upi = buildPaymentPayload({
    type: 'upi',
    upiId: 'user@okhdfcbank',
    name: 'QR Vibe Merchant',
    amount: '499.00',
    currency: 'INR',
    note: 'Pro plan subscription',
  });
  assert.ok(upi.startsWith('upi://pay?'));
  assert.ok(upi.includes('pa=user%40okhdfcbank'));
  assert.ok(upi.includes('am=499.00'));

  const paypal = buildPaymentPayload({
    type: 'paypal',
    paypalUsername: 'alexvibe',
    amount: '15',
  });
  assert.equal(paypal, 'https://paypal.me/alexvibe/15');
});

test('buildLocationPayload formats coordinates', () => {
  const loc = buildLocationPayload(37.7749, -122.4194);
  assert.equal(loc, 'https://maps.google.com/?q=37.7749,-122.4194');
});

test('buildCalendarPayload generates VEVENT', () => {
  const cal = buildCalendarPayload({
    title: 'Drop Launch Party',
    location: 'Cyber Lounge NYC',
    startDate: '2026-10-31T20:00:00Z',
    endDate: '2026-10-31T23:00:00Z',
  });
  assert.ok(cal.includes('BEGIN:VEVENT'));
  assert.ok(cal.includes('SUMMARY:Drop Launch Party'));
  assert.ok(cal.includes('LOCATION:Cyber Lounge NYC'));
  assert.ok(cal.includes('END:VEVENT'));
});

test('checkQRContrast detects low and high contrast', () => {
  // High contrast: black on white
  const high = checkQRContrast('#000000', '#ffffff');
  assert.equal(high.isLowContrast, false);
  assert.ok(high.ratio > 10);

  // Low contrast: dark purple on black
  const low = checkQRContrast('#201138', '#0b0813');
  assert.equal(low.isLowContrast, true);
  assert.ok(low.warning !== undefined);
});
