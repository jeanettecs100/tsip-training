import type { Step } from '../shared/types';

export const module4Steps: Step[] = [
  {
    type: 'content',
    id: 'm4-intro',
    title: 'Rubric Writing Overview',
    body: 'Rubrics are how we automatically grade AI performance. Each rubric is a list of binary (yes/no) questions, each worth positive or negative points. When an AI attempts your task, the AI\'s output spreadsheet is checked across the criteria and received a score. The higher the score, the better the AI performed. Your rubric defines what "perfect" looks like for your specific task.',
    callout: {
      type: 'info',
      text: 'A rubric is a grading checklist for the AI\'s output spreadsheet. A good rubric makes scoring consistent and reliable.',
    },
  },
  {
    type: 'content',
    id: 'm4-rubric-structure',
    title: 'Rubric Structure',
    body: 'Rubrics should be organized according to the following categories. All categories are required in almost all cases — exception include tasks without hardcoded inputs in the prompt (no Input Data Accuracy section) and "Create an Error" tasks (no Structural Completenss or Input Data Accuracy sections)',
    callout: {
      type: 'warning',
      text: 'In line with prompt input value requirements, all inputs and outputs checked in the rubric should include at least 1 decimal point and not be rounded any further.',
    },
    table: {
      headers: ['Category', 'What It Tests', 'Example Criteria'],
      rows: [
        [
          'Structural Completeness',
          'Are required components/sections present?',
          'Does the spreadsheet contain a P&L section with Revenue, COGS, Gross Profit, and Net Income lines? [+10]',
        ],
        [
          'Input Data Accuracy',
          'Are provided values entered correctly?',
          'Is the initial investment amount set to $500,000? [+5]',
        ],
        [
          'Formula Correctness',
          'Are calculations implemented correctly?',
          'Is NPV calculated as the sum of discounted cash flows using: CF \u00f7 (1 + r)^t? [+15]',
        ],
        [
          'Dynamic Functionality',
          'Does the model behave correctly when inputs change?',
          'When the growth rate is changed from 5% to 10%, does Year 2 revenue update from $105 to $110? [+15]',
        ],
        [
          'Output Validation',
          'Are final results within expected ranges?',
          'Is the sponsor IRR equal to 14.5% (±1%)? [+15]',
        ],
        [
          'Model Quality & Pitfalls',
          'Is the spreadsheet well-constructed and error-free?',
          'Does the spreadsheet contain any Excel error values (#REF!, #N/A, #DIV/0!, etc.)? [-20]',
        ],
      ],
    },
  },
  {
    type: 'content',
    id: 'm4-how-to-write',
    title: 'How to Write a Good Rubric',
    body: 'Writing a good rubric hinges on your ability to organize your checks into the designated categories, identify what matters most, and adhere to the rubric must-haves.',
    sections: [
      {
        body: 'Step 1: Write at least 4 criteria for each of the applicable rubric categories:',
        bullets: [
          'Structural Completeness — did the LLM build the right sections/tabs?',
          'Input Data Accuracy — did the LLM enter assumptions correctly?',
          'Formula Correctness — are calculations right?',
          'Dynamic Functionality — does the analysis update when inputs change?',
          'Output Validation — are key outputs correct within a tolerance interval?',
          'Model Quality & Pitfalls — no Excel errors, professional formatting, etc.',
        ],
      },
      {
        body: 'Step 2: Identify what matters most and assign weightings accordingly. The point values do not need to sum to a specific total, but the relative weighting between criteria must effectively identify the most important aspects of the desired output.',
        bullets: [
          'Example (segment revenue build): "Does the revenue Build tab exist?," "Do segment totals link to the Financial statements?," and "Does changing the growth rate update the forecast?" should be more heavily weighted than "Is YoY growth included as a memo line?" and "Are the units clearly labeled as $ in millions?"',
        ],
      },
      {
        body: 'Step 3: Ensure your rubric is compliant with the following must-haves:',
        bullets: [
          '+ Self Containment — criteria with no references to the prompt or other sources',
          '+ Specificity & Testibility — questions referring to concrete values and observable conditions; tolerance intervals included in all output validation checks; all criteria end with a question mark',
          '+ Binary Clarity — answerable with YES or NO',
          '+ Single-Check Principle — One thing tested at a time',
        ],
      },
    ],
  },
  {
    type: 'content',
    id: 'm4-weighting',
    title: 'Weighting Philosophy',
    body: 'Points should reflect the importance of what each criterion tests. Higher-weight checks should test harder, more mission-critical items. Include negative values to deduct points for common pitfalls like error values.',
    callout: {
      type: 'warning',
      text: 'All point values must be multiples of 5. Positive values range from +5 to +30, and negative values range from -10 to -25.',
    },
    table: {
      headers: ['Weight Range', 'Criteria Type', 'Examples'],
      rows: [
        [
          '+15 to +30',
          'Formulas requiring domain knowledge; complex logic with edge cases; critical outputs; functionality demonstrating proper construction',
          'main deliverable outputs; NPV/IRR calculations; functionality of scenario toggle',
        ],
        [
          '+10 to +15',
          'Structural completeness; standard formulas; secondary outputs',
          'Required sections exist; SUM/AVERAGE formulas; supporting schedules',
        ],
        [
          '+5 to +10',
          'Input data accuracy; formatting/organization; labels and headers',
          'Correct values copied from prompt; visual separation of inputs; row labels present',
        ],
        [
          '-10 to -25',
          'Pitfalls: presence of errors, broken references, circular reference problems',
          '#REF!, #N/A, #DIV/0! errors; broken external links; unintentional circular references',
        ],
      ],
    },
  },
  {
    type: 'content',
    id: 'm4-key-requirements',
    title: 'Key Requirements and Common Mistakes',
    body: 'Every rubric must meet these key requirements. Falling short on any of them will result in revision requests.',
    bullets: [
      '+ Self-contained criteria — each criterion must be evaluable using only itself and the spreadsheet, never referencing the prompt',
      '+ Specific questions referring to concrete values and observable conditions',
      '+ Tolerance intervals included in all output validation checks',
      '+ Binary YES/NO questions — every criterion must be answerable with a simple yes or no',
      '+ One thing at a time — each criterion tests exactly one discrete item',
      '- Bundling multiple checks into one line',
      '- Vague wording or questions that are not answerable with Yes or No',
      '- Referencing the prompt instead of writing the requirement directly into the criterion',
    ],
  },
  {
    type: 'content',
    id: 'm4-example-rubric',
    title: 'Example Rubric',
    body: 'Below is a complete rubric for a DCF analysis task. Notice how each section targets a different evaluation dimension, criteria are atomic and self-contained, and point values reflect relative importance.',
    sections: [
      {
        body: 'Structural Completeness',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['1.1', 'Does the workbook contain a new DCF tab with a discounted cash flow analysis for Apple?', '+10'],
            ['1.2', 'Does the DCF tab include a cash flow build section with projection columns covering 2024 through 2028 (five projection years matching the Financials tab)?', '+10'],
            ['1.3', 'Does the DCF tab include a WACC calculation section (visually separated from the cash flow build, e.g., to the right or below)?', '+10'],
            ['1.4', 'Does the DCF tab include terminal value calculations for both an exit multiple approach and a perpetuity growth approach?', '+10'],
            ['1.5', 'Does the DCF tab include a share price bridge for the exit multiple method that builds from implied enterprise value through to implied equity value per share and shows % upside versus current share price?', '+10'],
            ['1.6', 'Does the DCF tab include a share price bridge for the perpetuity growth method that builds from implied enterprise value through to implied equity value per share and shows % upside versus current share price?', '+10'],
          ],
        },
      },
      {
        body: 'Input Data Accuracy',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['2.1', 'Is the total equity value hardcoded (not formula-driven) at $8,168.57 in the WACC calculation section?', '+5'],
            ['2.2', 'Is the risk-free rate equal to 4.28%?', '+5'],
            ['2.3', 'Is the expected market return equal to 11.06%?', '+5'],
            ['2.4', 'Is the beta equal to 0.98?', '+5'],
            ['2.5', 'Is the EBITDA exit multiple equal to 17.5x (\u00b10.05x)?', '+5'],
            ['2.6', 'Is the perpetuity growth rate equal to 2.24%?', '+5'],
          ],
        },
      },
      {
        body: 'Formula Correctness',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['3.1', 'Is Cost of Equity calculated using the CAPM formula: Risk-Free Rate + Beta \u00d7 (Expected Market Return \u2212 Risk-Free Rate)?', '+25'],
            ['3.2', 'Is WACC calculated as (Cost of Equity \u00d7 Equity Weight) + (After-Tax Cost of Debt \u00d7 Debt Weight), where weights are based on Total Equity and Total Debt as proportions of total capitalization?', '+25'],
            ['3.3', 'Does the cash flow build pull revenue, EBITDA (or its component margins), D&A, CapEx, and change in working capital from the Financials tab via cell references (not hardcoded)?', '+20'],
            ['3.4', 'Is unlevered free cash flow calculated as EBIT \u00d7 (1 \u2212 Tax Rate) + D&A \u2212 CapEx \u2212 Change in Working Capital, or an equivalent formulation that arrives at the same result?', '+25'],
            ['3.5', 'Is the terminal value under the exit multiple method calculated as the final projection period EBITDA multiplied by the exit multiple?', '+20'],
            ['3.6', 'Is the terminal value under the perpetuity growth method calculated as the final projection period unlevered FCF \u00d7 (1 + growth rate) \u00f7 (WACC \u2212 growth rate)?', '+20'],
            ['3.7', 'Are projected unlevered free cash flows and terminal values discounted back to present value using the formula 1 \u00f7 (1 + WACC)^n, where n represents the number of years from the valuation date?', '+15'],
            ['3.8', 'Is implied enterprise value calculated as the sum of discounted projected free cash flows plus the present value of the terminal value?', '+20'],
            ['3.9', 'Does the equity bridge subtract debt and add cash (and adjust for any preferred stock or minority interest if applicable) to convert from implied enterprise value to implied equity value?', '+20'],
            ['3.10', 'Is implied equity value per share calculated by dividing implied equity value by diluted shares outstanding?', '+15'],
          ],
        },
      },
      {
        body: 'Dynamic Functionality',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['4.1', 'When the EBITDA exit multiple is increased, does the implied share price under the exit multiple method increase?', '+15'],
            ['4.2', 'When the perpetuity growth rate is increased, does the implied share price under the perpetuity growth method increase?', '+15'],
            ['4.3', 'When the risk-free rate is increased, does WACC increase and do both implied share prices decrease?', '+15'],
            ['4.4', 'When a revenue projection on the Financials tab is changed, does the corresponding revenue on the DCF tab update, and do downstream unlevered FCF and implied share prices also update?', '+20'],
            ['4.5', 'When beta is increased, does cost of equity increase and WACC increase?', '+15'],
          ],
        },
      },
      {
        body: 'Output Validation',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['5.1', 'Is the Cost of Equity 10.92% (\u00b10.5%)?', '+15'],
            ['5.2', 'Is WACC approximately 8.96% (\u00b10.5%)?', '+15'],
            ['5.3', 'Is the 2024 (first projection year) unlevered free cash flow $672 (\u00b12%)?', '+15'],
            ['5.4', 'Is the 2028 (final projection year) unlevered free cash flow $2,783 (\u00b12%)?', '+15'],
            ['5.5', 'Is the terminal value under the exit multiple method $35,370 (\u00b12%)?', '+15'],
            ['5.6', 'Is the present value of the terminal value under the exit multiple method $23,030 (\u00b12%)?', '+15'],
            ['5.7', 'Is the implied enterprise value under the exit multiple method $30,515 (\u00b12%)?', '+15'],
            ['5.8', 'Is the implied equity value under the exit multiple method $29,567 (\u00b12%)?', '+15'],
            ['5.9', 'Is the implied share price under the exit multiple method $190 (\u00b15%)?', '+15'],
            ['5.10', 'Is the terminal value under the perpetuity growth method $42,350 (\u00b12%)?', '+15'],
            ['5.11', 'Is the present value of the terminal value under the perpetuity growth method $27,578 (\u00b12%)?', '+15'],
            ['5.12', 'Is the implied enterprise value under the perpetuity growth method $35,062 (\u00b12%)?', '+15'],
            ['5.13', 'Is the implied equity value under the perpetuity growth method $34,114 (\u00b12%)?', '+15'],
            ['5.14', 'Is the implied share price under the perpetuity growth method $219 (\u00b15%)?', '+15'],
          ],
        },
      },
      {
        body: 'Model Quality and Pitfalls',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['6.1', 'Does the workbook contain any Excel error values (#REF!, #N/A, #DIV/0!, #VALUE!, #NAME?, #NUM!) on the DCF tab?', '-10'],
            ['6.2', 'Are any key outputs (e.g., WACC, unlevered FCF, terminal value, implied enterprise value, implied share price) hardcoded rather than formula-driven?', '-15'],
            ['6.3', 'Does the workbook contain external links to other workbooks/files?', '-10'],
            ['6.4', 'Are all major dollar-denominated sections on the DCF tab consistently scaled to the same unit system (no mixed units between the cash flow build and the bridge calculations)?', '+10'],
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'm4-example-error-rubric',
    title: 'Example "Create an Error" Rubric',
    body: '"Create an Error" tasks ask the contributor to intentionally introduce specific errors into a working spreadsheet. Because the model is already built, these rubrics skip Structural Completeness and Input Data Accuracy and focus on whether the errors were fixed and the model functions as expected.',
    sections: [
      {
        body: 'Formula Correctness',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['1.1', 'Is MOIC calculated as Exit Equity \u00f7 Equity Investment?', '+25'],
            ['1.2', 'Is IRR calculated using Equity Investment as the initial outflow and Exit Equity as the terminal inflow over the holding period?', '+20'],
            ['1.3', 'Is the IRR sensitivity table output linked to the IRR result cell (not a blank cell)?', '+25'],
            ['1.4', 'Is Total % Return in the LBO Value Creation table calculated as the sum of the component % returns using the correct sign conventions so that the total equals 100%?', '+25'],
          ],
        },
      },
      {
        body: 'Dynamic Functionality',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['2.1', 'When the Exit EV/EBITDA multiple used in the exit section is increased, does MOIC increase?', '+15'],
            ['2.2', 'When the Exit EV/EBITDA multiple is increased, does IRR increase?', '+20'],
            ['2.3', 'When any Exit Multiple assumption in the sensitivity table is increased, do the IRR values in that column increase?', '+15'],
            ['2.4', 'When any Purchase Premium assumption in the sensitivity table is increased, do the IRR values in that row decrease?', '+20'],
          ],
        },
      },
      {
        body: 'Output Validation',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['3.1', 'Is MOIC = 3.10x (\u00b11%)?', '+15'],
            ['3.2', 'Is IRR = 25.4% (\u00b11%)?', '+15'],
            ['3.3', 'Is Total % Return = 100.00% (\u00b11%)?', '+15'],
            ['3.4', 'Is Exit Enterprise Value = 5,052 (\u00b11%)?', '+15'],
            ['3.5', 'Is Total Attributed Returns = 2,882.82 (\u00b11%)?', '+15'],
            ['3.6', 'Is Equity Investment = 1,370.02 (\u00b11%)?', '+15'],
          ],
        },
      },
      {
        body: 'Model Quality and Pitfalls',
        table: {
          headers: ['#', 'Criterion', 'Points'],
          rows: [
            ['4.1', 'Does the Transactions page contain any Excel error values (#REF!, #DIV/0!, #VALUE!, #NAME?, #NUM!, #N/A)?', '-10'],
            ['4.2', 'Is MOIC still calculated as Equity Investment \u00f7 Exit Equity?', '-15'],
            ['4.3', 'Is the sensitivity table reference cell still linked to a blank cell instead of the IRR output?', '-15'],
            ['4.4', 'Does the Total % Return still fail to equal 100% due to incorrect summing of positive/negative components?', '-15'],
          ],
        },
      },
    ],
  },
  {
    type: 'content',
    id: 'm4-evaluation-criteria',
    title: 'Evaluation Criteria',
    body: 'Every rubric is evaluated across six dimensions. Each criterion you write should satisfy these rules — they are the difference between a rubric that produces consistent, reliable scores and one that leads to grading disputes.',
    table: {
      headers: ['Dimension', 'What It Measures', 'Good Example', 'Bad Example'],
      columnStyles: { 2: 'good', 3: 'bad' },
      rows: [
        [
          'Binary Clarity',
          'Each criterion is structured as an unambiguous YES/NO check that evaluates a single item',
          '"Does the model include an on/off toggle for the acquisition? [+10]"',
          '"Does the model look good?" or "Are the projections accurate?"',
        ],
        [
          'Self-Containment',
          'Each criterion is fully evaluable from the rubric and spreadsheet alone — no outside documents needed',
          '"Is the initial investment amount set to $500,000? [+5]"',
          '"Are the correct input values entered per the prompt? [+5]"',
        ],
        [
          'Single-Check Principle',
          'One criterion evaluates one discrete item — never bundles multiple checks together',
          '"Does the Revenue Build tab exist? [+10]" and separately "Do segment totals tie to the Financials tab? [+15]"',
          '"Does the Revenue Build tab exist with correct segment totals that tie to Financials and update dynamically? [+25]"',
        ],
        [
          'Category Coverage',
          'Rubric spans all applicable evaluation categories with a minimum of four criteria per category',
          'Criteria across Structural Completeness, Input Data Accuracy, Formula Correctness, Dynamic Functionality, Output Validation, and Model Quality & Pitfalls',
          'Only tests whether tabs exist; ignores Formula Correctness, Dynamic Functionality, and Output Validation entirely',
        ],
        [
          'Weighting & Scoring',
          'Point allocations reflect the relative significance of each criterion',
          'NPV calculation: +25; required tab exists: +10; correct section labels: +5; Excel errors present: -15',
          'Every criterion worth +10 regardless of whether it tests tab existence or complex IRR logic',
        ],
        [
          'Specificity & Testability',
          'References concrete values, defined ranges, or directly observable conditions with tolerance bands',
          '"If base case assumptions flow through, is the IRR 11.2% (\u00b10.5%)? [+20]"',
          '"Is the revenue $200? [+5]" (missing year, missing tolerance)',
        ],
      ],
    },
  },
  {
    type: 'scenario',
    id: 'm4-scenario-atomic',
    scenario:
      'A rubric criterion reads: "Is revenue projected for 5 years starting at $4.2B with declining growth starting at 12% decreasing 1.5pp per year, and is unlevered free cash flow calculated for each projection year?"',
    question: 'What is the primary issue with this criterion?',
    options: [
      'The values are incorrect — growth should start higher',
      'It is not self-contained — references to the prompt render it an invalid criterion',
      'It tests three separate things in one criterion (bundled)',
    ],
    correctIndex: 2,
    explanation:
      'This single criterion rolls three distinct evaluations into one: the revenue forecast, the declining growth schedule, and the UFCF computation. Each of these should be its own standalone criterion in its appropriate rubric category.',
  },
  {
    type: 'multiple-choice',
    id: 'm4-quiz-self-contained',
    question:
      'A rubric criterion says: "Does the DCF use the correct discount rate?" Is this well-written?',
    options: [
      'Yes — a grader familiar with the prompt will know the discount rate',
      'No — it is not self-contained; the workbook cannot be evaluated without reading the prompt',
    ],
    correctIndex: 1,
    explanation:
      'When graded standalone, there would be no way to determine what "the correct discount rate" means. The criterion must embed the actual number: "Does the DCF use a discount rate of 9.5%?"',
  },
  {
    type: 'matching',
    id: 'm4-match-rules',
    instruction: 'Match each rubric writing rule to its core idea',
    pairs: [
      {
        term: 'Binary Clarity',
        definition: 'Each criterion is structured as an unambiguous YES/NO check',
      },
      {
        term: 'Self-Containment',
        definition: 'Can be scored without outside references — all details are embedded',
      },
      {
        term: 'Single-Check Principle',
        definition: 'One criterion evaluates one discrete item only',
      },
      {
        term: 'Specificity & Testability',
        definition: 'Contains concrete values, defined ranges, tolerance intervals, and ends with question mark',
      },
    ],
  },
];
