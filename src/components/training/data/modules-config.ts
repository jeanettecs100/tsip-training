import type { ModuleConfig } from '../shared/types';

export const MODULES: ModuleConfig[] = [
  {
    id: 1,
    title: 'Introduction',
    description:
      'Learn what TSIP is, your role on the platform, and how the workflow operates.',
    iconName: 'RocketLaunch',
    slug: 'introduction',
  },
  {
    id: 2,
    title: 'Spreadsheet Tasks',
    description:
      'Understand how spreadsheet quality is evaluated across five key dimensions.',
    iconName: 'Table',
    slug: 'spreadsheet-tasks',
  },
  {
    id: 3,
    title: 'Prompt Writing',
    description:
      'Master the art of writing clear, detailed prompts that challenge AI models.',
    iconName: 'PencilSimple',
    slug: 'prompt-writing',
  },
  {
    id: 4,
    title: 'Rubric Writing',
    description:
      'Learn to write precise, testable evaluation criteria for grading AI outputs.',
    iconName: 'ListChecks',
    slug: 'rubric-writing',
  },
  {
    id: 5,
    title: 'Platform Navigation',
    description:
      'Get familiar with the TSIP dashboard, task workflow, and submission process.',
    iconName: 'Compass',
    slug: 'platform-navigation',
  },
  {
    id: 6,
    title: 'Practice Task',
    description:
      'Practice filling out a real task submission in a safe sandbox environment.',
    iconName: 'Trophy',
    slug: 'practice-task',
  },
  {
    id: 7,
    title: 'Final Assessment',
    description:
      'Put your knowledge to the test with realistic scenarios and a final assessment.',
    iconName: 'Exam',
    slug: 'final-assessment',
  },
];
