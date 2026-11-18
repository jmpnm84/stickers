import { GRID_CONFIGS } from '../data/gridConfig';
import { FieldName, LabelFormat, LabelValues } from '../types/labels';

interface A4LabelSheetProps {
  format: LabelFormat;
  values: LabelValues;
  activeLabels: Set<number>;
  scale: number;
  onLabelClick: () => void;
}

// Exact CSS pixel size of A4 portrait (210mm x 297mm) at 96dpi (~793.7px x 1122.5px)
const A4_WIDTH_PX = (210 * 96) / 25.4;
const A4_HEIGHT_PX = (297 * 96) / 25.4;

export function A4LabelSheet({
  format,
  values,
  activeLabels,
  scale,
  onLabelClick,
}: A4LabelSheetProps) {
  const grid = GRID_CONFIGS[format];
  const fieldEntries = Object.entries(grid.fields) as Array<
    [FieldName, (typeof grid.fields)[FieldName]]
  >;

  return (
    <div className="print-workspace flex w-full justify-center overflow-x-auto px-2.5 pt-[56px] pb-[78px]">
      <div
        style={{
          width: `${A4_WIDTH_PX * scale}px`,
          height: `${A4_HEIGHT_PX * scale}px`,
        }}
        className="relative shrink-0 print:!h-auto print:!w-auto"
      >
        <div
          className="print-scaler origin-top-left transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${scale})`,
            width: '210mm',
            height: '297mm',
          }}
        >
          <div
            className="a4-page shadow-[0_4px_16px_rgba(0,0,0,0.15)] cursor-pointer"
            onClick={onLabelClick}
            role="region"
            aria-label={`A4 ${grid.cols}x${grid.rows} Label Sheet`}
          >
            {grid.rowOffsets.map((rowOffset, rowIndex) =>
              grid.columnOffsets.map((colOffset, colIndex) => {
                const labelIndex = rowIndex * grid.cols + colIndex;
                const isActive = activeLabels.has(labelIndex);
                const labelX = grid.originX + colOffset;
                const labelY = grid.originY + rowOffset;

                return fieldEntries.map(([fieldName, field]) => (
                  <div
                    key={`${format}-${rowIndex}-${colIndex}-${fieldName}`}
                    className={`label-box ${isActive ? '' : 'opacity-30 print:opacity-100'}`}
                    data-field={fieldName}
                    style={{
                      left: `${labelX + field.x}mm`,
                      top: `${labelY + field.y}mm`,
                      width: `${field.width}mm`,
                      height: `${field.height}mm`,
                    }}
                  >
                    {isActive ? values[fieldName] : ''}
                  </div>
                ));
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
