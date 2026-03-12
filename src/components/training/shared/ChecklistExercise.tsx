import { CheckSquare, Square } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { ChecklistStep } from './types';

interface ChecklistExerciseProps {
  step: ChecklistStep;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

export function ChecklistExercise({ step, onComplete, isAlreadyCompleted }: ChecklistExerciseProps) {
  const totalItems = step.groups.reduce((sum, g) => sum + g.items.length, 0);
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (isAlreadyCompleted) {
      // Pre-check all items
      const all = new Set<string>();
      step.groups.forEach((g, gi) => g.items.forEach((_, ii) => all.add(`${gi}-${ii}`)));
      return all;
    }
    return new Set<string>();
  });

  useEffect(() => {
    if (isAlreadyCompleted) {
      const all = new Set<string>();
      step.groups.forEach((g, gi) => g.items.forEach((_, ii) => all.add(`${gi}-${ii}`)));
      setChecked(all);
      onComplete();
    } else {
      setChecked(new Set());
    }
  }, [step.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (key: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      if (next.size === totalItems) {
        onComplete();
      }
      return next;
    });
  };

  const allChecked = checked.size === totalItems;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {step.body && (
          <p className='leading-relaxed text-foreground'>{step.body}</p>
        )}

        {step.groups.map((group, gi) => (
          <div key={gi} className='space-y-2'>
            <h3 className='text-sm font-semibold text-foreground'>{group.label}</h3>
            <div className='space-y-1'>
              {group.items.map((item, ii) => {
                const key = `${gi}-${ii}`;
                const isChecked = checked.has(key);
                return (
                  <button
                    key={key}
                    type='button'
                    onClick={() => toggle(key)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                      isChecked
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-border hover:bg-muted/50'
                    )}
                  >
                    {isChecked ? (
                      <CheckSquare className='mt-0.5 size-5 shrink-0 text-emerald-600' weight='fill' />
                    ) : (
                      <Square className='mt-0.5 size-5 shrink-0 text-muted-foreground/50' />
                    )}
                    <span className={cn(
                      'leading-relaxed',
                      isChecked ? 'text-emerald-800' : 'text-muted-foreground'
                    )}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!allChecked && (
          <p className='text-center text-xs text-muted-foreground'>
            Check all items to continue
          </p>
        )}
      </CardContent>
    </Card>
  );
}
