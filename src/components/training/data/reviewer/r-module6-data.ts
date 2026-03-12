import { Step } from '../../shared/types';

export const reviewerModule6Steps: Step[] = [
  {
    type: 'content',
    id: 'r6-intro',
    title: 'Providing Feedback',
    body: 'When any checklist item is marked No, your job is not just to flag it — it is to help the contributor fix it. The contributor will see exactly which items you marked No along with your written feedback for each one. Clear, actionable feedback is what turns a revision into an approval in the next round.',
    callout: {
      type: 'info',
      text: 'Every No must be accompanied by written feedback. The contributor sees a clear list: which items passed, which failed, and your explanation for each failure. Never mark No without explaining why and suggesting how to fix it.',
    },
  },
  {
    type: 'content',
    id: 'r6-feedback-structure',
    title: 'Structuring Your Feedback',
    body: 'For each checklist item marked No, write feedback following a three-part structure. This pattern ensures the contributor understands what is wrong, why it matters, and what to do about it.',
    sections: [
      {
        numberedList: {
          title: 'Feedback Structure',
          items: [
            'Observation — State what you found. Be specific about which element has the issue.',
            'Explanation — Explain why it is a problem. Reference the checklist item it fails.',
            'Suggestion — Propose a concrete fix. Show what the revised version should look like.',
          ],
        },
      },
      {
        body: 'Examples of well-structured feedback for common issues:',
      },
      {
        table: {
          headers: ['Checklist Item Marked No', 'Example Feedback'],
          rows: [
            [
              'Single-Check Principle',
              '"Criterion #5 is stacked — it tests both the tax rate value and the net income calculation in one criterion. Please split into two: (1) \'Is the tax rate set to 25%? [+5]\' and (2) \'Is net income calculated as EBT multiplied by (1 - tax rate)? [+15]\'."',
            ],
            [
              'Self-Contained',
              '"Criterion #3 says \'uses the correct WACC\' but doesn\'t specify what the correct value is. Please update to: \'Is the WACC calculated as 9.5%? [+10]\'."',
            ],
            [
              'Context & Analytical Objective',
              '"The prompt jumps directly into requirements without explaining why this analysis is needed. Please add 1-2 sentences of business context — e.g., what transaction or decision does this model support?"',
            ],
            [
              'Data Integrity',
              '"The output workbook contains #REF! errors in cells D15:D20 of the Debt Schedule tab. These broken references must be resolved before the task can pass."',
            ],
            [
              'Formula Quality',
              '"The discount rate is hardcoded as 0.085 directly in the DCF formula (=B10/(1+0.085)^A10). Please move this to a labeled input cell in the assumptions section and reference it in the formula."',
            ],
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r6-approve-reject',
    title: 'Approve vs. Request Changes',
    body: 'The decision logic is simple and deterministic: if every checklist item across all components is marked Yes, the task is approved. If any single item is marked No, the task is sent back for revision.',
    table: {
      headers: ['Decision', 'Condition', 'What Happens'],
      rows: [
        [
          'Approve',
          'ALL checklist items across spreadsheet, prompt, and rubric are marked Yes',
          'Task enters the benchmark dataset. Your approval is permanent.',
        ],
        [
          'Request Changes',
          'ANY checklist item is marked No',
          'Task returns to contributor with the list of No items and your written feedback for each.',
        ],
      ],
    },
    callout: {
      type: 'warning',
      text: 'Approving a task is a permanent decision — it enters the benchmark dataset. Sending it back for revision is a temporary delay with no downside. When in doubt, send it back.',
    },
  },
  {
    type: 'content',
    id: 'r6-what-contributor-sees',
    title: 'What the Contributor Sees',
    body: 'When you submit a review with any items marked No, the contributor receives a clear breakdown of your review. This transparency is by design — it eliminates guessing and lets contributors focus their revision on exactly what needs to change.',
    table: {
      headers: ['What They See', 'Purpose'],
      rows: [
        [
          'Each checklist item with its Yes/No status',
          'Contributor knows exactly what passed and what failed',
        ],
        [
          'Your written feedback for each No item',
          'Contributor understands why it failed and what to do',
        ],
        [
          'Overall comment (required for rejections)',
          'High-level summary helping the contributor prioritize',
        ],
      ],
    },
    callout: {
      type: 'tip',
      text: 'Think of your review as a conversation, not a verdict. The clearer your feedback, the fewer revision rounds the task will need.',
    },
  },
  {
    type: 'content',
    id: 'r6-feedback-fields',
    title: 'Where to Provide Feedback',
    body: 'The review form has specific feedback fields for each task component. Use the right field for each issue — this helps contributors find and address your comments efficiently.',
    table: {
      headers: ['Feedback Field', 'What to Address'],
      rows: [
        [
          'Input Spreadsheet',
          'Issues with the starting data, formatting, or structure of the input file',
        ],
        [
          'Prompt',
          'Issues with context, assumptions, output specification, structure, or style',
        ],
        [
          'Output Spreadsheet',
          'Material problems with the reference deliverable that affect rubric validation',
        ],
        [
          'Rubric',
          'Issues with binary clarity, self-containment, stacking, coverage, weighting, or specificity',
        ],
        [
          'Overall Comment',
          'High-level summary of the review. Required when requesting changes.',
        ],
      ],
    },
  },
  {
    type: 'content',
    id: 'r6-mnpi',
    title: 'MNPI: The Hard Stop',
    body: 'Material Non-Public Information (MNPI) is a legal and compliance issue that overrides all other considerations. If a task contains or references non-public deal information, financial projections from live transactions, or insider information, reject it immediately.',
    callout: {
      type: 'danger',
      text: 'MNPI is not a quality issue — it is a legal issue. A task with MNPI must be rejected regardless of how well-written the prompt and rubric are. There is no workaround, no anonymization fix, and no exception.',
    },
  },
  {
    type: 'ordering',
    id: 'r6-order-feedback',
    instruction:
      'Arrange the three components of well-structured feedback in the correct order.',
    items: [
      'Observation — State specifically what you found and where',
      'Explanation — Explain why it is a problem and which checklist item it fails',
      'Suggestion — Propose a concrete fix or show what the revised version should look like',
    ],
  },
  {
    type: 'scenario',
    id: 'r6-scenario-feedback-choice',
    scenario:
      'You are reviewing a rubric and find that Criterion #8 reads: "Does the model use the correct tax rate and apply it properly to calculate net income? [+20]". You have marked Single-Check Principle as No.',
    question: 'Which feedback response is the most effective?',
    options: [
      '"Criterion #8 needs to be fixed."',
      '"Criterion #8 is stacked — it tests both the tax rate value and the net income calculation in one criterion. Please split this into two: (1) \'Is the tax rate set to 25%? [+5]\' and (2) \'Is net income calculated as EBT multiplied by (1 - tax rate)? [+15]\'."',
      '"Criterion #8 tests too many things. Consider breaking it up."',
      '"The rubric has some issues with stacking. Please review and revise."',
    ],
    correctIndex: 1,
    explanation:
      'Option B follows all three feedback principles: it identifies the specific criterion and the exact issue (observation), explains it is stacked (explanation), and provides concrete rewritten criteria (suggestion). The other options are either too vague, lack a suggestion, or fail to reference the specific criterion.',
  },
  {
    type: 'scenario',
    id: 'r6-scenario-one-no',
    scenario:
      'You are reviewing a task where the prompt is well-written and realistic, the deliverable is functional, and the rubric has strong coverage, appropriate weighting, and specific criteria. However, three rubric criteria use the phrase "as specified in the prompt" without restating the expected values. You have marked Self-Contained as No.',
    question: 'What should you do?',
    options: [
      'Override your No and mark it Yes — the overall quality is too high to reject',
      'Submit the review with Self-Contained marked No and provide feedback explaining which three criteria need to restate the expected values from the prompt',
      'Mark it Yes but leave a note for future improvement',
      'Rewrite the three criteria yourself and mark it Yes',
    ],
    correctIndex: 1,
    explanation:
      'The checklist is deterministic. Self-containment violations mean the rubric cannot be scored objectively by different reviewers. Submit the review with Self-Contained marked No and provide specific feedback identifying which three criteria need to be rewritten to include the actual expected values. The contributor will see exactly what failed and can fix it in one revision round.',
  },
  {
    type: 'multiple-choice',
    id: 'r6-quiz-mnpi',
    question:
      'You are reviewing a task that uses detailed financial projections from a live deal that has not been publicly announced. The prompt and rubric are otherwise excellent. What should you do?',
    options: [
      'Approve it — the quality is too high to reject',
      'Ask the contributor to anonymize the company name and approve',
      'Reject it immediately — MNPI is a hard stop regardless of quality',
      'Flag it for a manager to review before making a decision',
    ],
    correctIndex: 2,
    explanation:
      'MNPI is a hard stop. If a task contains or references non-public deal information, it must be rejected immediately regardless of quality. This is a legal and compliance issue that cannot be resolved by anonymization or quality trade-offs.',
  },
];
