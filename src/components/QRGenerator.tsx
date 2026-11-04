/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Image as ImageIcon,
  Type,
  Link2,
  Globe,
  Wifi,
  Contact,
  MessageCircle,
  Share2,
  Mail,
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Smartphone,
  Layers,
  Sliders,
  Sparkles,
  QrCode,
  ChevronDown,
  ChevronUp,
  FileText,
  Palette,
  Bookmark,
  CheckCircle2,
  X,
  Check,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { QRType, QRStyleConfig, HistoryItem, PresetName } from '../types/index.ts';
import { DEFAULT_STYLE_CONFIG, QR_PRESETS } from '../utils/presets.ts';
import { Translations } from '../utils/i18n.ts';
import { TypeForms } from './TypeForms.tsx';
import { CustomizationStudio } from './CustomizationStudio.tsx';
import { QRPreview } from './QRPreview.tsx';
import { BUILTIN_LOGOS } from '../utils/logos.ts';
import { uploadLogoToImgBB } from '../utils/imgbb.ts';
import { getStoredHistory, deleteHistoryItem, clearHistory } from '../utils/storage.ts';

interface QRGeneratorProps {
  t: Translations;
  currentLang: string;
  onOpenBulkModal: () => void;
  onOpenWatchAdModal: () => void;
  onOpenProModal: () => void;
  isHdUnlocked: boolean;
  onHistoryUpdated: () => void;
  reopenItem?: HistoryItem | null;
  onPresetSelectedFromHero?: PresetName | null;
  initialType?: QRType;
}

