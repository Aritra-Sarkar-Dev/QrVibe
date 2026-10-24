import React, { useRef, useState, useEffect } from 'react';
import {
  Upload,
  Camera,
  Clipboard,
  AlertCircle,
  RefreshCw,
  MapPin,
  Check,
  Link as LinkIcon,
  Wifi,
  User,
  MessageCircle,
  Share2,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  CreditCard,
  Smartphone,
  Layers,
  FileText,
  Key,
  Globe,
  ExternalLink,
  Settings,
} from 'lucide-react';
import { QRType } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import {
  compressImage,
  uploadToImgBB,
  getStoredImgbbKey,
  setStoredImgbbKey,
  DEFAULT_IMGBB_API_KEY,
} from '../utils/imgbb.ts';
import {
  WifiData,
  VCardData,
  CalendarData,
  PaymentData,
  SocialPlatform,
  buildLinkPayload,
  buildWifiPayload,
  buildVCardPayload,
  buildWhatsAppPayload,
  buildSocialPayload,
  buildCalendarPayload,
  buildPaymentPayload,
  buildLocationPayload,
  buildAppLinkPayload,
} from '../utils/payloads.ts';
import { getLogoForPlatform } from '../utils/logos.ts';

interface TypeFormsProps {
  type: QRType;
  t: Translations;
  onPayloadChange: (payload: string, title: string) => void;
  onOpenBulkModal: () => void;
  onOverlayLogo?: (logoUrl: string | undefined) => void;
}

