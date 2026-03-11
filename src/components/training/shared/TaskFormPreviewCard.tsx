import { CheckCircle, Info, Lightbulb, UploadSimple, Warning, WarningOctagon } from '@phosphor-icons/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { RubricField } from '@/components/attempt-form/fields/RubricField';
import { SelectField } from '@/components/attempt-form/fields/SelectField';
import { TextareaField } from '@/components/attempt-form/fields/TextareaField';
import { FormProvider } from '@/components/attempt-form/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FieldTypeEnum } from '@/lib/shared-types';
import { cn } from '@/lib/utils';

import { MockFileDisplay } from './MockFileDisplay';
import type { TaskFormPreviewStep } from './types';

// --- Mock field definitions ---

const MOCK_PROMPT_FIELD = {
  id: 'prompt',
  type: FieldTypeEnum.TEXTAREA,
  label: 'Prompt',
  editable: true,
  required: true,
  placeholder:
    'Describe what you want built or fixed in the spreadsheet. Include context, assumptions, and the analytical objective...',
  maxLength: 5000,
  description: 'Write your prompt as if explaining the task to a smart coworker who knows Excel but hasn\u2019t seen your model before.',
} as const;

const MOCK_RUBRIC_FIELD = {
  id: 'rubric',
  type: FieldTypeEnum.RUBRIC,
  label: 'Rubric',
  editable: true,
  required: true,
  description: 'Define binary (yes/no) grading criteria organized by category. Each criterion should test exactly one thing.',
} as const;

