/**
 * ImgBB Client-Side Compression and Secure Server-Side Upload Integration
 *
 * SECURITY ARCHITECTURE:
 * - Direct browser-to-ImgBB calls have been eliminated to prevent credential exposure.
 * - All uploads are routed securely through the /api/upload server-side endpoint.
 * - Private API keys are never stored in localStorage, sessionStorage, or client bundles.
 */

export interface UploadProgressCallback {
  (percentage: number): void;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  displayUrl?: string;
  fallbackUrl?: string;
  error?: string;
}

export interface UploadServiceStatus {
  configured: boolean;
  service: string;
  status: 'available' | 'unavailable';
  message: string;
}

/**
 * Checks server-side upload service health and configuration status.
 * Never exposes API keys or credentials.
 */
export async function checkUploadServiceStatus(): Promise<UploadServiceStatus> {
  try {
    const res = await fetch('/api/status', {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return {
        configured: false,
        service: 'imgbb',
        status: 'unavailable',
        message: 'Upload service responded with an error.',
      };
    }
    const data = await res.json();
    return {
      configured: Boolean(data?.configured),
      service: data?.service || 'imgbb',
      status: data?.status === 'available' ? 'available' : 'unavailable',
      message: data?.message || 'Status check complete.',
    };
  } catch {
    return {
      configured: false,
      service: 'imgbb',
      status: 'unavailable',
      message: 'Unable to connect to upload service.',
    };
  }
}

/**
 * Validates a direct image URL for the Direct Image URL workflow.
 * Enforces HTTPS/HTTP, rejects untrusted schemes (javascript:, data:, file:)
 * and prevents SSRF by processing the URL purely on the client.
 */
export function validateDirectImageUrl(rawUrl: string): {
  isValid: boolean;
  url: string;
  error?: string;
} {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return { isValid: false, url: '', error: 'Please enter an image URL.' };
  }

  // Reject dangerous schemes
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

/**
 * Compresses an image client-side before upload to reduce network latency and payload size.
 * Max dimension: 1920px. Target format: JPEG (quality 0.85).
 */
export async function compressImage(fileOrBlob: File | Blob, maxDimension = 1920): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If file is already small (under 600KB) and in supported format, return as-is
    if (fileOrBlob.size <= 600 * 1024 && ['image/jpeg', 'image/png', 'image/webp'].includes(fileOrBlob.type)) {
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
        0.85
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
 * Converts a Blob or File to a Base64 string for transmission
 */
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to convert image to base64.'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Uploads an image securely via the server-side proxy endpoint (/api/upload).
 * Never uses or requires a client-side API key.
 */
export async function uploadToImgBB(
  fileOrBlob: File | Blob,
  onProgress?: UploadProgressCallback,
  fileName?: string
): Promise<UploadResult> {
  try {
    onProgress?.(15);

    // 1. Client-side compression
    const compressedBlob = await compressImage(fileOrBlob);
    onProgress?.(30);

    // 2. Convert to base64 data URL
    const base64Data = await blobToBase64(compressedBlob);
    onProgress?.(45);

    // 3. Send to server-side endpoint with progress tracking
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round(45 + (event.loaded / event.total) * 50);
          onProgress?.(Math.min(percent, 95));
        }
      };

      xhr.onload = () => {
        onProgress?.(100);
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && res.success) {
            resolve({
              success: true,
              url: res.url,
              displayUrl: res.display_url || res.url,
            });
          } else {
            const errorMsg =
              res.error ||
              (xhr.status === 503
                ? 'Image upload service is not configured on the server. Please configure IMGBB_API_KEY in Vercel environment variables.'
                : `Upload failed with status code ${xhr.status}.`);
            resolve({
              success: false,
              error: errorMsg,
            });
          }
        } catch {
          resolve({
            success: false,
            error: 'Invalid response from image upload server.',
          });
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          error: 'Network connection error while uploading to the server.',
        });
      };

      const payload = JSON.stringify({
        image: base64Data,
        name: fileName || (fileOrBlob instanceof File ? fileOrBlob.name : undefined),
      });

      xhr.send(payload);
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error occurred.';
    return {
      success: false,
      error: message,
    };
  }
}
