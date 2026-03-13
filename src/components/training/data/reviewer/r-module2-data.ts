import type { Step } from '../../shared/types';

export const reviewerModule2Steps: Step[] = [
  {
    type: 'content',
    id: 'r2-workflow-overview',
    title: 'Reviewer Workflow Overview',
    body: 'As a reviewer, you will evaluate four task elements: the input workbook, the output workbook, the prompt, and the rubric. For each component, you will go through a set of checklist items and mark each one that is satisfied. This approach ensures tasks are evaluated on a standardized basis and enforces our quality bar is met — all checklist criteria must be met in order to accept a task.',
    callout: {
      type: 'info',
      text: 'Your review is structured around deterministic checklists. For each component — spreadsheet, prompt, and rubric — you will mark each checklist item that is satisfied.',
    },
  },
  {
    type: 'checklist',
    id: 'r2-checklist-overview',
    title: 'The Review Checklists',
    body: 'The checklist for each task element is the core of your review — every item must be marked yes for the component to pass. Read through each item below and check it off to confirm you understand it.',
    groups: [
      {
        label: 'Spreadsheet Checklist',
        items: [
          'Data Integrity — No error values (#REF, #DIV/0, #N/A), no broken references, no external links (broken named ranges are acceptable so long as they do not cause cascading errors in the analysis)',
          'Formula Quality — Dynamic, auditable formulas with clearly separated assumptions; no or minimal hardcoded values in calculations',
          'Formatting — Clean, professional formatting with consistent number formats, fonts, and alignment',
          'Input-to-Output — Input and output form a logical, realistic progression with proper handling of downstream dependencies if a section is removed from the seed workbook',
        ],
      },
      {
        label: 'Prompt Checklist',
        items: [
          'Context & Analytical Objective — Explains the goal of the task and why the analysis is being done',
          'Assumptions & Input Data — All hardcoded values and data needed to build the model are provided',
          'Outputs Specified — Desired finished product is clearly defined and outputs are explicitly outlined',
          'Structure & Logic — Layout and calculation flow described without overspecifying common formula logic, Excel functions, or exact cell locations in the spreadsheet',
          'Prompt Style — Natural, human-written tone; free of LLM patterns',
        ],
      },
      {
        label: 'Rubric Checklist',
        items: [
          'Binary Clarity — Every criterion is answerable with a clear YES or NO',
          'Self-Contained — Evaluable using only the rubric and spreadsheet; no references to the prompt or other source',
          'Single-Check Principle — Each criterion tests exactly one thing; no bundling',
          'Category Coverage — All applicable categories are included with at least 4 criteria (Structural Completeness, Input Data Accuracy, Formula Correctness, Dynamic Functionality, Output Validation, Model Quality & Pitfalls)',
          'Weighting & Scoring — Points reflect relative importance; domain knowledge and complex logic weighted higher than secondary outputs and formatting',
          'Specific & Testable — Criteria check for specific and observable items, with tolerance intervals for all output validation checks; all criteria phrased as questions with question marks',
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-auto-checks',
    title: 'Auto-Check Flags',
    body: 'Before you begin your review, the platform runs automated checks on every submission. These auto-checks flag potential issues — warnings and errors — that help you focus your attention. Think of them as a head start on your checklist.',
    bullets: [
      'Blocking errors prevent submission until resolved — these are issues the contributor must fix before you even see the task',
      'Warnings highlight potential issues that may or may not apply to the specific task — you decide whether they are applicable and adjust your checklist response accordingly',
      'Dismissable blocking errors are more severe warnings that still may not apply to a specific task — the contributor must specifically select to dismiss and submit so pay close attention to these errors and determine whether they made the correct decision',
    ],
    sections: [
      {
        body: 'Auto-checks cover things like error values, hardcodes embedded in formulas, pre-linked blank cells, and AI-detection flags like suspicious spreadsheet author metadata and em dash usage.',
        callout: {
          type: 'warning',
          text: 'Auto-check flags do NOT replace your review — they supplement it. Never assume a clean auto-check report means the task is ready to approve.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-workflow-steps',
    title: 'Review Process: Step by Step',
    body: 'The review process follows three phases. For each phase, you work through the relevant checklist items and mark each one with a check if the condition is satisfied.',
    sections: [
      {
        body: 'Phase 1: Spreadsheet Audit',
        numberedList: {
          title: 'Steps 1–4',
          items: [
            'Download the input and output workbooks — verify the task area is blank or deleted in the input, and populated with the completed analysis in the output',
            'Check the input workbook for proper dependency handling — downstream outputs of the removed task section should either be deleted or replaced with hardcoded placeholder values, if appropriate',
            'Review any auto-check flags on the workbook and determine whether they must be resolved',
            'Go through the 4 spreadsheet checklist items and mark each one according to your review; if a criteria is not met, provide written feedback',
          ],
        },
        callout: {
          type: 'warning',
          text: 'Common Issues: the task represents an unrealistic input → output progression (e.g., hardcoded IRR value when the task is to build the returns calculation section), or the input workbook contains pre-linked blank cells in sections that were dependent on the removed analysis. Always check for these before moving on.',
        },
      },
      {
        body: 'Phase 2: Prompt Review',
        numberedList: {
          title: 'Steps 5–7',
          start: 5,
          items: [
            'Open the prompt side-by-side with the output workbook',
            'Review any auto-check flags on the prompt and determine whether they must be resolved. Remember to take AI pattern flags seriously and raise them to a TSIP team member if you\'re struggling to determine whether a prompt is human-written',
            'Go through the 5 prompt checklist items and mark each one according to your review; if a criteria is not met, provide written feedback',
          ],
        },
      },
      {
        body: 'Phase 3: Rubric Review & Submission',
        numberedList: {
          title: 'Steps 8–10',
          start: 8,
          items: [
            'Review the rubric against the output workbook — does it align with the newly-added analysis?',
            'Review any auto-check flags on the rubric and determine whether they must be resolved',
            'Go through the 6 rubric checklist items and mark each one according to your review; if a criteria is not met, provide written feedback',
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-direct-changes',
    title: 'Making Direct Changes',
    body: 'To keep the review process efficient, we expect reviewers to make minor edits directly to a task rather than sending it back for small fixes. If a change takes less than a few minutes and doesn\'t alter the fundamental design of the task, fix it yourself.',
    sections: [
      {
        body: 'Examples of changes you should make directly:',
        bullets: [
          'Deleting pre-linked blank cells and reuploading the input workbook',
          'Unhiding sheets, rows, or columns in the workbook',
          'Deleting images or comments from the workbook',
          'Resolving error values if they are not propagating through the workbook',
          'Making minor wording changes in the prompt to improve naturalness',
          'Removing minor instances of overspecification',
          'Adding tolerance intervals to rubric items',
          'Fixing output validation values if incorrect',
          'Adding question marks to rubric items',
        ],
      },
      {
        body: 'Changes you should NOT make directly — send these back to the contributor instead:',
        bullets: [
          'Making fundamental changes to the task if it is not sufficiently complex',
          'Fixing a task that you suspect was AI-generated (rewriting the prompt or rebuilding the spreadsheet task)',
          'Populating an entire rubric category that is missing',
        ],
        callout: {
          type: 'warning',
          text: 'A good heuristic: if you would spend more than 20 minutes making direct fixes, the task should go back to the contributor instead.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-bounce-back',
    title: 'What the Contributor Sees',
    body: 'If any checklist item is not marked as complete and you submit your review, the task is sent back to the contributor for revision. The contributor sees exactly which items were not satisfied along with your written feedback for each task element. This creates a clear, actionable revision list.',
    table: {
      headers: ['What the Contributor Sees', 'Why It Matters'],
      rows: [
        ['Your assessment of all checklist items', 'Contributor knows exactly what passed and what failed — no guessing'],
        ['Your written feedback for each task element', 'Contributor understands why it failed and how to fix it'],
      ],
    },
    callout: {
      type: 'tip',
      text: 'Think of your review as a conversation, not a verdict. The clearer your feedback, the fewer revision rounds the task will need.',
    },
  },
  {
    type: 'ordering',
    id: 'r2-order-workflow',
    instruction: 'Put the reviewer workflow steps in the correct order.',
    items: [
      'Download the input and output workbooks and verify the task area is blank in the input and populated in the output',
      'Check the input workbook for proper dependency handling',
      'Review auto-check flags and determine whether they must be resolved',
      'Go through the 4 spreadsheet checklist items and provide feedback for any that are not met',
      'Open the prompt side-by-side with the output workbook',
      'Review auto-check flags for AI-detection patterns',
      'Go through the 5 prompt checklist items and provide feedback for any that are not met',
      'Review the rubric against the output workbook',
      'Go through the 6 rubric checklist items and provide feedback for any that are not met',
      'Submit the review',
    ],
  },
  {
    type: 'scenario',
    id: 'r2-scenario-autocheck',
    scenario: 'You open a review task on your dashboard and see two auto-check flags: a warning for broken named ranges and a warning for em dash usage in the prompt. The spreadsheet checklist and prompt checklist have not been filled out yet.',
    question: 'What should you do?',
    options: [
      'Immediately reject the task — two auto-check flags means it fails',
      'Dismiss both warnings since they are not blocking errors',
      'Use the flags as a starting point: investigate the broken named ranges when checking Data Integrity, and scrutinize the prompt style when checking the Prompt Style checklist item',
      'Report the task to the TSIP team for manual review',
    ],
    correctIndex: 2,
    explanation: 'Auto-check flags are informational — they highlight areas to investigate, not automatic failures. The broken named ranges warning should guide your Data Integrity checklist review, and the AI-detection flag should make you scrutinize the prompt style carefully. You still need to go through every checklist item and make your own judgment.',
  },
  {
    type: 'multiple-choice',
    id: 'r2-quiz-checklist-logic',
    question: 'A task has all spreadsheet checklist items, all prompt checklist items, but one rubric checklist item (Self-Contained) is not satisfied. What is the correct decision?',
    options: [
      'Request changes — any checklist item marked No means the task needs revision',
      'Approve the task — only one item failed and the rest are strong',
      'Approve the task but note the issue for the contributor to fix next time',
      'Request changes on the rubric only and approve the spreadsheet and prompt',
    ],
    correctIndex: 0,
    explanation: 'The checklist is deterministic: if any item is marked No, the task must be sent back for revision. There is no exception for "only one item" or "the rest are strong." The contributor will see exactly which item failed (Self-Contained) and your feedback explaining why, so they can fix it and resubmit.',
  },
];
