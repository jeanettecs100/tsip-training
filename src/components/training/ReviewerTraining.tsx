import { useEffect, useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { REVIEWER_MODULES } from './data/reviewer/r-modules-config';
import { ModuleViewer, type ModuleWeight } from './ModuleViewer';
import {
  getReviewerModuleSlug,
  getStepSlugByIndex,
  resolveReviewerModuleSlug,
  resolveStepSlug,
} from './shared/slug-utils';
import { useReviewerTrainingProgress } from './shared/useReviewerTrainingProgress';
import { getReviewerModuleSteps } from './steps/reviewer-index';
import { TrainingSidebar } from './TrainingSidebar';

const REVIEWER_MODULE_WEIGHTS: ModuleWeight[] = [
  { id: 1, title: 'Introduction', weight: 0 },
  { id: 2, title: 'Reviewer Workflow', weight: 0.05 },
  { id: 3, title: 'Evaluating Spreadsheets', weight: 0.05 },
  { id: 4, title: 'Evaluating Prompts', weight: 0.05 },
  { id: 5, title: 'Evaluating Rubrics', weight: 0.05 },
  { id: 6, title: 'Final Assessment', weight: 0.80 },
];

function useResolvedParams() {
  const { moduleSlug, stepSlug } = useParams();
  if (!moduleSlug) return {};
  const moduleId = resolveReviewerModuleSlug(moduleSlug);
  if (!moduleId) return {};
  if (!stepSlug) return { moduleId };
  const stepIndex = resolveStepSlug('reviewer', moduleId, stepSlug);
  return { moduleId, stepIndex: stepIndex >= 0 ? stepIndex : undefined };
}

export function ReviewerTraining() {
  const navigate = useNavigate();
  const resolved = useResolvedParams();

  const reviewer = useReviewerTrainingProgress(resolved.moduleId, resolved.stepIndex);

  if (localStorage.getItem('tsip-reviewer-unlocked') !== 'true') {
    return <Navigate to="/" replace />;
  }

  const reviewerSteps = getReviewerModuleSteps(reviewer.viewingModule);
  const reviewerModuleConfig = REVIEWER_MODULES.find(m => m.id === reviewer.viewingModule);

  // Keep URL in sync with viewing state
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!resolved.moduleId) {
        const mSlug = getReviewerModuleSlug(reviewer.viewingModule);
        const sSlug = getStepSlugByIndex('reviewer', reviewer.viewingModule, reviewer.viewingStepIndex);
        navigate(`/reviewer/${mSlug}/${sSlug}`, { replace: true });
      }
      return;
    }
    const mSlug = getReviewerModuleSlug(reviewer.viewingModule);
    const sSlug = getStepSlugByIndex('reviewer', reviewer.viewingModule, reviewer.viewingStepIndex);
    navigate(`/reviewer/${mSlug}/${sSlug}`, { replace: true });
  }, [reviewer.viewingModule, reviewer.viewingStepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex h-screen flex-col bg-gray-50 md:flex-row'>
      <TrainingSidebar
        modules={REVIEWER_MODULES}
        title='Reviewer Training'
        getModuleStatus={reviewer.getModuleStatus}
        getModuleScore={reviewer.getModuleScore}
        currentModule={reviewer.progress.currentModule}
        viewingModule={reviewer.viewingModule}
        completedCount={reviewer.progress.completedModules.length}
        onModuleClick={reviewer.goToModule}
        onGoHome={() => navigate('/')}
      />

      <main className='flex-1 overflow-hidden'>
        <ModuleViewer
          moduleId={reviewer.viewingModule}
          moduleConfig={reviewerModuleConfig!}
          steps={reviewerSteps}
          currentStepIndex={reviewer.viewingStepIndex}
          maxStepIndex={reviewer.isViewingReview ? reviewerSteps.length - 1 : reviewer.progress.currentStepIndex}
          isReviewMode={reviewer.isViewingReview}
          isLastModule={reviewer.viewingModule === 6}
          isFinalAssessment={reviewer.viewingModule === 6}
          storageKeyPrefix='tsip-reviewer'
          moduleWeights={REVIEWER_MODULE_WEIGHTS}
          onAdvance={reviewer.advanceStep}
          onBack={reviewer.goBackStep}
          onGoToStep={reviewer.goToStep}
          onModuleComplete={(score) => reviewer.saveModuleScore(reviewer.viewingModule, score)}
          savedQuizAnswers={reviewer.getQuizAnswers(reviewer.viewingModule)}
          onSaveQuizAnswers={(answers) => reviewer.saveQuizAnswers(reviewer.viewingModule, answers)}
          getAllModuleScores={reviewer.getModuleScore}
          getAllQuizAnswers={reviewer.getQuizAnswers}
          onSaveQuizResults={(results) => reviewer.saveQuizResults(reviewer.viewingModule, results)}
          getAllQuizResults={reviewer.getQuizResults}
          onTrainingComplete={() => navigate('/reviewer/complete')}
          onRetakeAssessment={() => reviewer.resetCurrentModule()}
        />
      </main>
    </div>
  );
}
