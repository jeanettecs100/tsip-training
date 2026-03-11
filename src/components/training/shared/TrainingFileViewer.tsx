import { MicrosoftExcelLogo } from '@phosphor-icons/react';
import ExcelJS from 'exceljs';
import { Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TrainingFileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filename: string;
  fileUrl: string;
}

// ---------- Types ----------

interface CellInfo {
  value: string;
  style: React.CSSProperties;
  rowSpan?: number;
  colSpan?: number;
}

interface SheetData {
  name: string;
  cells: (CellInfo | null)[][];
  colCount: number;
  colWidths: number[];
}

// ---------- Excel → CellInfo parsing ----------

/** Parse a merge range like "A1:C3" into row/col bounds (1-based) */
function parseMergeRange(range: string): { top: number; left: number; bottom: number; right: number } | null {
  const match = range.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  if (!match) return null;
  return {
    top: parseInt(match[2]!, 10),
    left: colLetterToNum(match[1]!),
    bottom: parseInt(match[4]!, 10),
    right: colLetterToNum(match[3]!),
  };
}

/** Convert column letters like "A"→1, "Z"→26, "AA"→27 */
function colLetterToNum(letters: string): number {
  let n = 0;
  for (let i = 0; i < letters.length; i++) {
    n = n * 26 + (letters.charCodeAt(i) - 64);
  }
  return n;
}

function argbToHex(argb: string | undefined): string | undefined {
  if (!argb) return undefined;
  // ExcelJS gives ARGB as "FF003366" — strip the alpha prefix
  if (argb.length === 8) return `#${argb.slice(2)}`;
  if (argb.length === 6) return `#${argb}`;
  return undefined;
}

function themeColorFallback(color: Partial<ExcelJS.Color> | undefined): string | undefined {
  if (!color) return undefined;
  if (color.argb) return argbToHex(color.argb);
  // Theme colors don't expose the resolved hex in exceljs;
  // return undefined and let the browser default handle it
  return undefined;
}

function getCellStyle(cell: ExcelJS.Cell): React.CSSProperties {
  const s: React.CSSProperties = {};

  // Font
  const font = cell.font;
  if (font) {
    if (font.bold) s.fontWeight = 'bold';
    if (font.italic) s.fontStyle = 'italic';
    if (font.underline) s.textDecoration = 'underline';
    if (font.size) s.fontSize = `${Math.min(font.size, 14) * 0.85}px`;
    const fontColor = themeColorFallback(font.color);
    if (fontColor) s.color = fontColor;
  }

  // Fill
  const fill = cell.fill;
  if (fill && fill.type === 'pattern' && fill.pattern === 'solid') {
    const bg = themeColorFallback(fill.fgColor);
    if (bg) s.backgroundColor = bg;
  }

  // Alignment
  const align = cell.alignment;
  if (align) {
    if (align.horizontal === 'center') s.textAlign = 'center';
    else if (align.horizontal === 'right') s.textAlign = 'right';
    else if (align.horizontal === 'left') s.textAlign = 'left';
    if (align.vertical === 'middle') s.verticalAlign = 'middle';
    else if (align.vertical === 'top') s.verticalAlign = 'top';
    if (align.wrapText) s.whiteSpace = 'pre-wrap';
  }

  // Borders
  const border = cell.border;
  if (border) {
    if (border.bottom?.style) s.borderBottom = `1px solid ${borderColor(border.bottom)}`;
    if (border.top?.style) s.borderTop = `1px solid ${borderColor(border.top)}`;
    if (border.left?.style) s.borderLeft = `1px solid ${borderColor(border.left)}`;
    if (border.right?.style) s.borderRight = `1px solid ${borderColor(border.right)}`;
  }

  return s;
}

function borderColor(b: Partial<ExcelJS.Border>): string {
  return themeColorFallback(b.color) ?? '#d1d5db';
}

function formatCellValue(cell: ExcelJS.Cell): string {
  const v = cell.value;
  if (v === null || v === undefined) return '';

  // Formula result
  if (typeof v === 'object' && 'result' in v) {
    const result = (v as ExcelJS.CellFormulaValue).result;
    if (result === null || result === undefined) return '';
    if (typeof result === 'number') return formatNumberValue(result, cell.numFmt);
    return String(result);
  }

  if (typeof v === 'number') return formatNumberValue(v, cell.numFmt);
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  if (v instanceof Date) return v.toLocaleDateString();

  return String(v);
}

