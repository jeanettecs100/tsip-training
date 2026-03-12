import { Step } from '../../shared/types';

export const reviewerModule7Steps: Step[] = [
  {
    type: 'content',
    id: 'r7-intro',
    title: 'Final Assessment',
    body: 'This comprehensive assessment covers everything from Modules R1 through R6. You will be tested on reviewer standards, the checklist-based workflow, spreadsheet evaluation, prompt evaluation, rubric evaluation, and feedback best practices. Take your time — the questions are designed to test applied judgment, not just recall.',
    callout: {
      type: 'info',
      text: 'You need to pass this assessment to complete the TSIP Reviewer Training program. Review the earlier modules if you need a refresher before starting.',
    },
  },
  {
    type: 'multiple-choice',
    id: 'r7-q1',
    question:
      'Which of the following is NOT one of the three north stars that guide TSIP reviewers?',
    options: [
      'An extremely high bar for quality',
      'A relentless drive for nothing to fall through the cracks',
      'Maximizing the number of tasks approved per review session',
      'Pride of work',
    ],
    correctIndex: 2,
    explanation:
      'The three north stars are: (1) an extremely high bar for quality, (2) a relentless drive for nothing to fall through the cracks, and (3) pride of work. Speed of approval is never prioritized over quality.',
  },
  {
    type: 'ordering',
    id: 'r7-q2',
    instruction: 'Arrange the reviewer workflow steps in the correct order.',
    items: [
      'Review auto-check flags on the submission',
      'Download and audit the input workbook',
      'Download and audit the output workbook',
      'Mark the spreadsheet checklist items Yes or No',
      'Review the prompt side-by-side with the output workbook',
      'Mark the prompt checklist items Yes or No',
      'Review the rubric against the prompt and output',
      'Mark the rubric checklist items Yes or No',
      'Write feedback for any No items and submit',
    ],
  },
  {
    type: 'multiple-choice',
    id: 'r7-q3',
    question: 'What is the role of auto-check flags in the review process?',
    options: [
      'They automatically approve or reject checklist items',
      "They replace the reviewer's manual checklist review",
      "They highlight potential issues to investigate but do not replace the reviewer's own judgment",
      'They are only relevant for the Data Integrity checklist item',
    ],
    correctIndex: 2,
    explanation:
      'Auto-check flags are informational — they highlight areas to investigate, such as error values, external links, or AI-detection signals. They supplement your review but do not replace it. You must still manually go through every checklist item.',
  },
  {
    type: 'scenario',
    id: 'r7-q4',
    scenario:
      'You open a submitted task and download the input workbook. The task area already contains partially filled-in formulas, and one of the data tabs references cells on the task tab.',
    question: 'What is the correct course of action?',
    options: [
      'Approve the task — the partial formulas give the AI a helpful starting point',
      'Mark the relevant checklist items as No — the task area must be blank in the input workbook and inter-tab dependencies are not allowed',
      'Mark it as Yes but leave a note about the issue',
      'Only flag the inter-tab dependency; partially filled task areas are acceptable',
    ],
    correctIndex: 1,
    explanation:
      'Two issues are present: (1) the task area must be blank in the input workbook so the AI starts from scratch, and (2) inter-tab dependencies are not allowed. Both require marking the relevant checklist items as No with specific feedback.',
  },
  {
    type: 'matching',
    id: 'r7-q5',
    instruction:
      'Match each spreadsheet checklist item to the question it answers.',
    pairs: [
      {
        term: 'Data Integrity',
        definition:
          'Are there any error values, broken references, or external link dependencies?',
      },
      {
        term: 'Formula Quality',
        definition:
          'Are formulas dynamic and auditable with clearly separated assumptions?',
      },
      {
        term: 'Formatting',
        definition:
          'Is the spreadsheet professionally formatted with consistent conventions?',
      },
      {
        term: 'Business Realism',
        definition:
          'Does the task represent a genuine analyst workflow with realistic scope?',
      },
      {
        term: 'Input-to-Output',
        definition:
          'Do the input and output form a logical progression with meaningful analytical additions?',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r7-q6',
    scenario:
      'You are reviewing an output workbook for a DCF model. The WACC calculation has the discount rate typed directly into the formula as =B10/(1+0.085)^A10, and the cost of equity is also hardcoded in formulas. All formulas resolve without errors.',
    question: 'How would you mark Data Integrity and Formula Quality?',
    options: [
      'Both Yes — all formulas work correctly',
      'Data Integrity: Yes, Formula Quality: No — formulas resolve but hardcoded values make the model difficult to audit',
      'Both No — hardcoded values are always an error',
      'Data Integrity: No, Formula Quality: Yes — the hardcoded values create integrity issues',
    ],
    correctIndex: 1,
    explanation:
      'Data Integrity checks for error values, broken references, and external links — since all formulas resolve, this passes. Formula Quality checks for dynamic, auditable formulas with separated assumptions — hardcoded values in formulas fail this item. These are independent checklist items.',
  },
  {
    type: 'multiple-choice',
    id: 'r7-q7',
    question:
      'A prompt includes: "In cell B12, type the formula =B10*(1+B11) to calculate projected revenue." Which checklist item does this fail?',
    options: [
      'Context & Analytical Objective — the prompt lacks context',
      'Structure & Logic — the prompt overspecifies by dictating the exact formula and cell location',
      'Assumptions & Input Data — the prompt should not reference specific cells',
      'Prompt Style — the language is too technical',
    ],
    correctIndex: 1,
    explanation:
      'This fails Structure & Logic because it overspecifies — dictating exact cell references and formulas reduces the task to data entry rather than testing analytical ability. A good prompt describes what needs to be accomplished without dictating implementation details.',
  },
  {
    type: 'scenario',
    id: 'r7-q8',
    scenario:
      'You receive a prompt that reads: "Certainly! I\'d be happy to help you create a comprehensive financial model. Please construct a detailed three-statement model incorporating the following meticulously crafted assumptions, ensuring seamless integration between each financial statement."',
    question: 'Which prompt checklist item does this most clearly fail?',
    options: [
      'Context & Analytical Objective',
      'Assumptions & Input Data',
      'Outputs Specified',
      'Prompt Style — phrases like "Certainly!", "meticulously crafted", and "seamless integration" are telltale signs of LLM-generated text',
    ],
    correctIndex: 3,
    explanation:
      'This prompt contains multiple hallmarks of AI-generated text: "Certainly! I\'d be happy to help", "meticulously crafted", and "seamless integration". TSIP prompts must read like natural language written by a real finance professional. Mark Prompt Style as No.',
  },
  {
    type: 'multiple-choice',
    id: 'r7-q9',
    question:
      'A rubric criterion reads: "The model correctly calculates EBITDA, applies the appropriate tax rate, and formats all currency values with two decimal places." Which checklist item does this fail?',
    options: [
      'Binary Clarity',
      'Self-Contained',
      'Single-Check Principle — it stacks three independent checks into one criterion',
      'Specific & Testable',
    ],
    correctIndex: 2,
    explanation:
      'This stacks three independent checks: (1) EBITDA calculation, (2) tax rate application, and (3) currency formatting. Each should be its own criterion. Stacking makes it impossible to give partial credit.',
  },
  {
    type: 'matching',
    id: 'r7-q10',
    instruction: 'Match each rubric checklist item to the issue it identifies.',
    pairs: [
      {
        term: 'Binary Clarity',
        definition:
          'A criterion uses language like "mostly correct" or "reasonably formatted"',
      },
      {
        term: 'Self-Contained',
        definition:
          'A criterion says "applies the correct discount rate" without specifying what the rate is',
      },
      {
        term: 'Single-Check Principle',
        definition:
          'A criterion tests both formula accuracy and cell formatting in the same item',
      },
      {
        term: 'Category Coverage',
        definition:
          'The rubric tests formulas but has no criteria for data integrity or formatting',
      },
      {
        term: 'Weighting & Scoring',
        definition:
          'A formatting check and a core calculation check carry the same point value',
      },
      {
        term: 'Specific & Testable',
        definition:
          'A criterion states "the model should look professional" with no measurable standard',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r7-q11',
    scenario:
      'You are requesting changes on a task. You write the following feedback: "The rubric needs work. Several criteria are problematic and the prompt could be better. Please revise and resubmit."',
    question: 'What is wrong with this feedback?',
    options: [
      'The feedback is fine — it clearly states that changes are needed',
      'The feedback is too short',
      'The feedback is vague and not actionable — it should identify which specific criteria fail, which checklist items they violate, and suggest concrete fixes',
      'The feedback should not mention both the rubric and the prompt',
    ],
    correctIndex: 2,
    explanation:
      'Effective feedback is actionable: it identifies which specific criteria are problematic, explains which checklist items they fail, and suggests concrete fixes. Telling a contributor "several criteria are problematic" without specifics wastes revision cycles.',
  },
  {
    type: 'multiple-choice',
    id: 'r7-q12',
    question:
      'All spreadsheet and prompt checklist items are marked Yes, but one rubric checklist item (Self-Contained) is marked No. What is the correct decision?',
    options: [
      'Approve — only one item failed',
      'Request changes — any checklist item marked No means the task needs revision',
      'Approve but note the issue',
      'Request changes on the rubric only',
    ],
    correctIndex: 1,
    explanation:
      'The checklist is deterministic: any item marked No means the task must be sent back for revision. There is no exception for "only one item" or "the rest are strong." The contributor will see exactly which item failed and your feedback.',
  },
  {
    type: 'scenario',
    id: 'r7-q13',
    scenario:
      'A prompt asks the AI to "build a debt schedule for a leveraged buyout." The rubric includes a criterion: "The debt schedule correctly calculates annual interest expense using the interest rate provided in the prompt." However, the prompt does not provide a specific interest rate — it only says to "use appropriate market assumptions."',
    question: 'What is the core issue and what would you mark No?',
    options: [
      'The prompt is fine; remove the interest rate criterion from the rubric',
      'The rubric fails Self-Contained — it references information that is neither in the prompt nor specified within the criterion itself. The prompt also fails Assumptions & Input Data — it does not provide the interest rate.',
      'The prompt is underspecified — it must always provide exact values for every assumption',
      'Both components are fine — the AI should infer the interest rate from market context',
    ],
    correctIndex: 1,
    explanation:
      'Two checklist items fail: the rubric fails Self-Contained because it references "the interest rate provided in the prompt" but no rate is actually provided, and the prompt fails Assumptions & Input Data because it asks for a debt schedule without specifying the interest rate. Both need to be marked No with specific feedback.',
  },
  {
    type: 'assessment-results',
    id: 'r7-results',
    title: 'Assessment Results',
  },
];
