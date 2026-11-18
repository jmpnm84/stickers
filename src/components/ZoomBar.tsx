import { Minus, Plus } from 'lucide-react';
import { TranslationSet } from '../types/labels';

interface ZoomBarProps {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  t: TranslationSet;
}

export function ZoomBar({ scale, onZoomIn, onZoomOut, onReset, t }: ZoomBarProps) {
  return (
    <div
      className="no-print fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-slate-900/85 px-3 py-1.5 text-white shadow-lg backdrop-blur-md"
      role="group"
      aria-label="Zoom"
    >
      <button
        type="button"
        onClick={onZoomOut}
        title={t.zoomOut}
        aria-label={t.zoomOut}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 active:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
      >
        <Minus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <span className="font-mono-tabular min-w-[46px] text-center text-xs font-semibold">
        {Math.round(scale * 100)}%
      </span>

      <button
        type="button"
        onClick={onZoomIn}
        title={t.zoomIn}
        aria-label={t.zoomIn}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30 active:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={onReset}
        title={t.zoomReset}
        className="ml-0.5 h-7 rounded-md bg-white/20 px-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/30 active:bg-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white cursor-pointer whitespace-nowrap shrink-0"
      >
        {t.zoomReset}
      </button>
    </div>
  );
}
