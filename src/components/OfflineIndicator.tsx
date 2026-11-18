import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { TranslationSet } from '../types/labels';

interface OfflineIndicatorProps {
  t: TranslationSet;
}

export function OfflineIndicator({ t }: OfflineIndicatorProps) {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="no-print fixed bottom-16 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 shadow-md whitespace-nowrap"
    >
      <WifiOff className="h-3.5 w-3.5 shrink-0 text-amber-700" aria-hidden="true" />
      <span>{t.offlineMode}</span>
    </div>
  );
}
