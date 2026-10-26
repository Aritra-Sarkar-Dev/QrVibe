import React, { useState } from 'react';
import {
  X,
  Trash2,
  ExternalLink,
  Star,
  Search,
  Clock,
  QrCode,
  Edit3,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { HistoryItem } from '../types/index.ts';
import { Translations } from '../utils/i18n.ts';
import {
  getStoredHistory,
  deleteHistoryItem,
  toggleFavoriteHistoryItem,
  updateHistoryItemNotes,
  clearHistory,
} from '../utils/storage.ts';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onReopen: (item: HistoryItem) => void;
  t: Translations;
  onHistoryChanged: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onReopen,
  t,
  onHistoryChanged,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const history = getStoredHistory();

  const filtered = history.filter((item) => {
    if (onlyFavorites && !item.isFavorite) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.payload.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term) ||
      (item.notes && item.notes.toLowerCase().includes(term))
    );
  });

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    onHistoryChanged();
  };

  const handleToggleFav = (id: string) => {
    toggleFavoriteHistoryItem(id);
    onHistoryChanged();
  };

  const handleStartEditNote = (item: HistoryItem) => {
    setEditingNoteId(item.id);
    setNoteDraft(item.notes || '');
  };

  const handleSaveNote = (id: string) => {
    updateHistoryItemNotes(id, noteDraft.trim());
    setEditingNoteId(null);
    onHistoryChanged();
  };

  const handleCopyPayload = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {}
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your QR history?')) {
      clearHistory();
      onHistoryChanged();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-md h-full bg-[#120d24] border-l border-violet-500/30 p-6 flex flex-col text-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-lg font-bold font-['Outfit']">{t.history.title}</h3>
            <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/10">
              {history.length}/20
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="py-4 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.history.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/40 border border-violet-500/30 text-xs text-white focus:border-fuchsia-500 outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition ${
                onlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{t.history.favoritesOnly}</span>
            </button>

            {history.length > 0 && (
              <button
                onClick={handleClear}
                className="text-slate-400 hover:text-rose-400 transition"
              >
                {t.history.clearAll}
              </button>
            )}
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <QrCode className="w-10 h-10 mx-auto text-slate-500" />
              <p className="text-sm font-semibold">{t.history.empty}</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                {t.history.emptyDesc}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-black/30 border border-violet-500/20 hover:border-violet-500/40 transition group space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {/* Download Counter */}
                      <span
                        className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                        title="Times downloaded"
                      >
                        <Download className="w-2.5 h-2.5" />
                        <span>{item.downloadsCount || 0}</span>
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white mt-1.5 truncate">{item.title}</p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">{item.payload}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopyPayload(item.id, item.payload)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white transition"
                      title="Copy payload"
                      aria-label="Copy payload"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleToggleFav(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 transition"
                      aria-label="Favorite"
                      title="Favorite"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          item.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => {
                        onReopen(item);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition"
                      title={t.history.reopen}
                      aria-label={t.history.reopen}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 transition"
                      title={t.history.delete}
                      aria-label={t.history.delete}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Notes Section for each History Item */}
                <div className="pt-1 border-t border-white/5">
                  {editingNoteId === item.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add a private note (e.g., table 4 menu, guest wifi)..."
                        className="flex-1 px-2 py-1 text-[11px] rounded bg-black/60 border border-violet-500/30 text-white outline-none focus:border-fuchsia-400"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveNote(item.id);
                          if (e.key === 'Escape') setEditingNoteId(null);
                        }}
                      />
                      <button
                        onClick={() => handleSaveNote(item.id)}
                        className="px-2 py-1 text-[10px] font-bold rounded bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        className="px-1.5 py-1 text-[10px] text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="italic truncate pr-2">
                        {item.notes ? `Note: ${item.notes}` : 'No notes'}
                      </span>
                      <button
                        onClick={() => handleStartEditNote(item)}
                        className="inline-flex items-center gap-1 text-[10px] text-fuchsia-400 hover:text-fuchsia-300 shrink-0 font-medium"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{item.notes ? 'Edit note' : '+ Add note'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
