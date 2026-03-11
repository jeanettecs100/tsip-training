import { ArrowLeft, ArrowRight, CheckCircle, Circle, Trophy, XCircle } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitScoresToSheet } from '@/lib/google-sheets';
import { cn } from '@/lib/utils';

import { getStoredEmail } from './EmailGate';

import { MODULES as MODULES_CONFIG } from './data/modules-config';
import { ContentCard } from './shared/ContentCard';
import { DashboardPreviewCard } from './shared/DashboardPreviewCard';
import { MatchingExercise } from './shared/MatchingExercise';
import { ModuleHeader } from './shared/ModuleHeader';
import { MultipleChoiceQuiz } from './shared/MultipleChoiceQuiz';
import { OrderingExercise } from './shared/OrderingExercise';
import { ScenarioQuestion } from './shared/ScenarioQuestion';
import { StepProgress } from './shared/StepProgress';
import { TaskFormPreviewCard } from './shared/TaskFormPreviewCard';
import type { ModuleId, ModuleScore, QuizAnswerMap, Step } from './shared/types';

interface SidebarItem {
  label: string;
  startIndex: number;
  endIndex: number;
}

const TITLED_STEP_TYPES = new Set(['content', 'dashboard-preview', 'task-form-preview', 'assessment-results']);
const QUIZ_STEP_TYPES = new Set(['multiple-choice', 'scenario', 'ordering', 'matching']);

function buildSidebarItems(steps: Step[], moduleId?: ModuleId): SidebarItem[] {
  const items: SidebarItem[] = [];
  let i = 0;
  let questionNum = 0;
  while (i < steps.length) {
    const step = steps[i]!;
    if (TITLED_STEP_TYPES.has(step.type)) {
      items.push({ label: 'title' in step ? step.title : '', startIndex: i, endIndex: i });
      i++;
    } else if (moduleId === 7) {
      // Module 7: each quiz step gets its own sidebar entry
      questionNum++;
      items.push({ label: `Question #${questionNum}`, startIndex: i, endIndex: i });
      i++;
    } else {
      const groupStart = i;
      while (i < steps.length && !TITLED_STEP_TYPES.has(steps[i]!.type)) {
        i++;
      }
      items.push({
        label: 'Knowledge Check',
        startIndex: groupStart,
        endIndex: i - 1,
      });
    }
  }
  return items;
}

function getKnowledgeCheckInfo(
  sidebarItems: SidebarItem[],
  currentStepIndex: number
): { questionNum: number; totalQuestions: number } | null {
  for (const item of sidebarItems) {
    if (
      item.startIndex !== item.endIndex &&
      currentStepIndex >= item.startIndex &&
      currentStepIndex <= item.endIndex
    ) {
      return {
        questionNum: currentStepIndex - item.startIndex + 1,
        totalQuestions: item.endIndex - item.startIndex + 1,
      };
    }
  }
  return null;
}

interface ModuleViewerProps {
  moduleId: ModuleId;
  steps: Step[];
  currentStepIndex: number;
  maxStepIndex: number;
  isReviewMode: boolean;
  onAdvance: (totalSteps: number) => void;
  onBack: () => void;
  onGoToStep: (stepIndex: number, totalSteps: number) => void;
  onModuleComplete?: (score: ModuleScore) => void;
  savedQuizAnswers?: QuizAnswerMap;
  onSaveQuizAnswers?: (answers: QuizAnswerMap) => void;
  getAllModuleScores?: (id: ModuleId) => ModuleScore | undefined;
}

