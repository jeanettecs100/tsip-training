import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { useEffect, useMemo, useRef, useState } from 'react';

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

function saveMatchesToStorage(stepId: string, matches: Map<number, number>) {
  try {
    const arr = Array.from(matches.entries());
    localStorage.setItem(`tsip-matching-${stepId}`, JSON.stringify(arr));
  } catch { /* ignore */ }
}

function loadMatchesFromStorage(stepId: string): Map<number, number> | null {
  try {
    const stored = localStorage.getItem(`tsip-matching-${stepId}`);
    if (!stored) return null;
    const arr = JSON.parse(stored) as [number, number][];
    return new Map(arr);
  } catch {
    return null;
  }
}

export function MatchingExercise({ step, onComplete, onAnswer, previousAnswer }: MatchingExerciseProps) {
  const hasPrevious = previousAnswer !== undefined;
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(() => {
    if (hasPrevious) {
      // Try to restore the user's actual matches from localStorage
      return loadMatchesFromStorage(step.id) ?? buildAllMatchedMap(step.pairs.length);
    }
    return new Map();
  });
  const [submitted, setSubmitted] = useState(hasPrevious);
  // Track whether we just submitted to prevent previousAnswer effect from overwriting
  const justSubmitted = useRef(false);

  const shuffledDefinitions = useMemo(
    () =>
      shuffleArray(
        step.pairs.map((p, i) => ({ definition: p.definition, originalIndex: i }))
      ),
    [step.id] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Only restore from previousAnswer on step change, not when answer is first recorded
  useEffect(() => {
    if (justSubmitted.current) {
      justSubmitted.current = false;
      return;
    }
    if (previousAnswer !== undefined) {
      setSelectedTerm(null);
      setMatches(loadMatchesFromStorage(step.id) ?? buildAllMatchedMap(step.pairs.length));
      setSubmitted(true);
      onComplete();
    } else {
      setSelectedTerm(null);
      setMatches(new Map());
      setSubmitted(false);
    }
  }, [step.id, previousAnswer, step.pairs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Check if all pairs matched and evaluate
  useEffect(() => {
    if (submitted) return;
    if (matches.size < step.pairs.length) return;

    const allCorrect = Array.from(matches.entries()).every(
      ([termIdx, defIdx]) => termIdx === defIdx
    );
    // Persist the user's actual matches so they survive navigation
    saveMatchesToStorage(step.id, matches);
    justSubmitted.current = true;
    setSubmitted(true);
    onAnswer?.(allCorrect);
    onComplete();
  }, [matches, step.pairs.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTermClick = (termIndex: number) => {
    if (submitted) return;
    if (matches.has(termIndex)) {
      const newMatches = new Map(matches);
      newMatches.delete(termIndex);
      setMatches(newMatches);
      setSelectedTerm(termIndex);
      return;
    }
    setSelectedTerm(termIndex === selectedTerm ? null : termIndex);
  };

  const handleDefinitionClick = (originalDefIndex: number) => {
    if (submitted) return;
    if (selectedTerm === null) return;

    const matchedByTerm = Array.from(matches.entries()).find(
      ([, defIdx]) => defIdx === originalDefIndex
    );
    if (matchedByTerm) return;

    const newMatches = new Map(matches);
    newMatches.set(selectedTerm, originalDefIndex);
    setMatches(newMatches);
    setSelectedTerm(null);
  };

  const isDefMatched = (originalIndex: number) =>
    Array.from(matches.values()).includes(originalIndex);

  const allCorrect = submitted && Array.from(matches.entries()).every(
    ([termIdx, defIdx]) => termIdx === defIdx
  );

  const getDefText = (originalIndex: number) =>
    step.pairs[originalIndex]?.definition ?? '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{step.instruction}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Active matching UI */}
        {!submitted && (
          <>
            <p className='mb-4 text-sm text-muted-foreground'>
              Click a term on the left, then click its matching definition on the
              right.{matches.size > 0 && matches.size < step.pairs.length && (
                <> ({matches.size}/{step.pairs.length} matched)</>
              )}
            </p>

            <div className='grid gap-4 sm:grid-cols-2'>
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
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors',
                        isMatched && 'border-primary/40 bg-primary/5 opacity-75',
                        isSelected && !isMatched && 'border-primary bg-primary/10',
                        !isMatched && !isSelected && 'hover:bg-muted/50'
                      )}
                    >
                      <span>{pair.term}</span>
                    </button>
                  );
                })}
              </div>

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
                      disabled={isMatched && selectedTerm === null}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors',
                        isMatched && 'border-primary/40 bg-primary/5 opacity-75',
                        !isMatched &&
                          selectedTerm !== null &&
                          'cursor-pointer hover:bg-primary/5 hover:border-primary',
                        !isMatched &&
                          selectedTerm === null &&
                          'cursor-default text-muted-foreground'
                      )}
                    >
                      <span>{def.definition}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Results: all correct */}
        {submitted && allCorrect && (
          <div className='space-y-3'>
            <div className='rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800'>
              <p className='font-medium'>All matched correctly!</p>
            </div>
            <MatchList
              pairs={step.pairs.map((p) => ({
                term: p.term,
                definition: p.definition,
              }))}
              variant='correct'
            />
          </div>
        )}

        {/* Results: some incorrect */}
        {submitted && !allCorrect && (
          <div className='space-y-4'>
            <div className='space-y-2'>
              <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                Your matches
              </p>
              <MatchList
                pairs={step.pairs.map((p, i) => ({
                  term: p.term,
                  definition: getDefText(matches.get(i) ?? -1),
                  correct: matches.get(i) === i,
                }))}
                variant='result'
              />
            </div>

            <div className='space-y-2'>
              <p className='text-xs font-medium uppercase tracking-wider text-muted-foreground'>
                Correct matches
              </p>
              <MatchList
                pairs={step.pairs.map((p) => ({
                  term: p.term,
                  definition: p.definition,
                }))}
                variant='correct'
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared sub-component for aligned term → definition rows           */
/* ------------------------------------------------------------------ */

interface MatchPair {
  term: string;
  definition: string;
  correct?: boolean;
}

function MatchList({
  pairs,
  variant,
}: {
  pairs: MatchPair[];
  variant: 'correct' | 'result';
}) {
  return (
    <div className='grid gap-2'>
      {pairs.map((pair, i) => {
        const isCorrect = variant === 'correct' || pair.correct;
        const borderColor = isCorrect
          ? 'border-emerald-300 bg-emerald-50'
          : 'border-red-300 bg-red-50';

        return (
          <div
            key={i}
            className={cn(
              'grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-lg border p-3 text-sm',
              borderColor
            )}
          >
            <div className='flex items-center gap-2'>
              {isCorrect ? (
                <CheckCircle
                  className='size-4 shrink-0 text-emerald-500'
                  weight='fill'
                />
              ) : (
                <XCircle
                  className='size-4 shrink-0 text-red-500'
                  weight='fill'
                />
              )}
              <span className='font-medium'>{pair.term}</span>
            </div>
            <span className='text-muted-foreground'>&rarr;</span>
            <span>{pair.definition}</span>
          </div>
        );
      })}
    </div>
  );
}
