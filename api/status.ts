/**
 * Server-Side Image Upload Service Status Endpoint
 *
 * Checks whether IMGBB_API_KEY is configured in server environment variables.
 * Never leaks the API key, length, or partial characters to the client.
 */

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader?.('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  const rawKey = process.env.IMGBB_API_KEY?.trim();
  // Safe verification: must be present and not a default placeholder
  const isConfigured = Boolean(
    rawKey &&
    rawKey !== 'PASTE_YOUR_IMGBB_KEY_HERE' &&
    rawKey.length >= 16
  );

  return res.status(200).json({
    configured: isConfigured,
    service: 'imgbb',
    status: isConfigured ? 'available' : 'unavailable',
    message: isConfigured
      ? 'Image upload service is configured and operational.'
      : 'Image upload service requires IMGBB_API_KEY configured in server environment variables.',
  });
}
