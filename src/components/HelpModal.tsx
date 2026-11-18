import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';
import { TranslationSet } from '../types/labels';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationSet;
}

export function HelpModal({ isOpen, onClose, t }: HelpModalProps) {
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

  const steps = [t.helpStep1, t.helpStep2, t.helpStep3, t.helpStep4];

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-dialog-title"
    >
      <div className="max-h-[85vh] w-full max-w-[480px] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
        <h2
          id="help-dialog-title"
          className="mb-4 text-xl font-bold text-slate-900"
        >
          {t.helpTitle}
        </h2>

        <ol className="mb-5 flex flex-col gap-3.5">
          {steps.map((stepText, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1f6feb] text-xs font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-sm leading-relaxed text-slate-700">
                {stepText}
              </span>
            </li>
          ))}
        </ol>

        <div className="flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 p-3.5">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-amber-700"
            aria-hidden="true"
          />
          <p className="text-[13px] font-semibold leading-snug text-amber-800">
            {t.helpWarning}
          </p>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a5fd0] cursor-pointer whitespace-nowrap"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
