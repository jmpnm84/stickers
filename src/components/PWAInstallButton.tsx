import { Download, Share } from 'lucide-react';
import { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { TranslationSet } from '../types/labels';

interface PWAInstallButtonProps {
  t: TranslationSet;
}

export function PWAInstallButton({ t }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer whitespace-nowrap shrink-0"
      >
        <Download className="h-3.5 w-3.5 text-[#1f6feb]" aria-hidden="true" />
        <span>{t.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6feb] cursor-pointer whitespace-nowrap shrink-0"
        >
          <Share className="h-3.5 w-3.5 text-[#1f6feb]" aria-hidden="true" />
          <span>{t.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div
            className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowIOSGuide(false);
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
              <h3
                id="ios-install-title"
                className="text-lg font-bold text-slate-900"
              >
                {t.iosTitle}
              </h3>
              <ol className="mt-3 flex flex-col gap-2 text-sm text-slate-700">
                <li>1. {t.iosStep1}</li>
                <li>2. {t.iosStep2}</li>
              </ol>
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a5fd0] cursor-pointer"
                >
                  {t.close}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
}
