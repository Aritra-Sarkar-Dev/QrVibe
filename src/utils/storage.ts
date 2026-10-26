import { HistoryItem, Language, Theme } from '../types/index.ts';

const HISTORY_KEY = 'qrvibe_history_v1';
const THEME_KEY = 'qrvibe_theme_v1';
const LANG_KEY = 'qrvibe_lang_v1';
const MAX_HISTORY = 20;

export function getStoredTheme(): Theme {
  try {
    const val = localStorage.getItem(THEME_KEY);
    if (val === 'light' || val === 'dark') return val;
  } catch {}
  return 'dark'; // Default dark mode as requested
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function getStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(LANG_KEY);
    if (val === 'bn' || val === 'en') return val;
  } catch {}
  return 'en';
}

export function setStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

export function getStoredHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
  }
  return [];
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): HistoryItem[] {
  try {
    const current = getStoredHistory();
    // Check if an item with identical payload and type exists to preserve notes and downloads count
    const existing = current.find((h) => h.payload === item.payload && h.type === item.type);
    const newItem: HistoryItem = {
      ...item,
      id: existing ? existing.id : `qr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      notes: item.notes || (existing?.notes ?? ''),
      downloadsCount: (item.downloadsCount !== undefined ? item.downloadsCount : (existing?.downloadsCount ?? 0)),
      isFavorite: item.isFavorite !== undefined ? item.isFavorite : (existing?.isFavorite ?? false),
    };

    // Filter out duplicates with identical payload and type to keep it clean
    const filtered = current.filter((h) => !(h.payload === newItem.payload && h.type === newItem.type));
    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);

    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save history item', e);
    return getStoredHistory();
  }
}

export function updateHistoryItemNotes(id: string, notes: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.map((item) =>
      item.id === id ? { ...item, notes } : item
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update notes on history item', e);
    return getStoredHistory();
  }
}

export function incrementHistoryItemDownload(idOrPayload: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.map((item) => {
      if (item.id === idOrPayload || item.payload === idOrPayload) {
        return { ...item, downloadsCount: (item.downloadsCount || 0) + 1 };
      }
      return item;
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to increment download counter', e);
    return getStoredHistory();
  }
}

export function toggleFavoriteHistoryItem(id: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to update favorite item', e);
    return getStoredHistory();
  }
}

export function deleteHistoryItem(id: string): HistoryItem[] {
  try {
    const current = getStoredHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete history item', e);
    return getStoredHistory();
  }
}

export function clearHistory(): HistoryItem[] {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
  return [];
}
