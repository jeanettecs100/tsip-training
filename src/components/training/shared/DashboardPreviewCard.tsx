import { Info, Lightbulb, Warning, WarningOctagon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { MockDashboard } from './MockDashboard';
import type { DashboardPreviewStep } from './types';

interface DashboardPreviewCardProps {
  step: DashboardPreviewStep;
  onComplete: () => void;
}

export function DashboardPreviewCard({ step, onComplete }: DashboardPreviewCardProps) {
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    setAcknowledged(false);
  }, [step.id]);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <p className='leading-relaxed text-foreground'>{step.body}</p>

        {/* Live dashboard preview */}
        <div className='rounded-lg border-2 border-dashed border-primary/30 bg-background p-4'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-wide text-primary'>
            Dashboard Preview
          </p>
          <MockDashboard />
        </div>

        {step.callout && (() => {
          const CalloutIcon = step.callout.type === 'danger' ? WarningOctagon : step.callout.type === 'warning' ? Warning : step.callout.type === 'tip' ? Lightbulb : Info;
          const iconClass = step.callout.type === 'danger' ? 'text-red-600' : step.callout.type === 'warning' ? 'text-amber-500' : step.callout.type === 'tip' ? 'text-emerald-500' : 'text-blue-500';
          return (
            <div className={cn(
              'flex items-start gap-3 rounded-md border-l-4 p-4',
              step.callout.type === 'danger'
                ? 'border-l-red-600 bg-red-50'
                : step.callout.type === 'warning'
                  ? 'border-l-amber-500 bg-amber-50'
                  : step.callout.type === 'tip'
                    ? 'border-l-emerald-500 bg-emerald-50'
                    : 'border-l-blue-500 bg-blue-50'
            )}>
              <CalloutIcon className={cn('mt-0.5 size-5 shrink-0', iconClass)} weight='fill' />
              <p className='text-sm'>{step.callout.text}</p>
            </div>
          );
        })()}

        <label className='mt-6 flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50'>
          <input
            type='checkbox'
            checked={acknowledged}
            onChange={handleAcknowledge}
            className='size-4 rounded border-gray-300 text-primary accent-primary'
          />
          <span className='text-sm font-medium text-foreground'>
            I understand this section
          </span>
        </label>
      </CardContent>
    </Card>
  );
}
