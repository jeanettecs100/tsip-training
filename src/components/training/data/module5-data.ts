import type { Step } from '../shared/types';

export const module5Steps: Step[] = [
  {
    type: 'content',
    id: 'm5-intro',
    title: 'Navigating the TSIP Platform',
    body: 'With a solid grasp of the quality benchmarks for spreadsheets, prompts, and rubrics, you are ready to learn how the TSIP platform works in practice. This module walks you through every stage — from picking up tasks to receiving payment.',
  },
  {
    type: 'dashboard-preview',
    id: 'm5-dashboard',
    title: 'Your Dashboard',
    body: 'Once you log in, you arrive at your personal dashboard — the central hub of your TSIP experience. Here you can view assignments in progress, review finished submissions, and spot any items that need your attention. Explore the preview below to see how the dashboard is organized.',
    callout: {
      type: 'info',
      text: 'The tabs at the top let you switch between Action Required (in progress tasks), Available (open assignments to claim), and Completed (finished submissions).',
    },
  },
  {
    type: 'content',
    id: 'm5-picking-tasks',
    title: 'Picking Up Tasks',
    body: 'You will be able to pick up tasks when there are available seed workbooks. Once you claim a task, please complete the end-to-end workflow on the TSIP platform — working through only one task at a time. Upon submission, you will be able to claim another task on the same workbook if available.',
    callout: {
      type: 'warning',
      text: 'A maximum of 7 tasks can be generated on a single seed workbook. You will not always be the only contributor working on a given seed workbook, so additional empty tasks will only be available to you if the cap has not yet been hit.',
    },
  },
  {
    type: 'task-form-preview',
    id: 'm5-submitting',
    title: 'Submitting Your Work',
    body: 'When your work is ready, upload your spreadsheets and complete every required field in the task form. The form contains fields for all task elements — file upload, prompt composition, and rubric writing. Explore the preview below to see how a completed submission looks.',
    mode: 'readonly',
    callout: {
      type: 'warning',
      text: 'Various warnings and error messages may appear as you complete each task element. Review these messages — all applicable flags must be addressed or your task will be sent back for revisions. Certain errors will completely block you from submission and others are dismissable if they do not apply to your task.',
    },
  },
  {
    type: 'content',
    id: 'm5-reviews',
    title: 'Understanding Review Feedback',
    body: 'Once you submit, a reviewer assesses your work. You will receive one of three results: approved (the task moves to the completed queue), revisions needed (you will see targeted feedback explaining what to fix), or cancelled (the task is withdrawn, usually due to fundamental problems).',
    callout: {
      type: 'tip',
      text: 'When revisions are requested, review the feedback thoroughly. Reviewers leave precise, actionable comments. Make sure you resolve every noted issue before resubmitting.',
    },
    note: 'After your task is assessed by a reviewer and any feedback provided is implemented, you may still receive a task back to make further changes when the task gets sent through the final quality assurance (\u201CQA\u201D) process. In this stage, the task undergoes a series of auto-checks and manual reviews by the TSIP team to ensure all requirements and data quality standards are met.',
  },
  {
    type: 'content',
    id: 'm5-payouts',
    title: 'Payments',
    body: 'You receive compensation for every approved deliverable. Below are answers to the most common payment questions.',
    table: {
      headers: ['Question', 'Answer'],
      rows: [
        ['How do I get paid?', 'Payments are made via PayPal using the email you provided during onboarding.'],
        ['When do payments occur?', 'Payments are processed at least twice per month. Exact timing may vary based on review completion and payment processing cycles.'],
        ['What do "In Review," "Awaiting Payout," and "Earned" mean?', 'In Review: submitted but not yet approved. Awaiting Payout: approved and queued for payment. Earned: total approved earnings to date.'],
        ['Do revisions delay payment?', 'Payment is issued once a task is fully approved. Promptly addressing feedback helps avoid delays.'],
        ['What if my PayPal information changes?', 'Email the TSIP team so your PayPal information can be updated before the next payment run.'],
      ],
    },
  },
  {
    type: 'ordering',
    id: 'm5-order-task-flow',
    instruction:
      'Arrange these task lifecycle stages in the proper sequence',
    items: [
      'Claim a seed workbook from the queue',
      'Create and upload input and output spreadsheets',
      'Write your prompt',
      'Write your rubric',
      'Assign a complexity level for your task',
      'Submit task for review',
      'A reviewer assesses your submission',
      'Task is marked as complete (or revisions are requested)',
    ],
  },
  {
    type: 'scenario',
    id: 'm5-scenario-rejected',
    scenario:
      'You submitted a task and received a "revisions needed" review. The reviewer pointed out that your rubric criteria are bundled (several checks packed into one criterion) and that your prompt omits critical input assumptions.',
    question: 'What should you do next?',
    options: [
      'Abandon this task and start a fresh one — the fixes are not worth the effort',
      'Act on the reviewer\u2019s feedback: separate the bundled criteria into individual items and incorporate the missing assumptions, then resubmit',
      'Respond to the reviewer to justify why your original approach is correct',
    ],
    correctIndex: 1,
    explanation:
      'When revisions are requested, you should resolve every issue the reviewer identified. Split bundled criteria into standalone atomic checks and add the omitted input assumptions to your prompt, then resubmit the updated work.',
  },
];
