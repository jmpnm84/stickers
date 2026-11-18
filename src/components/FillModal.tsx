import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  createFullLabelSet,
  getCurrentDateFields,
  GRID_CONFIGS,
} from '../data/gridConfig';
import { LabelFormat, LabelValues, TranslationSet } from '../types/labels';

interface FillModalProps {
  isOpen: boolean;
  format: LabelFormat;
  initialValues: LabelValues;
  initialActiveLabels: Set<number>;
  onClose: () => void;
  onApply: (values: LabelValues, activeLabels: Set<number>) => void;
  t: TranslationSet;
}

function buildRangeSet(
  startPos: number,
  quantity: number,
  totalLabels: number
): Set<number> {
  const safeStart = Math.max(1, Math.min(totalLabels, startPos));
  const safeQty = Math.max(0, Math.min(totalLabels - safeStart + 1, quantity));
  const next = new Set<number>();
  for (let i = 0; i < safeQty; i++) {
    next.add(safeStart - 1 + i);
  }
  return next;
}

export function FillModal({
  isOpen,
  format,
  initialValues,
  initialActiveLabels,
  onClose,
  onApply,
  t,
}: FillModalProps) {
  const grid = GRID_CONFIGS[format];
  const totalLabels = grid.totalLabels;

  const [dia, setDia] = useState(initialValues.dia);
  const [mes, setMes] = useState(initialValues.mes);
  const [ano, setAno] = useState(initialValues.ano);
  const [colaborador, setColaborador] = useState(initialValues.colaborador);
  const [referencia, setReferencia] = useState(initialValues.referencia);

  const [selectedLabels, setSelectedLabels] = useState<Set<number>>(
    () => new Set(initialActiveLabels)
  );
  const [startPos, setStartPos] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(totalLabels);

  const colaboradorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const current = getCurrentDateFields();
      setDia(current.dia);
      setMes(current.mes);
      setAno(current.ano);
      setColaborador(initialValues.colaborador);
      setReferencia(initialValues.referencia);

      const filtered = new Set(
        Array.from(initialActiveLabels).filter((idx) => idx < totalLabels)
      );
      const effectiveSet =
        filtered.size > 0 ? filtered : createFullLabelSet(totalLabels);
      setSelectedLabels(effectiveSet);

      const sorted = Array.from(effectiveSet).sort((a, b) => a - b);
      setStartPos(sorted.length > 0 ? sorted[0] + 1 : 1);
      setQuantity(sorted.length);

      requestAnimationFrame(() => {
        colaboradorInputRef.current?.focus();
      });
    }
  }, [
    isOpen,
    totalLabels,
    initialValues.colaborador,
    initialValues.referencia,
    initialActiveLabels,
  ]);

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

  const handleQuantityChange = (rawValue: string) => {
    const parsed = parseInt(rawValue, 10);
    if (Number.isNaN(parsed)) {
      setQuantity(0);
      setSelectedLabels(new Set());
      return;
    }
    const maxAllowed = totalLabels - startPos + 1;
    const clamped = Math.max(0, Math.min(maxAllowed, parsed));
    setQuantity(clamped);
    setSelectedLabels(buildRangeSet(startPos, clamped, totalLabels));
  };

  const handleStartPosChange = (rawValue: string) => {
    const parsed = parseInt(rawValue, 10);
    if (Number.isNaN(parsed)) {
      setStartPos(1);
      return;
    }
    const clampedStart = Math.max(1, Math.min(totalLabels, parsed));
    const maxAllowed = totalLabels - clampedStart + 1;
    const clampedQty = Math.min(quantity || 1, maxAllowed);
    setStartPos(clampedStart);
    setQuantity(clampedQty);
    setSelectedLabels(buildRangeSet(clampedStart, clampedQty, totalLabels));
  };

  const handleToggleCell = (index: number) => {
    const next = new Set(selectedLabels);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setSelectedLabels(next);
    const sorted = Array.from(next).sort((a, b) => a - b);
    setQuantity(sorted.length);
    if (sorted.length > 0) {
      setStartPos(sorted[0] + 1);
    }
  };

  const handleSelectAll = () => {
    setStartPos(1);
    setQuantity(totalLabels);
    setSelectedLabels(buildRangeSet(1, totalLabels, totalLabels));
  };

  const handleClearFields = () => {
    const current = getCurrentDateFields();
    setDia(current.dia);
    setMes(current.mes);
    setAno(current.ano);
    setColaborador('');
    setReferencia('');
    colaboradorInputRef.current?.focus();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onApply(
      {
        dia: dia.trim(),
        mes: mes.trim(),
        ano: ano.trim(),
        colaborador: colaborador.trim(),
        referencia: referencia.trim(),
      },
      selectedLabels
    );
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fill-dialog-title"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-[700px] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2
            id="fill-dialog-title"
            className="text-xl font-bold text-slate-900"
          >
            {t.formTitle}
          </h2>
          <span className="font-mono-tabular text-xs font-medium text-slate-500">
            {grid.cols}×{grid.rows} · {t.selectedSummary}: {selectedLabels.size}/{totalLabels}
          </span>
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-[1fr_272px]">
          <div>
            <div className="mb-3 grid grid-cols-3 gap-3">
              <div>
                <label
                  htmlFor="field-dia"
                  className="mb-1.5 block text-sm font-semibold text-slate-800"
                >
                  {t.labelDay}
                </label>
                <input
                  id="field-dia"
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={dia}
                  onChange={(e) => setDia(e.target.value)}
                  placeholder={t.placeholderDay}
                  required
                  className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-base text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
                />
              </div>

              <div>
                <label
                  htmlFor="field-mes"
                  className="mb-1.5 block text-sm font-semibold text-slate-800"
                >
                  {t.labelMonth}
                </label>
                <input
                  id="field-mes"
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={mes}
                  onChange={(e) => setMes(e.target.value)}
                  placeholder={t.placeholderMonth}
                  required
                  className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-base text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
                />
              </div>

              <div>
                <label
                  htmlFor="field-ano"
                  className="mb-1.5 block text-sm font-semibold text-slate-800"
                >
                  {t.labelYear}
                </label>
                <input
                  id="field-ano"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  placeholder={t.placeholderYear}
                  required
                  className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-base text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
                />
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="field-colaborador"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
              >
                {t.labelCollab}
              </label>
              <input
                ref={colaboradorInputRef}
                id="field-colaborador"
                type="text"
                value={colaborador}
                onChange={(e) => setColaborador(e.target.value)}
                placeholder={t.placeholderCollab}
                required
                className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-base text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
              />
            </div>

            <div>
              <label
                htmlFor="field-referencia"
                className="mb-1.5 block text-sm font-semibold text-slate-800"
              >
                {t.labelRef}
              </label>
              <input
                id="field-referencia"
                type="text"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder={t.placeholderRef}
                required
                className="w-full rounded-md border border-slate-300 px-2.5 py-2 text-base text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
              />
            </div>
          </div>

          <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="field-quantity"
                  className="mb-1 block text-xs font-semibold text-slate-800 whitespace-nowrap"
                >
                  {t.labelQuantity}
                </label>
                <input
                  id="field-quantity"
                  type="number"
                  min={1}
                  max={totalLabels - startPos + 1}
                  value={quantity === 0 ? '' : quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  required
                  className="font-mono-tabular w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
                />
              </div>

              <div>
                <label
                  htmlFor="field-start-pos"
                  className="mb-1 block text-xs font-semibold text-slate-800 whitespace-nowrap"
                >
                  {t.labelStartAt}
                </label>
                <input
                  id="field-start-pos"
                  type="number"
                  min={1}
                  max={totalLabels}
                  value={startPos}
                  onChange={(e) => handleStartPosChange(e.target.value)}
                  required
                  className="font-mono-tabular w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 focus:border-[#1f6feb] focus:outline-2 focus:outline-offset-1 focus:outline-[#1f6feb]"
                />
              </div>
            </div>

            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                {grid.cols} × {grid.rows}
              </span>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-xs font-semibold text-[#1f6feb] hover:underline cursor-pointer whitespace-nowrap"
              >
                {t.selectAll} ({totalLabels})
              </button>
            </div>

            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${grid.cols}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: totalLabels }, (_, idx) => {
                const isSelected = selectedLabels.has(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleCell(idx)}
                    aria-pressed={isSelected}
                    className={`font-mono-tabular flex h-5 items-center justify-center rounded-[3px] text-[10px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1f6feb] text-white'
                        : 'border border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={handleClearFields}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 cursor-pointer whitespace-nowrap"
          >
            {t.clear}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 cursor-pointer whitespace-nowrap"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#1f6feb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a5fd0] cursor-pointer whitespace-nowrap"
            >
              {t.apply}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
