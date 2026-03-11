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
    title: 'LBO Debt Schedule',
    category: 'Leveraged Buyout',
    inputFile: {
      filename: 'Example_5_Input.xlsx',
      url: '/training/Example_5_Input.xlsx',
    },
    outputFile: {
      filename: 'Example_5_Output.xlsx',
      url: '/training/Example_5_Output.xlsx',
    },
    prompt: `I have the start to my LBO model built with linked historicals, revenue and cost build, projections, a consolidated income statement and balance sheet, a Valuation & Cash Flow tab, and a transaction tab with sources & uses. I need you to please help me out now with building an LBO analysis.

In a new tab please start by creating a section covering 2024E\u20132028E that shows the Beginning Cash Balance for each year and the FCF for each year by pulling both from the models. Using those figures then calculate Cash Available for Debt Repayment for each year.

After that, I need you to create a debt repayment schedule for the Revolve, the Senior Secured TL, and the Senior Unsecured Notes in three separate sections. The order in paying off the debt figures will go as follows 1) revolver 2) Senior TL 3) Senior Unsecured Notes. You should do the same process in each of the three charts and it goes as follows:
- Pull the debt figures\u2019 interest rate and beginning balance for 2024E from the model
- Then, for each year calculate principal repayment based on available cash for repayment, calculate interest expense on the beginning debt balance, and calculate the ending debt figures\u2019 balance

Finally, I need you to do some summary debt calculations as follows for each year:
- Pull EBITDA from the model
- Calculate Total Beginning Debt, Beginning Net Debt and Total Interest Expense
- Find the Leverage ratio and Interest coverage ratio

At this point you will be done with the LBO valuation and the last thing I need you to do is to link interest expense and debt repayment back into the Valuation and Cash Flow tab in the model.

Pull any necessary values or assumptions from the appropriate sections of the model and maintain consistent formatting.`,
    rubric: [
      {
        name: 'Structural Completeness',
        criteria: [
          { question: 'Does the workbook contain a new tab titled "LBO"?', points: 20 },
          { question: 'Does the LBO tab contain a section for Cash Available for Debt Repayment (2024E\u20132028E)?', points: 15 },
          { question: 'Does the LBO tab contain a Revolver debt schedule section?', points: 15 },
          { question: 'Does the LBO tab contain a Senior Secured Term Loan schedule section?', points: 15 },
          { question: 'Does the LBO tab contain a Senior Unsecured Notes schedule section?', points: 15 },
          { question: 'Does the LBO tab contain a Leverage Calculations section?', points: 15 },
          { question: 'Are the debt figures in the Valuation and Cash Flow tab populated?', points: 20 },
        ],
      },
      {
        name: 'Input Data Accuracy',
        criteria: [
          { question: 'Does the projection period include five years labeled 2024E through 2028E?', points: 10 },
        ],
      },
      {
        name: 'Formula Correctness',
        criteria: [
          { question: 'Is Cash Available for Debt Repayment calculated as Beginning Cash + FCF for each year?', points: 20 },
          { question: 'Are principal repayments applied in correct priority order (Revolver \u2192 Term Loan \u2192 Notes)?', points: 20 },
          { question: 'Is Ending Balance calculated as Beginning Balance minus Principal Repayment?', points: 20 },
          { question: 'Is Total Beginning Debt calculated as the sum of all debt tranches?', points: 20 },
          { question: 'Is Total Interest Expense calculated as the sum of interest from all tranches?', points: 20 },
          { question: 'Are Interest Expense, Revolver repayment, TL repayment, and Notes repayment linked back into the FCF build?', points: 25 },
        ],
      },
      {
        name: 'Dynamic Functionality',
        criteria: [
          { question: 'When Free Cash Flow increases in a forecast year, does debt repayment increase and ending balances decrease?', points: 20 },
          { question: 'When a debt interest rate is changed, does total interest expense update and flow through to coverage ratios?', points: 15 },
          { question: 'When EBITDA changes in the model, do leverage and interest coverage ratios update automatically?', points: 20 },
          { question: 'When Beginning Cash is increased in a given year, does Cash Available for Debt Repayment increase and debt balances decrease accordingly?', points: 15 },
          { question: 'When CapEx is increased in a forecast year (reducing FCF), does cash available for repayment decrease and ending debt balances increase?', points: 15 },
        ],
      },
      {
        name: 'Output Validation',
        criteria: [
          { question: 'Is 2024E Total Interest Expense = 102.48 (\u00b11%)?', points: 15 },
          { question: 'Is 2025E Total Beginning Debt = 1,357.64 (\u00b11%)?', points: 15 },
          { question: 'Is 2026E Leverage Ratio = 2.64x (\u00b11%)?', points: 15 },
          { question: 'Is 2027E Interest Coverage = 7.00x (\u00b11%)?', points: 15 },
          { question: 'Is Cash Available for Debt Repayment in 2024E approximately 126.88 (\u00b11%)?', points: 15 },
          { question: 'Is Senior Secured TL ending balance in 2025E approximately 572.25 (\u00b11%)?', points: 15 },
          { question: 'Is Senior Unsecured Notes ending balance in 2028E approximately 455.77 (\u00b11%)?', points: 15 },
          { question: 'Is Leverage ratio in 2024E approximately 4.27x (\u00b11%)?', points: 15 },
          { question: 'Is Leverage ratio in 2028E approximately 1.30x (\u00b11%)?', points: 15 },
          { question: 'Is Interest Coverage ratio in 2024E approximately 3.40x (\u00b11%)?', points: 15 },
          { question: 'Is Revolver Interest Expense in 2024E approximately 1.75 (\u00b11%)?', points: 15 },
          { question: 'Is Senior Secured TL Principal Repayment in 2025E approximately 124.13 (\u00b11%)?', points: 15 },
          { question: 'Is Total Beginning Debt in 2025E approximately 1,357.64 (\u00b11%)?', points: 15 },
        ],
      },
      {
        name: 'Model Quality & Pitfalls',
        criteria: [
          { question: 'Does the workbook contain any Excel error values (#REF!, #N/A, #DIV/0!, #VALUE!, #NAME?, #NUM!)?', points: -15 },
          { question: 'Does the workbook contain external links to other workbooks/files?', points: -10 },
          { question: 'Are any key calculations hardcoded?', points: -15 },
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
