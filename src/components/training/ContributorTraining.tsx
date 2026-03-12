import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MODULES as CONTRIBUTOR_MODULES } from './data/modules-config';
import { ExamplesPanel } from './ExamplesPanel';
import { ModuleViewer } from './ModuleViewer';
import { useTrainingProgress } from './shared/useTrainingProgress';
import { getModuleSteps } from './steps';
import { TrainingSidebar } from './TrainingSidebar';

export function ContributorTraining() {
  const navigate = useNavigate();
  const contributor = useTrainingProgress();
  const [showExamples, setShowExamples] = useState(false);

  const steps = getModuleSteps(contributor.viewingModule);
  const moduleConfig = CONTRIBUTOR_MODULES.find(m => m.id === contributor.viewingModule);

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
          onTrainingComplete={() => navigate('/')}
          onRetakeAssessment={() => contributor.resetCurrentModule()}
        />
      </main>

      {showExamples && (
        <ExamplesPanel onClose={() => setShowExamples(false)} />
      )}
    </div>
  );
}
