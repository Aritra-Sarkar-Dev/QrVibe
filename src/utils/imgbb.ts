/**
 * ImgBB Client-Side Compression & Secure Server-Side Proxy Integration
 *
 * Requirements:
 * - Server reads process.env.IMGBB_API_KEY fresh on every request (never sent to browser, no VITE_ prefix).
 * - Client compresses image to at most 1600px before uploading via /api/upload proxy.
 * - Diagnostic endpoint /api/upload-status returns keyLength and keyTail (last 4 chars).
 */

export interface UploadProgressCallback {
  (percentage: number): void;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  displayUrl?: string;
  error?: string;
}

export interface UploadServiceStatus {
  keyPresent: boolean;
  keyLength: number;
  keyTail: string;
}

export async function checkUploadServiceStatus(): Promise<UploadServiceStatus> {
  try {
    const res = await fetch('/api/upload-status');
    if (res.ok) {
      const data = await res.json();
      return {
        keyPresent: Boolean(data?.keyPresent),
        keyLength: data?.keyLength || 0,
        keyTail: data?.keyTail || '',
      };
    }
  } catch {
    // ignore
  }
  return { keyPresent: false, keyLength: 0, keyTail: '' };
}

export function validateDirectImageUrl(rawUrl: string): {
  isValid: boolean;
  url: string;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, url: '', error: 'Please enter an image URL.' };
  }

  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('blob:') ||
    lower.startsWith('file:')
  ) {
    return {
      isValid: false,
      url: '',
      error: 'Invalid URL format. Please use a valid web link starting with https://.',
    };
  }

  const urlWithProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(urlWithProtocol);
    const hasValidHost = parsed.hostname.includes('.') && parsed.hostname.length >= 4;
    const hasValidProtocol = ['http:', 'https:'].includes(parsed.protocol);

    if (!hasValidHost || !hasValidProtocol) {
      return {
        isValid: false,
        url: urlWithProtocol,
        error: 'Please enter a valid website hostname (e.g. https://images.unsplash.com/photo.jpg).',
      };
    }

    return {
      isValid: true,
      url: urlWithProtocol,
    };
  } catch {
    return {
      isValid: false,
      url: trimmed,
      error: 'Malformed URL. Please check the address format.',
    };
  }
}

export async function compressImage(fileOrBlob: File | Blob, maxDimension = 1600): Promise<Blob> {
  return new Promise((resolve, reject) => {
    if (fileOrBlob.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/webp'].includes(fileOrBlob.type)) {
      resolve(fileOrBlob);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(fileOrBlob);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(fileOrBlob);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(fileOrBlob);
          }
        },
        'image/jpeg',
        0.82
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to read and process image file.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads an image via the server-side proxy /api/upload.
 * The server reads process.env.IMGBB_API_KEY fresh on every request.
 */
export async function uploadToImgBB(
  fileOrBlob: File | Blob,
  onProgress?: UploadProgressCallback,
  fileName?: string
): Promise<UploadResult> {
  try {
    onProgress?.(15);
    const compressed = await compressImage(fileOrBlob, 1600);
    onProgress?.(40);

    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(compressed);
    });

    onProgress?.(60);

    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: base64Data,
        name: fileName || (fileOrBlob instanceof File ? fileOrBlob.name : 'upload.jpg'),
      }),
    });

    onProgress?.(90);

    const data = await res.json();

    if (res.ok && data.success && data.url) {
      onProgress?.(100);
      return {
        success: true,
        url: data.url,
        displayUrl: data.url,
      };
    } else {
      const errorMsg = data.error || `Upload failed with status ${res.status}`;
      return {
        success: false,
        error: errorMsg,
      };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error occurred.';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Uploads a logo file to ImgBB with graceful fallback returning null on failure.
 */
export async function uploadLogoToImgBB(file: File | Blob): Promise<string | null> {
  try {
    const res = await uploadToImgBB(file);
    if (res.success && res.url) {
      return res.url;
    }
    return null;
  } catch {
    return null;
  }
}
