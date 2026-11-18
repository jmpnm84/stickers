import { Language } from '../types/labels';

interface FlagIconProps {
  code: Language;
  className?: string;
}

export function FlagIcon({ code, className = 'h-3.5 w-5' }: FlagIconProps) {
  const baseClass = `${className} shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10`;

  switch (code) {
    case 'pt':
      return (
        <svg viewBox="0 0 30 20" className={baseClass} aria-hidden="true">
          <rect width="12" height="20" fill="#046A38" />
          <rect x="12" width="18" height="20" fill="#DA291C" />
          <circle cx="12" cy="10" r="4.2" fill="#FFE000" />
          <path
            d="M10.1 8.1h3.8v2.3a1.9 1.9 0 0 1-3.8 0V8.1z"
            fill="#DA291C"
          />
          <path
            d="M10.8 8.8h2.4v1.5a1.2 1.2 0 0 1-2.4 0V8.8z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'es':
      return (
        <svg viewBox="0 0 30 20" className={baseClass} aria-hidden="true">
          <rect width="30" height="5" fill="#AA151B" />
          <rect y="5" width="30" height="10" fill="#F1BF00" />
          <rect y="15" width="30" height="5" fill="#AA151B" />
          <rect x="7" y="7.2" width="3.8" height="5.2" rx="1" fill="#AA151B" />
          <rect x="7.8" y="8" width="2.2" height="3.2" fill="#F1BF00" />
        </svg>
      );

    case 'en':
      return (
        <svg viewBox="0 0 60 40" className={baseClass} aria-hidden="true">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0L60 40M60 0L0 40" stroke="#FFFFFF" strokeWidth="7.5" />
          <path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" strokeWidth="4.2" />
          <path d="M30 0V40M0 20H60" stroke="#FFFFFF" strokeWidth="11" />
          <path d="M30 0V40M0 20H60" stroke="#C8102E" strokeWidth="6.5" />
        </svg>
      );

    case 'fr':
      return (
        <svg viewBox="0 0 30 20" className={baseClass} aria-hidden="true">
          <rect width="10" height="20" fill="#002395" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#ED2939" />
        </svg>
      );
  }
}
