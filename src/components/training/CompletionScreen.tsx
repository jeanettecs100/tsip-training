import { CheckCircle } from '@phosphor-icons/react';

import { Card, CardContent } from '@/components/ui/card';

export function CompletionScreen() {
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
          <a
            href='https://tsip.ai/dashboard'
            className='mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
          >
            Go to Dashboard
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
