import { useNavigate } from 'react-router-dom';

import { REVIEWER_MODULES } from './data/reviewer/r-modules-config';
import { ModuleViewer, type ModuleWeight } from './ModuleViewer';
import { useReviewerTrainingProgress } from './shared/useReviewerTrainingProgress';
import { getReviewerModuleSteps } from './steps/reviewer-index';
import { TrainingSidebar } from './TrainingSidebar';

const REVIEWER_MODULE_WEIGHTS: ModuleWeight[] = [
  { id: 1, title: 'Introduction', weight: 0.05 },
  { id: 2, title: 'Reviewer Workflow', weight: 0.05 },
  { id: 3, title: 'Evaluating Spreadsheets', weight: 0.05 },
  { id: 4, title: 'Evaluating Prompts', weight: 0.05 },
  { id: 5, title: 'Evaluating Rubrics', weight: 0.05 },
  { id: 6, title: 'Providing Feedback', weight: 0.05 },
  { id: 7, title: 'Final Assessment', weight: 0.70 },
];

export function ReviewerTraining() {
  const navigate = useNavigate();
  const reviewer = useReviewerTrainingProgress();

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
          onTrainingComplete={() => navigate('/')}
          onRetakeAssessment={() => reviewer.resetCurrentModule()}
        />
      </main>
    </div>
  );
}
