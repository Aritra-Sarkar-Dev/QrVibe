import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import {
  Download,
  Share2,
  Copy,
  Sparkles,
  Check,
  Video,
  FileDown,
  Layers,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { QRStyleConfig, QRType } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import { AdSlot } from './AdSlot.tsx';
import { saveHistoryItem, incrementHistoryItemDownload } from '../utils/storage.ts';

interface QRPreviewProps {
  payload: string;
  title: string;
  type: QRType;
  styleConfig: QRStyleConfig;
  t: Translations;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  payload,
  title,
  type,
  styleConfig,
  t,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [includeWatermark, setIncludeWatermark] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#d946ef', '#8b5cf6', '#06b6d4', '#facc15'],
    });
  };

  // Convert our QRStyleConfig into qr-code-styling options
  const buildQROptions = (downloadSize?: number): Options => {
    const size = downloadSize || (isHdUnlocked ? 2048 : styleConfig.size);

    const dotsOptions: Options['dotsOptions'] = {
      type: styleConfig.dotsType,
      color: styleConfig.dotsColor,
    };

    if (styleConfig.gradient.enabled) {
      dotsOptions.gradient = {
        type: styleConfig.gradient.type,
        rotation: (styleConfig.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: styleConfig.gradient.color1 },
          { offset: 1, color: styleConfig.gradient.color2 },
        ],
      };
    }

    const cornersSquareOptions: Options['cornersSquareOptions'] = {
      type: styleConfig.cornerSquareType,
      color: styleConfig.cornerSquareColor || styleConfig.dotsColor,
    };

    const cornersDotOptions: Options['cornersDotOptions'] = {
      type: styleConfig.cornerDotType,
      color: styleConfig.cornerDotColor || styleConfig.dotsColor,
    };

    return {
      width: size,
      height: size,
      type: 'canvas',
      data: payload || 'https://qrvibe.app',
      margin: 12,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: styleConfig.errorCorrectionLevel,
      },
      image: styleConfig.logoUrl,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: styleConfig.logoSize,
        margin: styleConfig.logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions: {
        color: styleConfig.backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : styleConfig.backgroundColor,
      },
    };
  };

  // Initialize and update the QR code instance
  useEffect(() => {
    if (!payload.trim()) return;
    setIsRendering(true);

    const options = buildQROptions(320); // Render preview at responsive 320px

    if (!qrCodeInstanceRef.current) {
      qrCodeInstanceRef.current = new QRCodeStyling(options);
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        qrCodeInstanceRef.current.append(containerRef.current);
      }
    } else {
      qrCodeInstanceRef.current.update(options);
    }

    const timer = setTimeout(() => setIsRendering(false), 150);
    return () => clearTimeout(timer);
  }, [payload, styleConfig, isHdUnlocked]);

  // Auto-save generated QR to history
  const persistToHistory = (previewData?: string) => {
    if (!payload.trim()) return;
    saveHistoryItem({
      type,
      title: title || 'QR Code',
      payload,
      style: styleConfig,
      isFavorite: false,
      previewDataUrl: previewData,
    });
    incrementHistoryItemDownload(payload);
    onHistoryUpdated();
  };

  // High-res Download handler (PNG, SVG, JPEG)
  const handleDownload = async (format: 'png' | 'svg' | 'jpeg') => {
    if (!payload.trim()) return;
    setIsExporting(true);

    try {
      const exportSize = isHdUnlocked ? 2048 : Math.max(1024, styleConfig.size);
      const downloadQR = new QRCodeStyling(buildQROptions(exportSize));

      const filename = `QRVibe_${type}_${Date.now()}`;
      await downloadQR.download({ name: filename, extension: format });

      triggerConfetti();
      persistToHistory();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // PDF Export using jsPDF
  const handleDownloadPdf = async () => {
    if (!payload.trim()) return;
    setIsExporting(true);

    try {
      const exportSize = isHdUnlocked ? 2048 : 1024;
      const downloadQR = new QRCodeStyling(buildQROptions(exportSize));
      const raw = await downloadQR.getRawData('png');
      const blob = (raw as unknown as Blob) || null;

      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64data = reader.result as string;
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
          });

          // PDF Header
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(22);
          pdf.setTextColor(11, 8, 19);
          pdf.text('QRVibe Print Studio', 105, 30, { align: 'center' });

          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(11);
          pdf.setTextColor(100, 116, 139);
          pdf.text(`Generated on ${new Date().toLocaleDateString()} · Payload: ${title || payload.slice(0, 30)}`, 105, 38, { align: 'center' });

          // Center the QR code in page
          const qrWidthMm = 120;
          const x = (210 - qrWidthMm) / 2;
          const y = 50;

          pdf.addImage(base64data, 'PNG', x, y, qrWidthMm, qrWidthMm);

          if (includeWatermark) {
            pdf.setFontSize(9);
            pdf.setTextColor(148, 163, 184);
            pdf.text('Created with QRVibe · qrvibe.app', 105, 180, { align: 'center' });
          }

          pdf.save(`QRVibe_${type}_${Date.now()}.pdf`);
          triggerConfetti();
          persistToHistory(base64data);
        };
        reader.readAsDataURL(blob);
      }
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Keyboard Shortcuts Handler: Enter to trigger, Ctrl+D for PNG, Ctrl+S for SVG
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is actively typing in an input/textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        if (e.key === 'Enter') {
          // Allow Enter to celebrate / generate
          triggerConfetti();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'd' || e.key === 'D')) {
        e.preventDefault();
        handleDownload('png');
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        handleDownload('svg');
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        handleDownloadPdf();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        triggerConfetti();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [payload, styleConfig, isHdUnlocked]);

  // Copy raw payload URL/text
  const handleCopyRawPayload = async () => {
    if (!payload.trim()) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } catch {}
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!payload.trim()) return;
    try {
      const exportQR = new QRCodeStyling(buildQROptions(1024));
      const raw = await exportQR.getRawData('png');
      const blob = (raw as unknown as Blob) || null;

      if (blob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        // Fallback: Copy payload text
        await navigator.clipboard.writeText(payload);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Copy to clipboard failed', e);
      // Fallback
      navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Native Web Share
  const handleShare = async () => {
    if (!payload.trim()) return;
    try {
      if (navigator.share) {
        const exportQR = new QRCodeStyling(buildQROptions(1024));
        const raw = await exportQR.getRawData('png');
        const blob = (raw as unknown as Blob) || null;

        if (blob) {
          const file = new File([blob], 'qrvibe.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: title || 'My Vibe QR Code',
              text: 'Scan my QR created with QRVibe!',
              files: [file],
            });
            setShared(true);
            setTimeout(() => setShared(false), 2500);
            return;
          }
        }
        await navigator.share({
          title: title || 'My Vibe QR Code',
          url: payload.startsWith('http') ? payload : 'https://qrvibe.app',
        });
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } else {
        // Fallback: copy link
        await navigator.clipboard.writeText(payload);
        alert(t.preview.shareError);
      }
    } catch {
      // User cancelled share
    }
  };

  const isEmpty = !payload || payload.trim() === '';

  return (
    <div className="flex flex-col items-center">
      {/* Header bar of preview */}
      <div className="w-full flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-200 tracking-wide flex items-center gap-2">
          <span>{t.preview.title}</span>
          {isHdUnlocked && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
              2048px Ultra-HD
            </span>
          )}
        </h3>
        {!isEmpty && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.preview.liveIndicator}</span>
          </div>
        )}
      </div>

      {/* QR Code Canvas Box */}
      <div className="relative w-full aspect-square max-w-[340px] rounded-3xl bg-black/40 border border-violet-500/20 p-5 flex flex-col items-center justify-center shadow-2xl backdrop-blur-md overflow-hidden group">
        {isEmpty ? (
          <div className="text-center p-6 space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-violet-950/60 border border-violet-500/30 flex items-center justify-center text-slate-400 mx-auto">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-200 font-['Outfit']">
                {t.preview.emptyTitle}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                {t.preview.emptyDesc}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Live QR Container */}
            <div
              ref={containerRef}
              className="w-full h-full flex items-center justify-center [&>canvas]:max-w-full [&>canvas]:h-auto [&>canvas]:rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />

            {/* Optional Watermark Badge */}
            {includeWatermark && (
              <div className="absolute bottom-2 text-[10px] font-medium text-slate-400 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                Made with QRVibe
              </div>
            )}
          </>
        )}
      </div>

      {/* Watermark toggle */}
      {!isEmpty && (
        <div className="w-full max-w-[340px] flex items-center justify-between mt-3 text-xs text-slate-400 px-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeWatermark}
              onChange={(e) => setIncludeWatermark(e.target.checked)}
              className="rounded bg-black/40 border-violet-500/40 text-fuchsia-500 focus:ring-0"
            />
            <span>{t.preview.watermarkToggle}</span>
          </label>
        </div>
      )}

      {/* Main Download Grid */}
      <div className="w-full max-w-[340px] mt-5 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          {/* PNG High-Res */}
          <button
            type="button"
            disabled={isEmpty || isExporting}
            onClick={() => handleDownload('png')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg shadow-fuchsia-500/20 hover:shadow-fuchsia-500/35 hover:brightness-110 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{t.preview.downloadPng}</span>
          </button>

          {/* SVG Vector */}
          <button
            type="button"
            disabled={isEmpty || isExporting}
            onClick={() => handleDownload('svg')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-110 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>{t.preview.downloadSvg}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* JPEG */}
          <button
            type="button"
            disabled={isEmpty || isExporting}
            onClick={() => handleDownload('jpeg')}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-300" />
            <span>{t.preview.downloadJpeg}</span>
          </button>

          {/* PDF */}
          <button
            type="button"
            disabled={isEmpty || isExporting}
            onClick={handleDownloadPdf}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Layers className="w-3.5 h-3.5 text-slate-300" />
            <span>{t.preview.downloadPdf}</span>
          </button>
        </div>

        {/* Copy & Share Affordances */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleCopyImage}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition disabled:opacity-40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
            <span>{copied ? t.preview.copied : t.preview.copyImage}</span>
          </button>

          <button
            type="button"
            disabled={isEmpty}
            onClick={handleShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-violet-500/30 bg-violet-950/30 hover:bg-violet-950/50 text-xs font-semibold text-slate-200 transition disabled:opacity-40"
          >
            {shared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-300" />}
            <span>{shared ? t.preview.shared : t.preview.share}</span>
          </button>
        </div>

        {/* Quick Copy Raw Payload Link */}
        {!isEmpty && (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/30 border border-white/5 text-[11px] text-slate-400">
            <span className="truncate max-w-[200px] font-mono text-[10px] text-slate-300">
              {payload}
            </span>
            <button
              type="button"
              onClick={handleCopyRawPayload}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold shrink-0"
              title="Copy raw text or URL"
            >
              {copiedRaw ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedRaw ? 'Copied URL!' : 'Copy Raw'}</span>
            </button>
          </div>
        )}

        {/* Keyboard Shortcuts Hint Bar */}
        <div className="text-[10px] text-center text-slate-400 py-1 font-mono flex items-center justify-center gap-2">
          <span>Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">Enter</kbd>
          <span>preview</span>
          <span>·</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">Ctrl+D</kbd>
          <span>PNG</span>
          <span>·</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">Ctrl+S</kbd>
          <span>SVG</span>
        </div>

        {/* "Watch an ad to unlock HD 2048px download" Flow */}
        {!isHdUnlocked && !isEmpty && (
          <button
            type="button"
            onClick={onOpenWatchAdModal}
            className="w-full mt-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs font-bold transition flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>{t.preview.watchAdHd}</span>
          </button>
        )}
      </div>

      {/* Ad slot below preview */}
      <AdSlot position="below-preview" t={t} onUpgradeClick={onOpenProModal} />
    </div>
  );
};
