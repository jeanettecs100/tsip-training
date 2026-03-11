import { useState } from 'react';

import { CaretDown, CaretUp, X } from '@phosphor-icons/react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { MockFileDisplay } from './shared/MockFileDisplay';

// --- Rubric types ---

interface RubricCriterion {
  question: string;
  points: number;
}

interface RubricSection {
  name: string;
  criteria: RubricCriterion[];
}

// --- Example types ---

interface ExampleTask {
  title: string;
  category: string;
  inputFile: { filename: string; url: string };
  outputFile: { filename: string; url: string };
  prompt: string;
  rubric: RubricSection[];
}

// --- Data ---

const EXAMPLE_TASKS: ExampleTask[] = [
  {
    title: 'Summary Financials & CF Statement',
    category: 'Operating Model',
    inputFile: {
      filename: 'Example_4_Input.xlsx',
      url: '/training/Example_4_Input.xlsx',
    },
    outputFile: {
      filename: 'Example_4_Output.xlsx',
      url: '/training/Example_4_Output.xlsx',
    },
    prompt: `I have an Operating Model for a company and want to add a Summary Operating Model Build-Up and Cash Flow Schedule to finish it up.

For the Summary Operating Model Build-Up, I want to create a summary that breaks down ACV, Revenue, Total Gross Profit, and Adjusted EBITDA for the Historical and Projected. For ACV, pull the line items that flow into ACV, then find Total ACV. I also want to know how much of their revenue is recurring, so use the Client lines to find Recurring Clients as % of Total.

For Revenue, breakdown the Revenue, then find the Total Revenue. Below, pull the Cost of Goods Sold line items, and other Adjustments to find Total Gross Profit and the margin below that. Lastly, adjust for the other expenses on the sheet, and then find Adjusted EBITDA and EBITDA Margin %. On the right side, find the CAGRs similar to the other sections. For ACV and Revenue, I also want to see the YoY growth below the line items.

Then for the Cash Flow Schedule, Start with Adjusted EBITDA, walk down to EBIT, Net Income, Cash Flow from Operating Activities, Net Cash Burn, and Ending Cash Balance. I will provide the hardcoded values that are necessary:
- D&A (2016 to 2019): (22), (142), (154), (217)
- Employee Non-Cash Equity Expense (2016 to 2024): (155), (252), (700), (1,145), (3,000), (3,000), (6,000), (6,000), (9,000)
- Other Non-Cash OpEx Adjustments (2016 to 2024) = 6,341 , 59, (0), (376), (0), 0, 0, 0, 0
- Other Expense (2016 to 2024) = (512), (651), (62), (184), (589), 0, 0, 0, 0
- Interest Income (2016 to 2024) = 0, 305, 52, 705, 65, 746, 729, 731, 1,006
- Income Tax (2016 to 2024) = 0 across entire period
- Changes in NWC (2016 to 2019) = 1,112, (397), 1,930, 3,826
- CapEx (2016 to 2019) = (95), (157), (209), (604)
- FX Effect on Cash (2016 to 2024) = 0, (307), (41), (169), 0, 0, 0, 0, 0
- Beginning Cash Balance should start in 2018, and be hardcoded to $4,789
- Cash Infusion from Financing Activities (2018 to 2024) = 52,784, 6,148, 10,500, 42,500, 0, 0, 0`,
    rubric: [
      {
        name: 'Structural Completeness',
        criteria: [
          { question: 'Is there a Summary Operating Model Build-Up section clearly labeled, covering Historical (2016-2019) and Projected (2020-2024) periods?', points: 10 },
          { question: 'Is there a clearly labeled Cash Flow Schedule section starting with Adjusted EBITDA for 2016-2024?', points: 10 },
          { question: 'Does the ACV section pull Subscription ACV, Professional Services ACV, Other ACV, show Total ACV, and YoY growth below?', points: 10 },
          { question: 'Does the Revenue section pull Subscription Revenue, Professional Services Revenue, Other Revenue, show Total Revenue and YoY growth?', points: 10 },
          { question: 'Does the Adjusted EBITDA section pull Personnel Expenses, Non-Staff Expenses, show Adjusted EBITDA and EBITDA Margin %?', points: 10 },
        ],
      },
      {
        name: 'Input Data Accuracy',
        criteria: [
          { question: 'Is D&A in 2016 equal to -22?', points: 5 },
          { question: 'Is Other Expense in 2016 equal to -512?', points: 5 },
          { question: 'Is Beginning Cash Balance in 2018 equal to $4,789?', points: 5 },
          { question: 'Is Cash Infusion from Financing Activities in 2018 equal to $52,784?', points: 5 },
          { question: 'Is Employee Non-Cash Equity Expense in 2024 equal to -9,000?', points: 5 },
        ],
      },
      {
        name: 'Formula Correctness',
        criteria: [
          { question: 'Is ACV YoY growth calculated by dividing current ACV by previous year ACV and subtracting 1?', points: 5 },
          { question: 'Is Revenue YoY growth calculated by dividing current Revenue by previous year Revenue and subtracting 1?', points: 5 },
          { question: 'Is Total Gross Profit calculated by subtracting COGS and Other Adjustments from Total Revenue?', points: 5 },
          { question: 'Is Ending Cash Balance calculated by summing up Beginning Cash Balance, Net Cash Burn, and Cash Infusion from Financing Activities?', points: 5 },
          { question: 'Is EBIT calculated by subtracting D&A and Employee Non-Cash OpEx Adjustments, and adding Other Non-Cash OpEx Adjustments to Adjusted EBITDA?', points: 5 },
        ],
      },
      {
        name: 'Dynamic Functionality',
        criteria: [
          { question: 'When D&A increases, does EBIT decrease?', points: 5 },
          { question: 'When Beginning Cash Balance increases, does Ending Cash Balance increase across the forecast period?', points: 5 },
          { question: 'When CapEx increases, does Net Cash Burn increase?', points: 5 },
          { question: 'When Changes in NWC increase, does Ending Cash Balance increase?', points: 5 },
        ],
      },
      {
        name: 'Output Validation',
        criteria: [
          { question: 'Does Total ACV in 2019 equal $24,951 (\u00b1$1,000)?', points: 5 },
          { question: 'Does Gross Margin % in 2024 equal 72% (\u00b11%)?', points: 5 },
          { question: 'Does Net Cash Burn in 2018 equal -$16,441 (\u00b1$1,000)?', points: 5 },
          { question: 'Does Ending Cash Balance in 2021 equal $40,238 (\u00b1$1,000)?', points: 5 },
        ],
      },
      {
        name: 'Model Quality & Pitfalls',
        criteria: [
          { question: 'Does the workbook contain any Excel error values (#REF!, #N/A, #DIV/0!, #VALUE!, #NAME?, #NUM!)?', points: -10 },
          { question: 'Does the workbook contain external links to other workbooks/files?', points: -10 },
          { question: 'Are all key outputs created by this task calculated by formulas?', points: -10 },
          { question: 'Are all major dollar-denominated sections (Summary Operating Model, Cash Flow Schedule) consistently scaled to the same unit system?', points: -10 },
        ],
      },
    ],
  },
  {
    title: 'LBO Distribution Waterfall & Returns Sensitivity',
    category: 'Leveraged Buyout',
    inputFile: {
      filename: 'Example_5_Input.xlsx',
      url: '/training/Example_5_Input.xlsx',
    },
    outputFile: {
      filename: 'Example_5_Output.xlsx',
      url: '/training/Example_5_Output.xlsx',
    },
    prompt: `I need to get a better understanding of the range of outcomes on this LBO opportunity we\u2019re looking at - can you help build the Returns Calculation section in the LBO Model tab? It should show a five-year exit bridge covering 2021E through 2025E that presents LTM EBITDA, an Exit Multiple, and then the Total Enterprise Value. Then make a row for Net Debt and get to Equity Value across the timeline. Then show a recap dividend indicator and make a dated equity cash flow matrix which illustrates the expected cash flows over the years. Also display the resulting IRR and MoM for each potential exit year. The equity cash flow matrix should display the initial investment, interim recap distribution where applicable, and exit equity proceeds so each column forms a complete investment case aligned to the listed dates.

Directly beneath this section, build Sensitivity Tables containing side-by-side IRR and MoM data tables. The sensitivity grids must vary Entry Multiple and Exit Multiples using a centered base case of 10.0x for both. Tie these to the Returns Calculation outputs. Vary both multiples by 1.0x twice above and twice below. Pull any other necessary line item value from the rest of the model.`,
    rubric: [
      {
        name: 'Structural Completeness',
        criteria: [
          { question: 'Does the LBO Model tab include a Returns Calculation block spanning exit years 2021E through 2025E with rows for LTM EBITDA, Exit Multiple, Total Enterprise Value, Less: Net Debt, and Equity Value presented in sequence?', points: 10 },
          { question: 'Does the section include a Recap Dividend indicator aligned to the projection timeline?', points: 10 },
          { question: 'Does the section include a dated equity cash flow matrix showing initial investment, interim distributions, and exit proceeds by year?', points: 10 },
          { question: 'Are IRR and MoM rows presented beneath the equity cash flow matrix for each exit year?', points: 10 },
          { question: 'Does the tab include an IRR sensitivity table and a MoM sensitivity table positioned beneath the Returns Calculation block?', points: 10 },
          { question: 'Do both sensitivity tables vary Entry Multiple vertically and Exit Multiple horizontally with a clearly identified base case center?', points: 10 },
        ],
      },
      {
        name: 'Input Data Accuracy',
        criteria: [
          { question: 'Is the sensitivity base case Entry Multiple hardcoded at 10.0x within the sensitivity driver range?', points: 5 },
          { question: 'Is the sensitivity base case Exit Multiple hardcoded at 10.0x within the sensitivity driver range?', points: 5 },
          { question: 'Are the surrounding sensitivity driver ranges constructed symmetrically around the 10.0x base case (e.g., 9.0x\u201311.0x)?', points: 5 },
        ],
      },
      {
        name: 'Formula Correctness',
        criteria: [
          { question: 'Does Total Enterprise Value equal LTM EBITDA multiplied by Exit Multiple for each exit year?', points: 15 },
          { question: 'Does Equity Value equal Enterprise Value less Net Debt for each period?', points: 15 },
          { question: 'Does the equity cash flow matrix correctly reflect initial investment, recap distributions, and exit proceeds for each scenario?', points: 15 },
          { question: 'Are IRR calculations derived from the full equity cash flow stream for each exit year rather than partial ranges?', points: 15 },
          { question: 'Are MoM values calculated from total invested capital versus total realized equity value?', points: 15 },
          { question: 'Do the IRR and MoM sensitivity tables pull directly from the Returns Calculation outputs rather than recomputing logic locally?', points: 15 },
        ],
      },
      {
        name: 'Dynamic Functionality',
        criteria: [
          { question: 'When LTM EBITDA changes, do Enterprise Value, Equity Value, IRR, MoM, and both sensitivity tables update automatically?', points: 15 },
          { question: 'When Exit Multiple assumptions change, do all valuation outputs and sensitivity tables update without manual edits?', points: 15 },
          { question: 'When Net Debt changes, do Equity Value, IRR, MoM, and sensitivity outputs update automatically?', points: 15 },
          { question: 'When recap timing or size changes, does the equity cash flow matrix update and flow through to IRR and MoM?', points: 15 },
          { question: 'When sensitivity driver ranges change, do both sensitivity tables refresh without breaking references?', points: 15 },
        ],
      },
      {
        name: 'Output Validation',
        criteria: [
          { question: 'Does 2021E Equity Value equal approximately 3,428 (\u00b150)?', points: 10 },
          { question: 'Does 2024E Equity Value equal approximately 4,616 (\u00b150)?', points: 10 },
          { question: 'Does 2025E Equity Value equal approximately 5,691 (\u00b150)?', points: 10 },
          { question: 'Does IRR decline from roughly 56.9% in the earliest exit to roughly 30.2% in the latest exit (\u00b11.0%)?', points: 10 },
          { question: 'Does MoM increase from roughly 1.6x in the earliest exit to roughly 3.3x in the latest exit (\u00b10.1x)?', points: 10 },
          { question: 'Does the IRR sensitivity table show higher IRRs as Exit Multiple increases holding Entry constant?', points: 10 },
        ],
      },
      {
        name: 'Model Quality & Pitfalls',
        criteria: [
          { question: 'Does the workbook contain any Excel error values (#REF!, #N/A, #DIV/0!, #VALUE!, #NAME?, #NUM!)?', points: -10 },
          { question: 'Does the workbook contain external links to other workbooks/files?', points: -10 },
          { question: 'Are any Equity Value, IRR, or MoM outputs hardcoded instead of formula-driven?', points: -15 },
          { question: 'Are sensitivity tables built with manual formulas rather than Excel data tables?', points: -10 },
          { question: 'Do IRR calculations break or produce inconsistent signs when recap distributions are toggled?', points: -10 },
        ],
      },
    ],
  },
];

