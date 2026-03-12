import type { ModuleConfig } from '../../shared/types';

export const REVIEWER_MODULES: ModuleConfig[] = [
  {
    id: 1,
    title: 'Introduction',
    description:
      'Understand the reviewer role, quality expectations, and what it means to uphold our standards.',
    iconName: 'RocketLaunch',
  },
  {
    id: 2,
    title: 'Reviewer Workflow',
    description:
      'Learn the step-by-step review process from claiming a task to submitting your evaluation.',
    iconName: 'Compass',
  },
  {
    id: 3,
    title: 'Evaluating Spreadsheets',
    description:
      'Learn the five yes/no checklist items used to evaluate spreadsheet quality.',
    iconName: 'Table',
  },
  {
    id: 4,
    title: 'Evaluating Prompts',
    description:
      'Learn the five yes/no checklist items used to evaluate prompt quality.',
    iconName: 'PencilSimple',
  },
  {
    id: 5,
    title: 'Evaluating Rubrics',
    description:
      'Learn the six yes/no checklist items used to evaluate rubric quality.',
    iconName: 'ListChecks',
  },
  {
    id: 6,
    title: 'Providing Feedback',
    description:
      'Learn to write clear, actionable feedback that helps contributors improve their work.',
    iconName: 'Trophy',
  },
  {
    id: 7,
    title: 'Final Assessment',
    description:
      'Put your reviewer knowledge to the test with a comprehensive assessment.',
    iconName: 'Exam',
  },
];
