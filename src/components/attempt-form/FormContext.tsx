import { createContext, useCallback, useContext, useState } from 'react';

interface FormContextValue {
  taskId: string;
  registerBlockingError: (fieldId: string) => void;
  unregisterBlockingError: (fieldId: string) => void;
  hasBlockingErrors: () => boolean;
  getBlockingErrorFields: () => Set<string>;
  triggerSubmit?: () => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export function FormProvider({
  taskId,
  triggerSubmit,
  children,
}: {
  taskId: string;
  triggerSubmit?: () => void;
  children: React.ReactNode;
}) {
  const [blockingErrorFields, setBlockingErrorFields] = useState<Set<string>>(
    new Set()
  );

  const registerBlockingError = useCallback((fieldId: string) => {
    setBlockingErrorFields(prev => {
      if (prev.has(fieldId)) return prev;
      const next = new Set(prev);
      next.add(fieldId);
      return next;
    });
  }, []);

  const unregisterBlockingError = useCallback((fieldId: string) => {
    setBlockingErrorFields(prev => {
      if (!prev.has(fieldId)) return prev;
      const next = new Set(prev);
      next.delete(fieldId);
      return next;
    });
  }, []);

  const hasBlockingErrors = useCallback(() => {
    return blockingErrorFields.size > 0;
  }, [blockingErrorFields]);

  const getBlockingErrorFields = useCallback(() => {
    return blockingErrorFields;
  }, [blockingErrorFields]);

  return (
    <FormContext.Provider
      value={{
        taskId,
        registerBlockingError,
        unregisterBlockingError,
        hasBlockingErrors,
        getBlockingErrorFields,
        triggerSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext(): FormContextValue {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider');
  }
  return context;
}
