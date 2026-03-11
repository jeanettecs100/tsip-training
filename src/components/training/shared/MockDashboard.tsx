import type { IconProps } from '@phosphor-icons/react';
import {
  MicrosoftExcelLogo,
  PencilSimple,
} from '@phosphor-icons/react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const ROW_STYLES = {
  destructive: 'border-l-3 border-l-rose-500/70 hover:bg-rose-50/40',
  default: 'border-l-3 border-l-blue-500/70 hover:bg-blue-50/30',
  warning: 'border-l-3 border-l-amber-500/70 hover:bg-amber-50/30',
  success: 'border-l-3 border-l-emerald-500/70 hover:bg-emerald-50/30',
} as const;

type RowVariant = keyof typeof ROW_STYLES;

function MockRow({
  variant,
  tooltip,
  children,
}: {
  variant: RowVariant;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TableRow className={`${ROW_STYLES[variant]} cursor-default transition-colors`}>
          {children}
        </TableRow>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

/** Inline simplified TaskRowTitle */
function TaskRowTitle({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<IconProps>;
}) {
  return (
    <div className='flex items-center gap-2.5'>
      <Icon size={18} weight='regular' className='text-foreground/60 shrink-0' />
      <div className='space-y-1 min-w-0 flex-1'>
        <span className='font-semibold text-[15px]'>{title}</span>
        {subtitle && (
          <div className='text-xs text-muted-foreground'>{subtitle}</div>
        )}
      </div>
    </div>
  );
}

/** Inline simplified TaskRowStatus */
function TaskRowStatus({
  badge,
}: {
  badge?: { text: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' };
}) {
  if (!badge) return null;
  return (
    <div className='flex flex-col gap-1.5 items-center'>
      <Badge variant={badge.variant} className='text-[10px] px-2 py-0.5 w-fit'>
        {badge.text}
      </Badge>
    </div>
  );
}

/** Inline simplified TaskRowAction */
function TaskRowAction({
  actionLabel,
  actionVariant,
}: {
  actionLabel: string;
  actionVariant: 'default' | 'outline' | 'ghost';
}) {
  return (
    <div className='flex items-center justify-end gap-2'>
      <Button size='sm' variant={actionVariant} onClick={e => e.stopPropagation()}>
        {actionLabel}
      </Button>
    </div>
  );
}

function MockTaskTable({
  variant,
  rows,
}: {
  variant: RowVariant;
  rows: Array<{
    title: string;
    subtitle?: string;
    icon: React.ComponentType<IconProps>;
    badge?: { text: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' };
    actionLabel: string;
    actionVariant?: 'default' | 'outline' | 'ghost';
    tooltip: string;
  }>;
}) {
  return (
    <div className='overflow-hidden rounded-lg border-2 border-border/60 bg-card'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead className='w-32 text-center'>Status</TableHead>
            <TableHead className='w-48 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <MockRow key={i} variant={variant} tooltip={row.tooltip}>
              <TableCell className='max-w-0 py-3'>
                <TaskRowTitle
                  title={row.title}
                  subtitle={row.subtitle}
                  icon={row.icon}
                />
              </TableCell>
              <TableCell className='py-3'>
                <TaskRowStatus badge={row.badge} />
              </TableCell>
              <TableCell className='py-3 text-right'>
                <TaskRowAction
                  actionLabel={row.actionLabel}
                  actionVariant={row.actionVariant || 'outline'}
                />
              </TableCell>
            </MockRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function MockDashboard() {
  const [tab, setTab] = useState('action-required');

  return (
    <div className='space-y-4'>
      {/* Instruction banner */}
      <div className='rounded-md border-l-4 border-l-blue-500 bg-blue-50/50 px-4 py-3'>
        <p className='text-sm'>
          <span className='font-semibold text-foreground'>Ready to Work: </span>
          <span className='text-muted-foreground'>
            Submit Excel workbooks and write prompts. Your work is tracked and compensated through your organization.
          </span>
        </p>
      </div>

      {/* Mock tabs */}
      <Tabs value={tab} onValueChange={setTab} className='w-full'>
        <TabsList className='w-full justify-start'>
          {[
            { id: 'action-required', label: 'Action Required', count: 1 },
            { id: 'available', label: 'Available', count: 2 },
            { id: 'completed', label: 'Completed', count: 2 },
          ].map(t => (
            <TabsTrigger key={t.id} value={t.id} className='flex items-center gap-2'>
              {t.label}
              <Badge variant='secondary' className='ml-1 px-1.5 py-0 text-[10px]'>
                {t.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value='action-required'>
          <MockTaskTable
            variant='destructive'
            rows={[
              {
                title: 'Submit Workbooks and Prompt',
                subtitle: 'Provide the input workbook, prompt, and output workbook',
                icon: PencilSimple,
                badge: { text: 'Revisions Needed', variant: 'destructive' },
                actionLabel: 'Revise',
                actionVariant: 'default',
                tooltip: 'This task needs your attention',
              },
            ]}
          />
        </TabsContent>

        <TabsContent value='available'>
          <MockTaskTable
            variant='default'
            rows={[
              {
                title: 'Advanced Task',
                subtitle: 'Pick up an advanced workbook task',
                icon: MicrosoftExcelLogo,
                badge: { text: 'Available', variant: 'outline' },
                actionLabel: 'Pick Up',
                actionVariant: 'outline',
                tooltip: 'Available for anyone',
              },
              {
                title: 'Advanced Task',
                subtitle: 'Pick up an advanced workbook task',
                icon: MicrosoftExcelLogo,
                badge: { text: 'Available', variant: 'outline' },
                actionLabel: 'Pick Up',
                actionVariant: 'outline',
                tooltip: 'Available for anyone',
              },
            ]}
          />
        </TabsContent>

        <TabsContent value='completed'>
          <MockTaskTable
            variant='success'
            rows={[
              {
                title: 'Submit Workbooks and Prompt',
                subtitle: 'Provide the input workbook, prompt, and output workbook',
                icon: PencilSimple,
                badge: { text: 'Approved', variant: 'default' },
                actionLabel: 'View',
                actionVariant: 'ghost',
                tooltip: 'Completed',
              },
              {
                title: 'Submit Workbooks and Prompt',
                subtitle: 'Provide the input workbook, prompt, and output workbook',
                icon: PencilSimple,
                badge: { text: 'Approved', variant: 'default' },
                actionLabel: 'View',
                actionVariant: 'ghost',
                tooltip: 'Completed',
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
