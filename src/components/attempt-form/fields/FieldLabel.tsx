import { Label } from '@/components/ui/label';

interface FieldLabelProps {
  htmlFor?: string;
  label: string;
  required?: boolean;
  description?: string;
}

/**
 * Unified field label component with required/optional indicators and description
 */
export function FieldLabel({
  htmlFor,
  label,
  required,
  description,
}: FieldLabelProps) {
  return (
    <div>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className='text-destructive ml-1'>*</span>}
      </Label>
      {description && (
        <p
          className='text-sm text-muted-foreground mt-1'
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  );
}
