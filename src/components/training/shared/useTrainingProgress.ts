import { useCallback, useState } from 'react';

import type { ModuleId, ModuleScore, ModuleStatus, QuizAnswerMap, TrainingProgress } from './types';

const STORAGE_KEY = 'tsip-training-progress';

const DEFAULT_PROGRESS: TrainingProgress = {
  completedModules: [],
  currentModule: 1,
  currentStepIndex: 0,
};

function loadProgress(): TrainingProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as TrainingProgress;
    }
  } catch {
    // Ignore parse errors, return default
  }
  return DEFAULT_PROGRESS;
}

function persistProgress(progress: TrainingProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useTrainingProgress() {
  const [progress, setProgress] = useState<TrainingProgress>(loadProgress);

  // Viewing state is ephemeral — tracks what module/step the user is looking at.
  // This can differ from persisted progress when reviewing a completed module.
  const [viewingModule, setViewingModule] = useState<ModuleId>(
    progress.currentModule
  );
  const [viewingStepIndex, setViewingStepIndex] = useState(
    progress.currentStepIndex
  );

  // Functional updater — each call sees the latest state, avoiding stale closures
  const updateProgress = useCallback(
    (updater: (prev: TrainingProgress) => TrainingProgress) => {
      setProgress(prev => {
        const next = updater(prev);
        persistProgress(next);
        return next;
      });
    },
    []
  );

  // Status is always derived from persisted progress, not viewing state
  const getModuleStatus = useCallback(
    (moduleId: ModuleId): ModuleStatus => {
      if (progress.completedModules.includes(moduleId)) return 'completed';
      if (moduleId === progress.currentModule) return 'current';
      return 'locked';
    },
    [progress]
  );

  const isViewingReview = progress.completedModules.includes(viewingModule);

  const advanceStep = useCallback(
    (totalSteps: number) => {
      const nextIndex = viewingStepIndex + 1;

      // Reviewing a completed module — navigate without touching progress
      if (isViewingReview) {
        if (nextIndex < totalSteps) {
          setViewingStepIndex(nextIndex);
        } else {
          // Done reviewing — return to in-progress module
          setViewingModule(progress.currentModule);
          setViewingStepIndex(progress.currentStepIndex);
        }
        return;
      }

      // Normal progression on the current in-progress module
      if (nextIndex < totalSteps) {
        // Only advance the high-water mark, never regress it
        updateProgress(prev => ({
          ...prev,
          currentStepIndex: Math.max(prev.currentStepIndex, nextIndex),
        }));
        setViewingStepIndex(nextIndex);
      } else {
        // Complete this module and advance
        updateProgress(prev => {
          const alreadyCompleted = prev.completedModules.includes(
            prev.currentModule
          );
          const completedModules = alreadyCompleted
            ? prev.completedModules
            : ([
                ...prev.completedModules,
                prev.currentModule,
              ] as ModuleId[]);

          if (prev.currentModule < 7) {
            const nextModule = (prev.currentModule + 1) as ModuleId;
            return {
              ...prev,
              completedModules,
              currentModule: nextModule,
              currentStepIndex: 0,
            };
          } else {
            return {
              ...prev,
              completedModules,
              currentModule: 7 as ModuleId,
              currentStepIndex: totalSteps - 1,
            };
          }
        });

        // Update viewing state
        if (progress.currentModule < 7) {
          const nextModule = (progress.currentModule + 1) as ModuleId;
          setViewingModule(nextModule);
          setViewingStepIndex(0);
        }
      }
    },
    [progress, viewingStepIndex, isViewingReview, updateProgress]
  );

  const goBackStep = useCallback(() => {
    if (viewingStepIndex > 0) {
      setViewingStepIndex(viewingStepIndex - 1);
    }
  }, [viewingStepIndex]);

  const goToStep = useCallback(
    (stepIndex: number, totalSteps: number) => {
      if (stepIndex >= 0 && stepIndex < totalSteps) {
        setViewingStepIndex(stepIndex);
        if (!isViewingReview) {
          // Only advance the high-water mark, never regress it
          updateProgress(prev => ({
            ...prev,
            currentStepIndex: Math.max(prev.currentStepIndex, stepIndex),
          }));
        }
      }
    },
    [isViewingReview, updateProgress]
  );

  const goToModule = useCallback(
    (moduleId: ModuleId) => {
      const status = getModuleStatus(moduleId);
      if (status === 'locked') return;

      setViewingModule(moduleId);

      if (status === 'completed') {
        setViewingStepIndex(0);
      } else {
        setViewingStepIndex(progress.currentStepIndex);
      }
    },
    [progress, getModuleStatus]
  );

  const saveModuleScore = useCallback(
    (moduleId: ModuleId, score: ModuleScore) => {
      updateProgress(prev => ({
        ...prev,
        moduleScores: {
          ...prev.moduleScores,
          [moduleId]: score,
        },
      }));
    },
    [updateProgress]
  );

  const getModuleScore = useCallback(
    (moduleId: ModuleId): ModuleScore | undefined => {
      return progress.moduleScores?.[moduleId];
    },
    [progress]
  );

  const saveQuizAnswers = useCallback(
    (moduleId: ModuleId, answers: QuizAnswerMap) => {
      updateProgress(prev => ({
        ...prev,
        moduleQuizAnswers: {
          ...prev.moduleQuizAnswers,
          [moduleId]: answers,
        },
      }));
    },
    [updateProgress]
  );

  const getQuizAnswers = useCallback(
    (moduleId: ModuleId): QuizAnswerMap | undefined => {
      return progress.moduleQuizAnswers?.[moduleId];
    },
    [progress]
  );

  const isAllComplete = progress.completedModules.length === 7;

  return {
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
  };
}
