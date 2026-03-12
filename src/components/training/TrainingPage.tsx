import { useState } from 'react';

import { CompletionScreen } from './CompletionScreen';
import { MODULES as CONTRIBUTOR_MODULES } from './data/modules-config';
import { REVIEWER_MODULES } from './data/reviewer/r-modules-config';
import { EmailGate, getStoredEmail } from './EmailGate';
import { ExamplesPanel } from './ExamplesPanel';
import { ModuleViewer, type ModuleWeight } from './ModuleViewer';
import { useReviewerTrainingProgress } from './shared/useReviewerTrainingProgress';
import { useTrainingProgress } from './shared/useTrainingProgress';
import { getModuleSteps } from './steps';
import { getReviewerModuleSteps } from './steps/reviewer-index';
import { TrainingHome } from './TrainingHome';
import { TrainingSidebar } from './TrainingSidebar';

type TrainingView = 'email' | 'home' | 'contributor-modules' | 'reviewer-modules';

const REVIEWER_MODULE_WEIGHTS: ModuleWeight[] = [
  { id: 1, title: 'Introduction', weight: 0.05 },
  { id: 2, title: 'Reviewer Workflow', weight: 0.05 },
  { id: 3, title: 'Evaluating Spreadsheets', weight: 0.05 },
  { id: 4, title: 'Evaluating Prompts', weight: 0.05 },
  { id: 5, title: 'Evaluating Rubrics', weight: 0.05 },
  { id: 6, title: 'Providing Feedback', weight: 0.05 },
  { id: 7, title: 'Final Assessment', weight: 0.70 },
];

export function TrainingPage() {
  // Contributor progress
  const contributor = useTrainingProgress();
  // Reviewer progress
  const reviewer = useReviewerTrainingProgress();

  const [view, setView] = useState<TrainingView>(
    getStoredEmail() ? 'home' : 'email'
  );
  const [showExamples, setShowExamples] = useState(false);

  if (view === 'email') {
    return <EmailGate onSubmit={() => setView('home')} />;
  }

  if (view === 'home') {
    if (contributor.isAllComplete) {
      return <CompletionScreen onReviewModules={() => setView('contributor-modules')} />;
    }
    return (
      <TrainingHome
        onStartTraining={() => setView('contributor-modules')}
        onStartReviewerTraining={() => setView('reviewer-modules')}
      />
    );
  }

  // Contributor modules view
  if (view === 'contributor-modules') {
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
          onGoHome={() => setView('home')}
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
            onTrainingComplete={() => setView('home')}
          />
        </main>

        {showExamples && (
          <ExamplesPanel onClose={() => setShowExamples(false)} />
        )}
      </div>
    );
  }

  // Reviewer modules view
  const reviewerSteps = getReviewerModuleSteps(reviewer.viewingModule);
  const reviewerModuleConfig = REVIEWER_MODULES.find(m => m.id === reviewer.viewingModule);

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
        onGoHome={() => setView('home')}
      />

      <main className='flex-1 overflow-hidden'>
        <ModuleViewer
          moduleId={reviewer.viewingModule}
          moduleConfig={reviewerModuleConfig!}
          steps={reviewerSteps}
          currentStepIndex={reviewer.viewingStepIndex}
          maxStepIndex={reviewer.isViewingReview ? reviewerSteps.length - 1 : reviewer.progress.currentStepIndex}
          isReviewMode={reviewer.isViewingReview}
          isLastModule={reviewer.viewingModule === 7}
          isFinalAssessment={reviewer.viewingModule === 7}
          storageKeyPrefix='tsip-reviewer'
          moduleWeights={REVIEWER_MODULE_WEIGHTS}
          onAdvance={reviewer.advanceStep}
          onBack={reviewer.goBackStep}
          onGoToStep={reviewer.goToStep}
          onModuleComplete={(score) => reviewer.saveModuleScore(reviewer.viewingModule, score)}
          savedQuizAnswers={reviewer.getQuizAnswers(reviewer.viewingModule)}
          onSaveQuizAnswers={(answers) => reviewer.saveQuizAnswers(reviewer.viewingModule, answers)}
          getAllModuleScores={reviewer.getModuleScore}
          onTrainingComplete={() => setView('home')}
        />
      </main>
    </div>
  );
}