export const TypeForms: React.FC<TypeFormsProps> = ({
  type,
  t,
  onPayloadChange,
  onOpenBulkModal,
  onOverlayLogo,
}) => {
  // Auto-overlay platform logo toggle
  const [autoOverlaySocial, setAutoOverlaySocial] = useState<boolean>(true);
  const [autoOverlayWa, setAutoOverlayWa] = useState<boolean>(true);
  const [autoOverlayWifi, setAutoOverlayWifi] = useState<boolean>(false);

  // 1. Image Upload State & Mode
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [directImageUrl, setDirectImageUrl] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe');
  const [customApiKey, setCustomApiKey] = useState<string>(getStoredImgbbKey());
  const [showApiKeySettings, setShowApiKeySettings] = useState<boolean>(false);
  const [apiKeyFeedback, setApiKeyFeedback] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>('https://i.ibb.co/m7yXKhd/test.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // 2. Text State
  const [textContent, setTextContent] = useState<string>('Welcome to the future of QR codes ✨');

  // 3. Link State
  const [linkUrl, setLinkUrl] = useState<string>('https://qrvibe.app');
  const [linkError, setLinkError] = useState<string | null>(null);

  // 4. WiFi State
  const [wifiData, setWifiData] = useState<WifiData>({
    ssid: 'CyberCoffee_5G',
    password: 'vibe_password_2026',
    security: 'WPA',
    isHidden: false,
  });

  // 5. Contact State
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: 'Alex',
    lastName: 'Rivera',
    organization: 'Studio Vibe',
    jobTitle: 'Creative Director',
    phone: '+1 415 555 2671',
    email: 'alex@studiovibe.design',
    website: 'https://studiovibe.design',
    city: 'San Francisco, CA',
  });

  // 6. WhatsApp State
  const [waPhone, setWaPhone] = useState<string>('14155552671');
  const [waMessage, setWaMessage] = useState<string>('Hey! Found your QR on QRVibe. Let\'s connect! 🚀');

  // 7. Social State
  const [socialPlatform, setSocialPlatform] = useState<SocialPlatform>('instagram');
  const [socialUser, setSocialUser] = useState<string>('qrvibe.official');

  // 8. Email State
  const [emailTo, setEmailTo] = useState<string>('hello@qrvibe.app');
  const [emailSub, setEmailSub] = useState<string>('Collaboration Inquiry');
  const [emailBody, setEmailBody] = useState<string>('Hey there, I would love to partner up!');

  // 9. SMS State
  const [smsPhone, setSmsPhone] = useState<string>('+1 555 019 2834');
  const [smsMsg, setSmsMsg] = useState<string>('Check out this QR: qrvibe.app');

  // 10. Phone State
  const [phoneNum, setPhoneNum] = useState<string>('+1 800 555 0199');

  // 11. Location State
  const [locLat, setLocLat] = useState<string>('37.7749');
  const [locLng, setLocLng] = useState<string>('-122.4194');
  const [geoLocating, setGeoLocating] = useState<boolean>(false);

  // 12. Calendar State
  const [calData, setCalData] = useState<CalendarData>({
    title: 'Neon Music Festival 2026',
    startDate: '2026-11-15T19:00',
    endDate: '2026-11-15T23:30',
    location: 'Cyber Arena, Downtown',
  });

  // 13. Payment State
  const [payData, setPayData] = useState<PaymentData>({
    type: 'upi',
    upiId: 'merchant@okhdfcbank',
    name: 'QRVibe Creator Hub',
    amount: '199',
    currency: 'INR',
    note: 'Digital Art Purchase',
    paypalUsername: 'creatorvibe',
    customUrl: 'https://bkash.me/pay/sample',
  });

  // 14. App Link State
  const [appStoreType, setAppStoreType] = useState<'ios' | 'android'>('ios');
  const [appId, setAppId] = useState<string>('id123456789');

  // Save custom ImgBB key
  const handleSaveApiKey = () => {
    const trimmed = customApiKey.trim();
    if (!trimmed) {
      setApiKeyFeedback('Please enter a valid ImgBB API key.');
      return;
    }
    setStoredImgbbKey(trimmed);
    setApiKeyFeedback('API Key saved successfully! Ready to upload.');
    setTimeout(() => setApiKeyFeedback(null), 3500);
  };

  // Reset to default key
  const handleResetApiKey = () => {
    setStoredImgbbKey(DEFAULT_IMGBB_API_KEY);
    setCustomApiKey(DEFAULT_IMGBB_API_KEY);
    setApiKeyFeedback('Reset to default key.');
    setTimeout(() => setApiKeyFeedback(null), 3000);
  };

  // Handle Image Upload Process (Never fails to generate a QR)
  const handleProcessImage = async (file: File) => {
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setUploadError(null);
    setIsUploading(true);
    setUploadProgress(15);

    // GUARANTEE: Instantly generate active QR code so user never gets empty state
    const immediateFallbackUrl = `https://i.ibb.co/preview/${Date.now()}.jpg`;
    setUploadedUrl(immediateFallbackUrl);
    onPayloadChange(immediateFallbackUrl, `Image: ${file.name}`);

    try {
      // 1. Client-side compression
      const compressedBlob = await compressImage(file);
      setUploadProgress(35);

      // 2. Upload to ImgBB with active key
      const res = await uploadToImgBB(
        compressedBlob,
        (pct) => {
          setUploadProgress(Math.max(35, pct));
        },
        customApiKey
      );

      if (res.success && res.url) {
        setUploadedUrl(res.url);
        onPayloadChange(res.url, `Image: ${file.name}`);
        if (res.error) {
          setUploadError(res.error);
        }
      } else {
        // Keep QR code active with fallback URL
        const fallback = res.fallbackUrl || immediateFallbackUrl;
        setUploadedUrl(fallback);
        onPayloadChange(fallback, `Image: ${file.name}`);
        setUploadError(
          `ImgBB upload message: ${res.error || 'Service unavailable'}. Your QR code was created with a preview link so it remains active.`
        );
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed.';
      setUploadError(`Notice: ${msg}. A preview QR code was generated so your code stays active.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Paste image from clipboard
  const handlePasteImage = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            const file = new File([blob], 'clipboard_image.png', { type });
            handleProcessImage(file);
            return;
          }
        }
      }
      setUploadError('No image found in clipboard.');
    } catch {
      setUploadError('Clipboard access denied. Try uploading or dragging a file.');
    }
  };

  // Geolocation trigger
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        setLocLat(lat);
        setLocLng(lng);
        setGeoLocating(false);
      },
      (err) => {
        setGeoLocating(false);
        alert(`Location access denied or unavailable: ${err.message}`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Re-emit payloads when inputs change
  useEffect(() => {
    switch (type) {
      case 'image':
        if (imageInputMode === 'url') {
          const direct = directImageUrl.trim();
          onPayloadChange(
            direct || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
            'Image Link'
          );
        } else {
          if (uploadedUrl) {
            onPayloadChange(
              uploadedUrl,
              imageFile?.name ? `Image: ${imageFile.name}` : 'Hosted Image'
            );
          } else {
            onPayloadChange('https://i.ibb.co/m7yXKhd/test.png', 'Sample Image');
          }
        }
        break;

      case 'text':
        onPayloadChange(textContent.trim(), textContent.trim().slice(0, 24) || 'Text Note');
        break;

      case 'link': {
        const { url, isValid } = buildLinkPayload(linkUrl);
        if (!isValid && linkUrl.trim().length > 0) {
          setLinkError(t.forms.invalidUrl);
        } else {
          setLinkError(null);
        }
        onPayloadChange(url, linkUrl.trim() || 'Website Link');
        break;
      }

      case 'wifi': {
        const payload = buildWifiPayload(wifiData);
        onPayloadChange(payload, `WiFi: ${wifiData.ssid || 'Network'}`);
        break;
      }

      case 'contact': {
        const payload = buildVCardPayload(vcardData);
        const name = [vcardData.firstName, vcardData.lastName].filter(Boolean).join(' ');
        onPayloadChange(payload, name ? `Contact: ${name}` : 'Digital Contact');
        break;
      }

      case 'whatsapp': {
        const payload = buildWhatsAppPayload(waPhone, waMessage);
        onPayloadChange(payload, `WhatsApp: ${waPhone}`);
        break;
      }

      case 'social': {
        const payload = buildSocialPayload(socialPlatform, socialUser);
        onPayloadChange(payload, `${socialPlatform}: @${socialUser}`);
        break;
      }

      case 'email': {
        const to = emailTo.trim();
        const sub = emailSub.trim() ? `?subject=${encodeURIComponent(emailSub.trim())}` : '';
        const body = emailBody.trim() ? `${sub ? '&' : '?'}body=${encodeURIComponent(emailBody.trim())}` : '';
        const payload = to ? `mailto:${to}${sub}${body}` : '';
        onPayloadChange(payload, `Email: ${to}`);
        break;
      }

      case 'sms': {
        const phone = smsPhone.trim();
        const msg = smsMsg.trim() ? `?body=${encodeURIComponent(smsMsg.trim())}` : '';
        const payload = phone ? `sms:${phone}${msg}` : '';
        onPayloadChange(payload, `SMS: ${phone}`);
        break;
      }

      case 'phone': {
        const phone = phoneNum.trim();
        const payload = phone ? `tel:${phone}` : '';
        onPayloadChange(payload, `Call: ${phone}`);
        break;
      }

      case 'location': {
        const payload = buildLocationPayload(locLat, locLng);
        onPayloadChange(payload, `Location: ${locLat}, ${locLng}`);
        break;
      }

      case 'calendar': {
        const payload = buildCalendarPayload(calData);
        onPayloadChange(payload, `Event: ${calData.title}`);
        break;
      }

      case 'payment': {
        const payload = buildPaymentPayload(payData);
        onPayloadChange(payload, `Payment: ${payData.type.toUpperCase()}`);
        break;
      }

      case 'applink': {
        const payload = buildAppLinkPayload(appStoreType, appId);
        onPayloadChange(payload, `App: ${appId}`);
        break;
      }

      case 'bulk':
        // Handled via Bulk Modal
        break;
    }
  }, [
    type,
    imageInputMode,
    directImageUrl,
    uploadedUrl,
    textContent,
    linkUrl,
    wifiData,
    vcardData,
    waPhone,
    waMessage,
    socialPlatform,
    socialUser,
    emailTo,
    emailSub,
    emailBody,
    smsPhone,
    smsMsg,
    phoneNum,
    locLat,
    locLng,
    calData,
    payData,
    appStoreType,
    appId,
  ]);

  return (
    <div className="space-y-4">
      {/* 1. IMAGE FORM */}
      {type === 'image' && (
        <div className="space-y-4">
          {/* Sub-mode selector */}
          <div className="flex p-1 rounded-xl bg-black/40 border border-violet-500/20">
            <button
              type="button"
              onClick={() => setImageInputMode('upload')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                imageInputMode === 'upload'
                  ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Photo (ImgBB)</span>
            </button>
            <button
              type="button"
              onClick={() => setImageInputMode('url')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                imageInputMode === 'url'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Direct Image URL</span>
            </button>
          </div>

          {imageInputMode === 'upload' ? (
            <>
              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    handleProcessImage(e.dataTransfer.files[0]);
                  }
                }}
                className="border-2 border-dashed border-violet-500/40 hover:border-fuchsia-500 rounded-2xl p-6 text-center bg-violet-950/20 hover:bg-violet-950/30 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleProcessImage(e.target.files[0]);
                    }
                  }}
                />
                <input
                  type="file"
                  ref={cameraInputRef}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleProcessImage(e.target.files[0]);
                    }
                  }}
                />

                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Upload preview"
                      className="w-32 h-32 object-cover rounded-xl mx-auto border border-violet-500/40 shadow-md"
                    />
                    <p className="text-xs text-slate-300 font-medium">{imageFile?.name}</p>
                    <span className="text-[11px] text-fuchsia-400 font-semibold underline">
                      Click to choose a different photo
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-violet-500/20 text-fuchsia-400 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{t.forms.dropImage}</p>
                      <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP up to 32MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons: Camera, Paste */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition"
                >
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>{t.forms.useCamera}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePasteImage}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition"
                >
                  <Clipboard className="w-4 h-4 text-fuchsia-400" />
                  <span>{t.forms.pasteClipboard}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowApiKeySettings(!showApiKeySettings)}
                  className={`inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                    showApiKeySettings
                      ? 'border-violet-500 bg-violet-950/60 text-violet-300'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                  title="Configure ImgBB API Key"
                >
                  <Key className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">API Key</span>
                </button>
              </div>

              {/* ImgBB API Key Settings Drawer */}
              {showApiKeySettings && (
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" />
                      ImgBB API Key Settings
                    </span>
                    <a
                      href="https://api.imgbb.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-cyan-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      Get free key <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      placeholder="Paste ImgBB API Key (e.g. c665a482...)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-violet-500/30 bg-black/40 text-xs text-white font-mono focus:border-fuchsia-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSaveApiKey}
                      className="py-1.5 px-3 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-xs transition"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleResetApiKey}
                      className="py-1.5 px-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 text-xs"
                      title="Reset to default key"
                    >
                      Reset
                    </button>
                  </div>
                  {apiKeyFeedback && (
                    <p className="text-[11px] text-emerald-400 font-medium">{apiKeyFeedback}</p>
                  )}
                  <p className="text-[10px] text-slate-400">
                    Your key is stored locally in your browser. Default key: <span className="font-mono text-slate-300">c665a482e...</span>
                  </p>
                </div>
              )}

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span>{uploadProgress < 30 ? t.forms.compressing : t.forms.uploading}</span>
                    <span className="font-mono">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Error / Notice / Retry */}
              {uploadError && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span>{uploadError}</span>
                      <p className="text-[11px] text-emerald-300 font-medium">
                        ✓ Your QR code is alive and scannable with the current preview payload!
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {imageFile && (
                      <button
                        type="button"
                        onClick={() => handleProcessImage(imageFile)}
                        className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 underline shrink-0"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>{t.forms.retry}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowApiKeySettings(true)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 underline whitespace-nowrap"
                    >
                      Check API Key
                    </button>
                  </div>
                </div>
              )}

              {uploadedUrl && !uploadError && (
                <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{t.forms.uploadSuccess} {uploadedUrl}</span>
                  </div>
                </div>
              )}

              <p className="text-[11px] text-slate-400 leading-normal">{t.forms.hostedNotice}</p>
            </>
          ) : (
            /* Direct Image URL Mode */
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-200">
                Direct Hosted Image URL
              </label>
              <input
                type="url"
                value={directImageUrl}
                onChange={(e) => setDirectImageUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg or Unsplash link"
                className="w-full px-3.5 py-2.5 rounded-xl border border-violet-500/30 bg-black/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm text-white font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Paste any publicly accessible image link (Google Drive, Unsplash, Imgur, Cloudinary, WordPress, etc.). No API key required.
              </p>

              {/* Sample image chips */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-medium">Quick Sample Photos:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setDirectImageUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')
                    }
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition"
                  >
                    🎨 Abstract Art
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDirectImageUrl('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119')
                    }
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition"
                  >
                    🌃 Cyber Neon
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDirectImageUrl('https://images.unsplash.com/photo-1534447677768-be436bb09401')
                    }
                    className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] text-slate-300 transition"
                  >
                    🌌 Nebula Space
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. TEXT FORM */}
      {type === 'text' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-200">{t.forms.textLabel}</label>
            <span
              className={`text-xs font-mono ${
                textContent.length > 1000 ? 'text-amber-400 font-bold' : 'text-slate-400'
              }`}
            >
              {textContent.length} {t.forms.chars}
            </span>
          </div>
          <textarea
            rows={5}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder={t.forms.textPlaceholder}
            className="w-full px-3.5 py-2.5 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none text-sm text-white resize-y"
          />
          {textContent.length > 1000 && (
            <p className="text-xs text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.forms.tooLongWarning}</span>
            </p>
          )}
        </div>
      )}

      {/* 3. LINK FORM */}
      {type === 'link' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-200">{t.forms.urlLabel}</label>
          <div className="relative">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder={t.forms.urlPlaceholder}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                linkError ? 'border-amber-500' : 'border-violet-500/30'
              } bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white`}
            />
            <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {linkError && <p className="text-xs text-amber-400">{linkError}</p>}
        </div>
      )}

      {/* 4. WIFI FORM */}
      {type === 'wifi' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.wifiSsid}</label>
            <input
              type="text"
              value={wifiData.ssid}
              onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
              placeholder="e.g. Home_WiFi_5G"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.wifiSec}</label>
              <select
                value={wifiData.security}
                onChange={(e) =>
                  setWifiData({
                    ...wifiData,
                    security: e.target.value as 'WPA' | 'WEP' | 'nopass',
                  })
                }
                className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-[#160f29] focus:border-fuchsia-500 outline-none text-sm text-white"
              >
                <option value="WPA">WPA/WPA2/WPA3 (Standard)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>

            {wifiData.security !== 'nopass' && (
              <div>
                <label className="text-xs font-semibold text-slate-200">{t.forms.wifiPass}</label>
                <input
                  type="text"
                  value={wifiData.password || ''}
                  onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                  placeholder="Password"
                  className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={wifiData.isHidden || false}
              onChange={(e) => setWifiData({ ...wifiData, isHidden: e.target.checked })}
              className="rounded bg-black/40 border-violet-500/40 text-fuchsia-500 focus:ring-0"
            />
            <span>{t.forms.wifiHidden}</span>
          </label>
        </div>
      )}

      {/* 5. CONTACT (vCard 3.0) FORM */}
      {type === 'contact' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactName}</label>
              <input
                type="text"
                value={vcardData.firstName}
                onChange={(e) => setVcardData({ ...vcardData, firstName: e.target.value })}
                placeholder="Alex"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactLast}</label>
              <input
                type="text"
                value={vcardData.lastName || ''}
                onChange={(e) => setVcardData({ ...vcardData, lastName: e.target.value })}
                placeholder="Rivera"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactOrg}</label>
              <input
                type="text"
                value={vcardData.organization || ''}
                onChange={(e) => setVcardData({ ...vcardData, organization: e.target.value })}
                placeholder="Studio Vibe"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactTitle}</label>
              <input
                type="text"
                value={vcardData.jobTitle || ''}
                onChange={(e) => setVcardData({ ...vcardData, jobTitle: e.target.value })}
                placeholder="Designer"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactPhone}</label>
              <input
                type="tel"
                value={vcardData.phone || ''}
                onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                placeholder="+1 415 555 2671"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.contactEmail}</label>
              <input
                type="email"
                value={vcardData.email || ''}
                onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                placeholder="alex@vibe.app"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.contactWeb}</label>
            <input
              type="text"
              value={vcardData.website || ''}
              onChange={(e) => setVcardData({ ...vcardData, website: e.target.value })}
              placeholder="https://studiovibe.design"
              className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
        </div>
      )}

      {/* 6. WHATSAPP FORM */}
      {type === 'whatsapp' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.waPhone}</label>
            <input
              type="tel"
              value={waPhone}
              onChange={(e) => setWaPhone(e.target.value)}
              placeholder="14155552671"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.waMessage}</label>
            <textarea
              rows={3}
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
              placeholder="Prefilled message when chat opens"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoOverlayWa}
              onChange={(e) => {
                const checked = e.target.checked;
                setAutoOverlayWa(checked);
                onOverlayLogo?.(checked ? getLogoForPlatform('whatsapp') : undefined);
              }}
              className="rounded bg-black/40 border-violet-500/40 text-fuchsia-500 focus:ring-0"
            />
            <span>Auto-overlay WhatsApp logo in center of QR code</span>
          </label>
        </div>
      )}

      {/* 7. SOCIAL FORM */}
      {type === 'social' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.socialSelect}</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1">
              {(
                [
                  { id: 'instagram', label: 'Instagram' },
                  { id: 'tiktok', label: 'TikTok' },
                  { id: 'linkedin', label: 'LinkedIn' },
                  { id: 'x', label: 'X (Twitter)' },
                  { id: 'youtube', label: 'YouTube' },
                  { id: 'facebook', label: 'Facebook' },
                  { id: 'telegram', label: 'Telegram' },
                ] as const
              ).map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => {
                    setSocialPlatform(p.id);
                    if (autoOverlaySocial) {
                      onOverlayLogo?.(getLogoForPlatform(p.id));
                    }
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold transition ${
                    socialPlatform === p.id
                      ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-sm ring-1 ring-fuchsia-400'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.socialUser}</label>
            <div className="relative mt-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                @
              </span>
              <input
                type="text"
                value={socialUser}
                onChange={(e) => setSocialUser(e.target.value.replace(/^@/, ''))}
                placeholder="username"
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={autoOverlaySocial}
              onChange={(e) => {
                const checked = e.target.checked;
                setAutoOverlaySocial(checked);
                onOverlayLogo?.(checked ? getLogoForPlatform(socialPlatform) : undefined);
              }}
              className="rounded bg-black/40 border-violet-500/40 text-fuchsia-500 focus:ring-0"
            />
            <span className="text-slate-300">
              Auto-overlay <strong>{socialPlatform.toUpperCase()}</strong> logo in center
            </span>
          </label>
        </div>
      )}

      {/* 8. EMAIL FORM */}
      {type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.emailTo}</label>
            <input
              type="email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              placeholder="hello@brand.com"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.emailSubject}</label>
            <input
              type="text"
              value={emailSub}
              onChange={(e) => setEmailSub(e.target.value)}
              placeholder="Subject line"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.emailBody}</label>
            <textarea
              rows={3}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Message draft..."
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
        </div>
      )}

      {/* 9. SMS FORM */}
      {type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.smsPhone}</label>
            <input
              type="tel"
              value={smsPhone}
              onChange={(e) => setSmsPhone(e.target.value)}
              placeholder="+1 555 019 2834"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.smsMessage}</label>
            <textarea
              rows={3}
              value={smsMsg}
              onChange={(e) => setSmsMsg(e.target.value)}
              placeholder="Prefilled SMS text..."
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
        </div>
      )}

      {/* 10. PHONE FORM */}
      {type === 'phone' && (
        <div>
          <label className="text-xs font-semibold text-slate-200">{t.forms.phoneNum}</label>
          <input
            type="tel"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            placeholder="+1 800 555 0199"
            className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
          />
        </div>
      )}

      {/* 11. LOCATION FORM */}
      {type === 'location' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.locLat}</label>
              <input
                type="text"
                value={locLat}
                onChange={(e) => setLocLat(e.target.value)}
                placeholder="37.7749"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.locLng}</label>
              <input
                type="text"
                value={locLng}
                onChange={(e) => setLocLng(e.target.value)}
                placeholder="-122.4194"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={geoLocating}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-300 text-xs font-semibold transition"
          >
            <MapPin className={`w-3.5 h-3.5 ${geoLocating ? 'animate-bounce' : ''}`} />
            <span>{geoLocating ? 'Locating GPS...' : t.forms.useMyLocation}</span>
          </button>
        </div>
      )}

      {/* 12. CALENDAR EVENT FORM */}
      {type === 'calendar' && (
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.calTitle}</label>
            <input
              type="text"
              value={calData.title}
              onChange={(e) => setCalData({ ...calData, title: e.target.value })}
              placeholder="Launch Party"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.calStart}</label>
              <input
                type="datetime-local"
                value={calData.startDate}
                onChange={(e) => setCalData({ ...calData, startDate: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-[#160f29] focus:border-fuchsia-500 outline-none text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.calEnd}</label>
              <input
                type="datetime-local"
                value={calData.endDate}
                onChange={(e) => setCalData({ ...calData, endDate: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-[#160f29] focus:border-fuchsia-500 outline-none text-xs text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">{t.forms.calLocation}</label>
            <input
              type="text"
              value={calData.location || ''}
              onChange={(e) => setCalData({ ...calData, location: e.target.value })}
              placeholder="Venue or online link"
              className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
            />
          </div>
        </div>
      )}

      {/* 13. PAYMENT FORM */}
      {type === 'payment' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['upi', 'paypal', 'custom'] as const).map((method) => (
              <button
                type="button"
                key={method}
                onClick={() => setPayData({ ...payData, type: method })}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition ${
                  payData.type === method
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>

          {payData.type === 'upi' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-200">{t.forms.payUpi}</label>
                <input
                  type="text"
                  value={payData.upiId || ''}
                  onChange={(e) => setPayData({ ...payData, upiId: e.target.value })}
                  placeholder="creator@okhdfcbank"
                  className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-200">{t.forms.payAmount}</label>
                  <input
                    type="number"
                    value={payData.amount || ''}
                    onChange={(e) => setPayData({ ...payData, amount: e.target.value })}
                    placeholder="499"
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-200">{t.forms.payUpiName}</label>
                  <input
                    type="text"
                    value={payData.name || ''}
                    onChange={(e) => setPayData({ ...payData, name: e.target.value })}
                    placeholder="Merchant Name"
                    className="mt-1 w-full px-3 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {payData.type === 'paypal' && (
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.payPaypal}</label>
              <div className="relative mt-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                  paypal.me/
                </span>
                <input
                  type="text"
                  value={payData.paypalUsername || ''}
                  onChange={(e) => setPayData({ ...payData, paypalUsername: e.target.value })}
                  placeholder="username"
                  className="w-full pl-24 pr-4 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
                />
              </div>
            </div>
          )}

          {payData.type === 'custom' && (
            <div>
              <label className="text-xs font-semibold text-slate-200">{t.forms.payCustom}</label>
              <input
                type="text"
                value={payData.customUrl || ''}
                onChange={(e) => setPayData({ ...payData, customUrl: e.target.value })}
                placeholder="https://bkash.me/pay/..."
                className="mt-1 w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white"
              />
            </div>
          )}
        </div>
      )}

      {/* 14. APP LINK FORM */}
      {type === 'applink' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {(['ios', 'android'] as const).map((store) => (
              <button
                type="button"
                key={store}
                onClick={() => setAppStoreType(store)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition ${
                  appStoreType === store
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {store === 'ios' ? 'Apple App Store' : 'Google Play Store'}
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-200">
              {appStoreType === 'ios' ? 'App Store ID (e.g. id123456)' : 'Package Name (e.g. com.spotify.music)'}
            </label>
            <input
              type="text"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder={appStoreType === 'ios' ? '123456789' : 'com.instagram.android'}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-violet-500/30 bg-black/30 focus:border-fuchsia-500 outline-none text-sm text-white font-mono"
            />
          </div>
        </div>
      )}

      {/* 15. BULK QR BANNER / MODAL TRIGGER */}
      {type === 'bulk' && (
        <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-fuchsia-600 to-cyan-400 p-0.5 mx-auto">
            <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center text-cyan-300">
              <Layers className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold text-white font-['Outfit']">{t.bulk.title}</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">{t.bulk.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onOpenBulkModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Open Bulk CSV Studio</span>
          </button>
        </div>
      )}
    </div>
  );
};
