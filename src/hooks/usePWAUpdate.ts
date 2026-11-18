import { useCallback, useEffect, useRef, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

export type UpdateFeedback = 'idle' | 'checking' | 'available' | 'up-to-date';

export function usePWAUpdate() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [feedback, setFeedback] = useState<UpdateFeedback>('idle');

  const updateSWRef = useRef<((reloadPage?: boolean) => Promise<void>) | null>(
    null
  );
  const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const timerRef = useRef<number | null>(null);

  const clearFeedbackTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedRefresh(true);
        setIsBannerDismissed(false);
        setFeedback('available');
      },
      onRegisteredSW(_swUrl, registration) {
        if (registration) {
          registrationRef.current = registration;
          // Automatically check the server for updates on app startup
          registration.update().catch(() => {});
        }
      },
    });

    updateSWRef.current = updateSW;

    return () => {
      clearFeedbackTimer();
    };
  }, []);

  const applyUpdate = useCallback(async () => {
    if (updateSWRef.current) {
      await updateSWRef.current(true);
    } else {
      window.location.reload();
    }
  }, []);

  const checkForUpdates = useCallback(async () => {
    if (needRefresh) {
      await applyUpdate();
      return;
    }

    clearFeedbackTimer();
    setFeedback('checking');

    try {
      let reg = registrationRef.current;
      if (!reg && 'serviceWorker' in navigator) {
        reg = (await navigator.serviceWorker.getRegistration()) ?? null;
        if (reg) {
          registrationRef.current = reg;
        }
      }

      if (reg) {
        await reg.update();

        if (reg.waiting) {
          setNeedRefresh(true);
          setIsBannerDismissed(false);
          setFeedback('available');
          return;
        }

        const installing = reg.installing;
        if (installing) {
          await new Promise<void>((resolve) => {
            const onStateChange = () => {
              if (
                installing.state === 'installed' ||
                installing.state === 'redundant'
              ) {
                installing.removeEventListener('statechange', onStateChange);
                resolve();
              }
            };
            installing.addEventListener('statechange', onStateChange);
            window.setTimeout(resolve, 4000);
          });

          if (reg.waiting || (installing.state === 'installed' && navigator.serviceWorker.controller)) {
            setNeedRefresh(true);
            setIsBannerDismissed(false);
            setFeedback('available');
            return;
          }
        }
      }

      setFeedback('up-to-date');
      timerRef.current = window.setTimeout(() => {
        setFeedback('idle');
      }, 3000);
    } catch {
      setFeedback('up-to-date');
      timerRef.current = window.setTimeout(() => {
        setFeedback('idle');
      }, 3000);
    }
  }, [applyUpdate, needRefresh]);

  const dismissBanner = useCallback(() => {
    setIsBannerDismissed(true);
  }, []);

  return {
    needRefresh,
    showBanner: needRefresh && !isBannerDismissed,
    feedback,
    checkForUpdates,
    applyUpdate,
    dismissBanner,
  };
}
