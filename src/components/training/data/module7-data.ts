import type { Step } from '../shared/types';

export const module7Steps: Step[] = [
  {
    type: 'content',
    id: 'm7-intro',
    title: 'Assessment Overview',
    body: 'This final assessment covers concepts from every earlier module. Work through each question carefully \u2014 there is no time limit. Your score will be shown at the end.',
    callout: {
      type: 'info',
      text: 'You can review your answers after completing the assessment by navigating back to this module from the sidebar.',
    },
  },

  // Q1 — Strategy Selection (Module 2)
  {
    type: 'scenario',
    id: 'm7-q1-strategy-selection',
    scenario:
      'A seed workbook contains a single-tab operating model with historical financials and a revenue forecast, but no valuation work. The model is clean but simple.',
    question: 'Which task creation strategy is most appropriate?',
    options: ['Build Forward', 'Work Backward', 'Create Error'],
    correctIndex: 0,
    explanation:
      'The model is simple with no downstream sections to strip, which is the textbook Build Forward signal. Work Backward requires a complete model with removable sections. Build Forward fits because you would add a valuation layer as the natural next analytical step.',
  },

  // Q2 — Dependency Handling (Module 2)
  {
    type: 'scenario',
    id: 'm7-q2-dependency-handling',
    scenario:
      'You\u2019re using Work Backward on a seed with a DCF tab that references WACC from a separate assumptions tab. You decide to remove the DCF tab to create the input. After deleting it, you notice the assumptions tab still looks fine.',
    question: 'Is the input spreadsheet ready to use as-is?',
    options: ['No', 'Yes'],
    correctIndex: 0,
    explanation:
      'Removing a tab isn\u2019t just about that tab\u2019s own references. Other tabs may reference outputs from the deleted DCF tab (e.g., implied share price feeding into a summary). You must check for cross-references in both directions and clean up any orphaned links before the input is usable.',
  },

  // Q3 — Prompt Overspecification (Module 3)
  {
    type: 'scenario',
    id: 'm7-q3-overspecification',
    scenario:
      'A contributor writes: \u201CBuild a sensitivity analysis showing how changes in WACC and terminal growth rate affect implied share price. Use a two-variable data table with WACC ranging from 7% to 11% in 50bp increments along the top and terminal growth from 1.5% to 3.5% in 25bp increments down the side.\u201D',
    question: 'Does this prompt have an overspecification problem?',
    options: ['No', 'Yes'],
    correctIndex: 0,
    explanation:
      'Specifying ranges and increments provides necessary input assumptions \u2014 this is not overspecification. Overspecification would be dictating exact cell references, formula syntax, or row/column positions. The prompt describes what the analysis should contain, not how to implement it in Excel.',
  },

  // Q4 — Calculated Values (Module 3)
  {
    type: 'multiple-choice',
    id: 'm7-q4-calculated-values',
    question:
      'Your output spreadsheet shows a WACC of 9.2% and an implied share price of $142.50. Which of these should appear in your prompt?',
    options: [
      'Both values',
      'Only the share price',
      'Only the WACC',
      'Neither',
    ],
    correctIndex: 3,
    explanation:
      'Both WACC and share price are calculated from underlying assumptions (risk-free rate, beta, cost of debt, etc.). Only raw input assumptions belong in the prompt. Including calculated values provides hints about the expected output, which undermines the task\u2019s ability to test the AI.',
  },

  // Q5 — Self-Containment (Module 4)
  {
    type: 'scenario',
    id: 'm7-q5-self-containment',
    scenario:
      'A rubric criterion reads: \u201CIs the discount rate used in the DCF equal to the WACC calculated in the assumptions section?\u201D',
    question: 'Is this criterion properly self-contained?',
    options: ['Yes', 'No'],
    correctIndex: 0,
    explanation:
      'Self-containment means the criterion can be evaluated using only the rubric and the spreadsheet \u2014 no need to consult the prompt. This criterion checks internal consistency between two parts of the spreadsheet (DCF tab vs. assumptions section), which is fully self-contained. Not every criterion needs a hardcoded number; some validly test that formulas are properly linked.',
  },

  // Q6 — Bundled Criteria (Module 4)
  {
    type: 'scenario',
    id: 'm7-q6-bundled-criteria',
    scenario:
      'A rubric criterion reads: \u201CDoes the revenue forecast start at $4.2 billion and grow at 12% in Year 1?\u201D',
    question: 'What is the primary issue with this criterion?',
    options: [
      'It\u2019s not self-contained',
      'The values are unrealistic',
      'It tests two separate things in one criterion',
      'It lacks a tolerance interval',
    ],
    correctIndex: 2,
    explanation:
      'The starting revenue ($4.2B) and the growth rate (12%) are two independently verifiable checks. One could be correct while the other fails. The single-check principle requires splitting this into separate criteria: one for the starting value and one for the growth rate.',
  },

  // Q7 — Weighting (Module 4)
  {
    type: 'multiple-choice',
    id: 'm7-q7-weighting',
    question:
      'A rubric includes these criteria. Which one should carry the HIGHEST point weight?',
    options: [
      '\u201CDoes the revenue tab exist?\u201D',
      '\u201CIs the initial investment hardcoded at $500,000?\u201D',
      '\u201CIs NPV calculated as the sum of discounted cash flows using CF \u00F7 (1+r)^t?\u201D',
      '\u201CAre row labels present for each line item?\u201D',
    ],
    correctIndex: 2,
    explanation:
      'Formulas requiring domain knowledge (like NPV calculation methodology) warrant the highest weight (+15 to +30). Structural checks like tab existence fall in the +10 to +15 range, input data accuracy at +5 to +10, and formatting/labels at +5 to +10.',
  },

  // Q8 — I/O Progression Quality (Module 2)
  {
    type: 'scenario',
    id: 'm7-q8-io-progression',
    scenario:
      'A contributor uses Build Forward. The input is an operating model with three-statement financials. The output adds a new tab with a standalone three-line sensitivity table that takes about 10 minutes to build.',
    question: 'What is the main problem with this task?',
    options: [
      'The sensitivity table should reference the financials tab',
      'Build Forward was the wrong strategy',
      'The output change is too small to qualify as a valid task',
      'Sensitivity tables aren\u2019t valid TSIP deliverables',
    ],
    correctIndex: 2,
    explanation:
      'Tasks must involve at least one hour of focused analytical effort. A three-line sensitivity table that takes 10 minutes doesn\u2019t meet the minimum scope requirement. The strategy choice is fine \u2014 the problem is that the analytical progression lacks substance.',
  },

  // Q9 — Create Error Prompt Style (Module 3)
  {
    type: 'scenario',
    id: 'm7-q9-create-error-prompt',
    scenario:
      'A contributor is writing a prompt for a Create Error task. They write: \u201CThe MOIC formula on the Transactions tab is inverted \u2014 it divides equity investment by exit equity instead of the reverse. Please fix it.\u201D',
    question: 'What\u2019s wrong with this prompt?',
    options: [
      'Nothing',
      'It\u2019s too short',
      'It references a specific tab name',
      'It reveals the root cause instead of describing symptoms',
    ],
    correctIndex: 3,
    explanation:
      'Create Error prompts should describe observable symptoms (\u201Cmy MOIC seems unusually low\u201D) without diagnosing the underlying problem. This mirrors how an analyst actually asks for help. Revealing the exact error (inverted formula) eliminates the analytical reasoning the task is meant to test.',
  },

  // Q10 — Quality Gate (Module 1)
  {
    type: 'multiple-choice',
    id: 'm7-q10-quality-gate',
    question:
      'A task requires the contributor to reformat an existing model\u2019s fonts, colors, and number formats to match a style guide, with no new calculations or analysis. Is this acceptable for TSIP?',
    options: [
      'Yes',
      'Yes, if it takes over an hour',
      'No',
      'Yes, if combined with a rubric',
    ],
    correctIndex: 2,
    explanation:
      'TSIP tasks must involve multi-step analytical substance \u2014 genuine calculations, forecasting, valuation work, or similar. Formatting-only work, regardless of time required, does not qualify because it doesn\u2019t produce the kind of expert-grade training data TSIP is designed to generate.',
  },

  // Q11 — Tolerance Intervals (Module 4)
  {
    type: 'scenario',
    id: 'm7-q11-tolerance',
    scenario:
      'A rubric criterion reads: \u201CIs the terminal value equal to $1,247,500,000?\u201D',
    question: 'What improvement does this criterion need?',
    options: [
      'It should reference the prompt for context',
      'It should be broken into multiple criteria',
      'It needs a tolerance interval',
      'It should use a negative point value',
    ],
    correctIndex: 2,
    explanation:
      'Output validation criteria must include tolerance bands (e.g., \u00B11%) because rounding differences, intermediate calculation precision, and legitimate methodology variations can produce slightly different results. Without a tolerance, a correct approach that rounds differently would fail the check.',
  },

  // Q12 — Dependency Tracing (Module 2)
  {
    type: 'scenario',
    id: 'm7-q12-dependency-tracing',
    scenario:
      'You\u2019re removing a WACC calculation section from a model. You use Ctrl+F to search for the tab name across the workbook and find references in the DCF tab and a sensitivity table.',
    question: 'How should you handle these dependencies?',
    options: [
      'Delete the DCF tab and sensitivity table', 
      'Hardcode a placeholder WACC assumption (i.e., 8.0%)',
      'Hardcode the exact calculated WACC value',
      'Option A and B are both reasonable approaches',
      'None of the above'
    ],
    correctIndex: 3,
    explanation:
      'When handling dependencies, it is critical that you maintain a realistic input → output progression. In most cases, it makes the most sense to delete downstream analyses when you remove a section. However, it is also acceptable to use hardcoded placeholder assumptions if that could have been a realistic state of the model. When building a DCF, an associate might build the valuation section with a simple, hardcoded WACC assumption before they build out a dynamic WACC calculation.',
  },

  // Q13 — Multiple Valid Approaches (Module 1/3)
  {
    type: 'multiple-choice',
    id: 'm7-q13-multiple-approaches',
    question:
      'A contributor has finished their output spreadsheet and realizes the analysis could be done in two very different but equally valid ways. What does this indicate?',
    options: [
      'The task is defective and should be abandoned',
      'The prompt should specify that only one approach is acceptable',
      'This is expected and the prompt should allow for multiple valid approaches',
      'Two separate output spreadsheets are needed',
    ],
    correctIndex: 2,
    explanation:
      'The output represents one ideal solution \u2014 not the only correct answer. The prompt should describe the analytical objective broadly enough that a competent professional could produce a functionally equivalent result using a different but equally valid methodology.',
  },

  // Q14 — Review Feedback (Module 5)
  {
    type: 'scenario',
    id: 'm7-q14-review-feedback',
    scenario:
      'You receive a \u201Crevisions needed\u201D review. The feedback says: (1) your rubric criteria in the Formula Correctness section are bundled, and (2) your prompt includes calculated IRR values. You disagree with point #2 because you believe the IRR value helps establish expectations.',
    question: 'What should you do?',
    options: [
      'Fix only the bundled criteria and explain your reasoning on the IRR issue',
      'Resubmit without changes and ask the reviewer to reconsider',
      'Start a new task',
      'Fix both issues',
    ],
    correctIndex: 3,
    explanation:
      'Both pieces of feedback reflect established TSIP rules: the single-check principle prohibits bundled criteria, and prompts must never include calculated values. When revisions are requested, you should resolve every noted issue \u2014 personal disagreement doesn\u2019t override the platform\u2019s quality standards.',
  },

  // Q15 — Rubric Categories Matching (Module 4)
  {
    type: 'matching',
    id: 'm7-q15-rubric-categories',
    instruction: 'Match each rubric criterion to its correct category',
    pairs: [
      {
        term: 'Does the DCF tab exist with projection columns for 2024\u20132028?',
        definition: 'Structural Completeness',
      },
      {
        term: 'Is the risk-free rate entered as 4.28%?',
        definition: 'Input Data Accuracy',
      },
      {
        term: 'When beta increases from 0.98 to 1.20, does the cost of equity increase?',
        definition: 'Dynamic Functionality',
      },
      {
        term: 'Is the implied share price $140.25 (±5%)?',
        definition: 'Output Validation',
      },
      {
        term: 'Does the model contain any #REF! or #N/A errors?',
        definition: 'Model Quality & Pitfalls',
      },
    ],
  },

  // Q16 — Context in Prompts (Module 3)
  {
    type: 'scenario',
    id: 'm7-q16-context',
    scenario:
      'A contributor writes a prompt that begins: \u201CPlease build a DCF model with the following assumptions\u2026\u201D and then lists all the required inputs. The prompt has no introduction explaining what the model is for or what business question it answers.',
    question: 'What is missing?',
    options: [
      'Input data',
      'Output specification',
      'Context and analytical objective',
      'Nothing',
    ],
    correctIndex: 2,
    explanation:
      'Without context explaining the business purpose (e.g., \u201Cevaluate whether IHG is undervalued relative to current trading levels\u201D), the prompt reads like a mechanical exercise rather than a realistic assignment. Context & Analytical Objective is a key prompt evaluation dimension \u2014 the reader should understand what business decision the analysis supports.',
  },

  // Q17 — Create Error Types (Module 2)
  {
    type: 'multiple-choice',
    id: 'm7-q17-error-types',
    question:
      'Which type of error is most appropriate for a Create Error task?',
    options: [
      'A typo in a cell label (e.g., \u201CRevanue\u201D instead of \u201CRevenue\u201D)',
      'A missing column header',
      'An inverted formula that divides equity investment by exit equity instead of the reverse',
      'An empty cell where a value should be',
    ],
    correctIndex: 2,
    explanation:
      'Good errors require understanding the underlying financial logic to identify and fix. Typos, missing headers, and blank cells are superficial \u2014 they don\u2019t test analytical reasoning. An inverted formula produces a plausible-looking but incorrect result that demands domain expertise to diagnose.',
    callout: {
      type: 'warning',
      text: 'Remember: a single error is rarely enough. "Create Error" tasks should include multiple stacked errors to reach an acceptable complexity level. One inverted formula alone is not challenging enough to make an LLM reason through the necessary fixes \u2014 layer several interconnected issues so the task requires genuine analytical thinking.',
    },
  },

  // Q18 — Full Task Workflow Ordering (Module 1/5)
  {
    type: 'ordering',
    id: 'm7-q18-workflow',
    instruction:
      'Arrange the complete TSIP task workflow in the correct sequence',
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

  // Q19 — Negative Point Criteria (Module 4)
  {
    type: 'scenario',
    id: 'm7-q19-negative-points',
    scenario:
      'You\u2019re writing rubric criteria for the Model Quality & Pitfalls category. You draft: \u201CAre gross margin figures formatted as percentages? [\u221215]\u201D',
    question: 'Is this criterion correctly constructed?',
    options: [
      'Yes',
      'No \u2014 negative point values are not acceptable',
      'No \u2014 points should be awarded if this criterion is true',
      'No \u2014 it belongs in Formula Correctness, not Model Quality',
    ],
    correctIndex: 2,
    explanation:
      'This formatting check is correctly categorized in the Model Quality & Pitfalls section. While negative point values are allowed in the Model Quality & Pitfalls category to penalize modeling errors, proper formatting should be awarded points.',
  },

  // Q20 — Prompt Evaluation Dimensions Matching (Module 3)
  {
    type: 'matching',
    id: 'm7-q20-prompt-dimensions',
    instruction:
      'Match each prompt excerpt to the evaluation dimension it primarily demonstrates',
    pairs: [
      {
        term: 'A PE fund is evaluating a $200M bolt-on acquisition in specialty chemicals\u2026',
        definition: 'Context & Analytical Objective',
      },
      {
        term: 'Use a 9.5% discount rate, 2.5% terminal growth rate, and 35% tax rate for all projections',
        definition: 'Assumptions & Input Data',
      },
      {
        term: 'Build a returns waterfall showing gross and net IRR, equity multiple, and distribution by LP class',
        definition: 'Output Specification',
      },
      {
        term: 'The analysis should flow from revenue build at the top, through the income statement, to free cash flow at the bottom',
        definition: 'Structure & Logic',
      },
    ],
  },

  // Results
  {
    type: 'assessment-results',
    id: 'm7-results',
    title: 'Results',
  },

  // Congratulations
  {
    type: 'content',
    id: 'm7-congratulations',
    title: 'You\u2019re Ready!',
    body: 'Well done \u2014 you have completed the full TSIP training program! You now possess the skills and understanding needed to produce high-caliber tasks that will shape the next generation of AI models. Keep in mind: it is your real-world domain expertise that gives this work its value.',
    bullets: [
      'Craft prompts that are sophisticated, detailed, and grounded in real-world practice',
      'Produce client-grade spreadsheets with professional formatting and sound methodology',
      'Author rubrics that are atomic, self-contained, and objectively verifiable',
      'Follow the platform workflow: seed workbook \u2192 spreadsheet task \u2192 prompt \u2192 rubric \u2192 submit',
    ],
    callout: {
      type: 'tip',
      text: 'Navigate to your dashboard to claim your first assignment. If you ever need a refresher, you can revisit any completed module at any time.',
    },
  },
];
