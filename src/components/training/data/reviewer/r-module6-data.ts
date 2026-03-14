import { Step } from '../../shared/types';

export const reviewerModule6Steps: Step[] = [
  {
    type: 'content',
    id: 'r6-intro',
    title: 'Final Assessment',
    body: 'This comprehensive assessment covers everything from Modules 1 through 5. You will be tested on reviewer standards, the checklist-based workflow, spreadsheet evaluation, prompt evaluation, and rubric evaluation. Take your time — the questions are designed to test applied judgment, not just recall.',
    callout: {
      type: 'info',
      text: 'You need to pass this assessment to complete the TSIP Reviewer Training program. Review the earlier modules if you need a refresher before starting.',
    },
  },
  {
    type: 'scenario',
    id: 'r6-q1',
    scenario:
      'You finish reviewing a task and all 15 checklist items are satisfied. However, the task asks the user to build a simple budget vs. actual variance table pulling data from one tab with basic SUM and subtraction formulas. The entire analysis could be completed in 20 minutes.',
    question: 'What is the correct decision?',
    options: [
      'Approve',
      'Request changes',
    ],
    correctIndex: 1,
    explanation:
      'There are two reasons to request changes: (1) unsatisfied checklist items, or (2) the task is too basic based on complexity standards. Even though all checklist items pass, a 20-minute task with basic SUM formulas and single-tab inputs falls below the minimum complexity threshold. The reviewer should provide feedback on how to increase the complexity level.',
  },
  {
    type: 'ordering',
    id: 'r6-q2',
    instruction:
      'Arrange the reviewer workflow in the correct sequence from start to finish.',
    items: [
      'Download the input and output workbooks',
      'Verify the task area is blank in the input and populated in the output',
      'Evaluate task complexity against the complexity criteria',
      'Check dependency handling in the input workbook',
      'Review spreadsheet auto-check flags',
      'Complete the 4 spreadsheet checklist items',
      'Open the prompt side-by-side with the output workbook',
      'Review prompt auto-check flags',
      'Complete the 5 prompt checklist items',
      'Review the rubric against the output workbook',
      'Complete the 6 rubric checklist items',
      'Tag complexity level and submit your decision',
    ],
  },
  {
    type: 'scenario',
    id: 'r6-q3',
    scenario:
      'You are reviewing a task and notice the author_matched_tool auto-check flag. You open the spreadsheet and the newly added analysis has dynamic formulas, professional formatting, and appears legitimate.',
    question: 'What should you do?',
    options: [
      'Continue your review',
      'Leave Data Integrity unchecked on the checklist since the auto-check was flagged',
      'Raise it to a TSIP team member with the task ID and your rationale',
      'Reject the task immediately',
    ],
    correctIndex: 2,
    explanation:
      'The AI usage policy requires escalation even when you are only slightly suspicious. An author_matched_tool flag is a serious AI indicator — regardless of how the spreadsheet looks, you should raise it to a TSIP team member with the task ID and let them make the final determination.',
  },
  {
    type: 'scenario',
    id: 'r6-q4',
    scenario:
      'During your review, you find the following issues: 4 rubric criteria say "per the prompt" without restating expected values, 2 rubric criteria are stacked (bundling multiple checks), and the prompt is missing context.',
    question: 'What should you do?',
    options: [
      'Make the fixes directly and accept the task',
      'Request changes',
      'Fix the prompt and request changes on the rubric',
      'Flag the task to the TSIP team for potential AI-use',
    ],
    correctIndex: 0,
    explanation:
      'While there are multiple issues with this task, the cumulative time to fix them falls within the ~30 minute threshold. None of these revisions require fundamental changes to the task itself — making it more efficient for a reviewer to implement them directly.',
  },
  {
    type: 'matching',
    id: 'r6-q5',
    instruction:
      'Match each issue to the spreadsheet checklist item it would fail.',
    pairs: [
      {
        term: 'Data Integrity',
        definition:
          'A VLOOKUP returns #N/A in three cells on the summary tab',
      },
      {
        term: 'High-Quality Formulas',
        definition:
          'The cost of debt is typed as 0.065 directly inside a WACC formula instead of referencing an input cell',
      },
      {
        term: 'Acceptable Formatting',
        definition:
          'Currency values alternate between $#,##0 and 0.00 formats across different tabs with no consistent convention',
      },
      {
        term: 'Input-to-Output Progression',
        definition:
          'The input workbook has pre-linked blank cells on a summary tab that reference the analysis section removed for the task',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r6-q6',
    scenario:
      'You open the output workbook and find several #VALUE errors but they exist on hidden sheets. On the visible sheets, all formulas resolve correctly and the analysis is unaffected.',
    question: 'How would you mark Data Integrity?',
    options: [
      'Unchecked',
      'Checked',
    ],
    correctIndex: 0,
    explanation:
      'Error values violate the Data Integrity checklist item regardless of where they are in the workbook. Similarly, hidden sheets impact workbook quality. In this scenario, you should request changes or directly edit the task to ensure there are no error values or hidden sheets.',
  },
  {
    type: 'scenario',
    id: 'r6-q7',
    scenario:
      'You audit a workbook that has no assumption section and instead has numerous hardcoded assumptions embedded in formulas. Every formula resolves correctly with no error values.',
    question: 'How would you mark Data Integrity and High-Quality Formulas?',
    options: [
      'Data Integrity: Checked, High-Quality Formulas: Checked',
      'Data Integrity: Unchecked, High-Quality Formulas: Unchecked',
      'Data Integrity: Unchecked, High-Quality Formulas: Checked',
      'Data Integrity: Checked, High-Quality Formulas: Unchecked',
    ],
    correctIndex: 3,
    explanation:
      'Data Integrity checks for error values and external links — since all formulas resolve, it passes. High-Quality Formulas checks for dynamic, auditable formulas with separated assumptions — hardcoded values embedded in formulas fail this item. These are independent checklist items.',
  },
  {
    type: 'scenario',
    id: 'r6-q8',
    scenario:
      'You are reviewing a Work Backward task where the contributor removed a returns analysis section from the seed to create the input. However, you notice the input workbook\'s summary tab still shows "Sponsor IRR: 18.2%" and "MOIC: 2.4x" as hardcoded values, even though the returns section that would calculate these metrics has been removed.',
    question: 'Which checklist item does this violate?',
    options: [
      'Data Integrity',
      'High-Quality Formulas',
      'Acceptable Formatting & Presentation',
      'Realistic Input-to-Output Progression',
    ],
    correctIndex: 3,
    explanation:
      'This is a Realistic Input-to-Output Progression violation. The input workbook represents an unrealistic state: returns metrics cannot be known before the returns section exists. These values should be deleted from the input workbook.',
  },
  {
    type: 'scenario',
    id: 'r6-q9',
    scenario:
      'A task asks the user to build a straight-line depreciation schedule for a single asset class, pulling the asset cost and useful life from one tab. The formulas use basic division and SUM functions. The calculated outputs do not link back into any other part of the model.',
    question: 'How would you tag complexity?',
    options: [
      'Advanced',
      'Intermediate',
      'Basic',
      'This task should be rejected regardless of complexity tag',
    ],
    correctIndex: 3,
    explanation:
      'This task falls below even Basic complexity. It represents foundational financial logic (straight-line depreciation) with standard Excel functions, inputs from only one tab, and outputs that do not flow back into the model. At approximately 15-20 minutes of work, it does not meet the minimum ~45 minute threshold for a Basic task. The reviewer should request changes asking the contributor to increase complexity or restart with a new task.',
  },
  {
    type: 'scenario',
    id: 'r6-q10',
    scenario:
      'A prompt provides all the necessary assumptions for a DCF analysis — 9% WACC, 2.5% terminal growth rate, and a 5-year projection period. The prompt also includes: "Once complete, you should get an implied share price of approximately $85 per share."',
    question: 'How would you mark Outputs Specified?',
    options: [
      'Checked',
      'Unchecked',
    ],
    correctIndex: 1,
    explanation:
      'Providing calculated values (like an implied share price) in the prompt gives the LLM hints about the answer or allows it to hardcode the value rather than deriving it through formulas. Only raw input assumptions should appear in the prompt — never calculated outputs.',
  },
  {
    type: 'scenario',
    id: 'r6-q11',
    scenario:
      'A prompt reads: "Build a cash flow schedule from EBITDA to FCF, then discount each year\'s cash flow to determine enterprise value."',
    question: 'Does this fail the Structure & Logic checklist item?',
    options: [
      'No',
      'Yes',
    ],
    correctIndex: 0,
    explanation:
      'This describes the conceptual calculation flow (what to calculate and how components relate) without dictating specific cell references, Excel functions, or row positions. Structure & Logic fails when the prompt overspecifies exact formula logic by line item or implementation details.',
  },
  {
    type: 'multiple-choice',
    id: 'r6-q12',
    question:
      'Which of the following prompt excerpts is most likely written by a human finance professional?',
    options: [
      '"Certainly! Please construct a comprehensive three-statement model ensuring seamless integration between each statement."',
      '"Hey - we\'re looking at a $200M bolt-on in the HVAC distribution space. Can you layer in a quick accretion/dilution analysis to see if it works at these multiples?"',
      '"Input fields required: Asset cost ($500,000), Useful life (10 years), Salvage value ($50,000). Ensure the following deliverables are meticulously constructed."',
      '"Please create a detailed financial analysis incorporating the following carefully crafted assumptions for a thorough and rigorous evaluation."',
    ],
    correctIndex: 1,
    explanation:
      'Option B reads like a real finance professional — it has conversational tone, specific deal context, and natural language. Options A, C, and D all contain hallmarks of LLM-generated text: "Certainly!", "seamless integration", "Input fields required:", "meticulously constructed", "carefully crafted", "thorough and rigorous."',
  },
  {
    type: 'scenario',
    id: 'r6-q13',
    scenario:
      'A rubric criterion reads: "Is the EBITDA margin within an acceptable range? [+15]"',
    question: 'Which checklist items does this criterion fail?',
    options: [
      'Self-Contained only',
      'Single-Check Principle only',
      'Specific & Testable only',
      'Both Single-Check Principle and Specific & Testable',
    ],
    correctIndex: 2,
    explanation:
      'This criterion fails the Specific & Testable criterion because no actual range or tolerance interval is specified. It should be rewritten to include a specific value with a tolerance, e.g., "Is the EBITDA margin 22% (±2%)?"',
  },
  {
    type: 'scenario',
    id: 'r6-q14',
    scenario:
      'A rubric criterion reads: "Does the model use the correct WACC and terminal growth rate as specified in the prompt? What is the terminal value? [+25]"',
    question: 'How many checklist items does this criterion violate?',
    options: [
      'One',
      'Two',
      'Three',
      'Four',
    ],
    correctIndex: 3,
    explanation:
      'This criterion violates four items: Binary Clarity ("what is the terminal value" is not answerable with YES or NO), Self-Contained ("as specified in the prompt" without restating the actual values), Single-Check Principle (bundles WACC check, growth rate check, and terminal value calculation into one criterion), and Specific & Testable (no specific values stated for WACC or growth rate, no tolerance interval for terminal value).',
  },
  {
    type: 'matching',
    id: 'r6-q15',
    instruction:
      'Match each rubric issue to the checklist item it violates.',
    pairs: [
      {
        term: 'Binary Clarity',
        definition:
          'A criterion asks: "How many new tabs were added? [+10]"',
      },
      {
        term: 'Self-Contained',
        definition:
          'A criterion says: "Are all assumptions entered correctly as specified in the prompt? [+15]"',
      },
      {
        term: 'Single-Check Principle',
        definition:
          'A criterion reads: "Does the sensitivity table exist, use the correct WACC range, and update dynamically when inputs change? [+20]"',
      },
      {
        term: 'Weighting & Scoring',
        definition:
          'A complex NPV calculation and a simple tab label check are both worth +10 points',
      },
      {
        term: 'Specific & Testable',
        definition:
          'A criterion reads: "Is Year 5 revenue approximately correct? [+10]" with no target value or tolerance',
      },
      {
        term: 'Category Coverage',
        definition:
          'A rubric has 12 criteria for formula correctness but zero criteria for output validation or dynamic functionality',
      },
    ],
  },
  {
    type: 'scenario',
    id: 'r6-q16',
    scenario:
      'You are reviewing a rubric for a "Create Error" debugging task. The rubric has no Structural Completeness criteria and no Input Data Accuracy criteria, but covers Formula Correctness, Dynamic Functionality, Output Validation, and Model Quality & Pitfalls with 5 criteria each.',
    question: 'How would you mark Category Coverage?',
    options: [
      'Unchecked',
      'Checked',
    ],
    correctIndex: 1,
    explanation:
      '"Create Error" tasks are an explicit exception to the category coverage rule — they may omit both Input Data Accuracy and Structural Completeness. Since the remaining four applicable categories each have 5 criteria (above the minimum of 4), Category Coverage is satisfied.',
  },
  {
    type: 'scenario',
    id: 'r6-q17',
    scenario:
      'You have marked Self-Contained as No because three rubric criteria use the phrase "as outlined in the prompt" without restating the expected values. You need to provide feedback to the contributor.',
    question: 'Which response best follows the observation-explanation-suggestion structure?',
    options: [
      '"Criteria 3.1, 3.4, and 3.5 do not meet rubric quality standards. Reivew the contributor training modules and fix them."',
      '"The rubric has self-containment issues. Please revise."',
      '"Criteria 2.1, 2.4, and 2.5 each reference \'as outlined in the prompt\' without restating the actual expected values. The rubric criteria should not require any sources other than the workbook itself. Please rewrite each to include the specific values."',
      '"Some rubric criteria need to restate values from the prompt"',
    ],
    correctIndex: 2,
    explanation:
      'Option B follows all three feedback principles: identifies which specific criteria are problematic (observation), explains the self-containment violation (explanation), and provides a clear improvement path (suggestion).',
  },
  {
    type: 'scenario',
    id: 'r6-q18',
    scenario:
      'You are reviewing a task where the prompt instructs the model to "create a revenue build breaking down revenue by product segment." The rubric, however, contains criteria that test a debt schedule — beginning balance, amortization, and interest expense calculations. The output spreadsheet contains a completed debt schedule.',
    question: 'What should you flag in your feedback?',
    options: [
      'Nothing — the output spreadsheet contains the debt schedule so the rubric is valid',
      'The prompt and rubric are misaligned',
      'The rubric — it is not Specific & Testable',
      'The task is not complex enough',
    ],
    correctIndex: 1,
    explanation:
      'The prompt and rubric must be aligned — the rubric should test what the prompt asks the model to build. This misalignment suggests the contributor may have changed the task after writing the prompt, or mixed up components from different tasks. This impacts data quality and needs to be flagged.',
  },
  {
    type: 'multiple-choice',
    id: 'r6-q19',
    question:
      'A task passes all 15 checklist items across spreadsheet, prompt, and rubric. The task asks the model to reformat an existing model to match a style guide — adjusting fonts, number formats, colors, and borders — with no new calculations or analytical sections added. What is the correct decision?',
    options: [
      'Approve',
      'Request changes',
    ],
    correctIndex: 1,
    explanation:
      'Even though all checklist items technically pass, there are two independent reasons to request changes. A formatting-only task lacks the multi-step analytical substance that TSIP requires — it does not meet complexity standards regardless of how long it takes. The reviewer should request changes explaining that the task needs meaningful analytical work.',
  },
  {
    type: 'scenario',
    id: 'r6-q20',
    scenario:
      'You open the output workbook and notice the newly added analysis section contains small icons next to section headers, grey commentary text in cells explaining what each section does, and uses a completely different formatting style from the rest of the model. The author_found_online auto-check flag was also triggered.',
    question: 'What should you do?',
    options: [
      'Leave Acceptable Formatting & Presentation unchecked on the checklist',
      'Dismiss the auto-check flag and continue your review',
      'Raise it to a TSIP team member with the task ID and your reasoning for suspicion',
      'Reject the task and mark all checklist items as No',
    ],
    correctIndex: 2,
    explanation:
      'Multiple AI indicators are present: icons in the analysis, grey commentary text, drastically different formatting, and an author_found_online auto-check flag. Per the AI usage policy, when you are even slightly suspicious, raise it to a TSIP team member with the task ID and your reasoning. Do not attempt to make a final determination on your own.',
  },
  {
    type: 'assessment-results',
    id: 'r6-results',
    title: 'Assessment Results',
  },
];
