/**
 * Color and WCAG Contrast Utilities
 * Calculates contrast ratios to prevent un-scannable QR codes.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RGB | null {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  if (clean.length !== 6) return null;

  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;

  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Calculates relative luminance as defined by WCAG 2.1
 */
export function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Returns WCAG contrast ratio between two hex colors (e.g., 4.5 means 4.5:1)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  if (hex2 === 'transparent' || !hex2) {
    // Treat transparent background as default white / dark background depending on context
    return 4.5;
  }

  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  if (!rgb1 || !rgb2) return 5.0; // Fallback safe value

  const l1 = getLuminance(rgb1);
  const l2 = getLuminance(rgb2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if a QR color combination is at risk of being un-scannable
 */
export function checkQRContrast(
  fgColor: string,
  bgColor: string
): { ratio: number; isLowContrast: boolean; warning?: string } {
  if (bgColor === 'transparent' || !bgColor) {
    return { ratio: 7.0, isLowContrast: false };
  }

  const ratio = parseFloat(getContrastRatio(fgColor, bgColor).toFixed(2));
  const isLowContrast = ratio < 3.0;

  let warning: string | undefined;
  if (isLowContrast) {
    warning = `Low contrast (${ratio}:1). Cameras may struggle to read this QR code. Increase contrast between dots and background.`;
  }

  return { ratio, isLowContrast, warning };
}
