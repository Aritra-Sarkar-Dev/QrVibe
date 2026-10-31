/**
 * Server-Side Image Upload Endpoint for ImgBB
 *
 * Requirements:
 * - Read key ONLY on server side from process.env.IMGBB_API_KEY (no VITE_ prefix).
 * - Trim whitespace and strip surrounding quotes.
 * - If missing or empty, return "IMGBB_API_KEY is not set".
 * - POST to https://api.imgbb.com/1/upload?key=KEY with form field "image" using FormData.
 * - Do not set Content-Type header manually.
 * - Return data.data.url on success. On failure return exact ImgBB error message and status code.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_UPLOADS_PER_WINDOW = 15;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Clean up expired rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (record.resetAt <= now) {
      rateLimitMap.delete(ip);
    }
  }
}, 60 * 1000).unref?.();

export function validateImageMagicBytes(buffer: Buffer): { valid: boolean; mime?: string } {
  if (buffer.length < 4) return { valid: false };

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { valid: true, mime: 'image/jpeg' };
  }

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return { valid: true, mime: 'image/png' };
  }

  // GIF: 47 49 46 38
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return { valid: true, mime: 'image/gif' };
  }

  // WebP: RIFF ... WEBP
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return { valid: true, mime: 'image/webp' };
  }

  return { valid: false };
}

export function sanitizeUpstreamError(rawMessage?: string): string {
  if (!rawMessage || typeof rawMessage !== 'string') {
    return 'Image upload processing failed. Please try again.';
  }

  const lower = rawMessage.toLowerCase();

  if (lower.includes('key') || lower.includes('auth') || lower.includes('token') || lower.includes('credential')) {
    return 'Image hosting authentication failed. Please verify server configuration.';
  }

  if (lower.includes('empty') || lower.includes('empty upload')) {
    return 'No image data was received.';
  }

  if (lower.includes('format') || lower.includes('not supported') || lower.includes('invalid image')) {
    return 'Unsupported or corrupted image file. Please use JPEG, PNG, or WebP.';
  }

  if (lower.includes('large') || lower.includes('size')) {
    return 'Image file is too large. Please upload an image under 5MB.';
  }

  const cleaned = rawMessage
    .replace(/https?:\/\/[^\s]+/gi, '[redacted-url]')
    .replace(/key=[a-zA-Z0-9_-]+/gi, 'key=[redacted]')
    .trim();

  return cleaned || 'Image upload failed. Please try again.';
}

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || record.resetAt <= now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_UPLOADS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  // 1. Key Handling: read only from process.env.IMGBB_API_KEY, trim whitespace, strip surrounding quotes
  const rawKey = process.env.IMGBB_API_KEY;
  if (!rawKey || typeof rawKey !== 'string') {
    return res.status(503).json({
      success: false,
      error: 'IMGBB_API_KEY is not set',
    });
  }

  const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
  if (!apiKey || apiKey === 'PASTE_YOUR_IMGBB_KEY_HERE' || apiKey === 'PASTE_YOUR_SERVER_SIDE_IMGBB_KEY_HERE') {
    return res.status(503).json({
      success: false,
      error: 'IMGBB_API_KEY is not set',
    });
  }

  // 2. Client IP Rate Limiting
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded: Maximum 15 image uploads per minute. Please try again shortly.',
    });
  }

  // 3. Extract Image Data
  const body = req.body;
  if (!body || typeof body !== 'object' || !body.image || typeof body.image !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid request body. Expected JSON object with base64 encoded "image" string.',
    });
  }

  let rawBase64 = body.image.trim();
  const name = typeof body.name === 'string' ? body.name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) : undefined;

  const matches = rawBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches) {
    rawBase64 = matches[2];
  }

  let imageBuffer: Buffer;
  try {
    imageBuffer = Buffer.from(rawBase64, 'base64');
  } catch {
    return res.status(400).json({ success: false, error: 'Malformed base64 image data.' });
  }

  if (imageBuffer.length === 0) {
    return res.status(400).json({ success: false, error: 'Empty image payload received.' });
  }

  if (imageBuffer.length > MAX_IMAGE_SIZE_BYTES) {
    return res.status(413).json({
      success: false,
      error: `Image exceeds maximum allowed size of 5MB.`,
    });
  }

  const { valid } = validateImageMagicBytes(imageBuffer);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported image format. Allowed formats are JPEG, PNG, WebP, and GIF.',
    });
  }

  // 4. Upstream Forwarding to ImgBB
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const upstreamFormData = new FormData();
    upstreamFormData.append('image', rawBase64); // form field "image"
    if (name) {
      upstreamFormData.append('name', name);
    }

    const upstreamResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        body: upstreamFormData,
        // NO Content-Type header! FormData handles multipart boundary automatically
      }
    );

    clearTimeout(timeoutId);

    const upstreamData = (await upstreamResponse.json()) as any;

    if (upstreamResponse.ok && upstreamData?.success && upstreamData?.data?.url) {
      return res.status(200).json({
        success: true,
        url: upstreamData.data.url,
      });
    }

    // Return exact ImgBB error message and status code
    const exactError = upstreamData?.error?.message || upstreamResponse.statusText || 'Upload failed';
    const status = upstreamResponse.status || 500;

    return res.status(status).json({
      success: false,
      error: exactError,
    });
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        error: 'Image upload timed out. ImgBB took too long to respond.',
      });
    }

    return res.status(502).json({
      success: false,
      error: err.message || 'Unable to reach the image hosting service.',
    });
  }
}
