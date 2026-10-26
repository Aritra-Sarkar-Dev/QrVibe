import React, { useRef } from 'react';
import {
  Palette,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  AlertTriangle,
  RotateCw,
  X,
  Check,
  Undo2,
  Redo2,
} from 'lucide-react';
import {
  QRStyleConfig,
  PresetName,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
} from '../types/index.ts';
import { QR_PRESETS, DEFAULT_STYLE_CONFIG } from '../utils/presets.ts';
import { BUILTIN_LOGOS } from '../utils/logos.ts';
import { Translations } from '../utils/i18n.ts';
import { checkQRContrast } from '../utils/contrast.ts';

interface CustomizationStudioProps {
  styleConfig: QRStyleConfig;
  onStyleChange: (newStyle: QRStyleConfig) => void;
  t: Translations;
  currentLang: string;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  styleConfig,
  onStyleChange,
  t,
  currentLang,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}) => {
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Apply a preset
  const handleApplyPreset = (presetKey: PresetName) => {
    const preset = QR_PRESETS[presetKey];
    onStyleChange({
      ...styleConfig,
      ...preset.style,
      preset: presetKey,
      // If logo is present, keep error correction as 'H'
      errorCorrectionLevel: styleConfig.logoUrl ? 'H' : preset.style.errorCorrectionLevel,
    });
  };

  // Reset to clean Black & White default
  const handleResetToDefault = () => {
    onStyleChange({
      ...DEFAULT_STYLE_CONFIG,
      logoUrl: styleConfig.logoUrl,
      errorCorrectionLevel: styleConfig.logoUrl ? 'H' : 'M',
    });
  };

  // Apply a built-in social/utility logo
  const handleSelectBuiltinLogo = (dataUrl: string) => {
    onStyleChange({
      ...styleConfig,
      logoUrl: dataUrl,
      errorCorrectionLevel: 'H',
      logoSize: 0.22,
      logoMargin: 4,
    });
  };

  // Logo upload
  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      onStyleChange({
        ...styleConfig,
        logoUrl: url,
        // Auto-switch to High (H) error correction as required
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);
  };

  // Remove logo
  const handleRemoveLogo = () => {
    onStyleChange({
      ...styleConfig,
      logoUrl: undefined,
    });
  };

  // Contrast check
  const activeColor = styleConfig.gradient.enabled
    ? styleConfig.gradient.color1
    : styleConfig.dotsColor;
  const contrastResult = checkQRContrast(activeColor, styleConfig.backgroundColor);

  return (
    <div className="space-y-6">
      {/* 1. Trendy Presets */}
      <div>
        <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{t.studio.presets}</span>
          </label>
          <div className="flex items-center gap-2">
            {onUndo && (
              <button
                type="button"
                onClick={onUndo}
                disabled={!canUndo}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                  canUndo
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 cursor-pointer'
                    : 'border-white/5 bg-transparent text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Undo last change (Ctrl+Z)"
              >
                <Undo2 className="w-3 h-3" />
                <span>Undo</span>
              </button>
            )}
            {onRedo && (
              <button
                type="button"
                onClick={onRedo}
                disabled={!canRedo}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                  canRedo
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 cursor-pointer'
                    : 'border-white/5 bg-transparent text-slate-600 cursor-not-allowed opacity-50'
                }`}
                title="Redo change (Ctrl+Y or Ctrl+Shift+Z)"
              >
                <Redo2 className="w-3 h-3" />
                <span>Redo</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 flex items-center gap-1 ml-1"
            >
              <span>Reset</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Default Clean B&W Preset Button */}
          <button
            type="button"
            onClick={handleResetToDefault}
            className={`p-2 rounded-xl text-left border transition relative overflow-hidden group ${
              styleConfig.dotsColor === '#000000' && !styleConfig.gradient.enabled && styleConfig.backgroundColor === '#ffffff'
                ? 'border-cyan-400 bg-cyan-950/30 ring-1 ring-cyan-400 shadow-md'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border border-black bg-white shrink-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-sm" />
              </div>
              <span className="text-xs font-semibold text-slate-200 truncate">
                Default B&W
              </span>
            </div>
          </button>

          {(Object.keys(QR_PRESETS) as PresetName[]).map((pKey) => {
            const p = QR_PRESETS[pKey];
            const isSelected =
              styleConfig.preset === pKey &&
              (styleConfig.gradient.enabled || styleConfig.dotsColor !== '#000000');
            return (
              <button
                type="button"
                key={pKey}
                onClick={() => handleApplyPreset(pKey)}
                className={`p-2 rounded-xl text-left border transition relative overflow-hidden group ${
                  isSelected
                    ? 'border-fuchsia-500 bg-fuchsia-950/30 ring-1 ring-fuchsia-500 shadow-md'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    style={{
                      background: p.style.gradient.enabled
                        ? `linear-gradient(45deg, ${p.style.gradient.color1}, ${p.style.gradient.color2})`
                        : p.style.dotsColor,
                    }}
                  />
                  <span className="text-xs font-semibold text-slate-200 truncate">
                    {currentLang === 'bn' ? p.nameBn : p.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Contrast Check Warning Banner */}
      {contrastResult.isLowContrast && (
        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">
              {contrastResult.warning || t.studio.contrastWarning}
            </p>
            <p className="text-[11px] text-amber-200/80 mt-0.5">
              Tip: Pick a lighter dot color or switch background to dark.
            </p>
          </div>
        </div>
      )}

      {/* 3. Dot Patterns & Corner Shapes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Dot Style */}
        <div>
          <label className="text-xs font-semibold text-slate-200 mb-2 block">
            {t.studio.dotStyle}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { id: 'rounded', label: t.studio.dots.rounded },
                { id: 'dots', label: t.studio.dots.dots },
                { id: 'classy', label: t.studio.dots.classy },
                { id: 'classy-rounded', label: t.studio.dots.classyRounded },
                { id: 'extra-rounded', label: t.studio.dots.extraRounded },
                { id: 'square', label: t.studio.dots.square },
              ] as const
            ).map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onStyleChange({ ...styleConfig, dotsType: item.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition ${
                  styleConfig.dotsType === item.id
                    ? 'bg-fuchsia-600 text-white font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Square Style */}
        <div>
          <label className="text-xs font-semibold text-slate-200 mb-2 block">
            {t.studio.cornerSquare}
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { id: 'extra-rounded', label: t.studio.corners.extraRounded },
                { id: 'dot', label: t.studio.corners.dot },
                { id: 'square', label: t.studio.corners.square },
              ] as const
            ).map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onStyleChange({ ...styleConfig, cornerSquareType: item.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition ${
                  styleConfig.cornerSquareType === item.id
                    ? 'bg-fuchsia-600 text-white font-semibold'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Colors & Gradients */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.studio.colors}</span>
          </label>
          {/* Gradient Toggle */}
          <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
            <button
              type="button"
              onClick={() =>
                onStyleChange({
                  ...styleConfig,
                  gradient: { ...styleConfig.gradient, enabled: false },
                })
              }
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                !styleConfig.gradient.enabled
                  ? 'bg-fuchsia-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.studio.solidColor}
            </button>
            <button
              type="button"
              onClick={() =>
                onStyleChange({
                  ...styleConfig,
                  gradient: { ...styleConfig.gradient, enabled: true },
                })
              }
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                styleConfig.gradient.enabled
                  ? 'bg-fuchsia-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.studio.gradient}
            </button>
          </div>
        </div>

        {styleConfig.gradient.enabled ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-black/20 border border-violet-500/20">
            <div>
              <label className="text-[11px] text-slate-300 block mb-1">{t.studio.color1}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styleConfig.gradient.color1}
                  onChange={(e) =>
                    onStyleChange({
                      ...styleConfig,
                      gradient: { ...styleConfig.gradient, color1: e.target.value },
                    })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300">
                  {styleConfig.gradient.color1}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">{t.studio.color2}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styleConfig.gradient.color2}
                  onChange={(e) =>
                    onStyleChange({
                      ...styleConfig,
                      gradient: { ...styleConfig.gradient, color2: e.target.value },
                    })
                  }
                  className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <span className="text-xs font-mono text-slate-300">
                  {styleConfig.gradient.color2}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-300 block mb-1">Rotation Angle</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={styleConfig.gradient.rotation}
                  onChange={(e) =>
                    onStyleChange({
                      ...styleConfig,
                      gradient: {
                        ...styleConfig.gradient,
                        rotation: parseInt(e.target.value, 10),
                      },
                    })
                  }
                  className="w-full accent-fuchsia-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-300 w-8">
                  {styleConfig.gradient.rotation}°
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-violet-500/20">
            <input
              type="color"
              value={styleConfig.dotsColor}
              onChange={(e) =>
                onStyleChange({
                  ...styleConfig,
                  dotsColor: e.target.value,
                  cornerSquareColor: e.target.value,
                  cornerDotColor: e.target.value,
                })
              }
              className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border-0"
            />
            <span className="text-xs font-mono text-slate-200">{styleConfig.dotsColor}</span>
          </div>
        )}

        {/* Background Color & Transparent Canvas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-black/20 border border-violet-500/20">
          <div>
            <label className="text-xs font-semibold text-slate-200 block">
              {t.studio.background}
            </label>
            <span className="text-[11px] text-slate-400">
              {styleConfig.backgroundColor === 'transparent'
                ? 'Transparent alpha channel'
                : styleConfig.backgroundColor}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onStyleChange({
                  ...styleConfig,
                  backgroundColor:
                    styleConfig.backgroundColor === 'transparent' ? '#0b0813' : 'transparent',
                })
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                styleConfig.backgroundColor === 'transparent'
                  ? 'bg-cyan-500 text-slate-950 shadow'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              {t.studio.transparent}
            </button>

            {styleConfig.backgroundColor !== 'transparent' && (
              <input
                type="color"
                value={styleConfig.backgroundColor}
                onChange={(e) =>
                  onStyleChange({
                    ...styleConfig,
                    backgroundColor: e.target.value,
                  })
                }
                className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
              />
            )}
          </div>
        </div>
      </div>

      {/* 5. Center Brand Logo Upload */}
      <div className="p-4 rounded-xl bg-black/20 border border-violet-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>{t.studio.centerLogo}</span>
          </label>
          {styleConfig.logoUrl && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="inline-flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.studio.removeLogo}</span>
            </button>
          )}
        </div>

        {/* Preset Social Media & Utility Logos */}
        <div>
          <span className="text-[11px] font-semibold text-slate-300 block mb-2">
            Quick Social Media & Brand Overlay:
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {BUILTIN_LOGOS.map((logo) => {
              const isSelected = styleConfig.logoUrl === logo.dataUrl;
              return (
                <button
                  type="button"
                  key={logo.id}
                  onClick={() => handleSelectBuiltinLogo(logo.dataUrl)}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left transition ${
                    isSelected
                      ? 'border-fuchsia-500 bg-fuchsia-950/40 ring-1 ring-fuchsia-500'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <img
                    src={logo.dataUrl}
                    alt={logo.name}
                    className="w-5 h-5 rounded-md object-contain shrink-0"
                  />
                  <span className="text-xs font-medium truncate">{logo.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <input
          type="file"
          ref={logoInputRef}
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleLogoUpload(e.target.files[0]);
            }
          }}
        />

        {styleConfig.logoUrl ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-violet-950/40 border border-violet-500/30">
            <div className="flex items-center gap-3">
              <img
                src={styleConfig.logoUrl}
                alt="Logo Preview"
                className="w-10 h-10 object-contain rounded-xl p-1 bg-white/10 border border-violet-500/30 shrink-0"
              />
              <div>
                <span className="text-xs font-semibold text-emerald-400 block flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Logo Overlaid on Center</span>
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">{t.studio.ecNotice}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="py-1.5 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition"
              >
                Upload Custom
              </button>
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="py-1.5 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-medium text-rose-300 transition"
              >
                {t.studio.removeLogo}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-violet-500/40 hover:border-fuchsia-500 bg-violet-950/20 hover:bg-violet-950/40 text-xs font-medium text-slate-300 transition flex items-center justify-center gap-2"
          >
            <ImageIcon className="w-4 h-4 text-fuchsia-400" />
            <span>Upload Custom Brand Logo Image</span>
          </button>
        )}
      </div>

      {/* 6. Error Correction Level & Resolution Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Error Correction */}
        <div>
          <label className="text-xs font-semibold text-slate-200 mb-1.5 block">
            {t.studio.errorCorrection}
          </label>
          <div className="grid grid-cols-4 gap-1">
            {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => onStyleChange({ ...styleConfig, errorCorrectionLevel: lvl })}
                className={`py-1.5 text-xs font-bold rounded-lg transition ${
                  styleConfig.errorCorrectionLevel === lvl
                    ? 'bg-fuchsia-600 text-white shadow'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Size Slider */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-slate-200">{t.studio.size}</label>
            <span className="text-xs font-mono text-slate-300">{styleConfig.size}px</span>
          </div>
          <input
            type="range"
            min="256"
            max="1024"
            step="32"
            value={styleConfig.size}
            onChange={(e) =>
              onStyleChange({ ...styleConfig, size: parseInt(e.target.value, 10) })
            }
            className="w-full accent-fuchsia-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
