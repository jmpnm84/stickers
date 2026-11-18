import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGE_OPTIONS } from '../data/translations';
import { Language } from '../types/labels';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
  ariaLabel: string;
}

export function LanguageSelector({
  language,
  onChange,
  ariaLabel,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current =
    LANGUAGE_OPTIONS.find((opt) => opt.code === language) ??
    LANGUAGE_OPTIONS[0];

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-slate-100 px-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer whitespace-nowrap"
      >
        <FlagIcon code={current.code} />
        <span>{current.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-150 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute right-0 mt-1.5 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
        >
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = opt.code === language;
            return (
              <li key={opt.code} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 font-semibold text-[#1f6feb]'
                      : 'font-medium text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FlagIcon code={opt.code} />
                    <span>{opt.name}</span>
                  </span>
                  {isSelected && (
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-[#1f6feb]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
