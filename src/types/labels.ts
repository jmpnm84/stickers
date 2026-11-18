export type Language = 'pt' | 'es' | 'en' | 'fr';

export type LabelFormat = '4x12' | '3x9';

export type FieldName = 'dia' | 'mes' | 'ano' | 'colaborador' | 'referencia';

export interface LabelValues {
  dia: string;
  mes: string;
  ano: string;
  colaborador: string;
  referencia: string;
}

export interface FieldGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GridConfig {
  id: LabelFormat;
  cols: number;
  rows: number;
  totalLabels: number;
  originX: number;
  originY: number;
  columnOffsets: number[];
  rowOffsets: number[];
  fields: Record<FieldName, FieldGeometry>;
}

export interface TranslationSet {
  appName: string;
  fill: string;
  print: string;
  helpAria: string;
  langAria: string;
  formatModalTitle: string;
  formatModalSubtitle: string;
  format4x12Title: string;
  format4x12Desc: string;
  format3x9Title: string;
  format3x9Desc: string;
  formTitle: string;
  labelDay: string;
  labelMonth: string;
  labelYear: string;
  labelCollab: string;
  labelRef: string;
  labelQuantity: string;
  labelStartAt: string;
  selectedSummary: string;
  selectAll: string;
  cancel: string;
  apply: string;
  clear: string;
  close: string;
  placeholderDay: string;
  placeholderMonth: string;
  placeholderYear: string;
  placeholderCollab: string;
  placeholderRef: string;
  helpTitle: string;
  helpStep1: string;
  helpStep2: string;
  helpStep3: string;
  helpStep4: string;
  helpWarning: string;
  zoomOut: string;
  zoomIn: string;
  zoomReset: string;
  installApp: string;
  installIOS: string;
  iosTitle: string;
  iosStep1: string;
  iosStep2: string;
  offlineMode: string;
  updateCheckAria: string;
  updateAvailable: string;
  updateInstall: string;
  updateUpToDate: string;
  updateChecking: string;
  later: string;
}
