import type { Step } from '../shared/types';

export const module2Steps: Step[] = [
  {
    type: 'content',
    id: 'm2-intro',
    title: 'Spreadsheet Task Overview',
    body: 'Every spreadsheet task on TSIP is an input/output pair. You receive a seed workbook and transform it into two files: an input spreadsheet (the starting point) and an output spreadsheet (the finished product). The relationship between input and output should represent a realistic, meaningful analytical progression — the kind of work a competent analyst would spend roughly one hour completing.',
    callout: {
      type: 'info',
      text: 'There are three strategies for building a realistic input/output. Your job is to decide the best approach and execute it cleanly.',
    },
  },
  {
    type: 'content',
    id: 'm2-strategies',
    title: 'Three Task Creation Strategies',
    body: 'There are three strategies for turning a seed workbook into an input/output pair. If you are unsure which to use: default to Work Backward if the seed is already a complete, polished model, or Build Forward if the seed is a partial model or simple analysis that could reasonably have a section added.',
    table: {
      headers: ['Strategy', 'When to Use', 'Input', 'Output', 'Example'],
      rows: [
        [
          'Work Backward',
          'Seed is a complete model with section(s) you can strip back',
          'An intermediate version of the model (seed with section(s) removed)',
          'The next realistic iteration — adds the removed section back',
          'Seed has 3SM + comps + WACC + DCF → input is 3SM + comps, output adds WACC tab',
        ],
        [
          'Build Forward',
          'Seed is a partial or simple model that needs a section added',
          'The seed workbook as-is',
          'The seed plus a new section of analysis you build',
          'Operating model → add a DCF tab to create output',
        ],
        [
          'Create Error',
          'Seed is complete; you want to test debugging ability',
          'A version of the seed with meaningful errors introduced',
          'The correct version (the seed)',
          'Correct DCF → broken WACC formula, incorrect FCF build, mislinked by one period',
        ],
      ],
    },
    callout: {
      type: 'warning',
      text: 'Chart creation or editing is not in the current scope of spreadsheet tasks we are accepting. Tasks should focus on formula-driven analysis, not chart-based outputs.',
    },
  },
  {
    type: 'content',
    id: 'm2-work-backward',
    title: 'Strategy 1: Work Backward (Most Common)',
    body: 'In Work Backward, you use the complete seed as a reference to understand the full model, then create an input/output pair that represents a realistic "version up."',
    callout: {
      type: 'tip',
      text: 'A realistic input/output mirrors the chronological progression of the model. For example, if you received a completed LBO as your seed workbook, it would be unrealistic to strip out the Sources & Uses section for the Work Backward approach. This is often one of the first foundational sections in an LBO model and it would not make sense to have a complete model with a distribution waterfall and investor returns if the S&U did not exist.',
    },
    sections: [
      {
        body: 'When removing sections from a copy of the seed to create the input, it is imperative that you properly address dependencies of the analysis such that the integrity of the input-to-output progression is maintained. You must run through the following process checks every time.',
        bullets: [
          'Check #1 — Finding Downstream Analyses: Audit the spreadsheet to determine which sections are more downstream (i.e., dependent on other sections in the model). Delete the most downstream pieces of analysis first. Think about this as "deconstructing" the model from its final state.',
          'Check #2 — Addressing Dependencies: Even if you remove the furthest downstream analysis, there could still be leftover dependencies that were linked up to this section. If the remaining tab has cells that reference the deleted section, delete those dependencies. If the model could have realistically had placeholder assumptions, you may use hardcoded values to resolve any errors.',
        ],
      },
      {
        numberedList: {
          title: 'How to Find Dependencies',
          items: [
            'Use Ctrl+F to search the workbook for the tab name.',
            'Use Excel\'s dependency tracing functionality on key line items to see where they are linked (Alt+M+D or Ctrl+]).',
            'If you delete a tab, Ctrl+F the new workbook for "REF" and other error values to see if you\'ve caused an error to flow through.',
          ],
        },
        callout: {
          type: 'warning',
          text: 'We cannot accept unrealistic input \u2192 output tasks or spreadsheets with error values and/or pre-linked blank cells. Please ensure you follow the checks above to properly address dependencies!',
        },
      },
      {
        body: 'Below is a complete example of the Work Backward strategy. The seed workbook was a complete financial forecast and LBO model. The input was created by stripping out everything below the balance sheet on the Returns Model tab. The output spreadsheet layers back in the cash and debt service schedules, credit statistics section, integrity check section, financing fees detail, and returns analysis. Note that the sensitivity section was intentionally left out of both workbooks — this could serve as a separate task where the contributor layers in the sensitivity analysis as the final piece to complete the model.',
        exampleFiles: [
          {
            label: 'Seed Workbook',
            filename: 'Example_1_Seed.xlsx',
            url: '/training/Example_1_Seed.xlsx',
          },
          {
            label: 'Input (Intermediate Version)',
            filename: 'Example_1_Input.xlsx',
            url: '/training/Example_1_Input.xlsx',
          },
          {
            label: 'Output (Version Up)',
            filename: 'Example_1_Output.xlsx',
            url: '/training/Example_1_Output.xlsx',
          },
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'm2-build-forward',
    title: 'Strategy 2: Build Forward',
    body: 'In Build Forward, the seed workbook is often your input. You add a realistic next-step analysis to create the output. The prompt provides instructions for building that new section.',
    bullets: [
      'Seed = input → you add analysis → output is the "version up"',
      'The new section should be a logical next step that builds on what already exists in the seed',
      'If the new analysis contains many hardcoded values, feel free to include them in the input spreadsheet rather than embedding them in the prompt — this reduces prompt complexity and mirrors how analysts actually work',
    ],
    callout: {
      type: 'tip',
      text: 'Build Forward works best when the seed is a partial or simple model that has an obvious next analytical layer to add — for example, an operating model that needs a DCF tab, or a 3-statement model that needs a comps analysis.',
    },
    sections: [
      {
        body: 'Below is a complete example of the Build Forward strategy. Download the files to see how the seed becomes the input and the contributor builds a JV return waterfall on a new tab to create the output.',
        exampleFiles: [
          {
            label: 'Seed Workbook',
            filename: 'Example_2_Seed.xlsx',
            url: '/training/Example_2_Seed.xlsx',
          },
          {
            label: 'Input (Seed As-Is)',
            filename: 'Example_2_Input.xlsx',
            url: '/training/Example_2_Input.xlsx',
          },
          {
            label: 'Output (With New Analysis)',
            filename: 'Example_2_Output.xlsx',
            url: '/training/Example_2_Output.xlsx',
          },
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'm2-create-error',
    title: 'Strategy 3: Create Error',
    body: 'In Create Error, the seed serves as the correct version. You introduce realistic, meaningful errors to create the input, and the prompt asks the model to diagnose and fix it.',
    bullets: [
      'Seed = correct version (output) → you introduce realistic errors → input is the broken version',
      'The error must be sufficiently challenging — try testing it in Claude chat console first. If the model struggles to reason through it, that is a good task.',
      'Good errors can involve incorrect methodology, mislinked references, or flawed logic — not simple typos or formatting issues',
    ],
    callout: {
      type: 'tip',
      text: 'Create Error tasks are especially effective for testing analytical reasoning. The best errors require the solver to understand the underlying financial logic, not just spot a broken formula.',
    },
    sections: [
      {
        body: 'Below is a complete example of the Create Error strategy. The seed is the correct model — the contributor introduces meaningful errors including an incorrect MOIC calculation, a sensitivity table that doesn\'t populate, and an incorrect "source of returns" analysis to create the input, and the output is the fixed version.',
        exampleFiles: [
          {
            label: 'Seed Workbook',
            filename: 'Example_3_Seed.xlsx',
            url: '/training/Example_3_Seed.xlsx',
          },
          {
            label: 'Input (With Error Introduced)',
            filename: 'Example_3_Input.xlsx',
            url: '/training/Example_3_Input.xlsx',
          },
          {
            label: 'Output (Corrected Version)',
            filename: 'Example_3_Output.xlsx',
            url: '/training/Example_3_Output.xlsx',
          },
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'm2-good-change',
    title: 'What Makes a Good Change',
    body: 'A good input-to-output change is realistic, appropriately scoped, and represents genuine analytical work. It should feel like the natural next version of the model.',
    bullets: [
      '+ Realistic — the change reads like "this is the next iteration of the model"',
      '+ Appropriately scoped — one hour or more of work for a competent associate',
      '+ Analytical substance — involves building new calculations, not just formatting',
      '- Too small — purely cosmetic changes or moving cells around do not qualify',
      '- Too big — rebuilding an entire model end-to-end is over-scoped',
      '- Disconnected — the change must logically follow from what already exists in the model',
      '- Out of scope — task is outside the scope of acceptable task types (e.g., task involves chart creation, pivot tables, Excel macro workflows)',
    ],
  },
  {
    type: 'content',
    id: 'm2-complexity',
    title: 'Complexity Criteria',
    body: 'Every task is tagged as Basic, Intermediate, or Advanced. The table below defines what each level looks like across four dimensions. Use this grid when assigning a complexity level to your task.',
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
    id: 'm2-evaluation-criteria',
    title: 'Evaluation Criteria',
    body: 'Every spreadsheet task is evaluated across four dimensions. Think of these as the checklist a finance professional mentally runs through as they review an associate\u2019s model.',
    table: {
      headers: ['Dimension', 'What It Measures', 'Good Example', 'Bad Example'],
      columnStyles: { 2: 'good', 3: 'bad' },
      rows: [
        [
          'Data Integrity',
          'Every formula computes without error values, reliance on external links, or data vendor formulas',
          'All references intact; balance sheets reconcile; no #REF or #N/A errors anywhere in the workbook',
          'Widespread error values; broken external links; cells referencing deleted tabs',
        ],
        [
          'Formula Quality',
          'Calculations are dynamic and auditable with assumptions broken out into dedicated, labeled cells',
          'Terminal growth rate sits in a named cell in an inputs section; DCF formula references that cell',
          'Growth rate typed as a raw number inside a formula, e.g. =C10*(1+0.03)',
        ],
        [
          'Formatting & Presentation',
          'Polished, client-ready appearance with visual hierarchy and consistent formatting',
          'Uniform styling; consistent number formats; well-defined section headings; professional color scheme',
          'Raw data dump with scratch calculations visible; inconsistent fonts and number formats across tabs',
        ],
        [
          'I/O Progression',
          'Input and output form a coherent analytical arc — the output is the natural next layer on top of the input',
          'Input is a 3-statement model with comps; output adds a DCF tab as the natural next analytical layer',
          'No logical flow between input and output; input workbook has pre-linked blank cells or #REF errors from a deleted section in the Work Backward approach',
        ],
      ],
    },
  },
  {
    type: 'matching',
    id: 'm2-match-strategies',
    instruction: 'Match each strategy to the correct description',
    pairs: [
      {
        term: 'Work Backward',
        definition: 'Seed is a complete model; you strip a section to create the input, while output contains the previously removed analysis',
      },
      {
        term: 'Build Forward',
        definition: 'Seed becomes the input; you add a new section of analysis to create the output',
      },
      {
        term: 'Create Error',
        definition: 'Seed is the correct version; you introduce realistic errors to create the input',
      },
    ],
  },
  {
    type: 'matching',
    id: 'm2-match-dimensions',
    instruction: 'Match each evaluation dimension to its focus area',
    pairs: [
      {
        term: 'Data Integrity',
        definition: 'No error values, orphaned references, or broken external links anywhere in the workbook',
      },
      {
        term: 'Formula Quality',
        definition: 'All assumptions isolated in labeled cells; no raw numbers hardcoded inside formulas',
      },
      {
        term: 'Formatting & Presentation',
        definition: 'Polished, client-ready appearance with uniform styling across all tabs',
      },
      {
        term: 'I/O Progression',
        definition: 'Output is the natural next analytical layer built on the input',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'm2-scenario-strategy',
    scenario:
      'You receive a seed workbook containing a fully built-out LBO model with a complete debt schedule, financial statements, and returns analysis. All tabs are interconnected with dynamic formulas.',
    question: 'Which strategy should you default to for creating the input/output pair?',
    options: [
      'Work Backward — strip a downstream section from the seed to create the input, then build it back as the output',
      'Build Forward — add a new section of analysis onto the seed',
      'Create Error — introduce meaningful errors into the seed',
    ],
    correctIndex: 0,
    explanation:
      'When the seed is already a complete, polished model, the default strategy is Work Backward. You would strip a downstream section (e.g., the returns analysis) to create the input, then make sure that section is included in the output.',
  },
  {
    type: 'multiple-choice',
    id: 'm2-quiz-deletion',
    question:
      'You are using the Work Backward strategy and need to strip a section from the seed. What must you do first?',
    options: [
      'Delete the rows and columns containing the section to keep the model clean',
      'Copy the entire workbook as a backup before making any changes',
      'Run the model through an error-checking tool',
      'Audit to find the most downstream section, then remove or hardcode dependencies like linked formulas and cross-references',
    ],
    correctIndex: 3,
    explanation:
      'The two mandatory process checks are: (1) Audit the spreadsheet to determine which sections are most downstream and should be removed first, and (2) Trace dependencies and Ctrl+F the tab name on every other tab to find and delete any references to the removed section. If the remaining model could have realistically had placeholder assumptions, you may use hardcoded values to resolve errors.',
  },
  {
    type: 'multiple-choice',
    id: 'm2-quiz-sensitivity',
    question:
      'Is adding a sensitivity table a sufficiently complex task?',
    options: [
      'Yes',
      'No',
    ],
    correctIndex: 1,
    explanation:
      'No. A standalone sensitivity table is not complex enough to represent approximately one hour of skilled associate work. Sensitivity tables are typically quick to build and lack the multi-step analytical substance that TSIP tasks require. A valid task should involve building or modifying a meaningful section of analysis — such as a full DCF, debt schedule, or returns waterfall — that demands genuine financial modeling expertise.',
  },
];
