export type QRType =
  | 'image'
  | 'text'
  | 'link'
  | 'wifi'
  | 'contact'
  | 'whatsapp'
  | 'social'
  | 'email'
  | 'sms'
  | 'phone'
  | 'location'
  | 'calendar'
  | 'payment'
  | 'applink'
  | 'bulk';

export type PresetName =
  | 'neon'
  | 'cyberpunk'
  | 'sunset'
  | 'mint'
  | 'pastel'
  | 'glass'
  | 'minimal'
  | 'mono';

export type DotType =
  | 'rounded'
  | 'dots'
  | 'classy'
  | 'classy-rounded'
  | 'square'
  | 'extra-rounded';

export type CornerSquareType = 'dot' | 'square' | 'extra-rounded';
export type CornerDotType = 'dot' | 'square';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  color1: string;
  color2: string;
  rotation: number;
}

export interface QRStyleConfig {
  preset: PresetName;
  dotsType: DotType;
  dotsColor: string;
  gradient: GradientConfig;
  cornerSquareType: CornerSquareType;
  cornerSquareColor: string;
  cornerDotType: CornerDotType;
  cornerDotColor: string;
  backgroundColor: string; // or 'transparent'
  logoUrl?: string;
  logoSize: number; // 0.1 to 0.4
  logoMargin: number;
  size: number; // 256 to 1024
  errorCorrectionLevel: ErrorCorrectionLevel;
}

export interface HistoryItem {
  id: string;
  type: QRType;
  title: string;
  payload: string;
  timestamp: number;
  style: QRStyleConfig;
  isFavorite: boolean;
  notes?: string;
  downloadsCount?: number;
  previewDataUrl?: string;
}

export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';
