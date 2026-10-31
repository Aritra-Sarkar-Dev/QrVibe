/**
 * Server-Side Configuration Endpoint
 *
 * Securely exposes runtime configuration (such as ImgBB API key) to the authenticated browser client
 * at runtime, preventing any hardcoded secrets in static source code or GitHub repositories.
 */

export default function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader?.('Allow', 'GET');
    return res.status(405).json({ success: false, error: 'Method not allowed. Use GET.' });
  }

  const apiKey = process.env.IMGBB_API_KEY?.trim() || '';
  const isValid = Boolean(
    apiKey &&
    apiKey !== 'PASTE_YOUR_SERVER_SIDE_IMGBB_KEY_HERE' &&
    apiKey.length >= 16
  );

  return res.status(200).json({
    apiKey: isValid ? apiKey : '',
    configured: isValid,
  });
}
