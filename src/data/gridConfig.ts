import { GridConfig, LabelFormat } from '../types/labels';

export const GRID_CONFIGS: Record<LabelFormat, GridConfig> = {
  '4x12': {
    id: '4x12',
    cols: 4,
    rows: 12,
    totalLabels: 48,
    originX: 9.31,
    originY: 10.9,
    columnOffsets: [0.0, 52.8585, 105.717, 158.6739],
    rowOffsets: [
      0.0,
      24.791,
      49.219,
      74.009,
      98.213,
      123.004,
      147.432,
      172.223,
      196.427,
      221.217,
      245.645,
      270.436,
    ],
    fields: {
      dia: { x: 0.0, y: 0.0, width: 4.81, height: 3.79 },
      mes: { x: 7.1856, y: 0.0, width: 4.81, height: 3.79 },
      ano: { x: 13.4853, y: 0.0, width: 8.6621, height: 3.79 },
      colaborador: { x: 28.6926, y: 0.0, width: 8.6629, height: 3.79 },
      referencia: { x: 2.4608, y: 5.8075, width: 8.6621, height: 3.79 },
    },
  },
  '3x9': {
    id: '3x9',
    cols: 3,
    rows: 9,
    totalLabels: 27,
    originX: 10.795,
    originY: 14.097,
    columnOffsets: [0.0, 70.753, 141.8166],
    rowOffsets: [
      0.0,
      32.766,
      65.6167,
      98.298,
      131.191,
      163.9147,
      196.7653,
      229.4467,
      262.2973,
    ],
    fields: {
      dia: { x: 0.0, y: 0.0, width: 6.1023, height: 3.2957 },
      mes: { x: 8.6893, y: 0.0, width: 6.1132, height: 3.2957 },
      ano: { x: 17.3598, y: 0.0, width: 10.6931, height: 3.2832 },
      colaborador: { x: 36.322, y: 0.0, width: 9.26, height: 3.2832 },
      referencia: { x: 3.567, y: 6.6401, width: 10.69, height: 3.324 },
    },
  },
};

export function createFullLabelSet(totalLabels: number): Set<number> {
  return new Set(Array.from({ length: totalLabels }, (_, i) => i));
}

export function getCurrentDateFields(): { dia: string; mes: string; ano: string } {
  const today = new Date();
  return {
    dia: String(today.getDate()).padStart(2, '0'),
    mes: String(today.getMonth() + 1).padStart(2, '0'),
    ano: String(today.getFullYear()),
  };
}
