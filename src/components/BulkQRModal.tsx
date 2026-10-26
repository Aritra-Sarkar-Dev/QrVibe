import React, { useState, useRef, useEffect } from 'react';
import JSZip from 'jszip';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import {
  X,
  Upload,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Loader2,
  Clock,
  Package,
  RotateCcw,
  FileArchive,
  ArrowRight,
} from 'lucide-react';
import { Translations } from '../utils/i18n.ts';
import { QRStyleConfig } from '../types/index.ts';

interface BulkQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleConfig: QRStyleConfig;
  t: Translations;
  onOpenProModal: () => void;
}

interface ItemQueueState {
  index: number;
  payload: string;
  name: string;
  status: 'pending' | 'rendering' | 'completed' | 'error';
  previewUrl?: string;
  sizeBytes?: number;
}

interface ZipResultState {
  blob: Blob;
  downloadUrl: string;
  filename: string;
  sizeBytes: number;
  count: number;
}

export const BulkQRModal: React.FC<BulkQRModalProps> = ({
  isOpen,
  onClose,
  styleConfig,
  t,
  onOpenProModal,
}) => {
  const [csvText, setCsvText] = useState<string>(
    'https://instagram.com/qrvibe,Instagram_QR\nhttps://tiktok.com/@qrvibe,TikTok_QR\nhttps://youtube.com/@qrvibe,YouTube_QR\nhttps://x.com/qrvibe,Twitter_X_QR\nhttps://qrvibe.app,QRVibe_Studio_QR'
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<'idle' | 'rendering' | 'zipping' | 'completed'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [itemsQueue, setItemsQueue] = useState<ItemQueueState[]>([]);
  const [zipResult, setZipResult] = useState<ZipResultState | null>(null);

  const isCancelledRef = useRef<boolean>(false);
  const createdUrlsRef = useRef<string[]>([]);

  // Cleanup created object URLs when closing or re-generating
  const cleanupObjectUrls = () => {
    createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    createdUrlsRef.current = [];
  };

  useEffect(() => {
    return () => {
      cleanupObjectUrls();
    };
  }, []);

  if (!isOpen) return null;

  // Parse lines
  const rows = csvText
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter((r) => r.length > 0 && !r.startsWith('#'));

  const freeBatchLimit = 5;
  const activeRows = rows.slice(0, freeBatchLimit);
  const extraRowsCount = Math.max(0, rows.length - freeBatchLimit);

  // Format bytes helper
  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  // Download Sample CSV
  const handleDownloadSample = () => {
    const sample = 'url_or_payload,label\nhttps://google.com,Google_Search\nhttps://github.com,GitHub_Code\nhttps://qrvibe.app,QRVibe_Studio\nWIFI:T:WPA;S:CoffeeShop;P:coffee123;;,Guest_Wifi\ntel:+18005550199,Customer_Hotline';
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrvibe_sample_bulk.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Upload CSV File
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || '';
      setCsvText(content);
      // Reset past results if new file is loaded
      setZipResult(null);
      setCurrentStage('idle');
      setProgress(0);
    };
    reader.readAsText(file);
  };

  // Cancel generation task
  const handleCancelGeneration = () => {
    isCancelledRef.current = true;
    setIsGenerating(false);
    setStatusMessage('Generation cancelled by user.');
    setCurrentStage('idle');
  };

  // Generate All as ZIP using JSZip with Real-time Progress Tracking
  const handleGenerateZip = async () => {
    if (activeRows.length === 0) return;

    cleanupObjectUrls();
    isCancelledRef.current = false;
    setIsGenerating(true);
    setProgress(5);
    setCurrentStage('rendering');
    setZipResult(null);

    // Initialize item queue
    const initialQueue: ItemQueueState[] = activeRows.map((row, idx) => {
      const parts = row.split(',');
      const payload = parts[0]?.trim() || row;
      const name = parts[1]?.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || `qr_${idx + 1}`;
      return {
        index: idx,
        payload,
        name,
        status: 'pending',
      };
    });

    setItemsQueue(initialQueue);
    setStatusMessage(`Preparing canvas for ${activeRows.length} QR codes...`);

    try {
      const zip = new JSZip();
      const folder = zip.folder('QRVibe_Bulk_Export');

      // Phase 1: Render each QR code (Allocating 0% - 70% of total progress)
      for (let i = 0; i < activeRows.length; i++) {
        if (isCancelledRef.current) {
          return;
        }

        const currentItem = initialQueue[i];

        // Mark item as currently rendering
        setItemsQueue((prev) =>
          prev.map((item, idx) => (idx === i ? { ...item, status: 'rendering' } : item))
        );
        setStatusMessage(`Rendering QR ${i + 1} of ${activeRows.length}: "${currentItem.name}.png"...`);

        // Compute styling options
        const qr = new QRCodeStyling({
          width: 1024,
          height: 1024,
          type: 'canvas',
          data: currentItem.payload,
          margin: 12,
          dotsOptions: {
            type: styleConfig.dotsType,
            color: styleConfig.dotsColor,
          },
          cornersSquareOptions: {
            type: styleConfig.cornerSquareType,
            color: styleConfig.cornerSquareColor || styleConfig.dotsColor,
          },
          cornersDotOptions: {
            type: styleConfig.cornerDotType,
            color: styleConfig.cornerDotColor || styleConfig.dotsColor,
          },
          backgroundOptions: {
            color: styleConfig.backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : styleConfig.backgroundColor,
          },
          image: styleConfig.logoUrl,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: styleConfig.logoSize || 0.22,
            margin: styleConfig.logoMargin || 4,
            crossOrigin: 'anonymous',
          },
        });

        // Small yield to allow UI repaint for real-time smoothness
        await new Promise((resolve) => setTimeout(resolve, 60));

        const raw = await qr.getRawData('png');
        const blob = (raw as unknown as Blob) || null;

        if (blob && folder) {
          folder.file(`${currentItem.name}.png`, blob);
          const previewUrl = URL.createObjectURL(blob);
          createdUrlsRef.current.push(previewUrl);

          setItemsQueue((prev) =>
            prev.map((item, idx) =>
              idx === i
                ? {
                    ...item,
                    status: 'completed',
                    previewUrl,
                    sizeBytes: blob.size,
                  }
                : item
            )
          );
        } else {
          setItemsQueue((prev) =>
            prev.map((item, idx) =>
              idx === i ? { ...item, status: 'error' } : item
            )
          );
        }

        // Progress up to 70%
        const phase1Percent = Math.round(((i + 1) / activeRows.length) * 70);
        setProgress(phase1Percent);
      }

      if (isCancelledRef.current) return;

      // Add a manifest text file
      if (folder) {
        const summaryText = `QRVibe Bulk Batch Manifest\nGenerated on: ${new Date().toISOString()}\nTotal items: ${activeRows.length}\nFormat: 1024x1024 HD PNG\nWebsite: https://qrvibe.app\n\nItems List:\n` +
          initialQueue.map((item, idx) => `${idx + 1}. [${item.name}.png] -> ${item.payload}`).join('\n');
        folder.file('manifest.txt', summaryText);
      }

      // Phase 2: ZIP Compression (Allocating 70% - 100% of progress)
      setCurrentStage('zipping');
      setStatusMessage('Compressing and packaging files into ZIP archive...');

      const zipBlob = await zip.generateAsync(
        {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: { level: 6 },
        },
        (metadata) => {
          if (isCancelledRef.current) return;
          const zipPortion = (metadata.percent / 100) * 30;
          const totalProgress = Math.min(100, Math.round(70 + zipPortion));
          setProgress(totalProgress);
          if (metadata.currentFile) {
            setStatusMessage(`Compressing: ${metadata.currentFile} (${Math.round(metadata.percent)}%)`);
          }
        }
      );

      if (isCancelledRef.current) return;

      setProgress(100);
      setCurrentStage('completed');
      setStatusMessage('Batch complete! ZIP package generated successfully.');

      const filename = `QRVibe_Bulk_${Date.now()}.zip`;
      const downloadUrl = URL.createObjectURL(zipBlob);
      createdUrlsRef.current.push(downloadUrl);

      setZipResult({
        blob: zipBlob,
        downloadUrl,
        filename,
        sizeBytes: zipBlob.size,
        count: activeRows.length,
      });

      // Automatically trigger download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      a.click();

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d946ef', '#8b5cf6', '#06b6d4', '#facc15', '#10b981'],
      });
    } catch (e) {
      console.error('Bulk generation error', e);
      setStatusMessage('Bulk generation encountered an error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAgain = () => {
    if (!zipResult) return;
    const a = document.createElement('a');
    a.href = zipResult.downloadUrl;
    a.download = zipResult.filename;
    a.click();
  };

  const handleResetToEditor = () => {
    cleanupObjectUrls();
    setZipResult(null);
    setCurrentStage('idle');
    setProgress(0);
    setItemsQueue([]);
    setStatusMessage('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#130d24] border border-violet-500/30 p-5 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isGenerating}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition disabled:opacity-30"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-cyan-500 p-0.5 shadow-lg shadow-fuchsia-500/20 shrink-0">
            <div className="w-full h-full bg-[#130d24] rounded-[10px] flex items-center justify-center text-fuchsia-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Outfit']">{t.bulk.title}</h3>
            <p className="text-xs text-slate-400">{t.bulk.subtitle}</p>
          </div>
        </div>

        {/* Main Content Areas */}
        <div className="mt-5 space-y-4">
          {/* VIEW 1: Input & Configuration (when idle) */}
          {currentStage === 'idle' && (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-300">
                  Paste CSV or text rows (one per line, format: <code>payload,optional_name</code>):
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadSample}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium"
                  >
                    {t.bulk.sampleDownload}
                  </button>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 cursor-pointer transition">
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload .CSV</span>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <textarea
                rows={5}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-violet-500/30 bg-black/40 text-xs text-white font-mono focus:border-fuchsia-500 outline-none resize-y"
                placeholder="https://example.com/item1,First_Code&#10;https://example.com/item2,Second_Code"
              />

              {/* Row count & free limit status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-violet-950/30 border border-violet-500/20 text-xs">
                <div className="text-slate-300">
                  {t.bulk.totalRows}: <span className="font-bold text-white">{rows.length}</span> (
                  <span className="text-emerald-400 font-bold">{activeRows.length} generating on Free tier</span>)
                </div>
                {extraRowsCount > 0 && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenProModal();
                    }}
                    className="text-fuchsia-400 hover:text-fuchsia-300 underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upgrade for unlimited rows ({rows.length})</span>
                  </button>
                )}
              </div>
            </>
          )}

          {/* VIEW 2: Real-time Visual Progress Indicator (during generation or completed) */}
          {(isGenerating || currentStage === 'completed') && (
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-b from-[#180f33] to-[#0f091f] p-5 sm:p-6 space-y-5 shadow-inner">
              {/* Top Progress Metric Banner */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {isGenerating ? (
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center animate-spin">
                        <Loader2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <div className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                        {currentStage === 'rendering'
                          ? 'Phase 1 of 2: Rendering HD QR Codes'
                          : currentStage === 'zipping'
                          ? 'Phase 2 of 2: Archiving & Compressing ZIP'
                          : 'Generation Complete!'}
                      </div>
                      <div className="text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                        {statusMessage}
                      </div>
                    </div>
                  </div>

                  {/* Percentage Display */}
                  <div className="text-right shrink-0">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-400">
                      {progress}%
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="relative w-full h-3 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Animated Shimmer Stripe */}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                    )}
                  </div>
                </div>

                {/* Status Sub-Indicators */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentStage === 'rendering'
                          ? 'bg-cyan-400 animate-ping'
                          : progress >= 70
                          ? 'bg-emerald-400'
                          : 'bg-slate-600'
                      }`}
                    />
                    <span>1. QR Rendering (70%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        currentStage === 'zipping'
                          ? 'bg-fuchsia-400 animate-ping'
                          : progress === 100
                          ? 'bg-emerald-400'
                          : 'bg-slate-600'
                      }`}
                    />
                    <span>2. ZIP Packaging (30%)</span>
                  </span>
                </div>
              </div>

              {/* Real-time Item Queue Checklist */}
              {itemsQueue.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>Batch Queue Status ({itemsQueue.filter((x) => x.status === 'completed').length}/{itemsQueue.length} done):</span>
                    <span className="text-slate-400 text-[11px]">1024x1024 HD PNG</span>
                  </div>

                  <div className="max-h-44 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                    {itemsQueue.map((item) => (
                      <div
                        key={item.index}
                        className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                          item.status === 'completed'
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                            : item.status === 'rendering'
                            ? 'bg-cyan-950/30 border-cyan-400 ring-1 ring-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/20'
                            : item.status === 'error'
                            ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                            : 'bg-black/30 border-white/5 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Mini-Thumbnail or Status Icon */}
                          {item.previewUrl ? (
                            <img
                              src={item.previewUrl}
                              alt={item.name}
                              className="w-7 h-7 rounded-lg bg-white p-0.5 object-contain shrink-0 border border-white/20"
                            />
                          ) : item.status === 'rendering' ? (
                            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-white/5 text-slate-500 flex items-center justify-center shrink-0 font-mono text-[10px]">
                              {item.index + 1}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="font-semibold text-white truncate text-xs flex items-center gap-1.5">
                              <span>{item.name}.png</span>
                              {item.sizeBytes && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  ({formatBytes(item.sizeBytes)})
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate font-mono">
                              {item.payload}
                            </div>
                          </div>
                        </div>

                        {/* Status Label */}
                        <div className="shrink-0 text-right">
                          {item.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10">
                              <CheckCircle className="w-3 h-3" />
                              <span>Done</span>
                            </span>
                          )}
                          {item.status === 'rendering' && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300 font-semibold px-2 py-0.5 rounded-full bg-cyan-500/20">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Rendering</span>
                            </span>
                          )}
                          {item.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 px-2 py-0.5 rounded-full bg-white/5">
                              <Clock className="w-3 h-3" />
                              <span>Queued</span>
                            </span>
                          )}
                          {item.status === 'error' && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-rose-400 font-semibold px-2 py-0.5 rounded-full bg-rose-500/20">
                              <AlertCircle className="w-3 h-3" />
                              <span>Failed</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Success Result Card */}
              {zipResult && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <FileArchive className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs sm:text-sm">
                          {zipResult.filename}
                        </div>
                        <div className="text-[11px] text-emerald-300 font-mono">
                          {zipResult.count} QR files · {formatBytes(zipResult.sizeBytes)} · manifest.txt included
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadAgain}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Again</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {isGenerating ? (
              <button
                type="button"
                onClick={handleCancelGeneration}
                className="w-full py-3 px-4 rounded-xl border border-rose-500/40 bg-rose-950/20 hover:bg-rose-950/40 text-rose-300 text-xs font-semibold transition"
              >
                Cancel Generation Task
              </button>
            ) : zipResult ? (
              <>
                <button
                  type="button"
                  onClick={handleResetToEditor}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Create Another Batch</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition"
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={activeRows.length === 0}
                  onClick={handleGenerateZip}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition disabled:opacity-40"
                >
                  <Download className="w-4 h-4" />
                  <span>Generate & Download ZIP ({activeRows.length})</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
