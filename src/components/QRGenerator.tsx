/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import { QRType, QRStyleConfig, HistoryItem, PresetName } from '../types/index.ts';
import { DEFAULT_STYLE_CONFIG, QR_PRESETS } from '../utils/presets.ts';
import { Translations } from '../utils/i18n.ts';
import { TypeForms } from './TypeForms.tsx';
import { CustomizationStudio } from './CustomizationStudio.tsx';
import { QRPreview } from './QRPreview.tsx';

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

  // Scroll listener to show/hide floating mini QR when scrolled past live preview
  useEffect(() => {
    const handleScroll = () => {
      const previewEl = document.getElementById('live-preview-card');
      if (previewEl && debouncedPayload.trim().length > 0) {
        const rect = previewEl.getBoundingClientRect();
        // If preview is scrolled above viewport or far below, show floating QR
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

  // Extra tiles shown when "More" is expanded
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

    // Smoothly scroll to Card 2 and focus first input
    setTimeout(() => {
      document.getElementById('card-input-form')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const firstInput = document.querySelector('#card-input-form input, #card-input-form textarea') as HTMLElement;
        firstInput?.focus();
      }, 150);
    }, 50);
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
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
          
          {/* Left Column (or full width on mobile): Content / Logo / Style / Themes / Saved */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* TAB: CONTENT (Card 1: Type Tiles & Card 2: Input Form) */}
            {(activeTab === 'content' || activeTab === 'logo') && (
              <>
                {/* Section Title Row: small icon box + the word "Content" (20px bold) */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
                    <div className="w-full h-full bg-[#0b0813] rounded-[10px] flex items-center justify-center">
                      <Sliders className="w-4 h-4 text-fuchsia-400" />
                    </div>
                  </div>
                  <h2 className="text-xl font-bold font-['Outfit'] text-white">Content</h2>
                </div>

                {/* Card 1: "What should the QR open?" */}
                <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-4 sm:p-5 backdrop-blur-2xl shadow-xl space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuchsia-300">
                    What should the QR open?
                  </div>

                  {/* 4 columns grid, 8px gap (gap-2), compact rounded rectangle height 76px, width ~82px */}
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

                    {/* Extra tiles when "More" is expanded */}
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

                    {/* 12th Slot: More / Less Tile */}
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
                      {t.types[activeType]?.label || activeType} link
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t.types[activeType]?.desc || 'Paste any link: website, Instagram, YouTube, Google Maps...'}
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
                <h3 className="text-lg font-bold font-['Outfit'] text-white">Ready-Made Aesthetic Themes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(Object.keys(QR_PRESETS) as PresetName[]).map((pName) => {
                    const preset = QR_PRESETS[pName];
                    const isSelected = styleConfig.preset === pName;
                    return (
                      <button
                        key={pName}
                        onClick={() => {
                          handleStyleChange({
                            ...styleConfig,
                            ...preset.style,
                            preset: pName,
                          });
                        }}
                        className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 ${
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
              <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-6 backdrop-blur-2xl shadow-xl space-y-4">
                <h3 className="text-lg font-bold font-['Outfit'] text-white">Saved History</h3>
                <p className="text-xs text-slate-400">
                  Access your recently generated and saved QR codes across sessions.
                </p>
                <div className="text-center py-10 text-slate-500 text-xs">
                  Click the history icon in the top header to open your saved items drawer anytime.
                </div>
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

        {/* E. FIXED BOTTOM TAB BAR (Only on generator screen, mobile / tablet) */}
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
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition ${
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

        {/* F. FLOATING MINI QR (Small 64px rounded QR thumbnail floating at bottom-right above tab bar) */}
        {showFloatingQR && debouncedPayload.trim().length > 0 && (
          <button
            type="button"
            onClick={() => {
              document.getElementById('live-preview-card')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="fixed bottom-20 right-4 z-40 w-16 h-16 rounded-2xl bg-white border-2 border-fuchsia-500 p-1.5 shadow-2xl flex items-center justify-center lg:hidden transition hover:scale-105 active:scale-95 group"
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
