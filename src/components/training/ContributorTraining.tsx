import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { MODULES as CONTRIBUTOR_MODULES } from './data/modules-config';
import { ExamplesPanel } from './ExamplesPanel';
import { ModuleViewer } from './ModuleViewer';
import {
  getContributorModuleSlug,
  getStepSlugByIndex,
  resolveContributorModuleSlug,
  resolveStepSlug,
} from './shared/slug-utils';
import { useTrainingProgress } from './shared/useTrainingProgress';
import { getModuleSteps } from './steps';
import { TrainingSidebar } from './TrainingSidebar';

function useResolvedParams() {
  const { moduleSlug, stepSlug } = useParams();
  if (!moduleSlug) return {};
  const moduleId = resolveContributorModuleSlug(moduleSlug);
  if (!moduleId) return {};
  if (!stepSlug) return { moduleId };
  const stepIndex = resolveStepSlug('contributor', moduleId, stepSlug);
  return { moduleId, stepIndex: stepIndex >= 0 ? stepIndex : undefined };
}

export function ContributorTraining() {
  const navigate = useNavigate();
  const resolved = useResolvedParams();

  const contributor = useTrainingProgress(resolved.moduleId, resolved.stepIndex);

  if (localStorage.getItem('tsip-contributor-unlocked') !== 'true') {
    return <Navigate to="/" replace />;
  }

  const [showExamples, setShowExamples] = useState(false);

  const steps = getModuleSteps(contributor.viewingModule);
  const moduleConfig = CONTRIBUTOR_MODULES.find(m => m.id === contributor.viewingModule);

  // Keep URL in sync with viewing state
  const isFirstRender = useRef(true);
  useEffect(() => {
    // Skip the first render to avoid overwriting the URL that brought us here
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // If no URL params were provided, set the URL to match current progress
      if (!resolved.moduleId) {
        const mSlug = getContributorModuleSlug(contributor.viewingModule);
        const sSlug = getStepSlugByIndex('contributor', contributor.viewingModule, contributor.viewingStepIndex);
        navigate(`/contributor/${mSlug}/${sSlug}`, { replace: true });
      }
      return;
    }
    const mSlug = getContributorModuleSlug(contributor.viewingModule);
    const sSlug = getStepSlugByIndex('contributor', contributor.viewingModule, contributor.viewingStepIndex);
    navigate(`/contributor/${mSlug}/${sSlug}`, { replace: true });
  }, [contributor.viewingModule, contributor.viewingStepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex h-screen flex-col bg-gray-50 md:flex-row'>
      <TrainingSidebar
        getModuleStatus={contributor.getModuleStatus}
        getModuleScore={contributor.getModuleScore}
        currentModule={contributor.progress.currentModule}
        viewingModule={contributor.viewingModule}
        completedCount={contributor.progress.completedModules.length}
        onModuleClick={contributor.goToModule}
        onShowExamples={() => setShowExamples(true)}
        onGoHome={() => navigate('/')}
      />

      <main className='flex-1 overflow-hidden'>
        <ModuleViewer
          moduleId={contributor.viewingModule}
          moduleConfig={moduleConfig!}
          steps={steps}
          currentStepIndex={contributor.viewingStepIndex}
          maxStepIndex={contributor.isViewingReview ? steps.length - 1 : contributor.progress.currentStepIndex}
          isReviewMode={contributor.isViewingReview}
          isLastModule={contributor.viewingModule === 7}
          isFinalAssessment={contributor.viewingModule === 7}
          onAdvance={contributor.advanceStep}
          onBack={contributor.goBackStep}
          onGoToStep={contributor.goToStep}
          onModuleComplete={(score) => contributor.saveModuleScore(contributor.viewingModule, score)}
          savedQuizAnswers={contributor.getQuizAnswers(contributor.viewingModule)}
          onSaveQuizAnswers={(answers) => contributor.saveQuizAnswers(contributor.viewingModule, answers)}
          getAllModuleScores={contributor.getModuleScore}
          getAllQuizAnswers={contributor.getQuizAnswers}
          onSaveQuizResults={(results) => contributor.saveQuizResults(contributor.viewingModule, results)}
          getAllQuizResults={contributor.getQuizResults}
          onTrainingComplete={() => navigate('/contributor/complete')}
          onRetakeAssessment={() => contributor.resetCurrentModule()}
        />
      </main>

      {showExamples && (
        <ExamplesPanel onClose={() => setShowExamples(false)} />
      )}
    </div>
  );
}
