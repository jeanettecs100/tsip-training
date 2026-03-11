import { z } from 'zod';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type SelectFieldProps } from '@/lib/shared-types';
import {
  type FieldComponentProps,
  FieldTypeEnum,
  makeFieldDefinition,
} from '@/lib/shared-types';

import { FieldLabel } from './FieldLabel';

/**
 * Select Field Value Schema - For React Hook Form validation
 */
export const selectFieldValueSchema = z
  .union([z.string(), z.number()])
  .nullable();

/**
 * Select Field Component
 */
export function SelectField({
  field,
  value,
  onChange,
  error,
}: FieldComponentProps<
  SelectFieldProps,
  z.infer<typeof selectFieldValueSchema>
>) {
  const options = field.options ?? [];

  if (!field.editable) {
    const selectedOption = options.find(
      opt => String(opt.value) === String(value)
    );
    return (
      <div>
        <Label>{field.label}</Label>
        <div className='mt-1 px-3 py-2 border rounded-md bg-muted text-sm text-muted-foreground'>
          {selectedOption?.label || String(value || '-')}
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
      <Select
        value={String(value ?? '')}
        onValueChange={val => onChange(val as string | number)}
      >
        <SelectTrigger className='mt-1'>
          <SelectValue placeholder={field.placeholder || 'Select...'} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className='text-sm text-destructive mt-1'>{error}</p>}
    </div>
  );
}

/**
 * Field Definition Export
 */
export const SELECT_FIELD = makeFieldDefinition<
  SelectFieldProps,
  z.infer<typeof selectFieldValueSchema>
>(FieldTypeEnum.SELECT, selectFieldValueSchema, SelectField);
