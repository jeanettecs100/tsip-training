import { Step } from '../../shared/types';

export const reviewerModule3Steps: Step[] = [
  {
    type: 'content',
    id: 'r3-intro',
    title: 'Evaluating Spreadsheets',
    body: 'Spreadsheet evaluation is one of your core responsibilities as a reviewer. You will assess both the input and output workbooks using a four-item checklist. Each item is binary — it either passes or it does not. There is no partial credit or middle ground.',
    callout: {
      type: 'info',
      text: 'The output spreadsheet is the gold standard for the task — it exists to help visualize a good response and validate the rubric. You must ensure it meets a professional baseline across all four checklist items.',
    },
  },
  {
    type: 'content',
    id: 'r3-complexity',
    title: 'Complexity Criteria',
    body: 'Every task is tagged as Basic, Intermediate, or Advanced. The table below defines what each level looks like across four dimensions. Use this grid when evaluating whether a task meets complexity standards.',
    table: {
      headers: ['Dimension', 'Advanced', 'Intermediate', 'Basic'],
      rows: [
        [
          'Time Approximation',
          '~1 hour+ task',
          '~1 hour task',
          '~45 minute task',
        ],
        [
          'Formula Complexity',
          'Formulas involve intermediate and advanced Excel functions (INDEX/MATCH, VLOOKUP) and multi-layered nesting where 3+ functions are combined in a single formula; calculations are interdependent',
          'Formulas incorporate moderately complex functions (SUMIFS, INDEX/MATCH, nested IFs, XNPV/XIRR) or multi-step calculations where outputs from one formula feed into the next',
          'Formulas rely on standard Excel functions (SUM, AVERAGE, simple IF statements, basic cell references); calculations are single-step and standard financial logic (e.g., simple cash flow build)',
        ],
        [
          'Conceptual Complexity',
          'Task involves specialized financial structures or niche analytical frameworks that go beyond standard corporate finance (e.g., tax equity flip structures, debt sculpting with DSCR constraints, waterfall distributions with multiple hurdle rates, convertible debt)',
          'Task involves well-established but multi-step financial frameworks that require the analyst to connect several moving parts (e.g., LBO with returns analysis, DCF, M&A accretion/dilution, working capital adjustments, WACC buildup)',
          'Task involves foundational financial modeling concepts that are standard knowledge for any finance professional (e.g., three-statement model, straight-line depreciation schedules, basic budget vs. actual variance analysis, annual roll-up)',
        ],
        [
          'Model Integration',
          'Task requires LLM to reason through input pulls and output dependencies; inputs come from multiple tabs in the model and calculated outputs must be subsequently linked back into the model',
          'Task requires input pulls from more than one tab or section of the model; calculated outputs must link back into the model, but the dependency chain is straightforward and does not require the LLM to trace circular or multi-step linkages',
          'Task is a \u2018side analysis\u2019 that requires inputs from 1 tab; calculated outputs are pre-linked or do not flow back into the model',
        ],
      ],
    },
  },
  {
    type: 'content',
    id: 'r3-data-integrity',
    title: 'Checklist Item 1: Data Integrity',
    body: 'Data Integrity checks whether all formulas resolve correctly, all references are intact, and the spreadsheet is free of error values. A model with broken references or unresolved errors cannot be trusted as a reliable benchmark.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Zero error values; all formulas resolve correctly; no broken references, external links, or data vendor formulas',
          'Any error values present (#REF, #DIV/0, #N/A, #NUM); broken references; reliance on external links that do not resolve',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    callout: {
      type: 'warning',
      text: 'Auto-checks will pre-flag error values and external link dependencies. Use these flags as a starting point, but always verify by opening the workbook yourself.',
    },
  },
  {
    type: 'content',
    id: 'r3-formula-quality',
    title: 'Checklist Item 2: High-Quality Formulas',
    body: 'Formula Quality evaluates whether the spreadsheet uses dynamic, auditable formulas with clearly separated assumptions — or relies on hardcoded values embedded directly in calculations. A well-built model should be fully auditable, with every input traceable to a labeled assumption.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Dynamic formulas with clearly separated assumptions; minimal or no hardcoded values in calculations; fully auditable',
          'Hardcoded values embedded in formulas (e.g., =B5/(1+0.10)^A5 instead of referencing an input cell); unclear separation of inputs and assumptions; overly complex formulas that are difficult to audit',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          rows: [
            [
              'WACC uses cell references to cost of equity and cost of debt inputs, which are clearly labeled in an assumptions section',
              'Discount rate of 10% is typed directly into a PV formula: =B5/(1+0.10)^A5 with no labeled input cell',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r3-formatting',
    title: 'Checklist Item 3: Acceptable Formatting & Presentation',
    body: 'Formatting assesses whether the spreadsheet looks professional, is easy to read, and uses consistent conventions throughout. A clean, well-formatted model signals rigor and attention to detail.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clean, professional formatting; consistent number formats, fonts, and alignment throughout',
          'Inconsistent formatting; mixed number formats (0.156 vs 15.6% vs 16%); varying fonts; no borders or section headers; raw/messy appearance',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          rows: [
            [
              'Currency in $#,##0; percentages in 0.0%; consistent Arial 10pt; section headers bolded and bordered',
              'Some cells show 0.156, others 15.6%, others 16%; fonts vary between Calibri, Arial, and Times; no clear visual hierarchy',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r3-progression',
    title: 'Checklist Item 4: Realistic Input-to-Output Progression',
    body: 'Input-to-Output checks whether the input and output form a logical, realistic sequence — where the output represents a natural next iteration of the model. Downstream dependencies should be properly handled if a section is removed from a model.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Input and output form a realistic progression; the output represents the logical next iteration of the model with meaningful analytical additions; no pre-linked blank cells or hardcoded dependencies',
          'No logical relationship between input and output; purely cosmetic changes; input workbook represents an unrealistic state of the model',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad Example'],
          rows: [
            [
              'Operating model (input) adds a DCF valuation tab with WACC, terminal value, and implied share price (output)',
              'Task is building a returns waterfall, but input workbook contains a hardcoded returns sensitvity table',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
    ],
  },
  {
    type: 'matching',
    id: 'r3-match-checklist',
    instruction: 'Match each spreadsheet checklist item to what it checks.',
    pairs: [
      {
        term: 'Data Integrity',
        definition: 'No error values, external link dependencies, or data vendor formulas',
      },
      {
        term: 'High-Quality Formulas',
        definition: 'Dynamic, auditable formulas with clearly separated assumptions — minimal or no hardcoded values',
      },
      {
        term: 'Acceptable Formatting & Presentation',
        definition: 'Professional, consistent number formats, fonts, alignment, and presentation',
      },
      {
        term: 'Realistic Input-to-Output Progression',
        definition: 'Input and output form a logical progression with meaningful analytical additions; downstream dependencies are deleted or replaced with placeholder values',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r3-scenario-formula',
    scenario: 'You open the output workbook and notice that the present value calculation section has the discount rate typed directly into the DCF formula as =B10/(1+0.085)^A10. The cost of equity and cost of debt are also hardcoded within formulas rather than referenced from a labeled assumptions section. However, all formulas resolve without errors and the final valuation output appears reasonable.',
    question: 'How would you mark the High Quality Formulas checklist item?',
    options: [
      'Checked — all formulas resolve correctly and the output is reasonable',
      'Checked — the hardcoded values are minor since the overall model works',
      'Unchecked — the input-to-output progression is unrealistic',
      'Unchecked — hardcoded values are embedded in formulas with no separation of assumptions, making the model difficult to audit',
    ],
    correctIndex: 3,
    explanation: 'This is a clear No on Formula Quality. Multiple key assumptions (discount rate, cost of equity, cost of debt) are hardcoded directly inside formulas rather than referenced from labeled input cells. This makes the model difficult to audit — you cannot easily trace or change assumptions. The fact that formulas resolve without errors is checked by Data Integrity, not Formula Quality.',
  },
  {
    type: 'scenario',
    id: 'r3-scenario-progression',
    scenario: 'You are reviewing a task where the input workbook contains a fully built operating model with a partial LBO transaction tab built out. The input workbook contains a summary tab with the sponsor IRR and MOIC hardcoded. The spreadsheet task is to finish the LBO model by building in an exit valuation and returns waterfall section.',
    question: 'Is this a realistic input-to-output progression?',
    options: [
      'Yes — the task makes sense given the returns section is the last piece of analysis to finish an LBO model',
      'No — the hardcoded values on the summary tab should be deleted in the input workbook',
    ],
    correctIndex: 1,
    explanation: 'This is No on Input-to-Output. The input workbook represents an unrealistic state of the model, where returns metrics are somehow known without a finished returns section built into the LBO tab. The LLM is provided with a hint about the exact IRR and MOIC metrics the new section should return',
  },
  {
    type: 'multiple-choice',
    id: 'r3-quiz-error-values',
    question: 'A spreadsheet has no #REF errors but shows a few #DIV/0 values in cells that are part of a summary tab. How would you mark Data Integrity?',
    options: [
      'Unchecked — any error values (#DIV/0 included) mean the spreadsheet fails Data Integrity',
      'Checked — the errors are in non-core tab and do not affect calculations',
    ],
    correctIndex: 0,
    explanation: '#DIV/0 values are error values. The Data Integrity checklist item is binary: any error values present means the item is not satisfied — it does not matter whether they are in essential or non-essential analyses.',
  },
];
