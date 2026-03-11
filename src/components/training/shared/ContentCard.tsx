import { Download, Eye, FileXls } from '@phosphor-icons/react';
import { Info, Lightbulb, Warning, WarningOctagon } from '@phosphor-icons/react';
import { useEffect,useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { TrainingFileViewer } from './TrainingFileViewer';
import type {
  AnnotatedExample,
  ContentCallout,
  ContentSection,
  ContentStep,
  ContentTable,
  ExampleFile,
  NumberedList,
} from './types';

interface ContentCardProps {
  step: ContentStep;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

const CALLOUT_STYLES = {
  info: {
    container: 'bg-blue-50 border-l-4 border-l-blue-500',
    icon: Info,
    iconClass: 'text-blue-500',
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-l-amber-500',
    icon: Warning,
    iconClass: 'text-amber-500',
  },
  tip: {
    container: 'bg-emerald-50 border-l-4 border-l-emerald-500',
    icon: Lightbulb,
    iconClass: 'text-emerald-500',
  },
  danger: {
    container: 'bg-red-50 border-l-4 border-l-red-600',
    icon: WarningOctagon,
    iconClass: 'text-red-600',
  },
};

function renderBullets(bullets: string[]) {
  return (
    <ul className='space-y-2 pl-5'>
      {bullets.map((bullet, i) => (
        <li
          key={i}
          className={cn(
            'text-sm leading-relaxed',
            bullet.startsWith('+')
              ? 'list-none -ml-5 text-emerald-700 before:content-["✓_"]'
              : bullet.startsWith('-')
                ? 'list-none -ml-5 text-rose-700 before:content-["✗_"]'
                : 'list-disc text-muted-foreground'
          )}
        >
          {bullet.startsWith('+') || bullet.startsWith('-')
            ? bullet.slice(2)
            : bullet}
        </li>
      ))}
    </ul>
  );
}

const COLUMN_STYLE_CLASSES = {
  good: {
    header: 'bg-emerald-50 text-emerald-800',
    cell: 'bg-emerald-50/50 text-emerald-800',
  },
  bad: {
    header: 'bg-rose-50 text-rose-800',
    cell: 'bg-rose-50/50 text-rose-800',
  },
};

function renderTable(table: ContentTable) {
  return (
    <div className='overflow-x-auto rounded-lg border'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='border-b bg-muted/50'>
            {table.headers.map((header, i) => {
              const colStyle = table.columnStyles?.[i];
              return (
                <th
                  key={i}
                  className={cn(
                    'px-4 py-2.5 text-left font-semibold text-foreground',
                    colStyle && COLUMN_STYLE_CLASSES[colStyle].header
                  )}
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={cn(
                'border-b last:border-b-0',
                rowIdx % 2 === 1 && 'bg-muted/20'
              )}
            >
              {row.map((cell, cellIdx) => {
                const colStyle = table.columnStyles?.[cellIdx];
                return (
                  <td
                    key={cellIdx}
                    className={cn(
                      'px-4 py-2.5 text-muted-foreground',
                      cellIdx === 0 && 'font-medium text-foreground',
                      colStyle && COLUMN_STYLE_CLASSES[colStyle].cell
                    )}
                  >
                    {cell}
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

function renderNumberedList(numberedList: NumberedList) {
  return (
    <div className='space-y-2'>
      <h3 className='text-sm font-semibold text-foreground'>
        {numberedList.title}
      </h3>
      <ol className='list-decimal space-y-1.5 pl-5'>
        {numberedList.items.map((item, i) => (
          <li key={i} className='text-sm leading-relaxed text-muted-foreground'>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

function renderCallout(callout: ContentCallout) {
  const style = CALLOUT_STYLES[callout.type];
  const CalloutIcon = style.icon;
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md p-4',
        style.container
      )}
    >
      <CalloutIcon
        className={cn('mt-0.5 size-5 shrink-0', style.iconClass)}
        weight='fill'
      />
      <p className='text-sm'>{callout.text}</p>
    </div>
  );
}

function ExampleFileCards({
  files,
  onFileInteracted,
}: {
  files: ExampleFile[];
  onFileInteracted?: (fileUrl: string) => void;
}) {
  const [viewerFile, setViewerFile] = useState<ExampleFile | null>(null);

  const handleView = (file: ExampleFile) => {
    setViewerFile(file);
    onFileInteracted?.(file.url);
  };

  const handleDownload = (file: ExampleFile) => {
    onFileInteracted?.(file.url);
  };

  return (
    <>
      <div className='grid gap-3 sm:grid-cols-3'>
        {files.map((file, i) => (
          <div
            key={i}
            className='flex flex-col gap-2 rounded-lg border bg-card p-3'
          >
            <div className='flex items-center gap-2'>
              <FileXls className='size-5 shrink-0 text-emerald-600' weight='fill' />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-foreground'>
                  {file.filename}
                </p>
                <p className='text-xs text-muted-foreground'>{file.label}</p>
              </div>
            </div>
            <div className='flex gap-1.5'>
              <Button
                variant='outline'
                size='sm'
                className='h-7 flex-1 gap-1 text-xs'
                onClick={() => handleView(file)}
              >
                <Eye className='size-3.5' />
                Quick View
              </Button>
              <Button
                variant='ghost'
                size='sm'
                className='h-7 gap-1 text-xs'
                asChild
              >
                <a href={file.url} download={file.filename} onClick={() => handleDownload(file)}>
                  <Download className='size-3.5' />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {viewerFile && (
        <TrainingFileViewer
          open={!!viewerFile}
          onOpenChange={open => {
            if (!open) setViewerFile(null);
          }}
          filename={viewerFile.filename}
          fileUrl={viewerFile.url}
        />
      )}
    </>
  );
}

const ANNOTATION_STYLES = {
  blue: {
    border: 'border-l-blue-400',
    bg: 'bg-blue-50/50',
    badge: 'bg-blue-100 text-blue-700',
  },
  amber: {
    border: 'border-l-amber-400',
    bg: 'bg-amber-50/50',
    badge: 'bg-amber-100 text-amber-700',
  },
  emerald: {
    border: 'border-l-emerald-400',
    bg: 'bg-emerald-50/50',
    badge: 'bg-emerald-100 text-emerald-700',
  },
};

function renderAnnotatedExample(example: AnnotatedExample) {
  return (
    <div className='space-y-3 rounded-lg border bg-muted/20 p-4'>
      {example.blocks.map((block, i) => {
        const style = ANNOTATION_STYLES[block.color];
        return (
          <div
            key={i}
            className={cn(
              'rounded-md border-l-4 p-4',
              style.border,
              style.bg
            )}
          >
            <span
              className={cn(
                'mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                style.badge
              )}
            >
              {block.label}
            </span>
            <p className='text-sm leading-relaxed text-foreground'>
              {block.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function renderSection(
  section: ContentSection,
  keyPrefix: string,
  onFileInteracted?: (fileUrl: string) => void
) {
  return (
    <div key={keyPrefix} className='space-y-4'>
      {section.body && (
        <p className='leading-relaxed text-foreground'>{section.body}</p>
      )}
      {section.bullets && renderBullets(section.bullets)}
      {section.table && renderTable(section.table)}
      {section.numberedList && renderNumberedList(section.numberedList)}
      {section.exampleFiles && (
        <ExampleFileCards
          files={section.exampleFiles}
          onFileInteracted={onFileInteracted}
        />
      )}
      {section.annotatedExample && renderAnnotatedExample(section.annotatedExample)}
      {section.callout && renderCallout(section.callout)}
    </div>
  );
}

export function ContentCard({ step, onComplete, isAlreadyCompleted }: ContentCardProps) {
  const [acknowledged, setAcknowledged] = useState(!!isAlreadyCompleted);
  const [interactedFiles, setInteractedFiles] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isAlreadyCompleted) {
      setAcknowledged(true);
      onComplete();
    } else {
      setAcknowledged(false);
    }
    setInteractedFiles(new Set());
  }, [step.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAcknowledge = () => {
    setAcknowledged(true);
    onComplete();
  };

  const handleFileInteracted = (fileUrl: string) => {
    setInteractedFiles(prev => new Set([...prev, fileUrl]));
  };

  // Collect all example files (top-level and in sections)
  const allExampleFiles: ExampleFile[] = [
    ...(step.exampleFiles || []),
    ...(step.sections?.flatMap(s => s.exampleFiles || []) || []),
  ];

  const checkboxDisabled = allExampleFiles.length > 0 && interactedFiles.size < allExampleFiles.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='leading-relaxed text-foreground'>{step.body}</p>

        {step.bullets && renderBullets(step.bullets)}
        {step.table && renderTable(step.table)}
        {step.numberedList && renderNumberedList(step.numberedList)}
        {step.exampleFiles && (
          <ExampleFileCards
            files={step.exampleFiles}
            onFileInteracted={handleFileInteracted}
          />
        )}
        {step.annotatedExample && renderAnnotatedExample(step.annotatedExample)}
        {step.callout && renderCallout(step.callout)}

        {step.note && (
          <div className='rounded-lg border border-violet-200 bg-violet-50 p-4'>
            <p className='text-sm leading-relaxed text-violet-900'>{step.note}</p>
          </div>
        )}

        {step.sections?.map((section, i) =>
          renderSection(section, `section-${i}`, handleFileInteracted)
        )}

        <label
          className={cn(
            'mt-6 flex items-center gap-3 rounded-lg border p-4 transition-colors',
            checkboxDisabled
              ? 'cursor-not-allowed opacity-50'
              : 'cursor-pointer hover:bg-muted/50'
          )}
        >
          <input
            type='checkbox'
            checked={acknowledged}
            onChange={handleAcknowledge}
            disabled={checkboxDisabled}
            className='size-4 rounded border-gray-300 text-primary accent-primary'
          />
          <span className='text-sm font-medium text-foreground'>
            I understand this section
          </span>
          {checkboxDisabled && (
            <span className='ml-auto text-xs text-muted-foreground'>
              View or download the example files first
            </span>
          )}
        </label>
      </CardContent>
    </Card>
  );
}
