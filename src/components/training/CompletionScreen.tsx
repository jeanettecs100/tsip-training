import { BookOpenText, CheckCircle } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CompletionScreenProps {
  onReviewModules?: () => void;
}

export function CompletionScreen({ onReviewModules }: CompletionScreenProps) {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <Card className='max-w-lg text-center'>
        <CardContent className='flex flex-col items-center gap-4 py-8'>
          <CheckCircle
            className='size-16 text-emerald-500'
            weight='fill'
          />
          <h1 className='text-2xl font-bold text-foreground'>
            Training Complete!
          </h1>
          <p className='text-muted-foreground'>
            You&apos;ve completed all 7 training modules. You&apos;re now ready
            to start working on TSIP tasks. Head to your dashboard to pick up
            your first task.
          </p>
          <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
            <a
              href='https://tsip.ai/dashboard'
              className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
            >
              Go to Dashboard
            </a>
            {onReviewModules && (
              <Button variant='outline' size='lg' onClick={onReviewModules}>
                <BookOpenText className='mr-1.5 size-4' />
                Review Modules
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