export function ModuleViewer({
  moduleId,
  steps,
  currentStepIndex,
  maxStepIndex,
  isReviewMode,
  onAdvance,
  onBack,
  onGoToStep,
  onModuleComplete,
  savedQuizAnswers,
  onSaveQuizAnswers,
  getAllModuleScores,
}: ModuleViewerProps) {
  const [stepComplete, setStepComplete] = useState(false);
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswerMap>({});
  const [showScore, setShowScore] = useState(false);

  const moduleConfig = MODULES_CONFIG.find(m => m.id === moduleId);
  const safeStepIndex = Math.min(currentStepIndex, steps.length - 1);
  const currentStep = steps[safeStepIndex];
  const isLastStep = safeStepIndex === steps.length - 1;
  const isLastModule = moduleId === 7;
  const isFirstStep = safeStepIndex === 0;

  // Initialize from saved answers when entering review mode, or reset for new module
  useEffect(() => {
    if (isReviewMode && savedQuizAnswers) {
      // Reconstruct quizResults from saved answers
      const results: Record<string, boolean> = {};
      const quizStepsForModule = steps.filter(s => QUIZ_STEP_TYPES.has(s.type));
      for (const qs of quizStepsForModule) {
        if (savedQuizAnswers[qs.id] !== undefined) {
          if (qs.type === 'multiple-choice' || qs.type === 'scenario') {
            results[qs.id] = savedQuizAnswers[qs.id] === qs.correctIndex;
          } else {
            // matching/ordering: -1 means always correct
            results[qs.id] = true;
          }
        }
      }
      setQuizResults(results);
      setQuizAnswers(savedQuizAnswers);
    } else {
      setQuizResults({});
      setQuizAnswers({});
    }
    setShowScore(false);
  }, [moduleId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStepComplete = () => {
    setStepComplete(true);
  };

  const handleAnswer = useCallback((stepId: string, correct: boolean, answerIndex: number) => {
    setQuizResults(prev => ({ ...prev, [stepId]: correct }));
    setQuizAnswers(prev => {
      const next = { ...prev, [stepId]: answerIndex };
      return next;
    });
  }, []);

  const sidebarItems = buildSidebarItems(steps, moduleId);

  // Compute display step index (sidebar items = display steps)
  const displayStepIndex = sidebarItems.findIndex(
    item => safeStepIndex >= item.startIndex && safeStepIndex <= item.endIndex
  );
  const displayTotal = sidebarItems.length;

  // Count knowledge check questions
  const quizSteps = steps.filter(s => QUIZ_STEP_TYPES.has(s.type));
  const quizStepIds = quizSteps.map(s => s.id);

  const handleAdvance = () => {
    // Module 7: save scores when advancing to the results step
    if (moduleId === 7 && !isReviewMode && quizSteps.length > 0) {
      const nextStep = steps[safeStepIndex + 1];
      if (nextStep?.type === 'assessment-results') {
        const correct = quizStepIds.filter(id => quizResults[id] === true).length;
        onModuleComplete?.({ correct, total: quizSteps.length });
        onSaveQuizAnswers?.(quizAnswers);
      }
    }

    // If on last step and there are quiz questions, show score summary (skip for module 7)
    if (isLastStep && !isReviewMode && quizSteps.length > 0 && !showScore && moduleId !== 7) {
      const correct = quizStepIds.filter(id => quizResults[id] === true).length;
      onModuleComplete?.({ correct, total: quizSteps.length });
      onSaveQuizAnswers?.(quizAnswers);
      setShowScore(true);
      return;
    }

    if (showScore) {
      // Advance past score page to next module
      setShowScore(false);
      setStepComplete(false);
      onAdvance(steps.length);
      return;
    }

    // Review mode: on last quiz question, go back to score summary (skip for module 7)
    if (isReviewMode && isLastStep && savedQuizAnswers && moduleId !== 7) {
      setShowScore(true);
      return;
    }

    setStepComplete(false);
    onAdvance(steps.length);
  };

  const handleBack = () => {
    if (showScore) {
      setShowScore(false);
      return;
    }
    setStepComplete(false);
    onBack();
  };

  const kcInfo = getKnowledgeCheckInfo(sidebarItems, safeStepIndex);

  if (!currentStep || !moduleConfig) return null;

  const isLastStepReview = isReviewMode && isLastStep;

  // Score summary view
  if (showScore) {
    const correct = quizStepIds.filter(id => quizResults[id] === true).length;
    const total = quizSteps.length;
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className='flex h-full'>
        <aside className='hidden w-56 shrink-0 border-r bg-card lg:block'>
          <div className='border-b px-4 py-3'>
            <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
              Steps
            </p>
          </div>
          <nav className='overflow-y-auto py-1'>
            {sidebarItems.map((item) => {
              const isKC = item.startIndex !== item.endIndex;
              return (
                <button
                  key={`sidebar-${item.startIndex}`}
                  onClick={() => {
                    if (isKC) return; // Already on score page
                    setShowScore(false);
                    onGoToStep(item.startIndex, steps.length);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors',
                    isKC
                      ? 'border-l-3 border-l-primary bg-primary/5 font-medium text-foreground'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  <CheckCircle className='size-4 shrink-0 text-emerald-500' weight='fill' />
                  <span className='truncate'>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <div className='flex-1 overflow-y-auto'>
          <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
            <ModuleHeader
              title={moduleConfig.title}
              description={moduleConfig.description}
            />

            <Card>
              <CardHeader className='text-center'>
                <div className='mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10'>
                  <Trophy className='size-8 text-primary' weight='fill' />
                </div>
                <CardTitle className='text-xl'>Knowledge Check Complete</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='text-center'>
                  <p className='text-4xl font-bold text-foreground'>{pct}%</p>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    {correct} of {total} correct
                  </p>
                </div>

                <div className='mx-auto max-w-sm'>
                  <div className='h-3 w-full overflow-hidden rounded-full bg-muted'>
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  {quizSteps.map((qStep) => {
                    const wasCorrect = quizResults[qStep.id];
                    const questionText =
                      qStep.type === 'multiple-choice'
                        ? qStep.question
                        : qStep.type === 'scenario'
                          ? qStep.question
                          : qStep.type === 'matching'
                            ? qStep.instruction
                            : qStep.type === 'ordering'
                              ? qStep.instruction
                              : '';

                    return (
                      <div
                        key={qStep.id}
                        className={cn(
                          'flex items-start gap-3 rounded-lg border p-3 text-sm',
                          wasCorrect
                            ? 'border-emerald-200 bg-emerald-50/50'
                            : 'border-rose-200 bg-rose-50/50'
                        )}
                      >
                        {wasCorrect ? (
                          <CheckCircle className='mt-0.5 size-4 shrink-0 text-emerald-500' weight='fill' />
                        ) : (
                          <Circle className='mt-0.5 size-4 shrink-0 text-rose-400' weight='fill' />
                        )}
                        <span className={wasCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                          {questionText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className='mt-8 flex justify-end gap-3'>
              {isReviewMode && (
                <Button
                  variant='outline'
                  size='lg'
                  onClick={() => {
                    setShowScore(false);
                    // Navigate to first quiz question
                    const kcItem = sidebarItems.find(item => item.startIndex !== item.endIndex);
                    if (kcItem) {
                      onGoToStep(kcItem.startIndex, steps.length);
                    }
                  }}
                >
                  Review Questions
                </Button>
              )}
              {!isReviewMode && (
                <Button size='lg' onClick={handleAdvance}>
                  {isLastModule ? 'Complete Training' : 'Next Module'}
                  {!isLastModule && <ArrowRight className='ml-1.5 size-4' />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isReviewingQuiz = isReviewMode && kcInfo !== null;
  const buttonLabel = isReviewingQuiz
    ? kcInfo.questionNum === kcInfo.totalQuestions
      ? 'Back to Score'
      : 'Next'
    : isReviewMode
      ? isLastStep
        ? 'Next Module'
        : 'Next'
      : isLastStep && isLastModule
        ? 'Complete Training'
        : 'Continue';

  return (
    <div className='flex h-full'>
      {/* Step sidebar — visible on large screens */}
      <aside className='hidden w-56 shrink-0 border-r bg-card lg:block'>
        <div className='border-b px-4 py-3'>
          <p className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
            Steps
          </p>
        </div>
        <nav className='overflow-y-auto py-1'>
          {sidebarItems.map((item) => {
            const isActive = safeStepIndex >= item.startIndex && safeStepIndex <= item.endIndex;
            const isCompleted = isReviewMode || item.endIndex < maxStepIndex;
            const isClickable = isReviewMode || item.startIndex <= maxStepIndex;

            return (
              <button
                key={`sidebar-${item.startIndex}`}
                onClick={() => {
                  if (isClickable) {
                    setStepComplete(false);
                    // KC item in review mode — navigate to the questions directly
                    setShowScore(false);
                    onGoToStep(item.startIndex, steps.length);
                  }
                }}
                disabled={!isClickable}
                className={cn(
                  'flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors',
                  isActive && 'border-l-3 border-l-primary bg-primary/5 font-medium text-foreground',
                  !isActive && isCompleted && 'text-muted-foreground hover:bg-muted/50',
                  !isActive && !isCompleted && 'cursor-not-allowed text-muted-foreground/40',
                )}
              >
                {isCompleted && !isActive ? (
                  (() => {
                    // For module 7 quiz questions, show correct/incorrect icon
                    if (moduleId === 7) {
                      const stepAtIndex = steps[item.startIndex];
                      if (stepAtIndex && QUIZ_STEP_TYPES.has(stepAtIndex.type)) {
                        const wasCorrect = quizResults[stepAtIndex.id];
                        if (wasCorrect === false) {
                          return <XCircle className='size-4 shrink-0 text-rose-500' weight='fill' />;
                        }
                      }
                    }
                    return <CheckCircle className='size-4 shrink-0 text-emerald-500' weight='fill' />;
                  })()
                ) : (
                  <Circle
                    className={cn(
                      'size-4 shrink-0',
                      isActive ? 'text-primary' : 'text-muted-foreground/30'
                    )}
                    weight={isActive ? 'fill' : 'regular'}
                  />
                )}
                <span className='truncate'>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8'>
          {/* Back button (top) */}
          {!isFirstStep && (
            <button
              onClick={handleBack}
              className='mb-4 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              <ArrowLeft className='size-4' />
              <span>Previous step</span>
            </button>
          )}

          <ModuleHeader
            title={moduleConfig.title}
            description={moduleConfig.description}
          />

          <StepProgress
            currentStep={displayStepIndex}
            totalSteps={displayTotal}
          />

          {/* Question indicator for knowledge check */}
          {kcInfo && (
            <p className='mb-4 text-sm font-medium text-muted-foreground'>
              Question {kcInfo.questionNum} of {kcInfo.totalQuestions}
            </p>
          )}

          <div className='mb-8'>
            {currentStep.type === 'content' && (
              <ContentCard step={currentStep} onComplete={handleStepComplete} />
            )}
            {currentStep.type === 'multiple-choice' && (
              <MultipleChoiceQuiz
                step={currentStep}
                onComplete={handleStepComplete}
                onAnswer={(correct, idx) => handleAnswer(currentStep.id, correct, idx)}
                previousAnswer={savedQuizAnswers?.[currentStep.id]}
              />
            )}
            {currentStep.type === 'matching' && (
              <MatchingExercise
                step={currentStep}
                onComplete={handleStepComplete}
                onAnswer={(correct) => handleAnswer(currentStep.id, correct, -1)}
                previousAnswer={savedQuizAnswers?.[currentStep.id]}
              />
            )}
            {currentStep.type === 'ordering' && (
              <OrderingExercise
                step={currentStep}
                onComplete={handleStepComplete}
                onAnswer={(correct) => handleAnswer(currentStep.id, correct, -1)}
                previousAnswer={savedQuizAnswers?.[currentStep.id]}
              />
            )}
            {currentStep.type === 'scenario' && (
              <ScenarioQuestion
                step={currentStep}
                onComplete={handleStepComplete}
                onAnswer={(correct, idx) => handleAnswer(currentStep.id, correct, idx)}
                previousAnswer={savedQuizAnswers?.[currentStep.id]}
              />
            )}
            {currentStep.type === 'dashboard-preview' && (
              <DashboardPreviewCard
                step={currentStep}
                onComplete={handleStepComplete}
              />
            )}
            {currentStep.type === 'task-form-preview' && (
              <TaskFormPreviewCard
                step={currentStep}
                onComplete={handleStepComplete}
              />
            )}
            {currentStep.type === 'assessment-results' && (
              <AssessmentResultsCard
                quizResults={quizResults}
                quizSteps={quizSteps}
                getAllModuleScores={getAllModuleScores}
                onComplete={handleStepComplete}
              />
            )}
          </div>

          <div className='flex items-center justify-between'>
            <div>
              {!isFirstStep && (
                <Button variant='outline' onClick={handleBack}>
                  <ArrowLeft className='mr-1.5 size-4' />
                  Back
                </Button>
              )}
            </div>
            <Button
              size='lg'
              onClick={handleAdvance}
              disabled={!stepComplete && !isReviewMode}
            >
              {buttonLabel}
              {isLastStepReview ? (
                <ArrowRight className='ml-1.5 size-4' />
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Module weights for composite score
const MODULE_WEIGHTS: Array<{ id: ModuleId; title: string; weight: number }> = [
  { id: 1, title: 'Introduction', weight: 0.05 },
  { id: 2, title: 'Spreadsheet Tasks', weight: 0.05 },
  { id: 3, title: 'Prompt Writing', weight: 0.05 },
  { id: 4, title: 'Rubric Writing', weight: 0.05 },
  { id: 5, title: 'Platform Navigation', weight: 0.05 },
  { id: 7, title: 'Final Assessment', weight: 0.75 },
];

interface AssessmentResultsCardProps {
  quizResults: Record<string, boolean>;
  quizSteps: Step[];
  getAllModuleScores?: (id: ModuleId) => ModuleScore | undefined;
  onComplete: () => void;
}

function AssessmentResultsCard({
  quizResults,
  quizSteps,
  getAllModuleScores,
  onComplete,
}: AssessmentResultsCardProps) {
  const hasSubmitted = useRef(false);

  // Compute module 7 score from local quiz state
  const m7Correct = quizSteps.filter(s => quizResults[s.id] === true).length;
  const m7Total = quizSteps.length;
  const m7Pct = m7Total > 0 ? (m7Correct / m7Total) * 100 : 0;

  // Build per-module rows
  const rows = MODULE_WEIGHTS.map(({ id, title, weight }) => {
    if (id === 7) {
      return { id, title, weight, correct: m7Correct, total: m7Total, pct: m7Pct };
    }
    const score = getAllModuleScores?.(id);
    const correct = score?.correct ?? 0;
    const total = score?.total ?? 0;
    const pct = total > 0 ? (correct / total) * 100 : 0;
    return { id, title, weight, correct, total, pct };
  });

  // Compute weighted composite
  const composite = rows.reduce((sum, row) => sum + row.pct * row.weight, 0);
  const compositeRounded = Math.round(composite);

  useEffect(() => {
    onComplete();

    // Submit scores to Google Sheets (once)
    if (!hasSubmitted.current) {
      hasSubmitted.current = true;
      const email = getStoredEmail();
      if (email) {
        submitScoresToSheet({
          email,
          compositeScore: compositeRounded,
          modules: rows.map(r => ({
            moduleId: r.id,
            title: r.title,
            correct: r.correct,
            total: r.total,
            percent: Math.round(r.pct),
            weight: r.weight,
          })),
          submittedAt: new Date().toISOString(),
        });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <CardHeader className='text-center'>
        <div className='mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-primary/10'>
          <Trophy className='size-8 text-primary' weight='fill' />
        </div>
        <CardTitle className='text-xl'>Assessment Results</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Composite score */}
        <div className='text-center'>
          <p className='text-4xl font-bold text-foreground'>{compositeRounded}%</p>
          <p className='mt-1 text-sm text-muted-foreground'>Weighted Composite Score</p>
        </div>

        <div className='mx-auto max-w-sm'>
          <div className='h-3 w-full overflow-hidden rounded-full bg-muted'>
            <div
              className={cn(
                'h-full rounded-full transition-all',
                compositeRounded >= 80
                  ? 'bg-emerald-500'
                  : compositeRounded >= 50
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
              )}
              style={{ width: `${compositeRounded}%` }}
            />
          </div>
        </div>

        {/* Per-module breakdown */}
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-foreground'>Score Breakdown</p>
          <div className='divide-y rounded-lg border'>
            {rows.map(row => {
              const pctRounded = Math.round(row.pct);
              const weightLabel = `${Math.round(row.weight * 100)}%`;
              return (
                <div key={row.id} className='flex items-center justify-between px-4 py-3 text-sm'>
                  <div className='flex flex-col'>
                    <span className='font-medium text-foreground'>{row.title}</span>
                    <span className='text-xs text-muted-foreground'>Weight: {weightLabel}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-muted-foreground'>
                      {row.correct}/{row.total}
                    </span>
                    <span
                      className={cn(
                        'min-w-[3rem] rounded-full px-2 py-0.5 text-center text-xs font-medium',
                        pctRounded >= 80
                          ? 'bg-emerald-100 text-emerald-700'
                          : pctRounded >= 50
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-rose-100 text-rose-700'
                      )}
                    >
                      {pctRounded}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
