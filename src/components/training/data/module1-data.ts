import type { Step } from '../shared/types';

export const module1Steps: Step[] = [
  {
    type: 'content',
    id: 'm1-welcome',
    title: 'Welcome to TSIP',
    body: 'TSIP (The Spreadsheet Intelligence Project) is a collaborative platform where finance professionals build rigorous spreadsheet challenges designed to advance AI capabilities. Your hands-on expertise in financial modeling, valuation, and analysis is the driving force behind how these models learn.',
    callout: {
      type: 'tip',
      text: 'What makes this initiative powerful is your professional judgment. AI systems need exposure to practitioner-grade work to improve — your contributions are the starting point for that process.',
    },
  },
  {
    type: 'content',
    id: 'm1-role',
    title: 'Your Role on TSIP',
    body: 'As a TSIP contributor, your job is to design tasks that push AI models beyond their current abilities. Each task requires you to deliver four interconnected components:',
    bullets: [
      'An Input Spreadsheet — the Excel model in its initial state before the task is completed',
      'A Prompt — the set of instructions outlining the context, inputs, and goal of the spreadsheet task',
      'An Output Spreadsheet — the finished Excel that represents a realistic "version up" of the model',
      'An Evaluation Rubric — scoring criteria with associated point values to quantitatively assess an LLM\'s ability to produce the desired output',
    ],
    callout: {
      type: 'info',
      text: 'Target a minimum of one hour of focused effort for a competent associate to complete each task. The goal is meaningful, in-depth work — not surface-level exercises.',
    },
  },
  {
    type: 'content',
    id: 'm1-workflow',
    title: 'How the Workflow Operates',
    body: 'Each TSIP task moves through a defined sequence of stages. Familiarity with this pipeline helps you produce stronger submissions and navigate the system with confidence.',
    bullets: [
      'Task claim — claim a seed workbook from your TSIP dashboard',
      'Create input/output spreadsheets — audit seed for errors, think through a realistic v1 → v2 progression, and create the associated input/output spreadsheets',
      'Write prompt — write clear instructions for reproducing your output',
      'Create evaluation rubric — write rubric criteria and assign point values based on relative importance of each criterion',
      'Assign complexity — tag your task as Basic, Intermediate, or Advanced based on the complexity criteria',
      'Submit and claim additional tasks for the seed workbook — submit task for review and indicate whether you would like another task with the same seed workbook (max of 7 tasks / seed)',
      'Revise upon receipt of reviewer feedback — if a task reappears on your dashboard, implement the feedback provided',
    ],
  },
  {
    type: 'content',
    id: 'm1-quality',
    title: 'Quality Expectations',
    body: 'The purpose of TSIP is to generate benchmark data for tasks that AI models currently handle poorly. That means your challenges must be authentically difficult, and your finished outputs must reflect the standard you would hold for client-facing work.',
    bullets: [
      '+ Multi-step: Demand several connected stages of analysis',
      '+ Substantive: Require roughly 1+ hours of dedicated effort from a capable associate',
      '+ Original: Conceived entirely by you, not adapted from provided samples or previous tasks',
      '+ Natural: Reads the way a senior finance professional would actually assign the work',
      '- Relies on proprietary or restricted information',
      '- Too straightforward (task could be completed in under 1 hour)',
      '- Directions are unclear or open to multiple interpretations',
      '- Borrowed from onboarding materials or external references',
    ],
    callout: {
      type: 'danger',
      text: 'AI-generated work is strictly prohibited. All submissions must be entirely your own original work. We run AI-detection checks on every task submission, and any spreadsheet task or written task component flagged as AI-generated — whether fully or partially — will result in immediate offboarding from the TSIP platform with no exceptions.',
    },
  },
  {
    type: 'matching',
    id: 'm1-match-task-elements',
    instruction: 'Match each task element to its description',
    pairs: [
      {
        term: 'Prompt',
        definition: 'The set of instructions outlining the context, inputs, and goal of the spreadsheet task',
      },
      {
        term: 'Input Spreadsheet',
        definition: 'The Excel model in its initial state before the task is completed',
      },
      {
        term: 'Output Spreadsheet',
        definition: 'The finished Excel that represents a realistic "version up" of the model',
      },
      {
        term: 'Evaluation Rubric',
        definition: 'scoring criteria with associated point values to quantitatively assess an LLM\'s ability to produce the desired output',
      },
    ],
  },
  {
    type: 'multiple-choice',
    id: 'm1-quiz-purpose',
    question: 'What is the primary purpose of TSIP?',
    options: [
      'To produce expert-grade training data that helps AI learn difficult financial tasks',
      'To streamline day-to-day investment banking operations',
      'To benchmark how well current AI tools perform on finance problems',
      'To connect freelance finance professionals with project-based work',
    ],
    correctIndex: 0,
    explanation:
      'TSIP is built to generate training data. The expert-level challenges you create teach AI models how to tackle sophisticated financial work that is beyond their current reach.',
  },
  {
    type: 'scenario',
    id: 'm1-scenario-workflow',
    scenario:
      'You have claimed and audited a seed workbook. It seems like a reasonable "version up" of the model would be to add the merger analysis tab.',
    question: 'What should you do next?',
    options: [
      'Begin writing the prompt by providing context and analytical objective of the task',
      'Create the input spreadsheet by stripping out the merger analysis tab and removing downstream dependencies',
      'Claim additional empty tasks for the seed workbook',
      'Outline rubric criteria and point values',
    ],
    correctIndex: 1,
    explanation:
      'Before writing a prompt or rubric, you need the input spreadsheet — the seed workbook without the merger analysis tab and any downstream dependencies. Without this starting file, you have nothing concrete to anchor the prompt or evaluate the output against.',
  },
];
