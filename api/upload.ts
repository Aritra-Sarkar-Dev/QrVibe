/**
 * Server-Side Image Upload Endpoint for ImgBB
 *
 * Compatible with Vercel Serverless Functions and Express.
 * Strictly enforces:
 * - Server-only retrieval of IMGBB_API_KEY (never exposed to client)
 * - Supported MIME type validation (JPEG, PNG, WebP, GIF)
 * - Payload size limit (Max 5MB)
 * - Client IP rate limiting
 * - Request timeout (15s)
 * - Error sanitization (no credentials, upstream URLs, or internals in responses)
 */

import type { IncomingMessage, ServerResponse } from 'http';

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

/**
 * Validates image buffer magic bytes against supported image formats
 */
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

  // GIF: 47 49 46 38 (GIF87a or GIF89a)
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
    return { valid: true, mime: 'image/gif' };
  }

  // WebP: RIFF ... WEBP (52 49 46 46 .... 57 45 42 50)
  if (
    buffer.length >= 12 &&
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) {
    return { valid: true, mime: 'image/webp' };
  }

  return { valid: false };
}

/**
 * Sanitizes upstream error messages so no API keys, request queries, or internal details leak
 */
export function sanitizeUpstreamError(rawMessage?: string): string {
  if (!rawMessage || typeof rawMessage !== 'string') {
    return 'Image upload processing failed. Please try again.';
  }

  const lower = rawMessage.toLowerCase();

  // If the upstream error mentions key, token, or auth, return generic message
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

  // Strip any URL or key query params from the message
  const cleaned = rawMessage
    .replace(/https?:\/\/[^\s]+/gi, '[redacted-url]')
    .replace(/key=[a-zA-Z0-9_-]+/gi, 'key=[redacted]')
    .trim();

  return cleaned || 'Image upload failed. Please try again.';
}

/**
 * Check and record rate limit for IP
 */
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
  // Enforce POST method
  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  // 1. Read Server-Side Secret exclusively
  const apiKey = process.env.IMGBB_API_KEY?.trim();
  if (!apiKey) {
    return res.status(503).json({
      success: false,
      error: 'Image upload service is temporarily unavailable. Server administrator has not configured IMGBB_API_KEY in environment variables.',
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

  // 3. Extract and Validate Image Data
  const body = req.body;
  if (!body || typeof body !== 'object' || !body.image || typeof body.image !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid request body. Expected JSON object with base64 encoded "image" string.',
    });
  }

  let rawBase64 = body.image.trim();
  const name = typeof body.name === 'string' ? body.name.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 50) : undefined;

  // Extract base64 part if data URL prefix exists
  const matches = rawBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (matches) {
    rawBase64 = matches[2];
  }

  // 4. Validate Buffer Size
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
      error: `Image exceeds maximum allowed size of 5MB (received ${(imageBuffer.length / (1024 * 1024)).toFixed(2)} MB).`,
    });
  }

  // 5. Validate Magic Bytes / Format
  const { valid, mime } = validateImageMagicBytes(imageBuffer);
  if (!valid) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported image format. Allowed formats are JPEG, PNG, WebP, and GIF.',
    });
  }

  // 6. Upstream Forwarding to ImgBB
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    const upstreamFormData = new FormData();
    upstreamFormData.append('image', rawBase64);
    if (name) {
      upstreamFormData.append('name', name);
    }

    const upstreamResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        body: upstreamFormData,
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const upstreamData = (await upstreamResponse.json()) as any;

    if (upstreamResponse.ok && upstreamData?.success && upstreamData?.data?.url) {
      // Return minimum required response data. NEVER leak the key or full upstream request
      return res.status(200).json({
        success: true,
        url: upstreamData.data.url,
        display_url: upstreamData.data.display_url || upstreamData.data.url,
        width: upstreamData.data.width,
        height: upstreamData.data.height,
        mime,
      });
    }

    const rawError = upstreamData?.error?.message;
    const safeError = sanitizeUpstreamError(rawError);
    const statusCode = upstreamResponse.status >= 400 && upstreamResponse.status < 500 ? 400 : 502;

    return res.status(statusCode).json({
      success: false,
      error: safeError,
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
      error: 'Unable to reach the image hosting service. Please try again later.',
    });
  }
}
