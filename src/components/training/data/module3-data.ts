import type { Step } from '../shared/types';

export const module3Steps: Step[] = [
  {
    type: 'content',
    id: 'm3-intro',
    title: 'Prompt Writing Overview',
    body: 'A prompt explains what you want added or changed in a spreadsheet and why, written the way you would explain it to a smart coworker who knows Excel but hasn\'t seen your model before. The goal of a prompt is not to recreate an exact output spreadsheet. The goal is to describe the task and assumptions clearly enough that someone could build a reasonable solution.',
    callout: {
      type: 'info',
      text: 'The output spreadsheet represents one ideal solution, but not the only correct one. We use the output spreadsheet as an answer key for grading, not as something the prompt needs to reproduce exactly. Think of this like grading an essay: different answers can be correct even if they are written or structured differently.',
    },
  },
  {
    type: 'content',
    id: 'm3-how-to-write',
    title: 'How to Write a Good Prompt',
    body: 'Writing a good prompt is a three-step process: review your spreadsheet, draft your instructions, then review and test your prompt mentally.',
    sections: [
      {
        body: 'Step 1: Review Your Input/Output Spreadsheets. Before writing the prompt, ensure you thoroughly understand the spreadsheet task.',
        bullets: [
          'What information already exists in the spreadsheet? (raw data, assumptions, user inputs)',
          'What new analysis or behavior is added? (summaries, forecasts, scenarios, metrics)',
          'What existing parts of the model should this new work depend on or connect to?',
        ],
        callout: {
          type: 'tip',
          text: 'You are not trying to describe the final spreadsheet exactly or copy its structure. You are trying to understand the problem being solved, so you can explain it clearly.',
        },
      },
      {
        body: 'Step 2: Draft Your Instructions. Write as if you\'re explaining the task to a helpful friend who understands Excel but hasn\'t seen your model before.',
        numberedList: {
          title: 'What to Include',
          items: [
            'Start with context (1-2 sentences) — briefly explain what you already have and what you want to improve. Example: "I built an operating model and now I want to add a DCF to figure out intrinsic value..."',
            'Explain what you need (be conversational) — describe the result you want, not the exact spreadsheet layout. Instead of "Create columns A through G with the following headers..." try "I need to track vendor names, their service type, contract status, payment due dates, amounts paid, and amounts remaining."',
            'Provide the input data and assumptions (be complete) — include everything the model needs that is not already in the spreadsheet. If a hardcode exists in the output that is not in the input, you must provide it in the prompt. Do not include values that are calculated in the output spreadsheet.',
            'Describe the functionality (think outcomes, not formulas) — explain what the model should do, not how to write the formula. Instead of "Put a SUMIF formula in cell B15" try "I need to see my total spending by category, and flag any category where I\'m over budget."',
          ],
        },
      },
      {
        body: 'Step 3: Review and Test Your Prompt Mentally. Review your draft and ask yourself these questions before submitting.',
        bullets: [
          'Have I explained the analytical objective of the task?',
          'Could someone who has never seen my output spreadsheet build something functionally equivalent?',
          'Is my language natural — like I\'m actually asking for help?',
          'Have I included all required data and assumptions?',
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'm3-key-requirements',
    title: 'Key Requirements and Common Mistakes',
    body: 'Every prompt must meet these key requirements. Falling short on any of them will result in revision requests.',
    bullets: [
      '+ Clearly defined analytical objective of what is being built, rebuilt, or fixed',
      '+ Explicit inclusion of all required assumptions and inputs',
      '+ Natural, professional language that reflects your individual tone',
      '+ Leaves room for more than one correct solution',
      '- Overspecifying the spreadsheet — do not specify exact rows, columns, Excel functions, or layout unless absolutely necessary',
      '- Providing calculated values — if a number is calculated in the output, it should not appear in the prompt',
      '- Being vague about intent — if someone unfamiliar with your model wouldn\'t understand what problem you\'re solving, the prompt needs more context',
    ],
  },
  {
    type: 'content',
    id: 'm3-example-prompt',
    title: 'Example Prompt',
    body: 'Below is a real example of a strong prompt. It opens with context about the goal of the task, clearly describes what needs to be built, provides every required assumption, and uses natural language throughout. Read through the annotated breakdown to see how each section maps to the principles covered in this module.',
    annotatedExample: {
      blocks: [
        {
          label: 'Context & Analytical Objective',
          text: 'Now I want to add a discounted cash flow analysis to get an intrinsic valuation that I can compare against where the stock currently trades.',
          color: 'blue',
        },
        {
          label: 'Output Specification & Structure',
          text: 'Please create a DCF tab that calculates IHG\'s implied share price using both an exit multiple approach and a perpetuity growth approach. The DCF should pull operating data directly from the Financials tab to create a standard cash flow build from revenue to unlevered FCF. The projection period should cover 2024 through 2028, matching what is already in the Financials tab. On the right side of the DCF tab, build a WACC calculation section.',
          color: 'amber',
        },
        {
          label: 'Assumptions & Input Data',
          text: 'Pull debt, cost of debt, and tax rate from the Financials tab and for total equity, hardcode $8,168.57. Other assumptions needed are 4.28% risk-free rate, 11.06% expected market return, and 0.98 beta. Include terminal value calculations as well. For the multiple method, use 17.5x and for the perpetuity growth approach assume a growth rate of 2.24%.',
          color: 'emerald',
        },
        {
          label: 'Output Specification (Continued)',
          text: 'I\'ll also need a share price bridge for each exit method. Build from implied enterprise value to implied equity value per share and show the % upside vs. the current share price on the comps tab.',
          color: 'amber',
        },
      ],
    },
    callout: {
      type: 'tip',
      text: 'Notice that the prompt never dictates specific cells, rows, or Excel formulas. It describes the analytical outcome and provides every hardcoded assumption the builder would need, but leaves the implementation flexible.',
    },
  },
  {
    type: 'content',
    id: 'm3-example-error-prompt',
    title: 'Example "Create an Error" Prompt',
    body: 'Prompts for "Create Error" tasks work a bit differently. Instead of describing what to build, you are describing symptoms of an unknown problem propagating through your model. The key is to write as an associate who can see the errors but does not know the root causes — describe the impact you observe without giving away exactly what is broken or how to fix it.',
    annotatedExample: {
      blocks: [
        {
          label: 'Context & Analytical Objective',
          text: 'I finished my LBO valuation model which I have attached, however I am having some problems with the model that I need your help fixing. My issues I believe are occurring specifically on the Transactions page.',
          color: 'blue',
        },
        {
          label: 'Error Impact Explanation',
          text: 'First of all, my IRR is negative for some reason and I can\'t figure out what it is that I did wrong — please check my calculations leading up to my IRR value and fix whatever may be wrong. Secondly, my sensitivity table is not populating. I put in all the proper Exit Multiple & Purchase Premium sensitivity figures but the IRR values are not showing. Lastly, in my LBO Value Creation table my total % returns is not summing to 100% which I believe is not possible — please confirm if this is possible or if I did make a mistake and if so correct my calculations so it sums to 100%.',
          color: 'amber',
        },
      ],
    },
    callout: {
      type: 'tip',
      text: 'Notice how the prompt describes observable symptoms ("my IRR is negative," "my sensitivity table is not populating," "total % returns is not summing to 100%") without revealing the underlying causes. This mirrors how an analyst would actually ask for help — they know something is wrong but need someone to diagnose and fix the root issue.',
    },
  },
  {
    type: 'content',
    id: 'm3-evaluation-criteria',
    title: 'Evaluation Criteria',
    body: 'Every prompt is evaluated across five dimensions. Reviewers will run through these criteria when assessing whether your prompt is complete, clear, and acceptable.',
    table: {
      headers: ['Dimension', 'What It Measures', 'Good Example', 'Bad Example'],
      columnStyles: { 2: 'good', 3: 'bad' },
      rows: [
        [
          'Context & Analytical Objective',
          'Whether the reader can identify what business decision or analysis the model underpins and why it is important',
          '"Our PE fund is looking at a bolt-on in the specialty chemicals sector — the target generates roughly $20M of run-rate EBITDA and we need to pressure-test returns under multiple leverage scenarios..."',
          '"Build a leveraged buyout model using the assumptions below..."',
        ],
        [
          'Assumptions & Input Data',
          'Whether every required data point is explicitly supplied — zero guesswork for the builder',
          'All hardcoded figures explicitly stated: discount rate, growth assumptions, exit multiple, tax rate, and every other input needed to complete the model',
          'Minimal data provided; omits critical parameters like the discount rate or exit multiple, forcing the builder to make ad-hoc choices',
        ],
        [
          'Output Specification',
          'Whether every expected output is enumerated with exact definitions, units, and formatting requirements',
          '"Add a data table showing implied enterprise value across discount rates from 7% to 11% in half-point steps and perpetuity growth rates from 1.5% to 3.5% in half-point steps"',
          '"Show how the valuation moves when you change the key drivers"',
        ],
        [
          'Structure & Logic',
          'Whether the prompt maps out the organization of the new analysis with enough detail to reproduce the layout and computational flow',
          'Layout and computational flow clearly mapped; hierarchy of sections is explicit; describes the intended calculation in business terms',
          'No guidance on how the analysis should be organized; or dictates specific Excel functions like "apply =XNPV(...)" instead of describing the logic',
        ],
        [
          'Prompt Style',
          'How clearly and naturally the language reads — should feel like an authentic assignment from a senior banker',
          'Straightforward, professional language with a natural cadence; no machine-generated patterns; reads like a real assignment',
          'Robotic or machine-generated phrasing; relies on meta-instructions like "Populate cells A1 through G20..."',
        ],
      ],
    },
  },
  {
    type: 'multiple-choice',
    id: 'm3-quiz-dealbreaker',
    question: 'Which of the following is a prompt dealbreaker that will result in a prompt being sent back for revisions?',
    options: [
      'The first sentence of the prompt is about the latest change in the model that the VP requested',
      'The prompt contains numerical inputs needed for the new analysis',
      'The prompt is 4 paragraphs',
      'The prompt explains formula logic for how to calculate enterprise value',
    ],
    correctIndex: 3,
    explanation:
      'Prompts must assume a baseline level of financial competency. Explaining formula logic for common financial concepts (such as how to calculate enterprise value) constitutes overspecification. If the analysis includes a more complex calculation, it should be explained in natural language rather than mathematical terminology.',
  },
  {
    type: 'scenario',
    id: 'm3-scenario-overspecify',
    scenario:
      'A contributor writes this in their prompt: "In columns G-K, use SUMIFS to calculate annual figures for each line item."',
    question: 'What is the primary issue with this prompt?',
    options: [
      'It overspecifies the spreadsheet — dictating exact formulas and locations for the desired output',
      'The formula is incorrect — AVERAGEIFS should be used for annual roll-up analysis',
      'It does not include the necessary input data',
    ],
    correctIndex: 0,
    explanation:
      'This prompt reverse-engineers the output spreadsheet by specifying exact columns and Excel formulas. Instead, the contributor should describe the desired outcome: "I need an annual roll-up section showing annual figures for every line item." This leaves room for different valid implementations.',
  },
  {
    type: 'multiple-choice',
    id: 'm3-quiz-calculated-values',
    question:
      'Your output spreadsheet calculates an IRR of 18.3%. Should you include this value in your prompt?',
    options: [
      'Yes — the LLM needs to know the expected answer',
      'No — calculated values should not appear in the prompt; only include input assumptions',
    ],
    correctIndex: 1,
    explanation:
      'If a number is calculated in the output spreadsheet, it should not appear in the prompt. The prompt should only include input assumptions and data. Providing calculated values gives the LLM hints about the desired output.',
  },
];
