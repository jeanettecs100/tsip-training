import { CheckCircle } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import type { MatchingStep } from './types';

interface MatchingExerciseProps {
  step: MatchingStep;
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

function buildAllMatchedMap(pairCount: number): Map<number, number> {
  const map = new Map<number, number>();
  for (let i = 0; i < pairCount; i++) {
    map.set(i, i);
  }
  return map;
}

export function MatchingExercise({ step, onComplete, onAnswer, previousAnswer }: MatchingExerciseProps) {
  const hasPrevious = previousAnswer !== undefined;
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(
    hasPrevious ? buildAllMatchedMap(step.pairs.length) : new Map()
  );

  const shuffledDefinitions = useMemo(
    () =>
      shuffleArray(
        step.pairs.map((p, i) => ({ definition: p.definition, originalIndex: i }))
      ),
    [step.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (previousAnswer !== undefined) {
      setSelectedTerm(null);
      setMatches(buildAllMatchedMap(step.pairs.length));
    } else {
      setSelectedTerm(null);
      setMatches(new Map());
    }
  }, [step.id, previousAnswer, step.pairs.length]);

  const handleTermClick = (termIndex: number) => {
    if (matches.has(termIndex)) return;
    setSelectedTerm(termIndex === selectedTerm ? null : termIndex);
  };

  const handleDefinitionClick = (originalDefIndex: number) => {
    if (selectedTerm === null) return;

    // Check if this definition is already matched
    const alreadyMatched = Array.from(matches.values()).includes(originalDefIndex);
    if (alreadyMatched) return;

    // Check if correct match
    if (selectedTerm === originalDefIndex) {
      const newMatches = new Map(matches);
      newMatches.set(selectedTerm, originalDefIndex);
      setMatches(newMatches);
      setSelectedTerm(null);

      if (newMatches.size === step.pairs.length) {
        onAnswer?.(true);
        onComplete();
      }
    } else {
      // Wrong match - deselect
      setSelectedTerm(null);
    }
  };

  const isDefMatched = (originalIndex: number) =>
    Array.from(matches.values()).includes(originalIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{step.instruction}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-4 text-sm text-muted-foreground'>
          Click a term on the left, then click its matching definition on the
          right.
        </p>

        <div className='grid gap-4 sm:grid-cols-2'>
          {/* Terms */}
          <div className='space-y-2'>
            <p className='mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground'>
              Terms
            </p>
            {step.pairs.map((pair, i) => {
              const isMatched = matches.has(i);
              const isSelected = selectedTerm === i;

              return (
                <button
                  key={i}
                  onClick={() => handleTermClick(i)}
                  disabled={isMatched}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors',
                    isMatched && 'border-emerald-300 bg-emerald-50 opacity-75',
                    isSelected && !isMatched && 'border-primary bg-primary/10',
                    !isMatched && !isSelected && 'hover:bg-muted/50'
                  )}
                >
                  {isMatched && (
                    <CheckCircle
                      className='size-4 shrink-0 text-emerald-500'
                      weight='fill'
                    />
                  )}
                  <span>{pair.term}</span>
                </button>
              );
            })}
          </div>

          {/* Definitions */}
          <div className='space-y-2'>
            <p className='mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground'>
              Definitions
            </p>
            {shuffledDefinitions.map((def, i) => {
              const isMatched = isDefMatched(def.originalIndex);

              return (
                <button
                  key={i}
                  onClick={() => handleDefinitionClick(def.originalIndex)}
                  disabled={isMatched || selectedTerm === null}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors',
                    isMatched && 'border-emerald-300 bg-emerald-50 opacity-75',
                    !isMatched &&
                      selectedTerm !== null &&
                      'cursor-pointer hover:bg-primary/5 hover:border-primary',
                    !isMatched &&
                      selectedTerm === null &&
                      'cursor-default text-muted-foreground'
                  )}
                >
                  {isMatched && (
                    <CheckCircle
                      className='size-4 shrink-0 text-emerald-500'
                      weight='fill'
                    />
                  )}
                  <span>{def.definition}</span>
                </button>
              );
            })}
          </div>
        </div>

        {matches.size === step.pairs.length && (
          <div className='mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800'>
            <p className='font-medium'>All matched correctly!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
