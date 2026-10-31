import React, { useState, useRef } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import {
  Printer,
  X,
  CreditCard,
  FileText,
  Sparkles,
  Check,
  Building,
  Tag,
} from 'lucide-react';
import { QRStyleConfig, QRType } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: string;
  title: string;
  type: QRType;
  styleConfig: QRStyleConfig;
  t: Translations;
}

type PrintLayoutType = 'card' | 'flyer';

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  payload,
  title,
  type,
  styleConfig,
  t,
}) => {
  const [layoutType, setLayoutType] = useState<PrintLayoutType>('card');
  const [cardTitle, setCardTitle] = useState<string>(title || 'Scan to Connect');
  const [cardSubtitle, setCardSubtitle] = useState<string>('Point your camera & explore');
  const [cardFooter, setCardFooter] = useState<string>('QRVibe Creator Studio');
  const [accentColor, setAccentColor] = useState<string>('#d946ef'); // fuchsia

  const qrContainerRef = useRef<HTMLDivElement>(null);

  // Generate QR code data URL for preview and print
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  React.useEffect(() => {
    if (!isOpen || !payload) return;

    const generateQrImage = async () => {
      try {
        const qrSize = 512;
        const options: Options = {
          width: qrSize,
          height: qrSize,
          type: 'canvas',
          data: payload,
          margin: 8,
          qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: styleConfig.logoUrl ? 'H' : 'M',
          },
          image: styleConfig.logoUrl,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: styleConfig.logoSize || 0.22,
            margin: styleConfig.logoMargin || 4,
            crossOrigin: 'anonymous',
          },
          dotsOptions: {
            type: styleConfig.dotsType,
            color: styleConfig.dotsColor,
            ...(styleConfig.gradient.enabled
              ? {
                  gradient: {
                    type: styleConfig.gradient.type,
                    rotation: (styleConfig.gradient.rotation * Math.PI) / 180,
                    colorStops: [
                      { offset: 0, color: styleConfig.gradient.color1 },
                      { offset: 1, color: styleConfig.gradient.color2 },
                    ],
                  },
                }
              : {}),
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
            color: styleConfig.backgroundColor === 'transparent' ? '#FFFFFF' : styleConfig.backgroundColor,
          },
        };

        const tempQr = new QRCodeStyling(options);
        if (qrContainerRef.current) {
          qrContainerRef.current.innerHTML = '';
          tempQr.append(qrContainerRef.current);
          const canvas = qrContainerRef.current.querySelector('canvas');
          if (canvas) {
            setQrDataUrl(canvas.toDataURL('image/png'));
          }
        }
      } catch (err) {
        console.error('Failed to generate print QR preview', err);
      }
    };

    generateQrImage();
  }, [isOpen, payload, styleConfig]);

  if (!isOpen) return null;

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#120d24] border border-violet-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                Print & Flyer Studio
              </h2>
              <p className="text-xs text-slate-400">
                Format your QR code into a professional business card or promotional flyer layout
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Configuration Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Select Print Layout Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutType('card')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                    layoutType === 'card'
                      ? 'border-fuchsia-500 bg-fuchsia-950/40 text-fuchsia-300 shadow-md shadow-fuchsia-500/10'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-fuchsia-400" />
                  <span>Business Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutType('flyer')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-2 ${
                    layoutType === 'flyer'
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Promotional Flyer</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Main Headline / Title
                </label>
                <input
                  type="text"
                  value={cardTitle}
                  onChange={(e) => setCardTitle(e.target.value)}
                  placeholder="e.g. Scan to Connect"
                  className="w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Subtitle / Call to Action
                </label>
                <input
                  type="text"
                  value={cardSubtitle}
                  onChange={(e) => setCardSubtitle(e.target.value)}
                  placeholder="e.g. Point your camera & explore"
                  className="w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Footer / Brand Name
                </label>
                <input
                  type="text"
                  value={cardFooter}
                  onChange={(e) => setCardFooter(e.target.value)}
                  placeholder="e.g. QRVibe Creator Studio"
                  className="w-full px-3.5 py-2 rounded-xl border border-violet-500/30 bg-black/40 text-xs text-white focus:border-fuchsia-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Accent Theme Color
                </label>
                <div className="flex items-center gap-2">
                  {['#d946ef', '#06b6d4', '#facc15', '#10b981', '#f97316', '#8b5cf6'].map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition ${
                        accentColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-violet-950/20 border border-violet-500/20 text-xs text-slate-300 space-y-1.5">
              <span className="font-semibold text-fuchsia-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Print-Ready Format
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clicking &quot;Print to Paper&quot; will format this card or flyer cleanly for your printer or PDF export.
              </p>
            </div>
          </div>

          {/* Right Live Print Preview Box */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-3xl bg-black/50 border border-white/10 relative overflow-hidden">
            <span className="absolute top-3 left-4 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Live Print Preview
            </span>

            {/* Hidden container for QR generation canvas */}
            <div ref={qrContainerRef} className="hidden" />

            {/* Rendered Layout Preview */}
            <div className="w-full flex items-center justify-center py-4">
              {layoutType === 'card' ? (
                /* Business Card Preview (Landscape Card 3.5:2 ratio) */
                <div className="w-full max-w-[380px] aspect-[1.75/1] bg-white text-slate-900 rounded-2xl p-5 shadow-2xl border border-slate-200 flex items-center justify-between relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-2"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="space-y-1.5 max-w-[55%]">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      {type.toUpperCase()} CODE
                    </span>
                    <h3 className="text-sm font-black font-['Outfit'] text-slate-900 leading-tight">
                      {cardTitle}
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      {cardSubtitle}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {cardFooter}
                      </span>
                    </div>
                  </div>

                  <div className="w-28 h-28 bg-white p-1 rounded-xl shadow border border-slate-100 flex items-center justify-center shrink-0">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR Preview" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 animate-pulse rounded" />
                    )}
                  </div>
                </div>
              ) : (
                /* Promotional Flyer Preview (Vertical Poster) */
                <div className="w-full max-w-[300px] aspect-[1/1.4] bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 flex flex-col items-center text-center justify-between relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 right-0 h-3"
                    style={{ backgroundColor: accentColor }}
                  />
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      SCAN & EXPLORE
                    </span>
                    <h3 className="text-base font-black font-['Outfit'] text-slate-900">
                      {cardTitle}
                    </h3>
                    <p className="text-xs text-slate-600 max-w-[220px] mx-auto leading-relaxed">
                      {cardSubtitle}
                    </p>
                  </div>

                  <div className="w-36 h-36 bg-white p-2 rounded-2xl shadow-md border border-slate-100 flex items-center justify-center my-2">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR Preview" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 animate-pulse rounded" />
                    )}
                  </div>

                  <div className="pb-1">
                    <p className="text-[11px] font-bold text-slate-800">
                      {cardFooter}
                    </p>
                    <span className="text-[9px] text-slate-400">Powered by QRVibe</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/60">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleTriggerPrint}
            className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl font-bold text-xs bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white shadow-lg shadow-fuchsia-500/25 hover:brightness-110 active:scale-95 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print to Paper / PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Area Styles for Native Browser Print */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          .fixed.inset-0.z-50, .fixed.inset-0.z-50 * {
            visibility: visible !important;
          }
          .fixed.inset-0.z-50 {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: white !important;
            backdrop-blur: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /* Hide configuration sidebar and modal headers during print */
          .lg\\:col-span-5, .flex.items-center.justify-between.px-6.py-4 {
            display: none !important;
          }
          .lg\\:col-span-7 {
            border: none !important;
            background: white !important;
            padding: 0 !important;
            margin: auto !important;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
};
