import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { OrderingStep } from './types';

interface OrderingExerciseProps {
  step: OrderingStep;
  onComplete: () => void;
  onAnswer?: (correct: boolean) => void;
  previousAnswer?: number;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

function saveOrderToStorage(stepId: string, order: string[]) {
  try {
    localStorage.setItem(`tsip-ordering-${stepId}`, JSON.stringify(order));
  } catch { /* ignore */ }
}

function loadOrderFromStorage(stepId: string): string[] | null {
  try {
    const stored = localStorage.getItem(`tsip-ordering-${stepId}`);
    if (!stored) return null;
    return JSON.parse(stored) as string[];
  } catch {
    return null;
  }
}

export function OrderingExercise({
  step,
  onComplete,
  onAnswer,
  previousAnswer,
}: OrderingExerciseProps) {
  const hasPrevious = previousAnswer !== undefined;
  const [selected, setSelected] = useState<string[]>(() => {
    if (hasPrevious) {
      return loadOrderFromStorage(step.id) ?? step.items;
    }
    return [];
  });
  const [showResult, setShowResult] = useState(hasPrevious);
  const justSubmitted = useRef(false);

  const shuffledItems = useMemo(
    () => shuffleArray(step.items),
    [step.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (justSubmitted.current) {
      justSubmitted.current = false;
      return;
    }
    if (previousAnswer !== undefined) {
      setSelected(loadOrderFromStorage(step.id) ?? step.items);
      setShowResult(true);
      onComplete();
    } else {
      setSelected([]);
      setShowResult(false);
    }
  }, [step.id, previousAnswer, step.items]); // eslint-disable-line react-hooks/exhaustive-deps

  const remaining = shuffledItems.filter(item => !selected.includes(item));
  const isCorrect =
    selected.length === step.items.length &&
    selected.every((item, i) => item === step.items[i]);

  const handleSelectItem = (item: string) => {
    if (showResult) return;

    const newSelected = [...selected, item];
    setSelected(newSelected);

    if (newSelected.length === step.items.length) {
      saveOrderToStorage(step.id, newSelected);
      justSubmitted.current = true;
      setShowResult(true);
      const correct = newSelected.every((s, i) => s === step.items[i]);
      onAnswer?.(correct);
      onComplete();
    }
  };

  const handleUndo = () => {
    if (showResult) return;
    setSelected(prev => prev.slice(0, -1));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{step.instruction}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <p className='text-sm text-muted-foreground'>
          Click items in the correct order. Click the last item to undo.
        </p>

        {/* Selected items (ordered) */}
        {selected.length > 0 && (
          <div className='space-y-2'>
            <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
              Your order
            </p>
            {selected.map((item, i) => {
              const isLast = i === selected.length - 1;
              const isItemCorrect = showResult && item === step.items[i];
              const isItemWrong = showResult && item !== step.items[i];

              return (
                <button
                  key={item}
                  onClick={isLast && !showResult ? handleUndo : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm',
                    isItemCorrect && 'border-emerald-300 bg-emerald-50',
                    isItemWrong && 'border-rose-300 bg-rose-50',
                    !showResult && 'bg-primary/5 border-primary/20',
                    isLast && !showResult && 'cursor-pointer hover:bg-primary/10'
                  )}
                >
                  <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground'>
                    {i + 1}
                  </span>
                  <span className='flex-1'>{item}</span>
                  {isItemCorrect && (
                    <CheckCircle
                      className='size-5 text-emerald-500'
                      weight='fill'
                    />
                  )}
                  {isItemWrong && (
                    <XCircle className='size-5 text-rose-500' weight='fill' />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Remaining items */}
        {remaining.length > 0 && !showResult && (
          <div className='space-y-2'>
            <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
              {selected.length === 0 ? 'Select first item' : 'Select next item'}
            </p>
            {remaining.map(item => (
              <button
                key={item}
                onClick={() => handleSelectItem(item)}
                className='flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors hover:bg-muted/50'
              >
                <span className='flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium text-muted-foreground'>
                  ?
                </span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        )}

        {showResult && !isCorrect && (
          <div className='space-y-2'>
            <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
              Correct order
            </p>
            {step.items.map((item, i) => (
              <div
                key={item}
                className='flex items-center gap-3 rounded-lg border border-emerald-300 bg-emerald-50 p-3 text-left text-sm'
              >
                <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white'>
                  {i + 1}
                </span>
                <span className='flex-1'>{item}</span>
                <CheckCircle
                  className='size-5 text-emerald-500'
                  weight='fill'
                />
              </div>
            ))}
          </div>
        )}

        {showResult && isCorrect && (
          <div className='rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800'>
            <p className='font-medium'>Perfect order!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
