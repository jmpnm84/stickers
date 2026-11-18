import { CheckCircle2, RefreshCw } from 'lucide-react';
import { UpdateFeedback } from '../hooks/usePWAUpdate';
import { TranslationSet } from '../types/labels';

interface UpdateBannerProps {
  showAvailableBanner: boolean;
  feedback: UpdateFeedback;
  onApplyUpdate: () => void;
  onDismiss: () => void;
  t: TranslationSet;
}

export function UpdateBanner({
  showAvailableBanner,
  feedback,
  onApplyUpdate,
  onDismiss,
  t,
}: UpdateBannerProps) {
  if (showAvailableBanner) {
    return (
      <div
        role="status"
        className="no-print fixed top-14 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-blue-200 bg-white px-3.5 py-2 shadow-lg"
      >
        <RefreshCw className="h-4 w-4 shrink-0 text-[#1f6feb]" aria-hidden="true" />
        <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
          {t.updateAvailable}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onDismiss}
            className="rounded px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer whitespace-nowrap"
          >
            {t.later}
          </button>
          <button
            type="button"
            onClick={onApplyUpdate}
            className="rounded-md bg-[#1f6feb] px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#1a5fd0] cursor-pointer whitespace-nowrap"
          >
            {t.updateInstall}
          </button>
        </div>
      </div>
    );
  }

  if (feedback === 'up-to-date') {
    return (
      <div
        role="status"
        className="no-print fixed top-14 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 shadow-md whitespace-nowrap"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        <span>{t.updateUpToDate}</span>
      </div>
    );
  }

  return null;
}
