/**
 * Diagnostic Endpoint: GET /api/upload-status
 * Returns { keyPresent: boolean, keyLength: number, keyTail: string } without ever exposing the full key.
 */

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader?.('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  const rawKey = process.env.IMGBB_API_KEY;
  const apiKey =
    rawKey && typeof rawKey === 'string'
      ? rawKey.replace(/^["']|["']$/g, '').trim()
      : '';

  const keyPresent = Boolean(
    apiKey &&
    apiKey !== 'PASTE_YOUR_IMGBB_KEY_HERE' &&
    apiKey !== 'PASTE_YOUR_SERVER_SIDE_IMGBB_KEY_HERE' &&
    apiKey.length >= 10
  );
  const keyLength = keyPresent ? apiKey.length : 0;
  const keyTail = keyPresent && apiKey.length >= 4 ? apiKey.slice(-4) : '';

  return res.status(200).json({
    keyPresent,
    keyLength,
    keyTail,
  });
}
