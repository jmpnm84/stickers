/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { A4LabelSheet } from './components/A4LabelSheet';
import { FillModal } from './components/FillModal';
import { FormatSelectModal } from './components/FormatSelectModal';
import { HelpModal } from './components/HelpModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Toolbar } from './components/Toolbar';
import { UpdateBanner } from './components/UpdateBanner';
import { ZoomBar } from './components/ZoomBar';
import {
  createFullLabelSet,
  getCurrentDateFields,
  GRID_CONFIGS,
} from './data/gridConfig';
import { TRANSLATIONS } from './data/translations';
import { usePWAUpdate } from './hooks/usePWAUpdate';
import { LabelFormat, LabelValues, Language } from './types/labels';

const A4_WIDTH_PX = 794;

function computeAutoFitScale(): number {
  if (typeof window === 'undefined') return 1;
  const containerWidth = window.innerWidth - 20;
  return containerWidth < A4_WIDTH_PX
    ? Math.max(0.4, containerWidth / A4_WIDTH_PX)
    : 1;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [format, setFormat] = useState<LabelFormat>('4x12');
  const [scale, setScale] = useState<number>(() => computeAutoFitScale());
  const [isFormatModalOpen, setIsFormatModalOpen] = useState(false);
  const [isFillOpen, setIsFillOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [values, setValues] = useState<LabelValues>(() => {
    const currentDate = getCurrentDateFields();
    return {
      dia: currentDate.dia,
      mes: currentDate.mes,
      ano: currentDate.ano,
      colaborador: '',
      referencia: '',
    };
  });

  const [activeLabels, setActiveLabels] = useState<Set<number>>(() =>
    createFullLabelSet(GRID_CONFIGS['4x12'].totalLabels)
  );

  const {
    needRefresh,
    showBanner,
    feedback,
    checkForUpdates,
    applyUpdate,
    dismissBanner,
  } = usePWAUpdate();

  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : language;
  }, [language]);

  const handleAutoFit = useCallback(() => {
    setScale(computeAutoFitScale());
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(Number((prev + 0.15).toFixed(4)), 2.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(Number((prev - 0.15).toFixed(4)), 0.4));
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleOpenFillFlow = useCallback(() => {
    setIsFormatModalOpen(true);
  }, []);

  const handleSelectFormat = useCallback(
    (chosenFormat: LabelFormat) => {
      if (chosenFormat !== format) {
        setFormat(chosenFormat);
        setActiveLabels(
          createFullLabelSet(GRID_CONFIGS[chosenFormat].totalLabels)
        );
      }
      setIsFormatModalOpen(false);
      setIsFillOpen(true);
    },
    [format]
  );

  const handleApplyValues = useCallback(
    (newValues: LabelValues, newActiveLabels: Set<number>) => {
      setValues(newValues);
      setActiveLabels(new Set(newActiveLabels));
      setIsFillOpen(false);
    },
    []
  );

  return (
    <div className="min-h-screen w-full bg-slate-200 print:bg-white">
      <Toolbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenHelp={() => setIsHelpOpen(true)}
        onCheckUpdate={checkForUpdates}
        updateAvailable={needRefresh}
        updateFeedback={feedback}
        onOpenFill={handleOpenFillFlow}
        onPrint={handlePrint}
        t={t}
      />

      <UpdateBanner
        showAvailableBanner={showBanner}
        feedback={feedback}
        onApplyUpdate={applyUpdate}
        onDismiss={dismissBanner}
        t={t}
      />

      <main>
        <A4LabelSheet
          format={format}
          values={values}
          activeLabels={activeLabels}
          scale={scale}
          onLabelClick={handleOpenFillFlow}
        />
      </main>

      <ZoomBar
        scale={scale}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleAutoFit}
        t={t}
      />

      <FormatSelectModal
        isOpen={isFormatModalOpen}
        currentFormat={format}
        onSelectFormat={handleSelectFormat}
        onClose={() => setIsFormatModalOpen(false)}
        t={t}
      />

      <FillModal
        isOpen={isFillOpen}
        format={format}
        initialValues={values}
        initialActiveLabels={activeLabels}
        onClose={() => setIsFillOpen(false)}
        onApply={handleApplyValues}
        t={t}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        t={t}
      />

      <OfflineIndicator t={t} />
    </div>
  );
}
