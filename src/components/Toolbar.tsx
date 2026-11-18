import { HelpCircle, PencilLine, Printer, RefreshCw } from 'lucide-react';
import { UpdateFeedback } from '../hooks/usePWAUpdate';
import { Language, TranslationSet } from '../types/labels';
import { LanguageSelector } from './LanguageSelector';
import { PWAInstallButton } from './PWAInstallButton';

interface ToolbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenHelp: () => void;
  onCheckUpdate: () => void;
  updateAvailable: boolean;
  updateFeedback: UpdateFeedback;
  onOpenFill: () => void;
  onPrint: () => void;
  t: TranslationSet;
}

export function Toolbar({
  language,
  onLanguageChange,
  onOpenHelp,
  onCheckUpdate,
  updateAvailable,
  updateFeedback,
  onOpenFill,
  onPrint,
  t,
}: ToolbarProps) {
  const isChecking = updateFeedback === 'checking';

  return (
    <header className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-center border-b border-slate-300 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-md sm:px-5">
      <div className="flex items-center justify-center gap-2 shrink-0">
        <PWAInstallButton t={t} />

        <button
          type="button"
          onClick={onOpenHelp}
          title={t.helpAria}
          aria-label={t.helpAria}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer shrink-0"
        >
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onCheckUpdate}
          disabled={isChecking}
          title={
            updateAvailable
              ? t.updateAvailable
              : isChecking
                ? t.updateChecking
                : t.updateCheckAria
          }
          aria-label={
            updateAvailable ? t.updateInstall : t.updateCheckAria
          }
          className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full border text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer whitespace-nowrap shrink-0 ${
            updateAvailable
              ? 'border-[#1f6feb] bg-[#1f6feb] px-2.5 text-white hover:bg-[#1a5fd0]'
              : 'w-8 border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${isChecking ? 'animate-spin' : ''}`}
            aria-hidden="true"
          />
          {updateAvailable && <span>{t.updateInstall}</span>}
        </button>

        <LanguageSelector
          language={language}
          onChange={onLanguageChange}
          ariaLabel={t.langAria}
        />

        <button
          type="button"
          onClick={onOpenFill}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#1f6feb] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#1a5fd0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer whitespace-nowrap shrink-0"
        >
          <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.fill}</span>
        </button>

        <button
          type="button"
          onClick={onPrint}
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-slate-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer whitespace-nowrap shrink-0"
        >
          <Printer className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t.print}</span>
        </button>
      </div>
    </header>
  );
}
