import test from 'node:test';
import assert from 'node:assert';
import {
  validateImageMagicBytes,
  sanitizeUpstreamError,
  isRateLimited,
} from '../../api/upload.ts';
import { validateDirectImageUrl } from './imgbb.ts';

test('validateImageMagicBytes identifies JPEG', () => {
  const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
  const result = validateImageMagicBytes(jpegHeader);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.mime, 'image/jpeg');
});

test('validateImageMagicBytes identifies PNG', () => {
  const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]);
  const result = validateImageMagicBytes(pngHeader);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.mime, 'image/png');
});

test('validateImageMagicBytes identifies WebP', () => {
  const webpHeader = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // RIFF
    0x24, 0x00, 0x00, 0x00,
    0x57, 0x45, 0x42, 0x50, // WEBP
  ]);
  const result = validateImageMagicBytes(webpHeader);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.mime, 'image/webp');
});

test('validateImageMagicBytes rejects non-image formats', () => {
  const textBuffer = Buffer.from('<html><body>Hello</body></html>');
  const result = validateImageMagicBytes(textBuffer);
  assert.strictEqual(result.valid, false);
});

test('sanitizeUpstreamError scrubs credentials and keys', () => {
  const sensitiveError = 'Error: Invalid key provided in query parameter key=c665a482e29533e552e59e66bf8b07bc';
  const sanitized = sanitizeUpstreamError(sensitiveError);

  // Must not contain the sensitive key or 'key='
  assert.strictEqual(sanitized.includes('c665a482e29533e552e59e66bf8b07bc'), false);
  assert.strictEqual(sanitized.includes('key=c665a482'), false);
  assert.strictEqual(sanitized, 'Image hosting authentication failed. Please verify server configuration.');
});

test('sanitizeUpstreamError strips external URLs', () => {
  const urlError = 'Failed to fetch from https://api.imgbb.com/1/upload?key=secret';
  const sanitized = sanitizeUpstreamError(urlError);
  assert.strictEqual(sanitized.includes('https://api.imgbb.com'), false);
  assert.strictEqual(sanitized.includes('secret'), false);
});

test('isRateLimited throttles excessive requests for an IP', () => {
  const testIp = '198.51.100.99';
  let wasBlocked = false;

  for (let i = 0; i < 20; i++) {
    const limited = isRateLimited(testIp);
    if (limited) {
      wasBlocked = true;
      break;
    }
  }

  assert.strictEqual(wasBlocked, true, 'Rate limiter should block excessive requests');
});

test('validateDirectImageUrl accepts valid HTTPS and HTTP URLs', () => {
  const valid1 = validateDirectImageUrl('https://images.unsplash.com/photo-12345.jpg');
  assert.strictEqual(valid1.isValid, true);
  assert.strictEqual(valid1.url, 'https://images.unsplash.com/photo-12345.jpg');

  const valid2 = validateDirectImageUrl('example.com/my-photo.png');
  assert.strictEqual(valid2.isValid, true);
  assert.strictEqual(valid2.url, 'https://example.com/my-photo.png');
});

test('validateDirectImageUrl rejects dangerous or local schemes', () => {
  const js = validateDirectImageUrl('javascript:alert(1)');
  assert.strictEqual(js.isValid, false);

  const dataUri = validateDirectImageUrl('data:text/html,<script>alert(1)</script>');
  assert.strictEqual(dataUri.isValid, false);

  const fileUri = validateDirectImageUrl('file:///etc/passwd');
  assert.strictEqual(fileUri.isValid, false);
});
