/**
 * Simplified shared types for the standalone training app.
 * Only includes field types used by the training module:
 * SELECT, TEXTAREA, RUBRIC
 */

import type { ComponentType } from 'react';
import { z } from 'zod';

// ============================================================================
// Field Type Enum (subset needed for training)
// ============================================================================

export enum FieldTypeEnum {
  SELECT = 'select',
  TEXTAREA = 'textarea',
  RUBRIC = 'rubric',
}

// ============================================================================
// Base Field Props
// ============================================================================

export interface BaseFieldProps {
  id: string;
  type: string;
  label: string;
  editable: boolean;
  required: boolean;
  section?: string;
  fieldType?: 'data' | 'review';
  description?: string;
  for?: string;
  role?: 'user_content' | 'assistant_content' | 'metadata';
}

// ============================================================================
// Field Component Props
// ============================================================================

export interface FieldComponentProps<
  TFieldProps extends BaseFieldProps,
  TValue,
> {
  field: TFieldProps;
  value: TValue;
  onChange: (value: TValue) => void;
  error?: string;
}

// ============================================================================
// Field Definition
// ============================================================================

export interface RegistryFieldDefinition {
  type: FieldTypeEnum;
  valueSchema: z.ZodTypeAny;
  component: ComponentType<{
    field: unknown;
    value: unknown;
    onChange: (value: unknown) => void;
    error?: string;
  }>;
}

export function makeFieldDefinition<TFieldProps extends BaseFieldProps, TValue>(
  type: FieldTypeEnum,
  valueSchema: z.ZodType<TValue>,
  component: ComponentType<FieldComponentProps<TFieldProps, TValue>>
): RegistryFieldDefinition {
  return { type, valueSchema, component } as RegistryFieldDefinition;
}

// ============================================================================
// Field Props Types (only the ones used by training)
// ============================================================================

export interface SelectFieldProps extends BaseFieldProps {
  type: FieldTypeEnum.SELECT;
  placeholder?: string;
  options: Array<{ value: string | number; label: string }>;
}

export interface TextareaFieldProps extends BaseFieldProps {
  type: FieldTypeEnum.TEXTAREA;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export interface RubricFieldProps extends BaseFieldProps {
  type: FieldTypeEnum.RUBRIC;
  rubricRules?: RubricRules;
}

// ============================================================================
// Rubric Types (inlined from @tsip/shared)
// ============================================================================

export interface RubricCriterion {
  id: string;
  question: string;
  points: number | null;
}

export interface RubricSection {
  id: string;
  name: string;
  criteria: RubricCriterion[];
}

export interface RubricValue {
  sections: RubricSection[];
}

export interface RequiredCriterion {
  question: string;
  points: number;
}

export interface RubricSectionRule {
  name: string;
  required?: boolean;
  minCriteria?: number;
  criteriaPatterns?: Array<{ pattern: string; label: string }>;
  pointsRange?: [number, number];
  requiredCriteria?: RequiredCriterion[];
}

export interface RubricRules {
  sections?: RubricSectionRule[];
}
