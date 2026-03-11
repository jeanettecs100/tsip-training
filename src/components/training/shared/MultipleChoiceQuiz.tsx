import { CheckCircle, Info, Lightbulb, Warning, WarningOctagon, XCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { ContentCallout, MultipleChoiceStep } from './types';

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
} as const;

interface MultipleChoiceQuizProps {
  step: MultipleChoiceStep;
  onComplete: () => void;
  onAnswer?: (correct: boolean, selectedIndex: number) => void;
  previousAnswer?: number;
}

export function MultipleChoiceQuiz({
  step,
  onComplete,
  onAnswer,
  previousAnswer,
}: MultipleChoiceQuizProps) {
  const hasPrevious = previousAnswer !== undefined;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    hasPrevious ? previousAnswer : null
  );
  const [showResult, setShowResult] = useState(hasPrevious);

  useEffect(() => {
    if (previousAnswer !== undefined) {
      setSelectedIndex(previousAnswer);
      setShowResult(true);
    } else {
      setSelectedIndex(null);
      setShowResult(false);
    }
  }, [step.id, previousAnswer]);

  const isCorrect = selectedIndex === step.correctIndex;

  const handleSelect = (index: number) => {
    if (showResult) return;

    setSelectedIndex(index);
    setShowResult(true);

    const correct = index === step.correctIndex;
    onAnswer?.(correct, index);
    onComplete();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{step.question}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        {step.options.map((option, i) => {
          const isSelected = selectedIndex === i;
          const isCorrectOption = i === step.correctIndex;

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showResult}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-4 text-left text-sm transition-colors',
                !showResult && 'hover:bg-muted/50',
                showResult && isSelected && isCorrectOption &&
                  'border-emerald-500 bg-emerald-50',
                showResult && isSelected && !isCorrectOption &&
                  'border-rose-500 bg-rose-50',
                showResult && !isSelected && isCorrectOption &&
                  'border-emerald-300 bg-emerald-50/50',
                !showResult && isSelected && 'border-primary bg-primary/5'
              )}
            >
              <span className='flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium'>
                {String.fromCharCode(65 + i)}
              </span>
              <span className='flex-1'>{option}</span>
              {showResult && isSelected && isCorrectOption && (
                <CheckCircle
                  className='size-5 text-emerald-500'
                  weight='fill'
                />
              )}
              {showResult && isSelected && !isCorrectOption && (
                <XCircle className='size-5 text-rose-500' weight='fill' />
              )}
            </button>
          );
        })}

        {showResult && (
          <div
            className={cn(
              'mt-4 rounded-lg p-4 text-sm',
              isCorrect
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-rose-50 text-rose-800'
            )}
          >
            <p className='font-medium'>
              {isCorrect ? 'Correct!' : 'Incorrect.'}
            </p>
            <p className='mt-1'>{step.explanation}</p>
          </div>
        )}

        {showResult && step.callout && <CalloutBlock callout={step.callout} />}
      </CardContent>
    </Card>
  );
}

function CalloutBlock({ callout }: { callout: ContentCallout }) {
  const style = CALLOUT_STYLES[callout.type];
  const CalloutIcon = style.icon;
  return (
    <div className={cn('mt-4 flex items-start gap-3 rounded-md px-4 py-3', style.container)}>
      <CalloutIcon
        className={cn('mt-0.5 size-5 shrink-0', style.iconClass)}
        weight='fill'
      />
      <p className='text-sm'>{callout.text}</p>
    </div>
  );
}
