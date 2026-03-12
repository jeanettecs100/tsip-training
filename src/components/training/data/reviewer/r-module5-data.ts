import { Step } from '../../shared/types';

export const reviewerModule5Steps: Step[] = [
  {
    type: 'content',
    id: 'r5-intro',
    title: 'Evaluating Rubrics',
    body: 'The rubric is the most critical component of any task. It determines how an AI-generated spreadsheet will be scored — and if the rubric is flawed, the scoring is meaningless. You will evaluate rubrics using a six-item yes/no checklist. Most of your review time should be spent here.',
    callout: {
      type: 'danger',
      text: 'A rubric with stacked criteria, missing values, or subjective language will produce inconsistent scores across reviewers. Every criterion must be unambiguous enough that two independent reviewers would arrive at the same result.',
    },
  },
  {
    type: 'content',
    id: 'r5-binary-clarity',
    title: 'Checklist Item 1: Binary Clarity',
    body: 'Every rubric criterion must be answerable with a clear YES or NO. If a reviewer has to make a judgment call about whether something "looks right" or is "adequate," the criterion is not binary.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Every criterion is a clear YES/NO question with no ambiguity',
          'Any criteria use subjective language like "looks good," "reasonable," "appropriate," "adequate," or "well-structured"',
        ],
      ],
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          columnStyles: { 0: 'good', 1: 'bad' },
          rows: [
            [
              '"Does the model include an on/off toggle for the acquisition? [+10]"',
              '"Does the model look good?" or "Are the projections accurate?"',
            ],
          ],
        },
      },
      {
        callout: {
          type: 'tip',
          text: 'A quick test: could you hand this criterion to someone who has never seen the task and have them score it identically to you? If not, it is not binary enough.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r5-self-contained',
    title: 'Checklist Item 2: Self-Contained',
    body: 'Every criterion must be evaluable using only the rubric itself and the spreadsheet being graded. A reviewer should never need to flip back to the prompt to understand what a criterion is testing.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Every criterion can be evaluated using only the rubric and the spreadsheet; no external references needed',
          'Any criteria say "per the prompt," "as shown in the output," or "as specified" without restating the actual expected values',
        ],
      ],
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          columnStyles: { 0: 'good', 1: 'bad' },
          rows: [
            [
              '"Is the initial investment amount set to $500,000? [+5]"',
              '"Are the correct input values entered per the prompt? [+5]"',
            ],
          ],
        },
      },
      {
        callout: {
          type: 'warning',
          text: 'The phrase "per the prompt" is the single most common self-containment violation. Whenever you see it, the criterion needs to be rewritten to include the actual expected value.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r5-single-check',
    title: 'Checklist Item 3: Single-Check Principle',
    body: 'Each rubric criterion should test exactly one thing. When criteria bundle multiple checks together — known as "stacking" — it becomes impossible to give partial credit and the scoring loses granularity.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Each criterion tests exactly one thing; no bundled or compound checks',
          'Any criteria bundle multiple checks into one (stacking) — e.g., testing tab existence AND formula correctness AND dynamic functionality in one criterion',
        ],
      ],
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          columnStyles: { 0: 'good', 1: 'bad' },
          rows: [
            [
              '"Does the Revenue Build tab exist? [+10]" and separately "Do segment totals tie to the Financials tab? [+15]"',
              '"Does the Revenue Build tab exist with correct segment totals that tie to Financials and update dynamically? [+25]"',
            ],
          ],
        },
      },
      {
        callout: {
          type: 'danger',
          text: 'The bad example bundles four distinct checks into one criterion worth 25 points. If the tab exists but the totals are wrong, the reviewer must choose between awarding all 25 points or none.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r5-coverage',
    title: 'Checklist Item 4: Category Coverage',
    body: 'A well-constructed rubric covers all applicable categories of evaluation. Missing an entire category means a significant aspect of the spreadsheet goes ungraded.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Rubric covers all applicable categories',
          'Rubric is missing one or more applicable categories',
        ],
      ],
    },
    sections: [
      {
        body: 'The six standard rubric categories are:',
        bullets: [
          'Structural Completeness — Does the spreadsheet have the required tabs, sections, and layout?',
          'Input Data Accuracy — Are the hardcoded inputs correct and in the right locations?',
          'Formula Correctness — Do the formulas compute the right values using the right logic?',
          'Dynamic Functionality — Do changes to inputs flow through correctly? Are toggles and scenarios working?',
          'Output Validation — Do the final outputs (IRR, NPV, share price, etc.) fall within expected ranges?',
          'Model Quality and Pitfalls — Is the model free of errors, circular references, and poor practices?',
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'r5-weighting',
    title: 'Checklist Item 5: Weighting & Scoring',
    body: 'Point values should reflect the relative importance and complexity of each criterion. A complex NPV calculation should be worth significantly more than whether a tab has the right name.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Points clearly differentiate importance: high weights for complex logic, low for formatting, negative points for errors',
          'Flat or arbitrary weighting where all items are worth the same; or weights are inverted (formatting weighted more than core calculations)',
        ],
      ],
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          columnStyles: { 0: 'good', 1: 'bad' },
          rows: [
            [
              'NPV calculation: +25; required tab exists: +10; correct section labels: +5; Excel errors present: -15',
              'Every criterion is worth +10 regardless of whether it tests tab existence or complex IRR logic',
            ],
          ],
        },
      },
      {
        callout: {
          type: 'tip',
          text: 'Negative points for errors (e.g., circular references, #REF! errors) are a sign of a well-designed rubric. They penalize pitfalls that a skilled analyst would avoid.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r5-specificity',
    title: 'Checklist Item 6: Specific & Testable',
    body: 'Criteria must include specific values, ranges, or observable conditions so that any reviewer can verify them objectively. For output validation, tolerance intervals are essential — rounding differences and minor formula variations mean exact matches are unrealistic. Additionally, criteria should not contain question marks or vague phrasing that leaves the expected outcome ambiguous.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      columnStyles: { 0: 'good', 1: 'bad' },
      rows: [
        [
          'Criteria include specific values, ranges, or observable conditions; all output validation includes reasonable tolerance intervals; no question marks or vague language',
          'Criteria are vague or untestable; output validation lacks tolerance intervals; criteria contain question marks suggesting uncertainty about expected values; language like "should be around" or "approximately correct" without actual tolerance ranges',
        ],
      ],
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          columnStyles: { 0: 'good', 1: 'bad' },
          rows: [
            [
              '"If base case assumptions are flowing through, is the IRR 11.2% (+/-0.5%)? [+20]"',
              '"Is the revenue $200? [+5]" (missing year/period, missing tolerance interval)',
            ],
          ],
        },
      },
      {
        callout: {
          type: 'warning',
          text: 'The bad example fails on two levels: it does not specify which year or period the revenue applies to, and it lacks a tolerance interval. Two reviewers could easily disagree on whether this criterion is met. Also watch for question marks in expected values — e.g., "Is the EBITDA $5M?" when the rubric writer seems unsure of the actual value.',
        },
      },
    ],
  },
  {
    type: 'matching',
    id: 'r5-match-checklist',
    instruction: 'Match each rubric checklist item to what it tests.',
    pairs: [
      {
        term: 'Binary Clarity',
        definition: 'Every criterion is answerable with an unambiguous YES or NO',
      },
      {
        term: 'Self-Contained',
        definition: 'Criteria can be evaluated without referencing the prompt or other external sources',
      },
      {
        term: 'Single-Check Principle',
        definition: 'Each criterion tests exactly one thing with no bundled or compound checks',
      },
      {
        term: 'Category Coverage',
        definition: 'Rubric addresses all applicable evaluation categories from structure to pitfalls',
      },
      {
        term: 'Weighting & Scoring',
        definition: 'Point values reflect the relative importance and complexity of each criterion',
      },
      {
        term: 'Specific & Testable',
        definition: 'Criteria include exact values, ranges, tolerance intervals, and no question marks for objective verification',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r5-scenario-stacked',
    scenario: 'You encounter the following rubric criterion: "Does the DCF tab exist, use WACC of 9.5% as the discount rate, and show an implied share price within 5% of $42.30? [+30]"',
    question: 'Which checklist item does this criterion fail?',
    options: [
      'Binary Clarity — the criterion is subjective',
      'Self-Contained — it does not include expected values',
      'Single-Check Principle — it bundles three distinct tests (tab existence, WACC value, share price) into one criterion',
      'Weighting & Scoring — the point value is too high',
    ],
    correctIndex: 2,
    explanation: 'This criterion bundles three separate checks: (1) does the DCF tab exist, (2) is the WACC set to 9.5%, and (3) is the implied share price within 5% of $42.30. If the tab exists and the WACC is correct but the share price is wrong, the reviewer cannot assign partial credit. It should be split into three separate criteria.',
  },
  {
    type: 'scenario',
    id: 'r5-scenario-self-containment',
    scenario: 'A rubric contains the following criterion: "Are all input assumptions entered correctly as specified in the prompt? [+15]"',
    question: 'Which checklist item does this criterion fail?',
    options: [
      'Self-Contained — it requires reading the prompt to know what values to check',
      'Binary Clarity — the criterion is subjective',
      'Category Coverage — it does not fit into any standard category',
      'Weighting & Scoring — 15 points is too many for input checks',
    ],
    correctIndex: 0,
    explanation: 'This criterion says "as specified in the prompt" without restating the actual input assumptions. A reviewer would need to leave the rubric, read the prompt, identify the assumptions, and then check the spreadsheet. It should be rewritten to list each expected input value explicitly, e.g., "Is the revenue growth rate set to 5%? [+5]".',
  },
  {
    type: 'multiple-choice',
    id: 'r5-quiz-weighting',
    question: 'A rubric assigns +10 points to every criterion, whether it tests tab existence, a complex IRR calculation, or correct formatting. How would you mark Weighting & Scoring?',
    options: [
      'Yes — points are assigned consistently',
      'Yes — as long as the total points add up correctly',
      'No — but only because the total point count is wrong',
      'No — flat weighting where all items are worth the same regardless of complexity or importance fails the checklist item',
    ],
    correctIndex: 3,
    explanation: 'Flat weighting where every criterion is worth the same amount regardless of complexity or importance fails the Weighting & Scoring checklist item. Points must differentiate: complex calculations should be weighted higher than structural/formatting checks, and negative points should penalize errors.',
  },
  {
    type: 'multiple-choice',
    id: 'r5-quiz-tolerance',
    question: 'A rubric criterion states: "Is the Year 3 EBITDA equal to $14,500,000? [+10]". What checklist item does this most clearly fail?',
    options: [
      'Binary Clarity — the criterion is ambiguous',
      'Self-Contained — it does not specify which tab to check',
      'Specific & Testable — it is missing a tolerance interval to account for minor formula or rounding differences',
      'Single-Check Principle — it tests both the value and the year',
    ],
    correctIndex: 2,
    explanation: 'Output validation criteria must include tolerance intervals. Minor differences in rounding, formula ordering, or mid-year conventions could produce a value of $14,487,000 or $14,512,000 — both arguably correct. The criterion should read something like "Is the Year 3 EBITDA approximately $14,500,000 (+/-2%)? [+10]".',
  },
  {
    type: 'multiple-choice',
    id: 'r5-quiz-best-criterion',
    question: 'Which of the following rubric criteria is the best example of a well-written criterion?',
    options: [
      '"Does the sensitivity table look reasonable and complete? [+15]"',
      '"Is the debt schedule properly structured with appropriate amortization per the prompt? [+20]"',
      '"Does the Sources & Uses tab include a row for Revolving Credit Facility with a value of $50M? [+10]"',
      '"Are the financial statements accurate and well-formatted with correct formulas? [+25]"',
    ],
    correctIndex: 2,
    explanation: 'Option C is the only criterion that passes all six checklist items: it is binary (yes/no), self-contained (specifies the tab, row label, and value), tests a single thing (one specific row), and includes a specific testable value ($50M). Option A uses subjective language ("look reasonable"), Option B references the prompt, and Option D stacks accuracy, formatting, and formula correctness into one criterion.',
  },
];
