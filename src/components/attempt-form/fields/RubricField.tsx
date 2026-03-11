import { Copy, PencilSimple, Plus, Trash } from '@phosphor-icons/react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  buildRubricFromRules,
  exportRubricToText,
  parseRubricFromText,
} from '@/lib/rubric-utils';
import {
  type FieldComponentProps,
  FieldTypeEnum,
  makeFieldDefinition,
  type RubricFieldProps,
} from '@/lib/shared-types';
import { cn } from '@/lib/utils';

import { FieldLabel } from './FieldLabel';

// ============================================================================
// Schema & Component
// ============================================================================

/**
 * Rubric Field Value Schema - For React Hook Form validation
 */
export const rubricFieldValueSchema = z
  .object({
    sections: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        criteria: z.array(
          z.object({
            id: z.string(),
            question: z.string(),
            points: z.number().nullable(),
          })
        ),
      })
    ),
  })
  .nullable();

/**
 * Rubric Field Component (simplified — no linting)
 */
export function RubricField({
  field,
  value,
  onChange,
  error,
}: FieldComponentProps<
  RubricFieldProps,
  z.infer<typeof rubricFieldValueSchema>
>) {
  // Normalize value: parse text strings into structured RubricValue
  const normalizedValue =
    typeof value === 'string' ? parseRubricFromText(value) : value;
  const rubricJson = JSON.stringify(normalizedValue);
  const rubric = useMemo(
    () => normalizedValue || { sections: [] },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rubricJson]
  );

  // Stabilize rubricRules reference
  const rubricRulesJson = JSON.stringify(field.rubricRules);
  const rubricRules = useMemo(
    () => field.rubricRules,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rubricRulesJson]
  );

  // Auto-populate from rubricRules when rubric is empty and field is editable
  const [didAutoPopulate, setDidAutoPopulate] = useState(false);
  useEffect(() => {
    if (
      !didAutoPopulate &&
      field.editable &&
      rubricRules?.sections?.length &&
      (!normalizedValue ||
        !normalizedValue.sections ||
        normalizedValue.sections.length === 0)
    ) {
      setDidAutoPopulate(true);
      onChange(buildRubricFromRules(rubricRules));
    }
  }, [didAutoPopulate, field.editable, rubricRules, normalizedValue, onChange]);

  // Text editing mode state
  const [isTextMode, setIsTextMode] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [hasUnappliedChanges, setHasUnappliedChanges] = useState(false);

  const enterTextMode = () => {
    setTextValue(exportRubricToText(rubric));
    setIsTextMode(true);
    setHasUnappliedChanges(false);
  };

  const applyTextChanges = () => {
    const imported = parseRubricFromText(textValue);
    if (imported.sections.length > 0) {
      const totalCriteria = imported.sections.reduce(
        (sum, s) => sum + s.criteria.length,
        0
      );
      onChange(imported);
      setIsTextMode(false);
      setHasUnappliedChanges(false);
      toast.success(
        `Applied ${imported.sections.length} sections with ${totalCriteria} criteria`
      );
    } else {
      toast.error('Could not parse rubric - no valid criteria found');
    }
  };

  const cancelTextMode = () => {
    setIsTextMode(false);
    setHasUnappliedChanges(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(textValue);
    toast.success('Copied to clipboard');
  };

  // Read-only mode
  if (!field.editable) {
    if (!rubric || rubric.sections.length === 0) {
      return (
        <div>
          <Label>{field.label}</Label>
          <div className='mt-2 text-sm text-muted-foreground'>
            No rubric provided
          </div>
        </div>
      );
    }

    return (
      <div>
        <Label>{field.label}</Label>
        <div className='mt-3 space-y-4'>
          {rubric.sections.map(section => (
            <div key={section.id} className='border rounded-md p-4'>
              <h4 className='font-semibold mb-3'>{section.name}</h4>
              <ul className='space-y-2'>
                {section.criteria.map(criterion => (
                  <li
                    key={criterion.id}
                    className='flex justify-between items-start gap-4 text-sm'
                  >
                    <span className='flex-1'>{criterion.question}</span>
                    {criterion.points != null && (
                      <span
                        className={cn(
                          'font-semibold whitespace-nowrap',
                          criterion.points > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        )}
                      >
                        {criterion.points > 0 ? '+' : ''}
                        {criterion.points}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Helper functions
  const handleAddSection = () => {
    onChange({
      sections: [
        ...rubric.sections,
        { id: crypto.randomUUID(), name: '', criteria: [] },
      ],
    });
  };

  const handleRemoveSection = (sectionId: string) => {
    onChange({
      sections: rubric.sections.filter(s => s.id !== sectionId),
    });
  };

  const handleUpdateSectionName = (sectionId: string, name: string) => {
    onChange({
      sections: rubric.sections.map(s =>
        s.id === sectionId ? { ...s, name } : s
      ),
    });
  };

  const handleAddCriterion = (sectionId: string) => {
    onChange({
      sections: rubric.sections.map(s =>
        s.id === sectionId
          ? {
              ...s,
              criteria: [
                ...s.criteria,
                { id: crypto.randomUUID(), question: '', points: null },
              ],
            }
          : s
      ),
    });
  };

  const handleRemoveCriterion = (sectionId: string, criterionId: string) => {
    onChange({
      sections: rubric.sections.map(s =>
        s.id === sectionId
          ? { ...s, criteria: s.criteria.filter(c => c.id !== criterionId) }
          : s
      ),
    });
  };

  const handleUpdateCriterion = (
    sectionId: string,
    criterionId: string,
    updates: { question?: string; points?: number | null }
  ) => {
    onChange({
      sections: rubric.sections.map(s =>
        s.id === sectionId
          ? {
              ...s,
              criteria: s.criteria.map(c =>
                c.id === criterionId ? { ...c, ...updates } : c
              ),
            }
          : s
      ),
    });
  };

  // Text edit mode
  if (isTextMode) {
    return (
      <div className='space-y-3'>
        <FieldLabel label={field.label} required={field.required} />

        {hasUnappliedChanges && (
          <div className='text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded p-2'>
            You have unapplied changes. Click &quot;Apply&quot; to save or
            &quot;Cancel&quot; to discard.
          </div>
        )}

        <Textarea
          value={textValue}
          onChange={e => {
            setTextValue(e.target.value);
            setHasUnappliedChanges(true);
          }}
          placeholder={`Section 1: Structural Completeness

1.1. Is there a dedicated Inputs section? [+10]
1.2. Does the spreadsheet contain separate tabs? [+15]

Section 2: Formula Correctness

2.1. Is taxable income calculated correctly? [+15]`}
          className='font-mono text-sm min-h-[300px]'
          rows={15}
        />

        <div className='flex gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={copyToClipboard}
          >
            <Copy size={14} className='mr-1' />
            Copy
          </Button>
          <div className='flex-1' />
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={cancelTextMode}
          >
            Cancel
          </Button>
          <Button type='button' size='sm' onClick={applyTextChanges}>
            Apply
          </Button>
        </div>

        {error && <p className='text-sm text-destructive mt-2'>{error}</p>}
      </div>
    );
  }

  // Structured edit mode
  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <FieldLabel label={field.label} required={field.required} />
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={enterTextMode}
          className='text-xs'
        >
          <PencilSimple size={14} className='mr-1' />
          Edit as Text
        </Button>
      </div>

      <p className='text-xs text-muted-foreground'>
        Points: +5 to +30 (positive) or -10 to -25 (pitfalls)
      </p>

      {rubric.sections.length > 0 ? (
        <Accordion type='multiple' className='space-y-2'>
          {rubric.sections.map((section, sectionIndex) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className='border rounded !border-b'
            >
              <div className='flex items-center gap-2 px-3'>
                <AccordionTrigger className='flex-1 py-2 hover:no-underline'>
                  <div className='flex items-center gap-2 text-sm text-left'>
                    <span className='font-medium shrink-0'>
                      Section {sectionIndex + 1}:
                    </span>
                    <span className='truncate'>
                      {section.name || '(unnamed)'}
                    </span>
                    <span className='text-xs text-muted-foreground shrink-0'>
                      ({section.criteria.length})
                    </span>
                  </div>
                </AccordionTrigger>
                {section.criteria.length === 0 && (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => handleRemoveSection(section.id)}
                    className='h-7 w-7 p-0 shrink-0'
                  >
                    <Trash size={14} />
                  </Button>
                )}
              </div>

              <AccordionContent className='px-3 pt-3 pb-3 space-y-2'>
                <Input
                  value={section.name}
                  onChange={e =>
                    handleUpdateSectionName(section.id, e.target.value)
                  }
                  placeholder='Name this section (e.g., Structure, Formulas, Quality)'
                  className='text-sm'
                />
                <div className='space-y-1.5'>
                  {section.criteria.map((criterion, criterionIndex) => (
                    <div
                      key={criterion.id}
                      className='flex gap-2 items-center p-2 border rounded bg-muted/30'
                    >
                      <div className='flex-1 flex gap-2 items-center'>
                        <div className='text-xs text-muted-foreground min-w-8'>
                          {sectionIndex + 1}.{criterionIndex + 1}
                        </div>
                        <Textarea
                          value={criterion.question}
                          onChange={e =>
                            handleUpdateCriterion(section.id, criterion.id, {
                              question: e.target.value,
                            })
                          }
                          placeholder='Question'
                          rows={1}
                          className='text-sm flex-1 resize-none min-h-0'
                        />
                        <Input
                          type='number'
                          value={criterion.points ?? ''}
                          onChange={e => {
                            const val = e.target.value;
                            handleUpdateCriterion(section.id, criterion.id, {
                              points: val === '' ? null : parseInt(val, 10),
                            });
                          }}
                          placeholder='pts'
                          className='w-16 text-sm'
                        />
                      </div>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={() =>
                          handleRemoveCriterion(section.id, criterion.id)
                        }
                        className='h-7 w-7 p-0 shrink-0'
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => handleAddCriterion(section.id)}
                    className='w-full h-7 text-xs'
                  >
                    <Plus size={14} />
                    Add Criterion
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className='text-center py-6 border-2 border-dashed rounded'>
          <p className='text-sm text-muted-foreground'>
            No sections yet. Add a section to get started.
          </p>
        </div>
      )}

      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={handleAddSection}
        className='w-full'
      >
        <Plus size={14} />
        Add Section
      </Button>

      {error && <p className='text-sm text-destructive mt-2'>{error}</p>}
    </div>
  );
}

/**
 * Field Definition Export
 */
export const RUBRIC_FIELD = makeFieldDefinition<
  RubricFieldProps,
  z.infer<typeof rubricFieldValueSchema>
>(FieldTypeEnum.RUBRIC, rubricFieldValueSchema, RubricField);
