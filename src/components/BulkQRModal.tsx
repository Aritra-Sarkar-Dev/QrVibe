import React, { useState } from 'react';
import JSZip from 'jszip';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { X, Upload, Download, FileText, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Translations } from '../utils/i18n.ts';
import { QRStyleConfig } from '../types/index.ts';

interface BulkQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  styleConfig: QRStyleConfig;
  t: Translations;
  onOpenProModal: () => void;
}

export const BulkQRModal: React.FC<BulkQRModalProps> = ({
  isOpen,
  onClose,
  styleConfig,
  t,
  onOpenProModal,
}) => {
  const [csvText, setCsvText] = useState<string>(
    'https://instagram.com/qrvibe\nhttps://tiktok.com/@qrvibe\nhttps://youtube.com/@qrvibe\nhttps://x.com/qrvibe\nhttps://qrvibe.app'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  if (!isOpen) return null;

  // Parse lines
  const rows = csvText
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter((r) => r.length > 0 && !r.startsWith('#'));

  const freeBatchLimit = 5;
  const activeRows = rows.slice(0, freeBatchLimit);
  const extraRowsCount = Math.max(0, rows.length - freeBatchLimit);

  // Download Sample CSV
  const handleDownloadSample = () => {
    const sample = 'url_or_payload,label\nhttps://google.com,Google Search\nhttps://github.com,GitHub Code\nhttps://qrvibe.app,QRVibe Studio\nWIFI:T:WPA;S:CoffeeShop;P:coffee123;;,Guest Wifi\ntel:+18005550199,Customer Hotline';
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
    };
    reader.readAsText(file);
  };

  // Generate All as ZIP using JSZip
  const handleGenerateZip = async () => {
    if (activeRows.length === 0) return;
    setIsGenerating(true);
    setProgress(10);

    try {
      const zip = new JSZip();
      const folder = zip.folder('QRVibe_Bulk_Export');

      for (let i = 0; i < activeRows.length; i++) {
        const row = activeRows[i];
        // Handle CSV comma separation (value, name)
        const parts = row.split(',');
        const payload = parts[0]?.trim() || row;
        const name = parts[1]?.trim().replace(/[^a-zA-Z0-9_-]/g, '_') || `qr_${i + 1}`;

        const qr = new QRCodeStyling({
          width: 1024,
          height: 1024,
          type: 'canvas',
          data: payload,
          dotsOptions: {
            type: styleConfig.dotsType,
            color: styleConfig.dotsColor,
          },
          cornersSquareOptions: {
            type: styleConfig.cornerSquareType,
            color: styleConfig.cornerSquareColor,
          },
          cornersDotOptions: {
            type: styleConfig.cornerDotType,
            color: styleConfig.cornerDotColor,
          },
          backgroundOptions: {
            color: styleConfig.backgroundColor === 'transparent' ? 'rgba(0,0,0,0)' : styleConfig.backgroundColor,
          },
        });

        const blob = await qr.getRawData('png');
        if (blob && folder) {
          folder.file(`${name}.png`, blob);
        }

        setProgress(Math.round(((i + 1) / activeRows.length) * 85));
      }

      // Add a manifest text file
      if (folder) {
        const summaryText = `QRVibe Bulk Batch Manifest\nGenerated on: ${new Date().toISOString()}\nTotal items: ${activeRows.length}\nWebsite: https://qrvibe.app`;
        folder.file('manifest.txt', summaryText);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setProgress(100);

      // Trigger download
      const downloadUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `QRVibe_Bulk_${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(downloadUrl);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error('Bulk generation failed', e);
      alert('Bulk generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#130d24] border border-violet-500/30 p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-fuchsia-600/20 text-fuchsia-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Outfit']">{t.bulk.title}</h3>
            <p className="text-xs text-slate-400">{t.bulk.subtitle}</p>
          </div>
        </div>

        {/* CSV Upload / Input Box */}
        <div className="mt-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-300">
              Paste CSV or text rows (one per line):
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadSample}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline"
              >
                {t.bulk.sampleDownload}
              </button>
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
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
            rows={6}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-violet-500/30 bg-black/40 text-xs text-white font-mono focus:border-fuchsia-500 outline-none resize-y"
            placeholder="https://example.com/item1,First Code&#10;https://example.com/item2,Second Code"
          />

          {/* Row count & free limit status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs">
            <div className="text-slate-300">
              {t.bulk.totalRows}: <span className="font-bold text-white">{rows.length}</span> (
              <span className="text-emerald-400 font-bold">{activeRows.length} generating on Free</span>)
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
                <span>Upgrade to Pro for all {rows.length} rows</span>
              </button>
            )}
          </div>

          {/* Progress Bar */}
          {isGenerating && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>{t.bulk.generating}</span>
                <span className="font-mono">{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isGenerating || activeRows.length === 0}
              onClick={handleGenerateZip}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg hover:brightness-110 active:scale-95 transition disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? t.bulk.generating : t.bulk.downloadZip}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