function formatNumberValue(n: number, fmt?: string): string {
  if (!fmt || fmt === 'General') {
    // Detect if it's very close to integer
    if (Number.isInteger(n) || Math.abs(n - Math.round(n)) < 0.0001) {
      return Math.round(n).toLocaleString();
    }
    return n.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }

  // Percentage formats
  if (fmt.includes('%')) {
    const pct = n * 100;
    const decimals = (fmt.match(/0/g)?.length ?? 1) - 1;
    return pct.toFixed(Math.max(0, decimals)) + '%';
  }

  // Accounting / number formats with commas
  if (fmt.includes('#') || fmt.includes('0')) {
    const decimals = fmt.includes('.') ? (fmt.split('.')[1]?.replace(/[^0#]/g, '').length ?? 0) : 0;

    // Check for parentheses (negative) format
    const isParenNeg = fmt.includes('(') || fmt.includes(')');
    const absN = Math.abs(n);
    const formatted = absN.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

    if (n < 0 && isParenNeg) return `(${formatted})`;
    if (n < 0) return `-${formatted}`;
    return formatted;
  }

  return n.toLocaleString();
}

function parseWorkbook(wb: ExcelJS.Workbook): SheetData[] {
  return wb.worksheets.map(ws => {
    const rowCount = ws.rowCount;
    const colCount = ws.columnCount;

    // Column widths
    const colWidths: number[] = [];
    for (let c = 1; c <= colCount; c++) {
      const col = ws.getColumn(c);
      colWidths.push(col.width ? col.width * 7.5 : 64); // Excel width units → px approx
    }

    // Build merge map
    const mergeMap = new Map<string, { rowSpan: number; colSpan: number }>();
    const hiddenCells = new Set<string>();

    // ws.model.merges is an array of merge range strings like "A1:C3"
    for (const mergeRange of Object.keys(ws.model.merges ?? {})) {
      const range = parseMergeRange(mergeRange);
      if (!range) continue;
      const key = `${range.top}:${range.left}`;
      mergeMap.set(key, {
        rowSpan: range.bottom - range.top + 1,
        colSpan: range.right - range.left + 1,
      });
      for (let r = range.top; r <= range.bottom; r++) {
        for (let c = range.left; c <= range.right; c++) {
          if (r !== range.top || c !== range.left) {
            hiddenCells.add(`${r}:${c}`);
          }
        }
      }
    }

    // Build cell grid
    const cells: (CellInfo | null)[][] = [];
    for (let r = 1; r <= rowCount; r++) {
      const row: (CellInfo | null)[] = [];
      const wsRow = ws.getRow(r);
      for (let c = 1; c <= colCount; c++) {
        const cellKey = `${r}:${c}`;
        if (hiddenCells.has(cellKey)) {
          row.push(null);
          continue;
        }

        const cell = wsRow.getCell(c);
        const merge = mergeMap.get(cellKey);
        const style = getCellStyle(cell);

        // Auto-detect right-align for numbers
        const val = cell.value;
        const isNumeric = typeof val === 'number' ||
          (typeof val === 'object' && val !== null && 'result' in val && typeof (val as ExcelJS.CellFormulaValue).result === 'number');
        if (isNumeric && !style.textAlign) {
          style.textAlign = 'right';
        }

        row.push({
          value: formatCellValue(cell),
          style,
          rowSpan: merge?.rowSpan,
          colSpan: merge?.colSpan,
        });
      }
      cells.push(row);
    }

    return { name: ws.name, cells, colCount, colWidths };
  });
}

// ---------- Components ----------

function SpreadsheetTable({ sheet }: { sheet: SheetData }) {
  if (sheet.cells.length === 0) {
    return (
      <p className='p-8 text-center text-sm text-muted-foreground'>
        This sheet is empty.
      </p>
    );
  }

  return (
    <div className='overflow-auto'>
      <table className='border-collapse' style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: 36 }} />
          {sheet.colWidths.map((w, i) => (
            <col key={i} style={{ width: Math.max(w, 36) }} />
          ))}
        </colgroup>
        <thead>
          <tr className='bg-muted/50'>
            <th className='sticky top-0 left-0 z-20 border-b border-r bg-muted/80 px-1 py-0.5 text-[10px] font-medium text-muted-foreground' />
            {Array.from({ length: sheet.colCount }, (_, i) => (
              <th
                key={i}
                className='sticky top-0 z-10 border-b border-r bg-muted/80 px-1 py-0.5 text-center text-[10px] font-medium text-muted-foreground'
              >
                {columnLetter(i)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sheet.cells.map((row, ri) => (
            <tr key={ri}>
              <td className='sticky left-0 z-10 border-b border-r bg-muted/60 px-1 py-0 text-center text-[10px] font-medium text-muted-foreground'>
                {ri + 1}
              </td>
              {row.map((cell, ci) => {
                if (cell === null) return null;
                return (
                  <td
                    key={ci}
                    rowSpan={cell.rowSpan}
                    colSpan={cell.colSpan}
                    style={cell.style}
                    className='border-b border-r border-border/30 px-1.5 py-0.5 text-[11px] leading-tight whitespace-nowrap overflow-hidden text-ellipsis'
                  >
                    {cell.value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function columnLetter(index: number): string {
  let result = '';
  let n = index;
  while (n >= 0) {
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

// ---------- Main viewer ----------

export function TrainingFileViewer({
  open,
  onOpenChange,
  filename,
  fileUrl,
}: TrainingFileViewerProps) {
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [activeSheet, setActiveSheet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSheets([]);
      setActiveSheet(0);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(fileUrl)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch file (${res.status})`);
        return res.arrayBuffer();
      })
      .then(async buffer => {
        if (cancelled) return;
        const wb = new ExcelJS.Workbook();
        await wb.xlsx.load(buffer);
        const parsed = parseWorkbook(wb);
        setSheets(parsed);
        setActiveSheet(0);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('Failed to load spreadsheet:', err);
        setError('Failed to load the spreadsheet.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [open, fileUrl]);

  const currentSheet = sheets[activeSheet];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='flex h-[85vh] max-h-[85vh] w-full max-w-[90vw] flex-col gap-0 p-0'
        showCloseButton={false}
      >
        <DialogHeader className='flex min-h-[48px] shrink-0 flex-row items-center justify-between border-b px-3 py-2'>
          <DialogTitle className='truncate text-base font-semibold'>
            {filename}
          </DialogTitle>
          <div className='flex shrink-0 items-center gap-1.5'>
            <Button variant='outline' size='sm' className='h-8 gap-1.5' asChild>
              <a href={fileUrl} download={filename}>
                <Download className='size-4' />
                <span className='hidden sm:inline'>Download</span>
              </a>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => onOpenChange(false)}
              className='size-8 shrink-0'
            >
              <X className='size-4' />
              <span className='sr-only'>Close</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Sheet tabs */}
        {sheets.length > 1 && (
          <div className='flex shrink-0 gap-0 overflow-x-auto border-b bg-muted/30'>
            {sheets.map((sheet, i) => (
              <button
                key={sheet.name}
                onClick={() => setActiveSheet(i)}
                className={`shrink-0 border-r px-3 py-1.5 text-xs font-medium transition-colors ${
                  i === activeSheet
                    ? 'bg-card text-foreground border-b-2 border-b-primary'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                {sheet.name}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className='flex-1 overflow-auto bg-white'>
          {loading && (
            <div className='flex h-full flex-col items-center justify-center gap-3 p-8'>
              <MicrosoftExcelLogo size={48} weight='thin' className='text-green-600 animate-pulse' />
              <p className='text-sm text-muted-foreground'>Loading spreadsheet...</p>
            </div>
          )}
          {error && (
            <div className='flex h-full flex-col items-center justify-center gap-4 p-8 text-center'>
              <MicrosoftExcelLogo size={64} weight='thin' className='text-green-600' />
              <p className='text-sm text-muted-foreground'>{error}</p>
              <Button asChild className='mt-2'>
                <a href={fileUrl} download={filename}>
                  <Download className='size-4 mr-2' />
                  Download instead
                </a>
              </Button>
            </div>
          )}
          {!loading && !error && currentSheet && (
            <SpreadsheetTable sheet={currentSheet} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
