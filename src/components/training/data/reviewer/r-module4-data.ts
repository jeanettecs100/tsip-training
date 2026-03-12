import { Step } from '../../shared/types';

export const reviewerModule4Steps: Step[] = [
  {
    type: 'content',
    id: 'r4-intro',
    title: 'Evaluating Prompts',
    body: 'The prompt is the foundation of every task. A well-written prompt mirrors a realistic request that a banker or analyst would actually make — it gives enough context, data, and structure for a model to be built without guesswork. You will evaluate prompts using a five-item yes/no checklist.',
    callout: {
      type: 'info',
      text: 'A prompt that fails any checklist item cannot produce a high-quality task. If the prompt is weak, the entire task needs rework.',
    },
  },
  {
    type: 'content',
    id: 'r4-context',
    title: 'Checklist Item 1: Context & Analytical Objective',
    body: 'This item checks whether the prompt explains why the analysis is being done. The reader should understand what decision or analysis the model supports and why it matters — not just what to build.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clear reason for the model; reader understands what decision or analysis this supports and why it matters',
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
              '"Create an accretion/dilution model for an M&A transaction with the following inputs..."',
            ],
          ],
          columnStyles: { 0: 'good', 1: 'bad' },
        },
      },
      {
        callout: {
          type: 'tip',
          text: 'A strong context sounds like something a VP would say in a meeting: specific industry, specific purpose, specific stakes. A weak context reads like a textbook exercise.',
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
    body: 'This item checks whether the prompt clearly defines what the finished product should look like — what outputs to produce, how they should be formatted, and how they relate to each other.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'All outputs explicitly listed with definitions; reader knows exactly what the finished product includes',
          'Vague output requirements; or calculated values provided in the prompt (red flag — means the model builder could hardcode the answer rather than deriving it through formulas)',
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
          text: 'Providing calculated values (e.g., "the IRR should be 14.2%") in the prompt is a red flag. It means the model builder could hardcode the answer rather than deriving it. Mark Outputs Specified as No if calculated values are given.',
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'r4-structure',
    title: 'Checklist Item 4: Structure & Logic',
    body: 'This item evaluates whether the prompt gives enough guidance on how the analysis should be organized — the layout, visual hierarchy, and calculation flow — without overspecifying the actual formulas.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Structure of the analysis is clearly outlined, providing enough info to recreate visual hierarchy and calculation logic',
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
    body: 'This item assesses the writing quality and authenticity of the prompt. It should read like a natural human request — the kind of message you would actually send to a colleague or analyst.',
    table: {
      headers: ['Criteria is met when', 'Criteria is not met when'],
      rows: [
        [
          'Clear, direct language with natural tone; reads like a real person wrote it',
          'Clearly LLM-generated or robotic; uses meta-language, overly structured formatting, or obvious AI patterns',
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
              '"Create a lease vs. buy analysis spreadsheet. Input fields required: Asset cost, Lease payment..."',
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
        definition: 'Explains why the analysis is being done and what decision it supports',
      },
      {
        term: 'Assumptions & Input Data',
        definition: 'Provides all hardcoded values and data needed to build the model without guesswork',
      },
      {
        term: 'Outputs Specified',
        definition: 'Defines what the finished product includes — outputs, formats, and relationships',
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
    scenario: 'You are reviewing a prompt that reads: "Build a three-statement financial model for Company X. The model should include an income statement, balance sheet, and cash flow statement with projections for 5 years. Use the provided historical data."',
    question: 'How would you mark Context & Analytical Objective?',
    options: [
      'Yes — the prompt clearly describes what to build',
      'No — the prompt tells the reader what to build but not why; there is no business context, decision, or purpose',
      'Yes — the prompt mentions Company X which provides context',
      'No — the prompt is too short',
    ],
    correctIndex: 1,
    explanation: 'This prompt describes what to build (a three-statement model) but gives no indication of why. There is no mention of a transaction, investment decision, or business scenario. The reader must infer the purpose entirely. Context & Analytical Objective requires that the prompt explain the business reason behind the analysis.',
  },
  {
    type: 'scenario',
    id: 'r4-scenario-overspec',
    scenario: 'A prompt includes: "Build a revenue build tab. Row 1 should be Units Sold. Row 2 should be Price Per Unit (=Units Sold * Average Selling Price). Row 3 should be Total Revenue (=SUM of Row 2 across all segments). Use the formula =VLOOKUP to pull historical pricing from the Data tab."',
    question: 'How would you mark Structure & Logic?',
    options: [
      'Yes — the prompt provides detailed structural guidance',
      'No — the prompt overspecifies formula logic, dictating exact row positions, formulas, and functions, reducing the task to data entry',
      'Yes — specifying formulas ensures consistency',
      'No — the prompt is too long',
    ],
    correctIndex: 1,
    explanation: 'This prompt overspecifies by dictating exact row positions, specific formulas (=SUM, =VLOOKUP), and cell references. This reduces the task to data entry rather than testing whether the model builder can structure the analysis themselves. Structure & Logic should describe the layout and flow without dictating implementation details.',
  },
  {
    type: 'multiple-choice',
    id: 'r4-quiz-style',
    question: 'Which of the following is the strongest indicator that a prompt is LLM-generated?',
    options: [
      'The prompt uses industry-specific jargon and abbreviations',
      'The prompt includes a bulleted list titled "Input fields required" followed by structured key-value pairs',
      'The prompt references a specific company and transaction context',
      'The prompt uses casual language like "hey, can you throw together a quick model"',
    ],
    correctIndex: 1,
    explanation: 'Structured lists titled "Input fields required" with key-value formatting are a hallmark of LLM-generated prompts. Real analysts communicate in natural prose with conversational context. Industry jargon, specific company references, and casual tone are all indicators of authentic human writing.',
  },
  {
    type: 'multiple-choice',
    id: 'r4-quiz-assumptions',
    question: 'A prompt asks the model builder to "add a DCF analysis" but does not specify the discount rate, terminal growth rate, or projection period. How would you mark Assumptions & Input Data?',
    options: [
      'Yes — the general task is defined which is sufficient',
      'No — the discount rate, terminal growth rate, and projection period are fundamental inputs for a DCF; without them the model builder would need to guess',
      'Yes — these are standard assumptions that any analyst would know',
      'No — but only because the prompt does not mention which company',
    ],
    correctIndex: 1,
    explanation: 'The discount rate, terminal growth rate, and projection period are fundamental inputs for a DCF. Without them, the model builder must guess, creating ambiguity in both the output and the rubric. Assumptions & Input Data requires that all values needed to build the model are explicitly provided.',
  },
];
