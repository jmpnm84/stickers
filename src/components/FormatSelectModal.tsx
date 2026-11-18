import { useEffect } from 'react';
import { LabelFormat, TranslationSet } from '../types/labels';

interface FormatSelectModalProps {
  isOpen: boolean;
  currentFormat: LabelFormat;
  onSelectFormat: (format: LabelFormat) => void;
  onClose: () => void;
  t: TranslationSet;
}

interface SheetPreviewProps {
  cols: number;
  rows: number;
  isSelected: boolean;
}

function SheetPreview({ cols, rows, isSelected }: SheetPreviewProps) {
  const total = cols * rows;
  return (
    <div
      aria-hidden="true"
      className={`mx-auto aspect-[210/297] w-[116px] rounded border bg-white p-2 shadow-sm transition-colors ${
        isSelected ? 'border-[#1f6feb]/50' : 'border-slate-300'
      }`}
    >
      <div
        className="grid h-full w-full gap-[2px]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: total }, (_, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-center gap-[2px] rounded-[1px] border px-[2px] ${
              isSelected
                ? 'border-[#1f6feb]/40 bg-blue-50/70'
                : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between gap-[2px]">
              <span
                className={`h-[1.5px] w-3/5 rounded-full ${
                  isSelected ? 'bg-[#1f6feb]/55' : 'bg-slate-300'
                }`}
              />
              <span
                className={`h-[1.5px] w-1/5 rounded-full ${
                  isSelected ? 'bg-[#1f6feb]/55' : 'bg-slate-300'
                }`}
              />
            </div>
            <span
              className={`h-[1.5px] w-2/5 rounded-full ${
                isSelected ? 'bg-[#1f6feb]/40' : 'bg-slate-300/80'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormatSelectModal({
  isOpen,
  currentFormat,
  onSelectFormat,
  onClose,
  t,
}: FormatSelectModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="format-dialog-title"
    >
      <div className="w-full max-w-[540px] rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-5">
          <h2
            id="format-dialog-title"
            className="text-xl font-bold text-slate-900"
          >
            {t.formatModalTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{t.formatModalSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onSelectFormat('4x12')}
            className={`group flex flex-col items-center rounded-lg border p-4 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer ${
              currentFormat === '4x12'
                ? 'border-[#1f6feb] bg-blue-50/35'
                : 'border-slate-200 bg-white hover:border-[#1f6feb]/70 hover:bg-slate-50'
            }`}
          >
            <SheetPreview
              cols={4}
              rows={12}
              isSelected={currentFormat === '4x12'}
            />
            <span className="mt-3.5 text-base font-bold text-slate-900">
              {t.format4x12Title}
            </span>
            <span className="font-mono-tabular mt-0.5 text-xs text-slate-500">
              {t.format4x12Desc}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onSelectFormat('3x9')}
            className={`group flex flex-col items-center rounded-lg border p-4 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer ${
              currentFormat === '3x9'
                ? 'border-[#1f6feb] bg-blue-50/35'
                : 'border-slate-200 bg-white hover:border-[#1f6feb]/70 hover:bg-slate-50'
            }`}
          >
            <SheetPreview
              cols={3}
              rows={9}
              isSelected={currentFormat === '3x9'}
            />
            <span className="mt-3.5 text-base font-bold text-slate-900">
              {t.format3x9Title}
            </span>
            <span className="font-mono-tabular mt-0.5 text-xs text-slate-500">
              {t.format3x9Desc}
            </span>
          </button>
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer whitespace-nowrap"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