type GeneratorTab = 'content' | 'logo' | 'style' | 'themes' | 'saved';

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  t,
  currentLang,
  onOpenBulkModal,
  onOpenWatchAdModal,
  onOpenProModal,
  isHdUnlocked,
  onHistoryUpdated,
  reopenItem,
  onPresetSelectedFromHero,
  initialType,
}) => {
  const [activeType, setActiveType] = useState<QRType>(initialType || 'link');
  const [payload, setPayload] = useState<string>('');
  const [debouncedPayload, setDebouncedPayload] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [styleConfig, setStyleConfig] = useState<QRStyleConfig>(DEFAULT_STYLE_CONFIG);
  const [undoStack, setUndoStack] = useState<QRStyleConfig[]>([]);
  const [redoStack, setRedoStack] = useState<QRStyleConfig[]>([]);
  const [activeTab, setActiveTab] = useState<GeneratorTab>('content');
  const [showMoreTypes, setShowMoreTypes] = useState<boolean>(false);
  const [showFloatingQR, setShowFloatingQR] = useState<boolean>(false);
  const [savedItems, setSavedItems] = useState<HistoryItem[]>([]);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Load saved history items on mount or tab switch
  useEffect(() => {
    setSavedItems(getStoredHistory());
  }, [activeTab]);

  // Handle external initialType updates
  useEffect(() => {
    if (initialType) {
      setActiveType(initialType);
      if (['payment', 'image', 'applink', 'bulk'].includes(initialType)) {
        setShowMoreTypes(true);
      }
    }
  }, [initialType]);

  // Push style updates to undo stack
  const handleStyleChange = (newStyle: QRStyleConfig) => {
    setUndoStack((prev) => [...prev.slice(-25), styleConfig]);
    setRedoStack([]);
    setStyleConfig(newStyle);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, styleConfig]);
    setStyleConfig(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, styleConfig]);
    setStyleConfig(next);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const target = e.target as HTMLElement;
        const tag = target?.tagName?.toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
          (target as HTMLInputElement).value = '';
          target.dispatchEvent(new Event('input', { bubbles: true }));
          target.blur();
        } else {
          setPayload('');
          setTitle('');
          setActiveTab('content');
        }
        return;
      }

      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, styleConfig]);

  // Debounce payload updates by 250ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPayload(payload);
    }, 250);
    return () => clearTimeout(handler);
  }, [payload]);

  // Handle re-opened item from history
  useEffect(() => {
    if (reopenItem) {
      setActiveType(reopenItem.type);
      setPayload(reopenItem.payload);
      setTitle(reopenItem.title);
      if (reopenItem.style) {
        setStyleConfig(reopenItem.style);
      }
      setActiveTab('content');
    }
  }, [reopenItem]);

  // Handle preset selected from hero
  useEffect(() => {
    if (onPresetSelectedFromHero && QR_PRESETS[onPresetSelectedFromHero]) {
      const preset = QR_PRESETS[onPresetSelectedFromHero];
      handleStyleChange({
        ...styleConfig,
        ...preset.style,
        preset: onPresetSelectedFromHero,
      });
    }
  }, [onPresetSelectedFromHero]);

  // Scroll listener to show/hide floating mini QR
  useEffect(() => {
    const handleScroll = () => {
      const previewEl = document.getElementById('live-preview-card');
      if (previewEl && debouncedPayload.trim().length > 0) {
        const rect = previewEl.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setShowFloatingQR(true);
        } else {
          setShowFloatingQR(false);
        }
      } else {
        setShowFloatingQR(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [debouncedPayload]);

  // 11 Main Tiles for slots 1-11
  const mainTypeList: Array<{ id: QRType; icon: React.ReactNode; label: string }> = [
    { id: 'link', icon: <Globe className="w-6 h-6" />, label: 'Website' },
    { id: 'wifi', icon: <Wifi className="w-6 h-6" />, label: 'Wi-Fi' },
    { id: 'contact', icon: <Contact className="w-6 h-6" />, label: 'Contact' },
    { id: 'email', icon: <Mail className="w-6 h-6" />, label: 'Email' },
    { id: 'text', icon: <FileText className="w-6 h-6" />, label: 'Text' },
    { id: 'sms', icon: <MessageSquare className="w-6 h-6" />, label: 'SMS' },
    { id: 'phone', icon: <Phone className="w-6 h-6" />, label: 'Call' },
    { id: 'location', icon: <MapPin className="w-6 h-6" />, label: 'Location' },
    { id: 'calendar', icon: <Calendar className="w-6 h-6" />, label: 'Event' },
    { id: 'whatsapp', icon: <MessageCircle className="w-6 h-6" />, label: 'WhatsApp' },
    { id: 'social', icon: <Share2 className="w-6 h-6" />, label: 'Social' },
  ];

  const extraTypeList: Array<{ id: QRType; icon: React.ReactNode; label: string }> = [
    { id: 'payment', icon: <CreditCard className="w-6 h-6" />, label: 'Payment' },
    { id: 'image', icon: <ImageIcon className="w-6 h-6" />, label: 'Image' },
    { id: 'applink', icon: <Smartphone className="w-6 h-6" />, label: 'App/PDF' },
    { id: 'bulk', icon: <Layers className="w-6 h-6" />, label: 'Bulk CSV' },
  ];

  const handleSelectType = (id: QRType) => {
    if (id === 'bulk') {
      onOpenBulkModal();
      return;
    }
    setActiveType(id);
    setActiveTab('content');

    setTimeout(() => {
      document.getElementById('card-input-form')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstInput = document.querySelector('#card-input-form input, #card-input-form textarea') as HTMLElement;
        firstInput?.focus();
      }, 150);
    }, 50);
  };

  // Logo handlers
  const handleSelectBuiltinLogo = (dataUrl: string) => {
    handleStyleChange({
      ...styleConfig,
      logoUrl: dataUrl,
      errorCorrectionLevel: 'H',
      logoSize: 0.22,
      logoMargin: 4,
    });
  };

  const handleLogoUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      handleStyleChange({
        ...styleConfig,
        logoUrl: url,
        errorCorrectionLevel: 'H',
      });
    };
    reader.readAsDataURL(file);

    const hostedUrl = await uploadLogoToImgBB(file);
    if (hostedUrl) {
      handleStyleChange({
        ...styleConfig,
        logoUrl: hostedUrl,
        errorCorrectionLevel: 'H',
      });
    }
  };

  const handleRemoveLogo = () => {
    handleStyleChange({
      ...styleConfig,
      logoUrl: undefined,
    });
  };

  return (
    <section id="generator" className="py-2 sm:py-6 relative pb-28 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Desktop Top Tab Row */}
        <div className="hidden lg:flex items-center gap-2 mb-8 bg-[#120d24] border border-violet-500/20 p-2 rounded-2xl w-fit shadow-xl">
          {(
            [
              { id: 'content', label: 'Content', icon: <Sliders className="w-4 h-4 text-cyan-400" /> },
              { id: 'logo', label: 'Logo', icon: <Sparkles className="w-4 h-4 text-fuchsia-400" /> },
              { id: 'style', label: 'Style & Colors', icon: <Palette className="w-4 h-4 text-emerald-400" /> },
              { id: 'themes', label: 'Themes', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
              { id: 'saved', label: 'Saved', icon: <Bookmark className="w-4 h-4 text-violet-400" /> },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Studio Main Workspace: 2-Column Split Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Content / Logo / Style / Themes / Saved */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* TAB: CONTENT */}
            {activeTab === 'content' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#0b0813] rounded-[10px] flex items-center justify-center">
                      <Sliders className="w-4 h-4 text-fuchsia-400" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold font-['Outfit'] text-white">Content Studio</h2>
                </div>

                {/* Card 1: Type Selection */}
                <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-4 sm:p-5 backdrop-blur-2xl shadow-xl space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
                    What should the QR open?
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {mainTypeList.map((item) => {
                      const isSelected = activeType === item.id;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => handleSelectType(item.id)}
                          className={`h-[76px] rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center p-1 text-center cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'border-fuchsia-500 bg-violet-950/70 shadow-[0_0_15px_rgba(217,70,239,0.35)] ring-1 ring-fuchsia-400 text-white'
                              : 'border-white/10 bg-[#120d24]/80 hover:bg-white/10 text-slate-300'
                          }`}
                          aria-selected={isSelected}
                        >
                          <span className={isSelected ? 'text-fuchsia-300 mb-1' : 'text-fuchsia-400 mb-1'}>
                            {item.icon}
                          </span>
                          <span className="text-[12px] sm:text-[13px] font-semibold tracking-tight line-clamp-1 w-full px-1">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}

                    {showMoreTypes &&
                      extraTypeList.map((item) => {
                        const isSelected = activeType === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => handleSelectType(item.id)}
                            className={`h-[76px] rounded-2xl border transition-all duration-200 flex flex-col items-center justify-center p-1 text-center cursor-pointer relative overflow-hidden animate-fadeIn ${
                              isSelected
                                ? 'border-fuchsia-500 bg-violet-950/70 shadow-[0_0_15px_rgba(217,70,239,0.35)] ring-1 ring-fuchsia-400 text-white'
                                : 'border-white/10 bg-[#120d24]/80 hover:bg-white/10 text-slate-300'
                            }`}
                            aria-selected={isSelected}
                          >
                            <span className={isSelected ? 'text-fuchsia-300 mb-1' : 'text-fuchsia-400 mb-1'}>
                              {item.icon}
                            </span>
                            <span className="text-[12px] sm:text-[13px] font-semibold tracking-tight line-clamp-1 w-full px-1">
                              {item.label}
                            </span>
                          </button>
                        );
                      })}

                    <button
                      type="button"
                      onClick={() => setShowMoreTypes(!showMoreTypes)}
                      className="h-[76px] rounded-2xl border border-violet-500/30 bg-violet-950/40 hover:bg-violet-950/60 text-fuchsia-300 transition flex flex-col items-center justify-center p-1 text-center cursor-pointer"
                    >
                      {showMoreTypes ? <ChevronUp className="w-5 h-5 mb-1" /> : <ChevronDown className="w-5 h-5 mb-1" />}
                      <span className="text-[12px] sm:text-[13px] font-semibold tracking-tight">
                        {showMoreTypes ? 'Less' : 'More'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Input Form */}
                <div id="card-input-form" className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-5 sm:p-6 backdrop-blur-2xl shadow-xl space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white font-['Outfit']">
                      {t.types[activeType]?.label || activeType} input
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t.types[activeType]?.desc || 'Enter your details below to generate live QR code.'}
                    </p>
                  </div>

                  <TypeForms
                    type={activeType}
                    t={t}
                    onPayloadChange={(newPayload, newTitle) => {
                      setPayload(newPayload);
                      setTitle(newTitle);
                    }}
                    onOpenBulkModal={onOpenBulkModal}
                    onOverlayLogo={(logoUrl) => {
                      handleStyleChange({
                        ...styleConfig,
                        logoUrl,
                        errorCorrectionLevel: logoUrl ? 'H' : styleConfig.errorCorrectionLevel,
                        logoSize: 0.22,
                        logoMargin: 4,
                      });
                    }}
                  />
                </div>
              </>
            )}

            {/* TAB: LOGO */}
            {activeTab === 'logo' && (
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-6 backdrop-blur-2xl shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#0b0813] rounded-[10px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-fuchsia-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-['Outfit'] text-white">Center Logo Studio</h2>
                    <p className="text-xs text-slate-400">Add your brand logo or choose social media emblems</p>
                  </div>
                </div>

                {/* Quick Social Brand Logos */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Popular Social & Brand Overlays:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {BUILTIN_LOGOS.map((logo) => {
                      const isSelected = styleConfig.logoUrl === logo.dataUrl;
                      return (
                        <button
                          type="button"
                          key={logo.id}
                          onClick={() => handleSelectBuiltinLogo(logo.dataUrl)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer ${
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-violet-950/40 border border-violet-500/30">
                    <div className="flex items-center gap-3">
                      <img
                        src={styleConfig.logoUrl}
                        alt="Logo Preview"
                        className="w-12 h-12 object-contain rounded-xl p-1 bg-white/10 border border-violet-500/30 shrink-0"
                      />
                      <div>
                        <span className="text-xs font-semibold text-emerald-400 block flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Logo Active (Error Correction Level H)</span>
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">Your QR code is optimized to scan with the logo.</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="py-2 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition cursor-pointer"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="py-2 px-3 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-medium text-rose-300 transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="w-full py-4 px-4 rounded-2xl border border-dashed border-violet-500/40 hover:border-fuchsia-500 bg-violet-950/20 hover:bg-violet-950/40 text-xs font-medium text-slate-300 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ImageIcon className="w-5 h-5 text-fuchsia-400" />
                    <span>Upload Custom Brand Logo (PNG, JPG, SVG)</span>
                  </button>
                )}
              </div>
            )}

            {/* TAB: STYLE */}
            {activeTab === 'style' && (
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-5 sm:p-6 backdrop-blur-2xl shadow-xl">
                <CustomizationStudio
                  styleConfig={styleConfig}
                  onStyleChange={handleStyleChange}
                  t={t}
                  currentLang={currentLang}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  canUndo={undoStack.length > 0}
                  canRedo={redoStack.length > 0}
                />
              </div>
            )}

            {/* TAB: THEMES */}
            {activeTab === 'themes' && (
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-6 backdrop-blur-2xl shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#0b0813] rounded-[10px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-['Outfit'] text-white">Aesthetic Themes</h2>
                    <p className="text-xs text-slate-400">One-click designer presets for instant professional style</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(Object.keys(QR_PRESETS) as PresetName[]).map((pName) => {
                    const preset = QR_PRESETS[pName];
                    const isSelected = styleConfig.preset === pName;
                    return (
                      <button
                        type="button"
                        key={pName}
                        onClick={() => {
                          handleStyleChange({
                            ...styleConfig,
                            ...preset.style,
                            preset: pName,
                          });
                        }}
                        className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-fuchsia-500 bg-violet-950/70 shadow-lg ring-1 ring-fuchsia-400'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white font-['Outfit']">
                            {pName.charAt(0).toUpperCase() + pName.slice(1)}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-fuchsia-400" />}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.style.dotsColor }} />
                          <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.style.backgroundColor }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: SAVED */}
            {activeTab === 'saved' && (
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-6 backdrop-blur-2xl shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                      <div className="w-full h-full bg-[#0b0813] rounded-[10px] flex items-center justify-center">
                        <Bookmark className="w-4 h-4 text-violet-400" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-['Outfit'] text-white">Saved QR History</h2>
                      <p className="text-xs text-slate-400">Your recently generated and saved codes</p>
                    </div>
                  </div>

                  {savedItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        clearHistory();
                        setSavedItems([]);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {savedItems.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-violet-950/40 border border-violet-500/30 flex items-center justify-center text-slate-400 mx-auto">
                      <Bookmark className="w-5 h-5 text-violet-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">No saved items yet</p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      QR codes you generate and download are automatically saved here for quick access.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-black/30 border border-white/10 hover:border-violet-500/40 transition flex items-center justify-between gap-4 group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded-full bg-fuchsia-600/20 text-fuchsia-300 text-[10px] font-bold uppercase tracking-wide border border-fuchsia-500/30">
                              {item.type}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white truncate font-['Outfit']">
                            {item.title || item.payload}
                          </h4>
                          <p className="text-xs text-slate-400 truncate mt-0.5 font-mono">
                            {item.payload}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setActiveType(item.type);
                              setPayload(item.payload);
                              setTitle(item.title);
                              if (item.style) {
                                setStyleConfig(item.style);
                              }
                              setActiveTab('content');
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = deleteHistoryItem(item.id);
                              setSavedItems(updated);
                              onHistoryUpdated();
                            }}
                            className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition cursor-pointer"
                            title="Delete saved item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live QR Preview Card (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div id="live-preview-card" className="rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-5 sm:p-6 backdrop-blur-2xl shadow-xl">
              <QRPreview
                payload={debouncedPayload}
                title={title}
                type={activeType}
                styleConfig={styleConfig}
                t={t}
                onOpenWatchAdModal={onOpenWatchAdModal}
                onOpenProModal={onOpenProModal}
                isHdUnlocked={isHdUnlocked}
                onHistoryUpdated={onHistoryUpdated}
              />
            </div>
          </div>
        </div>

        {/* Reserved Ad Space below generator */}
        <div className="w-full mt-10">
          <div className="border border-dashed border-violet-500/30 rounded-2xl p-4 bg-violet-950/10 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 px-2 py-0.5 rounded bg-white/5">
              {t.monetization.adSponsored} · Reserved Partner Slot
            </span>
          </div>
        </div>

        {/* E. FIXED BOTTOM TAB BAR (Mobile / Tablet) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e0a1f]/95 border-t border-violet-500/30 rounded-t-2xl backdrop-blur-xl px-2 py-2 lg:hidden shadow-2xl flex items-center justify-around pb-safe">
          {(
            [
              { id: 'content', label: 'Content', icon: <Sliders className="w-5 h-5" /> },
              { id: 'logo', label: 'Logo', icon: <Sparkles className="w-5 h-5" /> },
              { id: 'style', label: 'Style', icon: <Palette className="w-5 h-5" /> },
              { id: 'themes', label: 'Themes', icon: <Sparkles className="w-5 h-5" /> },
              { id: 'saved', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* F. FLOATING MINI QR */}
        {showFloatingQR && debouncedPayload.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              document.getElementById('live-preview-card')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="fixed bottom-20 right-4 z-40 w-16 h-16 rounded-2xl bg-white border-2 border-fuchsia-500 p-1.5 shadow-2xl flex items-center justify-center lg:hidden transition hover:scale-105 active:scale-95 group cursor-pointer"
            aria-label="Scroll to live preview"
          >
            <div className="w-full h-full bg-[#0b0813] rounded-xl flex items-center justify-center relative overflow-hidden">
              <QrCode className="w-8 h-8 text-fuchsia-400 group-hover:scale-110 transition" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
            </div>
          </button>
        )}

      </div>
    </section>
  );
};
