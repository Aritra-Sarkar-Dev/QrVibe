/**
 * Vercel Serverless Function: api/upload.js
 * Reads IMGBB_API_KEY from process.env (trimming whitespace and quotes),
 * uploads to https://api.imgbb.com/1/upload using FormData with field "image",
 * and always returns JSON only.
 */

export default async function handler(req, res) {
  // Always return JSON
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const rawKey = process.env.IMGBB_API_KEY;
    if (!rawKey || typeof rawKey !== 'string') {
      return res.status(503).json({ error: 'IMGBB_API_KEY is not set' });
    }

    const apiKey = rawKey.replace(/^["']|["']$/g, '').trim();
    if (!apiKey || apiKey === 'PASTE_YOUR_IMGBB_KEY_HERE') {
      return res.status(503).json({ error: 'IMGBB_API_KEY is not set' });
    }

    const body = req.body;
    if (!body || !body.image || typeof body.image !== 'string') {
      return res.status(400).json({ error: 'Invalid request body. Expected base64 image string.' });
    }

    let rawBase64 = body.image.trim();
    const matches = rawBase64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches) {
      rawBase64 = matches[2];
    }

    const formData = new FormData();
    formData.append('image', rawBase64);
    if (body.name) {
      formData.append('name', String(body.name).slice(0, 50));
    }

    const upstreamResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const text = await upstreamResponse.text();
    let upstreamData;
    try {
      upstreamData = JSON.parse(text);
    } catch {
      return res.status(upstreamResponse.status || 500).json({
        error: `ImgBB upstream error (HTTP ${upstreamResponse.status}): ${text.slice(0, 100)}`,
      });
    }

    if (upstreamResponse.ok && upstreamData && upstreamData.success && upstreamData.data && upstreamData.data.url) {
      return res.status(200).json({
        success: true,
        url: upstreamData.data.url,
      });
    }

    const errorMsg =
      (upstreamData && upstreamData.error && upstreamData.error.message) ||
      upstreamResponse.statusText ||
      'Upload failed';

    return res.status(upstreamResponse.status || 500).json({ error: errorMsg });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error during upload' });
  }
}
