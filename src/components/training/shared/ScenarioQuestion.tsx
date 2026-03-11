import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { ScenarioStep } from './types';

interface ScenarioQuestionProps {
  step: ScenarioStep;
  onComplete: () => void;
  onAnswer?: (correct: boolean, selectedIndex: number) => void;
  previousAnswer?: number;
}

export function ScenarioQuestion({
  step,
  onComplete,
  onAnswer,
  previousAnswer,
}: ScenarioQuestionProps) {
  const hasPrevious = previousAnswer !== undefined;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    hasPrevious ? previousAnswer : null
  );
  const [showResult, setShowResult] = useState(hasPrevious);

  useEffect(() => {
    if (previousAnswer !== undefined) {
      setSelectedIndex(previousAnswer);
      setShowResult(true);
      onComplete();
    } else {
      setSelectedIndex(null);
      setShowResult(false);
    }
  }, [step.id, previousAnswer]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <CardContent className='space-y-4'>
        {/* Scenario callout */}
        <div className='rounded-lg border-l-4 border-l-blue-500 bg-blue-50 p-4'>
          <p className='text-sm font-medium text-blue-900'>Scenario</p>
          <p className='mt-1 text-sm text-blue-800'>{step.scenario}</p>
        </div>

        {/* Options */}
        <div className='space-y-3'>
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
                  showResult &&
                    isSelected &&
                    isCorrectOption &&
                    'border-emerald-500 bg-emerald-50',
                  showResult &&
                    isSelected &&
                    !isCorrectOption &&
                    'border-rose-500 bg-rose-50',
                  showResult &&
                    !isSelected &&
                    isCorrectOption &&
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
        </div>

        {showResult && (
          <div
            className={cn(
              'rounded-lg p-4 text-sm',
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
      </CardContent>
    </Card>
  );
}
