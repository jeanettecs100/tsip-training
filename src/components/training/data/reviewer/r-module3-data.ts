import { Step } from '../../shared/types';

export const reviewerModule3Steps: Step[] = [
  {
    type: 'content',
    id: 'r3-intro',
    title: 'Evaluating Spreadsheets',
    body: 'Spreadsheet evaluation is one of your core responsibilities as a reviewer. You will assess both the input and output workbooks using a five-item yes/no checklist. Each item is binary — it either passes or it does not. There is no partial credit or middle ground.',
    callout: {
      type: 'info',
      text: 'The deliverable spreadsheet is a reference — it exists to help visualize a good response and validate the rubric. You must ensure it meets a professional baseline across all five checklist items.',
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
          'Zero error values; all formulas resolve correctly; no broken references or external links',
          'Any error values present (#REF, #DIV/0, #N/A, #NUM); broken references; reliance on external links that do not resolve',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    callout: {
      type: 'warning',
      text: 'Auto-checks will often pre-flag error values and external link dependencies. Use these flags as a starting point, but always verify by opening the workbook yourself.',
    },
  },
  {
    type: 'content',
    id: 'r3-formula-quality',
    title: 'Checklist Item 2: Formula Quality',
    body: 'Formula Quality evaluates whether the spreadsheet uses dynamic, auditable formulas with clearly separated assumptions — or relies on hardcoded values embedded directly in calculations. A well-built model should be fully auditable, with every input traceable to a labeled assumption.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Dynamic formulas with clearly separated assumptions; no hardcoded values in calculations; fully auditable',
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
    title: 'Checklist Item 3: Formatting',
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
              'Some cells show 0.156, others 15.6%, others 16%; fonts vary between Calibri, Arial, and Times; no borders',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r3-business-realism',
    title: 'Checklist Item 4: Business Realism',
    body: 'Business Realism evaluates whether the task represents a genuine analyst workflow with appropriate scope. The task should reflect something a finance professional would actually build — not a trivial exercise or an impossibly broad rebuild.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clear, realistic business application; genuine analyst workflow; approximately 1 hour of skilled work',
          'No clear business purpose; purely cosmetic changes (reformatting headers, changing fonts); or over-scoped (rebuilding an entire model from scratch)',
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
              'Adding a multi-tranche debt schedule to an LBO model and flowing interest expense to the income statement',
              'Reformatting headers and changing the font from Calibri to Arial across all tabs',
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
    title: 'Checklist Item 5: Input-to-Output',
    body: 'Input-to-Output checks whether the input and output form a logical, realistic sequence — where the output represents a natural next iteration of the model. The change should be analytically meaningful and follow a logical prerequisite chain.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Input and output form a realistic progression; the output represents the logical next iteration of the model with meaningful analytical additions',
          'No logical relationship between input and output; purely cosmetic changes; output skips logical prerequisite steps; or output is just links to existing data with no new analysis',
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
              'Operating model (input) output is a returns sensitivity analysis but transaction model is not built out — skips prerequisite steps',
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
        definition: 'No error values, broken references, or external link dependencies',
      },
      {
        term: 'Formula Quality',
        definition: 'Dynamic, auditable formulas with clearly separated assumptions — no hardcoded values',
      },
      {
        term: 'Formatting',
        definition: 'Professional, consistent number formats, fonts, alignment, and presentation',
      },
      {
        term: 'Business Realism',
        definition: 'Task represents a genuine analyst workflow with realistic scope',
      },
      {
        term: 'Input-to-Output',
        definition: 'Input and output form a logical progression with meaningful analytical additions',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r3-scenario-formula',
    scenario: 'You open the output workbook and notice that the WACC calculation section has the discount rate typed directly into the DCF formula as =B10/(1+0.085)^A10. The cost of equity and cost of debt are also hardcoded within formulas rather than referenced from a labeled assumptions section. However, all formulas resolve without errors and the final valuation output appears reasonable.',
    question: 'How would you mark the Formula Quality checklist item?',
    options: [
      'Yes — all formulas resolve correctly and the output is reasonable',
      'No — hardcoded values are embedded in formulas with no separation of assumptions, making the model difficult to audit',
      'Yes — the hardcoded values are minor since the overall model works',
      'No — the output is unreasonable',
    ],
    correctIndex: 1,
    explanation: 'This is a clear No on Formula Quality. Multiple key assumptions (discount rate, cost of equity, cost of debt) are hardcoded directly inside formulas rather than referenced from labeled input cells. This makes the model difficult to audit — you cannot easily trace or change assumptions. The fact that formulas resolve without errors is checked by Data Integrity, not Formula Quality.',
  },
  {
    type: 'scenario',
    id: 'r3-scenario-cosmetic',
    scenario: 'You are reviewing a task where the input workbook contains a fully built operating model. The output workbook adds a tab that reformats the income statement headers and changes the font from Calibri to Arial across all tabs. No new analysis, calculations, or analytical content has been added.',
    question: 'How would you mark Business Realism and Input-to-Output?',
    options: [
      'Both Yes — formatting improvements are a valid task',
      'Business Realism: No, Input-to-Output: Yes — the progression is logical even if not realistic',
      'Both No — purely cosmetic changes with no analytical substance or logical progression',
      'Business Realism: Yes, Input-to-Output: No — formatting is realistic work but the progression is minimal',
    ],
    correctIndex: 2,
    explanation: 'Both items are No. Reformatting headers and changing fonts are purely cosmetic changes with no clear business purpose (Business Realism fails) and no meaningful analytical progression from input to output (Input-to-Output fails). A passing task requires genuine analytical work that a finance professional would actually perform.',
  },
  {
    type: 'scenario',
    id: 'r3-scenario-progression',
    scenario: 'You are reviewing a task where the input workbook contains a basic operating model with revenue and expense projections. The output workbook adds a returns sensitivity analysis showing IRR across various entry multiples and leverage ratios. However, the operating model has no transaction structure — there is no purchase price, no sources and uses, and no debt schedule. The sensitivity analysis references a transaction tab that does not exist.',
    question: 'How would you mark Input-to-Output?',
    options: [
      'Yes — the sensitivity analysis is a valuable analytical addition',
      'No — the output skips logical prerequisite steps (the transaction structure must be built before a returns sensitivity analysis can work)',
      'Yes — the intent is clear even if there are minor structural issues',
      'No — the sensitivity analysis is not a useful output',
    ],
    correctIndex: 1,
    explanation: 'This is No on Input-to-Output. A returns sensitivity analysis requires prerequisite steps that have not been built — specifically the transaction structure (purchase price, sources and uses, debt schedule). The output skips a logical prerequisite step, and the sensitivity analysis references a tab that does not exist. The intent may be clear, but the execution breaks the logical chain.',
  },
  {
    type: 'multiple-choice',
    id: 'r3-quiz-error-values',
    question: 'A spreadsheet has no critical errors (#REF, #DIV/0) but shows a few #N/A values in cells that are part of a VLOOKUP reference table used for optional commentary fields. How would you mark Data Integrity?',
    options: [
      'Yes — the errors are in non-essential cells and do not affect calculations',
      'No — any error values (#N/A included) mean the spreadsheet fails Data Integrity',
      'Yes — #N/A errors are not real errors',
      'No — but only because VLOOKUP should be replaced with INDEX/MATCH',
    ],
    correctIndex: 1,
    explanation: '#N/A values are error values. The Data Integrity checklist item is binary: any error values present means the item is marked No. It does not matter whether they are in essential or non-essential cells — the standard is zero error values. The contributor should fix the VLOOKUP to handle missing values (e.g., with IFERROR) before the task can pass.',
  },
];
