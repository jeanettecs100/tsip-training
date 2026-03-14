import { Step } from '../../shared/types';

export const reviewerModule4Steps: Step[] = [
  {
    type: 'content',
    id: 'r4-intro',
    title: 'Evaluating Prompts',
    body: 'The prompt is the foundation of every task. A well-written prompt mirrors a realistic request that a finance professional would actually make — it gives enough context, data, and structural guidance for a model to be built without guesswork. You will evaluate prompts using a five-item checklist.',
    callout: {
      type: 'info',
      text: 'A prompt that fails any checklist item cannot produce a high-quality task. Every required component — context, inputs, and desired outputs and structure — must be present for the task to effectively be completed.',
    },
  },
  {
    type: 'content',
    id: 'r4-context',
    title: 'Checklist Item 1: Context & Analytical Objective',
    body: 'This item checks whether the prompt explains why the analysis is being done. The explanation can be brief but the reader must understand the goal of the task.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clear reason for the model; reader understands the goal of the task',
          'No context provided; jumps directly into requirements without explaining why; or boilerplate explanation where the reader must infer the purpose',
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
              '"We\'re evaluating an add-on acquisition in the HVAC distribution space and need to see if it\'s accretive to our fund..."',
              '"Here are the inputs..."',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
      {
        callout: {
          type: 'tip',
          text: 'A strong context section orients you to the task at hand. It can be a single sentence while still providing clarity on the purpose and goal of the new analysis.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r4-assumptions',
    title: 'Checklist Item 2: Assumptions & Input Data',
    body: 'This item evaluates whether the prompt provides all the data needed to build the model. If a hardcoded value appears in the output but was never mentioned in the prompt, the prompt has a gap.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'All hardcoded values and data needed are provided; if a value exists in the output but not the input, it is explicitly stated in the prompt',
          'Significant data gaps where the model builder would need to guess or ask clarifying questions; key assumptions like discount rates, growth rates, or projection periods are missing',
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
              '"Layer in a DCF tab using the existing projections. Assume an 8% WACC and show implied share price based on perpetual growth terminal value (2% growth rate) and exit multiple (10x EBITDA)"',
              '"Build a DCF tab and determine implied share price with Gordon Growth and exit multiple methods"',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
      {
        callout: {
          type: 'warning',
          text: 'The bad example is missing WACC, terminal growth rate, and exit multiple — three values that would need to be guessed, creating ambiguity.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r4-outputs',
    title: 'Checklist Item 3: Outputs Specified',
    body: 'This item checks whether the prompt clearly defines what the finished product should look like — what the key outputs are and how to achieve them.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'All outputs explicitly listed and reader knows what the finished product includes',
          'Vague output requirements; or calculated values provided in the prompt (red flag — means the LLM has hints or could hardcode the answer rather than deriving it through formulas)',
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
              '"The new tab should include a sensitivity analysis showing implied share price at various WACC assumptions (8%-12% in 0.5% increments)..."',
              '"Calculate how the company\'s valuation changes by flexing various assumptions."',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
      {
        callout: {
          type: 'danger',
          text: 'Providing calculated values (e.g., "the IRR should be 14.2%") in the prompt gives the LLM hints about the desired outputs of the new analysis. Do not approve this checklist item if calculated values are given.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r4-structure',
    title: 'Checklist Item 4: Structure & Logic',
    body: 'This item evaluates whether the prompt gives enough guidance on how the analysis should be organized — the layout and calculation flow — without overspecifying exact cell locations or Excel formulas.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Structure of the analysis is clearly outlined, providing enough info to recreate the necessary sections and calculation logic',
          'No indication of how the analysis should be structured (too vague); OR exact formulas, cell references, or row positions are dictated (overspecified)',
        ],
      ],
      columnStyles: { 0: 'good', 1: 'bad' },
    },
    sections: [
      {
        table: {
          headers: ['Good Example', 'Bad (Vague)', 'Bad (Overspecified)'],
          rows: [
            [
              '"Build a debt schedule in the LBO tab showing the balance over time with mandatory amortization and optional cash sweeps. Calculate annual interest expense using average balance"',
              '"Add debt to the model"',
              '"Build a debt schedule with these line items: Beginning balance, less: Mandatory amortization (which is 2% times initial principle)..."',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad', 2: 'bad' },
          columnWidths: ['50%', '25%', '25%'],
        },
      },
      {
        callout: {
          type: 'warning',
          text: 'Overspecification is just as problematic as vagueness. When a prompt dictates exact formula logic, it reduces the task to data entry rather than testing genuine spreadsheet intelligence.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r4-style',
    title: 'Checklist Item 5: Prompt Style',
    body: 'This item assesses the writing quality and authenticity of the prompt. It should read like a natural human request with a conversational tone.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clear, direct language with natural tone; reads like a real person wrote it',
          'Clearly LLM-generated or robotic; repetitive phrasing patterns',
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
              '"I need to compare leasing vs buying our new warehouse equipment. We\'re looking at a $450K forklift fleet..."',
              '"Create a lease vs. buy analysis spreadsheet. Input fields required (blue hardcodes): Asset cost, Lease payment..."',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
      {
        callout: {
          type: 'tip',
          text: 'Telltale signs of LLM-generated prompts: bullet-point lists titled "Input fields required," phrases like "Certainly!", "Ensure the following," "meticulously crafted," "seamless integration," overly structured formatting, and lack of conversational context.',
        },
      },
    ],
  },
  {
    type: 'matching',
    id: 'r4-match-checklist',
    instruction: 'Match each prompt checklist item to its core focus.',
    pairs: [
      {
        term: 'Context & Analytical Objective',
        definition: 'Explains the purpose and goal of the analysis',
      },
      {
        term: 'Assumptions & Input Data',
        definition: 'Provides all hardcoded values and data needed to build the model without guesswork',
      },
      {
        term: 'Outputs Specified',
        definition: 'Defines what the finished product includes — outputs and required logic',
      },
      {
        term: 'Structure & Logic',
        definition: 'Describes the layout and calculation flow without overspecifying exact formulas',
      },
      {
        term: 'Prompt Style',
        definition: 'Natural, human-written language free of LLM patterns or robotic phrasing',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r4-scenario-context',
    scenario: 'You are reviewing a prompt that begins with: "Here\'s the historical data for the Company X income statement:"',
    question: 'How would you mark Context & Analytical Objective?',
    options: [
      'Checked — clear description of what to build',
      'Checked — the mention of Company X provides context',
      'Unchecked — the introduction is too short',
      'Unchecked — there is no business context, decision, or purpose',
    ],
    correctIndex: 3,
    explanation: 'This prompt jumps right into providing input data. There is no mention of a transaction, investment decision, or business scenario. The reader must infer the purpose entirely. Context & Analytical Objective requires that the prompt explain the business reason behind the analysis.',
  },
  {
    type: 'scenario',
    id: 'r4-scenario-overspec',
    scenario: 'A prompt includes: "Build a revenue build tab. Row 1 should be Units Sold. Row 2 should be Price Per Unit (=Units Sold * Average Selling Price). Row 3 should be Total Revenue (=SUM of Row 2 across all segments). Use the formula =VLOOKUP to pull historical pricing from the Data tab."',
    question: 'How would you mark Structure & Logic?',
    options: [
      'Unchecked — the prompt overspecifies formula logic, dictating exact row positions, formulas, and functions, reducing the task to data entry',
      'Checked — the prompt provides detailed structural guidance',
      'Checked — specifying formulas ensures consistency',
      'Unchecked — the prompt is too long',
    ],
    correctIndex: 0,
    explanation: 'This prompt overspecifies by dictating exact row positions, specific formulas (=SUM, =VLOOKUP), and cell references. This reduces the task to data entry rather than testing whether the model builder can structure the analysis themselves.',
  },
  {
    type: 'multiple-choice',
    id: 'r4-quiz-style',
    question: 'Which of the following is the strongest indicator that a prompt is LLM-generated?',
    options: [
      'The prompt uses industry-specific jargon and abbreviations',
      'The prompt references a specific company and transaction context',
      'The prompt uses casual language like "hey, can you throw together a quick model"',
      'The prompt includes the text: "Certainly! Input fields required:" followed by structured key-value pairs',
    ],
    correctIndex: 3,
    explanation: 'Option D is clearly a pasted response from an LLM conversation. Industry jargon, specific company references, and casual tone are all indicators of authentic human writing.',
  },
  {
    type: 'multiple-choice',
    id: 'r4-quiz-assumptions',
    question: 'A prompt instructs to add a DCF analysis with an 8.5% WACC, 2.5% terminal growth rate, and 5-year projection period. How would you mark Assumptions & Input Data?',
    options: [
      'Checked — the prompt clearly states the assumed values for the fundamental inputs for a DCF',
      'Checked — the general task is defined which is sufficient',
      'Unchecked — the LLM is provided with hints for calculated values',
      'Unchecked — the prompt does not mention which company',
    ],
    correctIndex: 0,
    explanation: 'The Assumptions & Input Data criterion is satisfied. The prompt explicitly provides values for the key assumptions driving the analysis — discount rate, terminal growth rate, and projection period.',
  },
];
