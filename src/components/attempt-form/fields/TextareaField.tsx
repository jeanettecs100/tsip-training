import { z } from 'zod';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  type FieldComponentProps,
  FieldTypeEnum,
  makeFieldDefinition,
  type TextareaFieldProps,
} from '@/lib/shared-types';
import { cn } from '@/lib/utils';

import { FieldLabel } from './FieldLabel';

/**
 * Textarea Field Value Schema - For React Hook Form validation
 */
export const textareaFieldValueSchema = z.string();

/**
 * Textarea Field Component (simplified — no linting)
 */
export function TextareaField({
  field,
  value,
  onChange,
  error,
}: FieldComponentProps<
  TextareaFieldProps,
  z.infer<typeof textareaFieldValueSchema>
>) {
  const stringValue = String(value ?? '');
  const charCount = stringValue.length;

  if (!field.editable) {
    return (
      <div>
        <Label>{field.label}</Label>
        <div className='mt-1 px-3 py-2 border rounded-md bg-muted text-sm whitespace-pre-wrap leading-relaxed'>
          {stringValue || '-'}
        </div>
      </div>
    );
  }

  return (
    <div>
      <FieldLabel
        htmlFor={field.id}
        label={field.label}
        required={field.required}
        description={field.description}
      />
      <Textarea
        id={field.id}
        value={stringValue}
        onChange={e => onChange(e.target.value)}
        placeholder={field.placeholder}
        maxLength={field.maxLength}
        className={cn('mt-1 min-h-[200px]', error && 'border-destructive')}
        aria-invalid={!!error}
      />
      <div className='flex items-center justify-end mt-2'>
        <span className='text-xs text-muted-foreground'>
          {charCount} / {field.maxLength || '\u221e'}
        </span>
      </div>
      {error && <p className='text-sm text-destructive mt-1'>{error}</p>}
    </div>
  );
}

/**
 * Field Definition Export
 */
export const TEXTAREA_FIELD = makeFieldDefinition<
  TextareaFieldProps,
  z.infer<typeof textareaFieldValueSchema>
>(FieldTypeEnum.TEXTAREA, textareaFieldValueSchema, TextareaField);