// --- Components ---

function RubricSectionDisplay({ section }: { section: RubricSection }) {
  return (
    <div className='space-y-2'>
      <p className='font-semibold'>{section.name}</p>
      <ul className='space-y-2'>
        {section.criteria.map((c, i) => (
          <li key={i} className='flex items-start justify-between gap-4 text-sm'>
            <span className='flex-1'>{c.question}</span>
            <span
              className={`whitespace-nowrap font-semibold ${
                c.points < 0 ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {c.points > 0 ? '+' : ''}{c.points}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExampleCard({ example }: { example: ExampleTask }) {
  const [rubricOpen, setRubricOpen] = useState(false);

  return (
    <Card>
      <CardHeader className='pb-3'>
        <div className='mb-1'>
          <span className='inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'>
            {example.category}
          </span>
        </div>
        <CardTitle className='text-base'>{example.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-5'>
        {/* Files */}
        <div className='grid gap-3 sm:grid-cols-2'>
          <div>
            <p className='mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
              Input Workbook
            </p>
            <MockFileDisplay
              filename={example.inputFile.filename}
              size='--'
              downloadable
              downloadUrl={example.inputFile.url}
            />
          </div>
          <div>
            <p className='mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
              Output Workbook
            </p>
            <MockFileDisplay
              filename={example.outputFile.filename}
              size='--'
              downloadable
              downloadUrl={example.outputFile.url}
            />
          </div>
        </div>

        {/* Prompt */}
        <div>
          <p className='mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Prompt
          </p>
          <div className='max-h-48 overflow-y-auto rounded-md border bg-muted/30 p-3 text-sm leading-relaxed text-foreground'>
            {example.prompt}
          </div>
        </div>

        {/* Rubric (collapsible) */}
        <div>
          <button
            type='button'
            onClick={() => setRubricOpen(!rubricOpen)}
            className='flex w-full items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-left transition-colors hover:bg-muted/50'
          >
            <p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
              Rubric
            </p>
            {rubricOpen ? (
              <CaretUp className='size-4 text-muted-foreground' />
            ) : (
              <CaretDown className='size-4 text-muted-foreground' />
            )}
          </button>
          {rubricOpen && (
            <div className='mt-2 space-y-4 rounded-md border bg-muted/20 p-3'>
              {example.rubric.map((section, i) => (
                <RubricSectionDisplay key={i} section={section} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main panel ---

interface ExamplesPanelProps {
  onClose: () => void;
}

export function ExamplesPanel({ onClose }: ExamplesPanelProps) {
  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/40'
        onClick={onClose}
      />

      {/* Panel */}
      <div className='relative ml-auto flex h-full w-full max-w-2xl flex-col bg-card shadow-xl'>
        <div className='flex items-center justify-between border-b px-6 py-4'>
          <div>
            <h2 className='text-lg font-bold text-foreground'>Example Tasks</h2>
            <p className='text-sm text-muted-foreground'>
              Download the spreadsheets and study the prompts and rubrics to see what strong submissions look like
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
          >
            <X className='size-5' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-6'>
          <div className='space-y-6'>
            {EXAMPLE_TASKS.map((example, index) => (
              <ExampleCard key={index} example={example} />
            ))}
          </div>

          <div className='mt-6 rounded-md border-l-4 border-l-blue-500 bg-blue-50 p-4'>
            <p className='text-sm text-blue-800'>
              Download the input and output workbooks to see the before and after. Then compare
              the prompt and rubric to understand how each component connects to the spreadsheet work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
