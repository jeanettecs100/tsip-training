import { useState } from 'react';

import { CompletionScreen } from './CompletionScreen';
import { EmailGate, getStoredEmail } from './EmailGate';
import { ExamplesPanel } from './ExamplesPanel';
import { ModuleViewer } from './ModuleViewer';
import { useTrainingProgress } from './shared/useTrainingProgress';
import { getModuleSteps } from './steps';
import { TrainingHome } from './TrainingHome';
import { TrainingSidebar } from './TrainingSidebar';

type TrainingView = 'email' | 'home' | 'modules';

export function TrainingPage() {
  const {
    progress,
    viewingModule,
    viewingStepIndex,
    isViewingReview,
    getModuleStatus,
    getModuleScore,
    advanceStep,
    goBackStep,
    goToStep,
    goToModule,
    saveModuleScore,
    saveQuizAnswers,
    getQuizAnswers,
    isAllComplete,
  } = useTrainingProgress();

  const [view, setView] = useState<TrainingView>(
    getStoredEmail() ? 'home' : 'email'
  );
  const [showExamples, setShowExamples] = useState(false);

  if (view === 'email') {
    return <EmailGate onSubmit={() => setView('home')} />;
  }

  if (view === 'home') {
    if (isAllComplete) {
      return <CompletionScreen onReviewModules={() => setView('modules')} />;
    }
    return <TrainingHome onStartTraining={() => setView('modules')} />;
  }

  const steps = getModuleSteps(viewingModule);

  return (
    <div className='flex h-screen flex-col bg-gray-50 md:flex-row'>
      <TrainingSidebar
        getModuleStatus={getModuleStatus}
        getModuleScore={getModuleScore}
        currentModule={progress.currentModule}
        viewingModule={viewingModule}
        completedCount={progress.completedModules.length}
        onModuleClick={goToModule}
        onShowExamples={() => setShowExamples(true)}
        onGoHome={() => setView('home')}
      />

      <main className='flex-1 overflow-hidden'>
        <ModuleViewer
          moduleId={viewingModule}
          steps={steps}
          currentStepIndex={viewingStepIndex}
          maxStepIndex={isViewingReview ? steps.length - 1 : progress.currentStepIndex}
          isReviewMode={isViewingReview}
          onAdvance={advanceStep}
          onBack={goBackStep}
          onGoToStep={goToStep}
          onModuleComplete={(score) => saveModuleScore(viewingModule, score)}
          savedQuizAnswers={getQuizAnswers(viewingModule)}
          onSaveQuizAnswers={(answers) => saveQuizAnswers(viewingModule, answers)}
          getAllModuleScores={getModuleScore}
        />
      </main>

      {showExamples && (
        <ExamplesPanel onClose={() => setShowExamples(false)} />
      )}
    </div>
  );
}
