import { EnvelopeSimple } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const EMAIL_STORAGE_KEY = 'tsip-training-email';

export function getStoredEmail(): string | null {
  return localStorage.getItem(EMAIL_STORAGE_KEY);
}

export function storeEmail(email: string): void {
  localStorage.setItem(EMAIL_STORAGE_KEY, email);
}

interface EmailGateProps {
  onSubmit: (email: string) => void;
}

export function EmailGate({ onSubmit }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    storeEmail(trimmed);
    onSubmit(trimmed);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md'>
        <div className='mb-8 flex justify-center'>
          <img src='/logo.svg' alt='TSIP' className='h-10' />
        </div>

        <Card>
          <CardContent className='pt-6'>
            <div className='mb-6 flex flex-col items-center gap-3 text-center'>
              <div className='flex size-12 items-center justify-center rounded-full bg-primary/10'>
                <EnvelopeSimple className='size-6 text-primary' weight='fill' />
              </div>
              <h1 className='text-xl font-bold text-foreground'>
                Welcome to TSIP Training
              </h1>
              <p className='text-sm text-muted-foreground'>
                Enter your TSIP email address to begin. Your progress and scores will be tracked under this email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <Input
                  type='email'
                  placeholder='you@example.com'
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  autoFocus
                />
                {error && (
                  <p className='mt-1.5 text-sm text-rose-600'>{error}</p>
                )}
              </div>
              <Button type='submit' className='w-full' size='lg'>
                Start Training
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
