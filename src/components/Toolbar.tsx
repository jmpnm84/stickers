import { HelpCircle, PencilLine, Printer, Tag } from 'lucide-react';
import { LANGUAGE_OPTIONS } from '../data/translations';
import { Language, TranslationSet } from '../types/labels';

interface ToolbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenHelp: () => void;
  onOpenFill: () => void;
  onPrint: () => void;
  t: TranslationSet;
}

export function Toolbar({
  language,
  onLanguageChange,
  onOpenHelp,
  onOpenFill,
  onPrint,
  t,
}: ToolbarProps) {
  return (
    <header className="no-print fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-b border-slate-300 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-md sm:px-5">
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#1f6feb] text-white">
          <Tag className="h-4 w-4" aria-hidden="true" />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-base whitespace-nowrap shrink-0">
          {t.appName}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onOpenHelp}
          title={t.helpAria}
          aria-label={t.helpAria}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer shrink-0"
        >
          <HelpCircle className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex h-8 items-center rounded-md border border-slate-300 bg-slate-100 px-1.5 shrink-0">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            aria-label={t.langAria}
            className="cursor-pointer bg-transparent text-xs font-semibold text-slate-800 outline-none focus-visible:outline-none"
          >
            {LANGUAGE_OPTIONS.map((opt) => (
              <option key={opt.code} value={opt.code}>
                {opt.flag} {opt.label}
              </option>
            ))}
          </select>
        </div>

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
