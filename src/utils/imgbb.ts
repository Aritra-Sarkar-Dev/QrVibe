/**
 * ImgBB Image Upload and Client-side Compression Engine
 *
 * SECURITY NOTICE:
 * In a high-traffic production application, direct browser-to-ImgBB API calls expose
 * the API key in client network requests. Before deploying to public production traffic,
 * route these uploads through a lightweight serverless proxy (such as a Cloudflare Worker,
 * Netlify Function, or Express server route) to keep API secrets secure.
 */

export const DEFAULT_IMGBB_API_KEY = 'c665a482e29533e552e59e66bf8b07bc';

export function getStoredImgbbKey(): string {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('qrvibe_imgbb_key');
      if (saved && saved.trim()) return saved.trim();
    }
  } catch {
    // localStorage may be unavailable
  }
  return (
    (import.meta.env.VITE_IMGBB_API_KEY as string | undefined) ||
    (import.meta.env.IMGBB_API_KEY as string | undefined) ||
    DEFAULT_IMGBB_API_KEY
  );
}

export function setStoredImgbbKey(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('qrvibe_imgbb_key', key.trim());
    }
  } catch {
    // ignore
  }
}

// Config constant with environment variable fallback and user provided key
export const IMGBB_API_KEY = getStoredImgbbKey();

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

/**
 * Compresses an image client-side before upload to reduce payload size and upload time.
 * Max dimension: 1920px. Target format: JPEG (quality 0.82).
 */
export async function compressImage(file: File, maxDimension = 1920): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // If file is already small (under 800KB), return as-is
    if (file.size <= 800 * 1024 && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      resolve(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

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
        resolve(file);
        return;
      }

      // Draw with smooth scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            resolve(file);
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
 * Uploads an image to ImgBB using multipart/form-data.
 * Handles progress simulation and returns the hosted URL.
 */
export async function uploadToImgBB(
  fileOrBlob: File | Blob,
  onProgress?: UploadProgressCallback,
  overrideKey?: string
): Promise<UploadResult> {
  // Check if API key is configured
  const apiKey = (overrideKey || getStoredImgbbKey()).trim();
  const isPlaceholder = apiKey === 'PASTE_YOUR_IMGBB_KEY_HERE' || !apiKey;

  if (isPlaceholder) {
    onProgress?.(40);
    await new Promise((r) => setTimeout(r, 300));
    onProgress?.(80);
    await new Promise((r) => setTimeout(r, 200));
    onProgress?.(100);

    return {
      success: true,
      url: `https://i.ibb.co/demo-qr-vibe/${Date.now()}.jpg`,
      displayUrl: URL.createObjectURL(fileOrBlob),
      error:
        'Notice: Running with preview mock link. To enable direct live ImgBB hosting, set your ImgBB API key.',
    };
  }

  try {
    onProgress?.(15);
    const formData = new FormData();
    formData.append('image', fileOrBlob);

    // XMLHttpRequest allows real upload progress tracking
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 90);
          onProgress?.(Math.min(percent, 90));
        }
      };

      xhr.onload = () => {
        onProgress?.(100);
        try {
          const res = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && res.success) {
            resolve({
              success: true,
              url: res.data.url,
              displayUrl: res.data.display_url || res.data.url,
            });
          } else {
            const errorMsg =
              res.error?.message ||
              `Upload failed with status code ${xhr.status}.`;
            resolve({
              success: false,
              fallbackUrl: `https://i.ibb.co/demo-qr-vibe/${Date.now()}.jpg`,
              error: errorMsg,
            });
          }
        } catch {
          resolve({
            success: false,
            fallbackUrl: `https://i.ibb.co/demo-qr-vibe/${Date.now()}.jpg`,
            error: 'Invalid response from ImgBB server.',
          });
        }
      };

      xhr.onerror = () => {
        resolve({
          success: false,
          fallbackUrl: `https://i.ibb.co/demo-qr-vibe/${Date.now()}.jpg`,
          error: 'Network connection error while uploading to ImgBB.',
        });
      };

      xhr.send(formData);
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error occurred.';
    return {
      success: false,
      fallbackUrl: `https://i.ibb.co/demo-qr-vibe/${Date.now()}.jpg`,
      error: message,
    };
  }
}
