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
          'High-Quality Formulas — Dynamic, auditable formulas with clearly separated assumptions; no or minimal hardcoded values in calculations',
          'Acceptable Formatting & Presentation — Clean, professional formatting with consistent number formats, fonts, and alignment',
          'Realistic Input-to-Output Progression — Input and output form a logical, realistic progression with downstream dependencies removed or replaced with hardcoded placeholders',
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
        collapsible: true,
        body: 'Phase 1: Spreadsheet Audit',
        numberedList: {
          title: 'Steps 1–5',
          items: [
            'Download the input and output workbooks — verify the task area is blank or deleted in the input, and populated with the completed analysis in the output',
            'Evaluate spreadsheet task complexity — if the task is too basic, provide feedback on how to improve the complexity level or in extreme cases, ask the contributor to restart with a new task',
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
        collapsible: true,
        body: 'Phase 2: Prompt Review',
        numberedList: {
          title: 'Steps 6–8',
          start: 6,
          items: [
            'Open the prompt side-by-side with the output workbook',
            'Review any auto-check flags on the prompt and determine whether they must be resolved. Remember to take AI pattern flags seriously and raise them to a TSIP team member if you\'re struggling to determine whether a prompt is human-written',
            'Go through the 5 prompt checklist items and mark each one according to your review; if a criteria is not met, provide written feedback',
          ],
        },
      },
      {
        collapsible: true,
        body: 'Phase 3: Rubric Review & Submission',
        numberedList: {
          title: 'Steps 9–12',
          start: 9,
          items: [
            'Review the rubric against the output workbook — does it align with the newly-added analysis?',
            'Review any auto-check flags on the rubric and determine whether they must be resolved',
            'Go through the 6 rubric checklist items and mark each one according to your review; if a criteria is not met, provide written feedback',
            'Tag the appropriate complexity level (Basic, Intermediate, or Advanced) based on the complexity criteria and submit with your decision to Approve or Request Changes',
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-direct-changes',
    title: 'Making Direct Changes',
    body: 'To keep the review process efficient, we expect reviewers to make minor edits directly to a task rather than sending it back for small fixes. If cumulative changes take less than ~30 minutes and do not alter the fundamental design of the task, reviewers should implement them.',
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
        body: 'Examples of changes you should NOT make directly — send these back to the contributor instead:',
        bullets: [
          'Making fundamental changes to the task if it is not sufficiently complex',
          'Fixing a task that you suspect was AI-generated (rewriting the prompt or rebuilding the spreadsheet task)',
          'Populating an entire rubric category that is missing',
        ],
        callout: {
          type: 'info',
          text: 'A good heuristic: if you would spend more than 30 minutes making direct fixes, the task should go back to the contributor instead.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-feedback-structure',
    title: 'Structuring Your Feedback',
    body: 'When you return a task with feedback, follow this three-part structure to ensure the contributor understands what is wrong, why it matters, and what to do about it.',
    sections: [
      {
        numberedList: {
          title: 'Feedback Structure',
          items: [
            'Observation — State what you found. Be specific about where the task is falling short.',
            'Explanation — Explain why it is a problem. Reference the failed checklist items.',
            'Suggestion — Propose a concrete fix. Explain what the revised version should look like.',
          ],
        },
      },
      {
        body: 'Examples of well-structured feedback for common issues:',
      },
      {
        table: {
          headers: ['Task Element', 'Example Feedback'],
          rows: [
            [
              'Spreadsheet',
              '"The input workbook still has pre-linked blank cells in the Returns tab that reference the removed analysis. These need to be deleted and the input workbook reuploaded so the input represents a clean starting state."',
            ],
            [
              'Prompt',
              '"The prompt jumps directly into requirements without explaining why this analysis is needed. Please add 1-2 sentences of business context — i.e., why is this new analysis needed?"',
            ],
            [
              'Rubric',
              '"Criterion 2.2 is stacked — it tests both the tax rate value and the net income calculation in one criterion. Please split into two: (1) \'Is the tax rate set to 25%? [+5]\' and (2) \'Is net income calculated as EBT multiplied by (1 - tax rate)? [+15]\'."',
            ],
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r2-approve-reject',
    title: 'Approve vs. Request Changes',
    body: 'If a task meets complexity level standards and satisfies every condition of the reviewer checklist, it is an acceptable task. If either condition fails, you can request changes and send a task back to the contributor.',
    table: {
      headers: ['Condition', 'Decision', 'What Happens'],
      columnStyles: { 1: 'bold' },
      rows: [
        [
          'All checklist items are satisfied AND the task meets complexity standards',
          '✓ Approve',
          'Approved task gets sent to the delivery batch for final QA tests.',
        ],
        [
          'One or more checklist items is not satisfied',
          '✗ Request Changes',
          'Task returns to contributor with the list of unsatisfied items and your written feedback for each task element.',
        ],
        [
          'Task is too basic to accept based on complexity standards',
          '✗ Request Changes',
          'Task returns to contributor with feedback on how to increase the complexity level or, in extreme cases, instructions to restart with a new task.',
        ],
      ],
    },
  },
  {
    type: 'content',
    id: 'r2-bounce-back',
    title: 'What the Contributor Sees',
    body: 'When a task gets sent back to the contributor, they see exactly which checklist items were not satisfied along with your written feedback for each task element. This creates a clear, actionable revision list.',
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
    type: 'content',
    id: 'r2-ai-usage',
    title: 'AI Usage: Zero Tolerance Policy',
    body: 'TSIP has a zero tolerance policy for AI-generated work. Contributors must produce all spreadsheet tasks, prompts, and rubrics entirely by hand. If you suspect that any part of a submission was generated or substantially assisted by AI, raise it to a TSIP team member immediately, providing the task ID and your rationale for suspicion.',
    sections: [
      {
        body: 'Common AI indicators to watch for:',
        bullets: [
          'Robotic or unnatural language in the prompt',
          'Use of em dashes throughout the prompt or rubric',
          'Overspecification with repetitive phrasing',
          'author_matched_tool or author_found_online auto-check flags on the spreadsheet',
          'Excel data tables built with very long, complex formulas',
          'Icons included in the newly added analysis',
          'Grey commentary text in the spreadsheet explaining what was added',
          'Drastically different formatting in the new analysis vs. the rest of the spreadsheet',
        ],
      },
      {
        callout: {
          type: 'danger',
          text: 'When in doubt, escalate. If you are even slightly suspicious that AI was used to create the spreadsheet task, write the prompt, or build the rubric, raise it to a TSIP team member with the task ID and your reasoning. Do not attempt to make a final determination on your own.',
        },
      },
    ],
  },
  {
    type: 'ordering',
    id: 'r2-order-workflow',
    instruction: 'Put the reviewer workflow steps in the correct order.',
    items: [
      'Download the input and output workbooks and verify the task area is blank in the input and populated in the output',
      'Check the input workbook for proper dependency handling',
      'Review workbook auto-check flags and determine whether they must be resolved',
      'Go through the 4 spreadsheet checklist items and provide feedback for any that are not met',
      'Open the prompt side-by-side with the output workbook',
      'Review prompt auto-check flags and determine whether they must be resolved',
      'Go through the 5 prompt checklist items and provide feedback for any that are not met',
      'Review the rubric against the output workbook',
      'Review the rubric auto-check flags and determine whether they must be resolved',
      'Go through the 6 rubric checklist items and provide feedback for any that are not met',
      'Tag complexity level and submit the review',
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
      'Use the flags as a starting point: investigate them further and use them to inform checklist items like Data Integrity, and Prompt Style',
      'Report the task to the TSIP team for manual review',
    ],
    correctIndex: 2,
    explanation: 'Auto-check flags are informational — they highlight areas to investigate, not automatic failures. The broken named ranges warning should guide your Data Integrity checklist review, and the AI-detection flag should make you scrutinize the prompt style carefully. You still need to go through every checklist item and make your own judgment.',
  },
  {
    type: 'scenario',
    id: 'r2-scenario-feedback',
    scenario: 'You are reviewing a task and mark the Structure & Logic checklist item as No because the prompt contains lines like "calculate implied share price by dividing equity value by shares outstanding" and "use XLOOKUP to pull in the pricing curve by region." You need to provide feedback to the contributor.',
    question: 'Which feedback response best follows the observation-explanation-suggestion structure?',
    options: [
      '"The prompt needs to be rewritten."',
      '"The prompt fails Structure & Logic. Please fix the overspecification and resubmit."',
      '"The prompt overspecifies formula logic in two places: it dictates the exact calculation for implied share price and prescribes XLOOKUP as the function for the pricing curve lookup. Please rewrite to describe the desired outputs instead — e.g., \'derive an implied share price from your equity valuation\' and \'pull in regional pricing data.\'"',
      '"The prompt has some overspecification issues. Consider removing the formula references."',
    ],
    correctIndex: 2,
    explanation: 'Option C follows all three feedback principles: it identifies the two specific areas that did not meet expectations (observation), defines the problem as overspecification (explanation), and provides concrete examples showing how to describe outputs without prescribing implementation (suggestion). The other options are either too vague, missing a suggestion, or lack specifics.',
  },
  {
    type: 'multiple-choice',
    id: 'r2-quiz-checklist-logic',
    question: 'A task has all spreadsheet checklist items, all prompt checklist items, but one rubric checklist item (Self-Contained) is not satisfied because two ruric items reference the prompt. What is the correct decision?',
    options: [
      'Revise the rubric item directly — adjusting two rubric items is a small enough fix for reviewers to implement',
      'Approve the task — only one item failed and the rest are strong',
      'Approve the task but note the issue for the contributor to fix next time',
      'Request changes — the task has unsatisfied checklist items or fails to meet complexity standards',
    ],
    correctIndex: 0,
    explanation: 'If a revision takes less than ~30 minutes and does not involve a fundamental change to the task itself, the reviewer should make it. There are two reasons to request changes: (1) one or more checklist items is not satisfied, or (2) the task is too basic to accept based on complexity standards. In this case, the fix is minor enough for the reviewer to handle directly.',
  },
];
