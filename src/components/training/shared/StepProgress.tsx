import { Progress } from '@/components/ui/progress';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className='mb-6'>
      <div className='mb-2 flex items-center justify-between text-sm text-muted-foreground'>
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <Progress value={currentStep + 1} max={totalSteps} />
    </div>
  );
}
