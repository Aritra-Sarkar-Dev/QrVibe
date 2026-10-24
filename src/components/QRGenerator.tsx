import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Type,
  Link2,
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
} from 'lucide-react';
import { QRType, QRStyleConfig, HistoryItem, PresetName } from '../types/index.ts';
import { DEFAULT_STYLE_CONFIG, QR_PRESETS } from '../utils/presets.ts';
import { Translations } from '../utils/i18n.ts';
import { TypeForms } from './TypeForms.tsx';
import { CustomizationStudio } from './CustomizationStudio.tsx';
import { QRPreview } from './QRPreview.tsx';
import { AdSlot } from './AdSlot.tsx';

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
}

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
}) => {
  const [activeType, setActiveType] = useState<QRType>('link');
  const [payload, setPayload] = useState<string>('https://qrvibe.app');
  const [debouncedPayload, setDebouncedPayload] = useState<string>('https://qrvibe.app');
  const [title, setTitle] = useState<string>('Website Link');
  const [styleConfig, setStyleConfig] = useState<QRStyleConfig>(DEFAULT_STYLE_CONFIG);
  const [activeStudioTab, setActiveStudioTab] = useState<'content' | 'customize'>('content');

  // Debounce payload updates by 250ms as required
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
      setStyleConfig((prev) => ({
        ...prev,
        ...preset.style,
        preset: onPresetSelectedFromHero,
      }));
    }
  }, [onPresetSelectedFromHero]);

  // Type definitions array
  const typeList: Array<{ id: QRType; icon: React.ReactNode }> = [
    { id: 'link', icon: <Link2 className="w-4 h-4" /> },
    { id: 'image', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'text', icon: <Type className="w-4 h-4" /> },
    { id: 'wifi', icon: <Wifi className="w-4 h-4" /> },
    { id: 'contact', icon: <Contact className="w-4 h-4" /> },
    { id: 'whatsapp', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'social', icon: <Share2 className="w-4 h-4" /> },
    { id: 'email', icon: <Mail className="w-4 h-4" /> },
    { id: 'sms', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'phone', icon: <Phone className="w-4 h-4" /> },
    { id: 'location', icon: <MapPin className="w-4 h-4" /> },
    { id: 'calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'payment', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'applink', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'bulk', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <section id="generator" className="py-12 sm:py-16 relative">
      {/* Top Banner AdSlot */}
      <AdSlot position="top-banner" t={t} onUpgradeClick={onOpenProModal} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-white">
            {t.studio.generatorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {t.studio.generatorSubtitle}
          </p>
        </div>

        {/* 15 QR Type Chips (Horizontal scrollable on mobile, flex-wrap on desktop) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none sm:flex-wrap sm:justify-center">
            {typeList.map((item) => {
              const info = t.types[item.id];
              const isSelected = activeType === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'bulk') {
                      onOpenBulkModal();
                    } else {
                      setActiveType(item.id);
                      setActiveStudioTab('content');
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 text-white border-transparent shadow-lg shadow-fuchsia-500/25 scale-105'
                      : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                  aria-selected={isSelected}
                >
                  <span className={isSelected ? 'text-white' : 'text-fuchsia-400'}>
                    {item.icon}
                  </span>
                  <span>{info.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Main Workspace: 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Forms & Customization Studio */}
          <div className="lg:col-span-7 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-5 sm:p-8 backdrop-blur-2xl shadow-xl">
            {/* Tab switch between Content input & Vibe customization */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <button
                type="button"
                onClick={() => setActiveStudioTab('content')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  activeStudioTab === 'content'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.studio.tabContent}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveStudioTab('customize')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                  activeStudioTab === 'customize'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                <span>{t.studio.tabStyle}</span>
              </button>
            </div>

            {/* Tab 1: Content Forms */}
            {activeStudioTab === 'content' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                    <span>{t.types[activeType].label} QR</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.types[activeType].desc}
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
                    setStyleConfig((prev) => ({
                      ...prev,
                      logoUrl,
                      errorCorrectionLevel: logoUrl ? 'H' : prev.errorCorrectionLevel,
                      logoSize: 0.22,
                      logoMargin: 4,
                    }));
                  }}
                />

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveStudioTab('customize')}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-violet-500/30 bg-violet-950/20 hover:bg-violet-950/40 text-violet-300 transition flex items-center justify-center gap-1.5"
                  >
                    <span>{t.studio.proceedToStyle}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Tab 2: Customization Studio */
              <CustomizationStudio
                styleConfig={styleConfig}
                onStyleChange={setStyleConfig}
                t={t}
                currentLang={currentLang}
              />
            )}
          </div>

          {/* Right Column: Live QR Preview & Actions (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-3xl border border-violet-500/20 bg-gradient-to-b from-[#140e2b]/90 to-[#0e0a1f]/90 p-5 sm:p-8 backdrop-blur-2xl shadow-xl">
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
    </section>
  );
};