const MOCK_COMPLEXITY_FIELD = {
  id: 'contributor_complexity',
  type: FieldTypeEnum.SELECT as FieldTypeEnum.SELECT,
  label: 'Task Complexity',
  editable: true,
  required: true,
  placeholder: 'Select complexity level',
  description: 'How complex do you think this task is?',
  options: [
    { label: 'Basic', value: 'basic' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ],
};

// --- Practice rubric template (pre-populated section names) ---

const PRACTICE_RUBRIC_TEMPLATE = {
  sections: [
    { id: 's1', name: 'Structural Completeness', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
    { id: 's2', name: 'Input Data Accuracy', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
    { id: 's3', name: 'Formula Correctness', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
    { id: 's4', name: 'Dynamic Functionality', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
    { id: 's5', name: 'Output Validation', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
    { id: 's6', name: 'Model Quality & Pitfalls', criteria: [] as Array<{ id: string; question: string; points: number | null }> },
  ],
};

// --- Mock file upload component ---

function MockFileUpload({ label, onFileSelected }: { label: string; onFileSelected: (name: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelected(file.name);
    },
    [onFileSelected]
  );

  return (
    <button
      type='button'
      onClick={() => inputRef.current?.click()}
      className='flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/50'
    >
      <UploadSimple className='size-4' />
      {label}
      <input ref={inputRef} type='file' accept='.xlsx,.xls' className='hidden' onChange={handleChange} />
    </button>
  );
}

// --- Readonly mock data ---

const READONLY_PROMPT = `Now I want to add a discounted cash flow analysis to get an intrinsic valuation that I can compare against where the stock currently trades.

Please create a DCF tab that calculates the implied share price using both an exit multiple approach and a perpetuity growth approach. The DCF should pull operating data directly from the Financials tab to create a standard cash flow build from revenue to unlevered FCF. The projection period should cover 2024 through 2028, matching what is already in the Financials tab. On the right side of the DCF tab, build a WACC calculation section.

Pull debt, cost of debt, and tax rate from the Financials tab and for total equity, hardcode $8,168.57. Other assumptions needed are 4.28% risk-free rate, 11.06% expected market return, and 0.98 beta. Include terminal value calculations as well. For the multiple method, use 17.5x and for the perpetuity growth approach assume a growth rate of 2.24%.

I'll also need a share price bridge for each exit method. Build from implied enterprise value to implied equity value per share and show the % upside vs. the current share price on the comps tab.`;

const READONLY_RUBRIC = {
  sections: [
    {
      id: 's1',
      name: 'Structural Completeness',
      criteria: [
        { id: 'c1', question: 'Does the workbook contain a new DCF tab with a discounted cash flow analysis for Apple?', points: 10 },
        { id: 'c2', question: 'Does the DCF tab include a cash flow build section with projection columns covering 2024 through 2028 (five projection years matching the Financials tab)?', points: 10 },
        { id: 'c3', question: 'Does the DCF tab include a WACC calculation section (visually separated from the cash flow build, e.g., to the right or below)?', points: 10 },
        { id: 'c4', question: 'Does the DCF tab include terminal value calculations for both an exit multiple approach and a perpetuity growth approach?', points: 10 },
        { id: 'c5', question: 'Does the DCF tab include a share price bridge for the exit multiple method that builds from implied enterprise value through to implied equity value per share and shows % upside versus current share price?', points: 10 },
        { id: 'c6', question: 'Does the DCF tab include a share price bridge for the perpetuity growth method that builds from implied enterprise value through to implied equity value per share and shows % upside versus current share price?', points: 10 },
      ],
    },
    {
      id: 's2',
      name: 'Input Data Accuracy',
      criteria: [
        { id: 'c7', question: 'Is the total equity value hardcoded (not formula-driven) at $8,168.57 in the WACC calculation section?', points: 5 },
        { id: 'c8', question: 'Is the risk-free rate equal to 4.28%?', points: 5 },
        { id: 'c9', question: 'Is the expected market return equal to 11.06%?', points: 5 },
        { id: 'c10', question: 'Is the beta equal to 0.98?', points: 5 },
        { id: 'c11', question: 'Is the EBITDA exit multiple equal to 17.5x (\u00b10.05x)?', points: 5 },
        { id: 'c12', question: 'Is the perpetuity growth rate equal to 2.24%?', points: 5 },
      ],
    },
    {
      id: 's3',
      name: 'Formula Correctness',
      criteria: [
        { id: 'c13', question: 'Is Cost of Equity calculated using the CAPM formula: Risk-Free Rate + Beta \u00d7 (Expected Market Return \u2212 Risk-Free Rate)?', points: 25 },
        { id: 'c14', question: 'Is WACC calculated as (Cost of Equity \u00d7 Equity Weight) + (After-Tax Cost of Debt \u00d7 Debt Weight), where weights are based on Total Equity and Total Debt as proportions of total capitalization?', points: 25 },
        { id: 'c15', question: 'Does the cash flow build pull revenue, EBITDA (or its component margins), D&A, CapEx, and change in working capital from the Financials tab via cell references (not hardcoded)?', points: 20 },
        { id: 'c16', question: 'Is unlevered free cash flow calculated as EBIT \u00d7 (1 \u2212 Tax Rate) + D&A \u2212 CapEx \u2212 Change in Working Capital, or an equivalent formulation that arrives at the same result (e.g., EBIAT + D&A \u2212 CapEx \u2212 \u0394WC)?', points: 25 },
        { id: 'c17', question: 'Is the terminal value under the exit multiple method calculated as the final projection period EBITDA multiplied by the exit multiple?', points: 20 },
        { id: 'c18', question: 'Is the terminal value under the perpetuity growth method calculated as the final projection period unlevered FCF \u00d7 (1 + growth rate) \u00f7 (WACC \u2212 growth rate)?', points: 20 },
        { id: 'c19', question: 'Are projected unlevered free cash flows and terminal values discounted back to present value using the formula 1 \u00f7 (1 + WACC)^n, where n represents the number of years from the valuation date?', points: 15 },
        { id: 'c20', question: 'Is implied enterprise value calculated as the sum of discounted projected free cash flows plus the present value of the terminal value?', points: 20 },
        { id: 'c21', question: 'Does the equity bridge subtract debt and add cash (and adjust for any preferred stock or minority interest if applicable) to convert from implied enterprise value to implied equity value?', points: 20 },
        { id: 'c22', question: 'Is implied equity value per share calculated by dividing implied equity value by diluted shares outstanding?', points: 15 },
      ],
    },
    {
      id: 's4',
      name: 'Dynamic Functionality',
      criteria: [
        { id: 'c23', question: 'When the EBITDA exit multiple is increased, does the implied share price under the exit multiple method increase?', points: 15 },
        { id: 'c24', question: 'When the perpetuity growth rate is increased, does the implied share price under the perpetuity growth method increase?', points: 15 },
        { id: 'c25', question: 'When the risk-free rate is increased, does WACC increase and do both implied share prices decrease?', points: 15 },
        { id: 'c26', question: 'When a revenue projection on the Financials tab is changed, does the corresponding revenue on the DCF tab update, and do downstream unlevered FCF and implied share prices also update?', points: 20 },
        { id: 'c27', question: 'When beta is increased, does cost of equity increase and WACC increase?', points: 15 },
      ],
    },
    {
      id: 's5',
      name: 'Output Validation',
      criteria: [
        { id: 'c28', question: 'Is the Cost of Equity 10.92% (\u00b10.5%)?', points: 15 },
        { id: 'c29', question: 'Is WACC approximately 8.96% (\u00b10.5%)? (Derived from CAPM cost of equity, after-tax cost of debt, and capital structure weights using prompt-specified equity of $8,168.57 and Financials-tab debt of $2,270)', points: 15 },
        { id: 'c30', question: 'Is the 2024 (first projection year) unlevered free cash flow $672 (\u00b12%)?', points: 15 },
        { id: 'c31', question: 'Is the 2028 (final projection year) unlevered free cash flow $2,783 (\u00b12%)?', points: 15 },
        { id: 'c32', question: 'Is the terminal value under the exit multiple method $35,370 (\u00b12%)?', points: 15 },
        { id: 'c33', question: 'Is the present value of the terminal value under the exit multiple method $23,030 (\u00b12%)?', points: 15 },
        { id: 'c34', question: 'Is the implied enterprise value under the exit multiple method $30,515 (\u00b12%)?', points: 15 },
        { id: 'c35', question: 'Is the implied equity value under the exit multiple method $29,567 (\u00b12%)?', points: 15 },
        { id: 'c36', question: 'Is the implied share price under the exit multiple method $190 (\u00b15%)?', points: 15 },
        { id: 'c37', question: 'Is the terminal value under the perpetuity growth method $42,350 (\u00b12%)?', points: 15 },
        { id: 'c38', question: 'Is the present value of the terminal value under the perpetuity growth method $27,578 (\u00b12%)?', points: 15 },
        { id: 'c39', question: 'Is the implied enterprise value under the perpetuity growth method $35,062 (\u00b12%)?', points: 15 },
        { id: 'c40', question: 'Is the implied equity value under the perpetuity growth method $34,114 (\u00b12%)?', points: 15 },
        { id: 'c41', question: 'Is the implied share price under the perpetuity growth method $219 (\u00b15%)?', points: 15 },
      ],
    },
    {
      id: 's6',
      name: 'Model Quality and Pitfalls',
      criteria: [
        { id: 'c42', question: 'Does the workbook contain any Excel error values (#REF!, #N/A, #DIV/0!, #VALUE!, #NAME?, #NUM!) on the DCF tab?', points: -10 },
        { id: 'c43', question: 'Are any key outputs (e.g., WACC, unlevered FCF, terminal value, implied enterprise value, implied share price) hardcoded rather than formula-driven?', points: -15 },
        { id: 'c44', question: 'Does the workbook contain external links to other workbooks/files?', points: -10 },
        { id: 'c45', question: 'Are all major dollar-denominated sections on the DCF tab consistently scaled to the same unit system (no mixed units between the cash flow build and the bridge calculations)?', points: 10 },
      ],
    },
  ],
};

interface TaskFormPreviewCardProps {
  step: TaskFormPreviewStep;
  onComplete: () => void;
}

export function TaskFormPreviewCard({ step, onComplete }: TaskFormPreviewCardProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [promptValue, setPromptValue] = useState(
    step.mode === 'readonly' ? READONLY_PROMPT : ''
  );
  const [rubricValue, setRubricValue] = useState<{
    sections: Array<{
      id: string;
      name: string;
      criteria: Array<{ id: string; question: string; points: number | null }>;
    }>;
  } | null>(step.mode === 'readonly' ? READONLY_RUBRIC : PRACTICE_RUBRIC_TEMPLATE);

  const [complexityValue, setComplexityValue] = useState<string | number | null>(
    step.mode === 'readonly' ? 'intermediate' : null
  );
  const [inputFileName, setInputFileName] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState<string | null>(null);
  const [promptError, setPromptError] = useState<string | undefined>();
  const [rubricError, setRubricError] = useState<string | undefined>();
  const [complexityError, setComplexityError] = useState<string | undefined>();
  const [fileError, setFileError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);

  // Reset state when step changes
  useEffect(() => {
    setAcknowledged(false);
    setSubmitted(false);
    setInputFileName(null);
    setOutputFileName(null);
    setPromptError(undefined);
    setRubricError(undefined);
    setComplexityError(undefined);
    setFileError(undefined);
    if (step.mode === 'readonly') {
      setPromptValue(READONLY_PROMPT);
      setRubricValue(READONLY_RUBRIC);
      setComplexityValue('intermediate');
    } else {
      setPromptValue('');
      setRubricValue(PRACTICE_RUBRIC_TEMPLATE);
      setComplexityValue(null);
    }
  }, [step.id, step.mode]);

  const handleAcknowledge = () => {
    setAcknowledged(true);
    onComplete();
  };

  const handlePracticeSubmit = () => {
    let hasError = false;

    if (!inputFileName || !outputFileName) {
      setFileError('Both input and output workbooks must be uploaded.');
      hasError = true;
    } else {
      setFileError(undefined);
    }

    if (!promptValue.trim()) {
      setPromptError('Prompt is required. Describe the task you want the AI to complete.');
      hasError = true;
    } else {
      setPromptError(undefined);
    }

    const allSectionsHaveCriteria = rubricValue?.sections?.every(s => s.criteria.length > 0);
    if (!allSectionsHaveCriteria) {
      setRubricError('Every rubric category must have at least one criterion.');
      hasError = true;
    } else {
      // Validate point values: must be multiples of 5, positive +5 to +30, negative -10 to -25
      const invalidPoints: string[] = [];
      for (const section of rubricValue?.sections ?? []) {
        for (const criterion of section.criteria) {
          const pts = criterion.points;
          if (pts == null) {
            invalidPoints.push(`"${criterion.question || '(empty)'}" has no point value`);
          } else if (pts % 5 !== 0) {
            invalidPoints.push(`${pts} pts is not a multiple of 5`);
          } else if (pts > 0 && (pts < 5 || pts > 30)) {
            invalidPoints.push(`+${pts} is outside the +5 to +30 range`);
          } else if (pts < 0 && (pts < -25 || pts > -10)) {
            invalidPoints.push(`${pts} is outside the -10 to -25 range`);
          } else if (pts === 0) {
            invalidPoints.push('0 pts is not allowed — use +5 to +30 or -10 to -25');
          }
        }
      }
      if (invalidPoints.length > 0) {
        setRubricError(
          'Point values must be multiples of 5: positive +5 to +30, negative -10 to -25.'
        );
        hasError = true;
      } else {
        setRubricError(undefined);
      }
    }

    if (!complexityValue) {
      setComplexityError('Please select a complexity level.');
      hasError = true;
    } else {
      setComplexityError(undefined);
    }

    if (!hasError) {
      setSubmitted(true);
      onComplete();
    }
  };

  const isReadonly = step.mode === 'readonly';

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>{step.title}</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <p className='leading-relaxed text-foreground'>{step.body}</p>

        {/* Task form preview */}
        <div
          className={cn(
            'rounded-lg border-2 border-dashed p-4',
            isReadonly ? 'border-primary/30 bg-background' : 'border-amber-400/40 bg-amber-50/20'
          )}
        >
          <p className='mb-4 text-xs font-semibold uppercase tracking-wide text-primary'>
            {isReadonly ? 'Task Form Preview' : 'Practice Task Form'}
          </p>

          <FormProvider taskId='training-preview'>
            <div className='space-y-6'>
              {/* Seed Workbook */}
              <div>
                <Label className='mb-2 block'>Seed Workbook</Label>
                <MockFileDisplay
                  filename={
                    isReadonly
                      ? 'Revenue_Model_Apple_FY2025.xlsx'
                      : 'Simple_LBO_vF.xlsx'
                  }
                  size={isReadonly ? '2.4 MB' : '1.8 MB'}
                  downloadable={!isReadonly}
                  downloadUrl={!isReadonly ? '/training/Simple_LBO_vF.xlsx' : undefined}
                />
              </div>

              {/* Input Workbook */}
              <div>
                <Label className='mb-2 block'>Input Workbook</Label>
                {isReadonly ? (
                  <MockFileDisplay
                    filename='Input_Revenue_Model_Apple_FY2025.xlsx'
                    size='2.6 MB'
                  />
                ) : inputFileName ? (
                  <MockFileDisplay filename={inputFileName} size='--' />
                ) : (
                  <MockFileUpload
                    label='Upload Input Workbook (.xlsx)'
                    onFileSelected={(name) => { setInputFileName(name); setFileError(undefined); }}
                  />
                )}
              </div>

              {/* Prompt field */}
              <TextareaField
                field={{
                  ...MOCK_PROMPT_FIELD,
                  editable: !isReadonly,
                }}
                value={promptValue}
                onChange={v => {
                  setPromptValue(v);
                  if (promptError && v.trim()) setPromptError(undefined);
                }}
                error={promptError}
              />

              {/* Output Workbook */}
              <div>
                <Label className='mb-2 block'>Output Workbook</Label>
                {isReadonly ? (
                  <MockFileDisplay
                    filename='Output_Revenue_Model_Apple_FY2025.xlsx'
                    size='3.1 MB'
                  />
                ) : outputFileName ? (
                  <MockFileDisplay filename={outputFileName} size='--' />
                ) : (
                  <MockFileUpload
                    label='Upload Output Workbook (.xlsx)'
                    onFileSelected={(name) => { setOutputFileName(name); setFileError(undefined); }}
                  />
                )}
              </div>

              {fileError && (
                <p className='text-sm text-destructive'>{fileError}</p>
              )}

              {/* Rubric field */}
              <RubricField
                field={{
                  ...MOCK_RUBRIC_FIELD,
                  editable: !isReadonly,
                }}
                value={rubricValue}
                onChange={v => {
                  setRubricValue(v);
                  if (rubricError) setRubricError(undefined);
                }}
                error={rubricError}
              />

              {/* Complexity field */}
              <SelectField
                field={{
                  ...MOCK_COMPLEXITY_FIELD,
                  editable: !isReadonly,
                }}
                value={complexityValue}
                onChange={v => {
                  setComplexityValue(v);
                  if (complexityError) setComplexityError(undefined);
                }}
                error={complexityError}
              />

              {/* Practice mode submit */}
              {!isReadonly && !submitted && (
                <div className='flex gap-3 border-t pt-4'>
                  <Button size='lg' onClick={handlePracticeSubmit}>
                    Submit Practice Response
                  </Button>
                </div>
              )}

              {/* Success message */}
              {submitted && (
                <div className='flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4'>
                  <CheckCircle className='size-5 shrink-0 text-emerald-600' weight='fill' />
                  <div>
                    <p className='text-sm font-medium text-emerald-800'>
                      Practice submission looks great!
                    </p>
                    <p className='mt-0.5 text-xs text-emerald-700'>
                      All required fields are filled in. On the real platform, this would be sent to a reviewer for evaluation.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </FormProvider>
        </div>

        {step.callout && (() => {
          const CalloutIcon = step.callout.type === 'danger' ? WarningOctagon : step.callout.type === 'warning' ? Warning : step.callout.type === 'tip' ? Lightbulb : Info;
          const iconClass = step.callout.type === 'danger' ? 'text-red-600' : step.callout.type === 'warning' ? 'text-amber-500' : step.callout.type === 'tip' ? 'text-emerald-500' : 'text-blue-500';
          return (
            <div className={cn(
              'flex items-start gap-3 rounded-md border-l-4 p-4',
              step.callout.type === 'danger'
                ? 'border-l-red-600 bg-red-50'
                : step.callout.type === 'warning'
                  ? 'border-l-amber-500 bg-amber-50'
                  : step.callout.type === 'tip'
                    ? 'border-l-emerald-500 bg-emerald-50'
                    : 'border-l-blue-500 bg-blue-50'
            )}>
              <CalloutIcon className={cn('mt-0.5 size-5 shrink-0', iconClass)} weight='fill' />
              <p className='text-sm'>{step.callout.text}</p>
            </div>
          );
        })()}

        {/* Completion checkbox (readonly) or auto-completed via submit (practice) */}
        {isReadonly && (
          <label className='mt-6 flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50'>
            <input
              type='checkbox'
              checked={acknowledged}
              onChange={handleAcknowledge}
              className='size-4 rounded border-gray-300 text-primary accent-primary'
            />
            <span className='text-sm font-medium text-foreground'>
              I understand this section
            </span>
          </label>
        )}
      </CardContent>
    </Card>
  );
}
