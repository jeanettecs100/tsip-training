import { GraduationCap, Lock } from '@phosphor-icons/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TrainingHomeProps {
  onStartTraining: () => void;
}

async function verifyPassword(password: string, training: 'contributor' | 'reviewer'): Promise<boolean> {
  try {
    const res = await fetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, training }),
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export function TrainingHome({ onStartTraining }: TrainingHomeProps) {
  const [showContributorPrompt, setShowContributorPrompt] = useState(false);
  const [contributorPassword, setContributorPassword] = useState('');
  const [contributorError, setContributorError] = useState(false);
  const [contributorLoading, setContributorLoading] = useState(false);

  const [showReviewerPrompt, setShowReviewerPrompt] = useState(false);
  const [reviewerPassword, setReviewerPassword] = useState('');
  const [reviewerError, setReviewerError] = useState(false);
  const [reviewerLoading, setReviewerLoading] = useState(false);

  const handleContributorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContributorLoading(true);
    const valid = await verifyPassword(contributorPassword, 'contributor');
    setContributorLoading(false);
    if (valid) {
      onStartTraining();
    } else {
      setContributorError(true);
    }
  };

  const handleReviewerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewerLoading(true);
    const valid = await verifyPassword(reviewerPassword, 'reviewer');
    setReviewerLoading(false);
    if (valid) {
      // TODO: navigate to reviewer training when available
      setReviewerError(true);
    } else {
      setReviewerError(true);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-lg'>
        {/* Logo */}
        <div className='mb-8 flex justify-center'>
          <img src='/logo.svg' alt='TSIP' className='h-10' />
        </div>

        {/* Header */}
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-foreground'>
            TSIP Training Hub
          </h1>
          <p className='mt-2 text-muted-foreground'>
            Your central resource for TSIP onboarding, quality standards, and
            best practices. Complete your training modules to get started, then
            revisit anytime as a reference.
          </p>
        </div>

        {/* Cards */}
        <div className='space-y-4'>
          {/* Contributor Training */}
          <Card
            className='cursor-pointer transition-shadow hover:shadow-md'
            onClick={() => setShowContributorPrompt(!showContributorPrompt)}
          >
            <CardContent className='py-5'>
              <div className='flex items-center gap-4'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10'>
                  <GraduationCap className='size-6 text-primary' weight='fill' />
                </div>
                <div className='flex-1'>
                  <h2 className='font-semibold text-foreground'>
                    Contributor Training
                  </h2>
                  <p className='mt-0.5 text-sm text-muted-foreground'>
                    7 modules covering prompts, spreadsheets, rubrics, platform workflow, and a final assessment
                  </p>
                </div>
                <Lock className='size-5 shrink-0 text-muted-foreground/50' />
              </div>

              {showContributorPrompt && (
                <form onSubmit={handleContributorSubmit} className='mt-4 flex gap-2'>
                  <input
                    type='password'
                    value={contributorPassword}
                    onChange={e => {
                      setContributorPassword(e.target.value);
                      setContributorError(false);
                    }}
                    onClick={e => e.stopPropagation()}
                    placeholder='Enter access code'
                    className='flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20'
                  />
                  <Button type='submit' size='sm' disabled={contributorLoading} onClick={e => e.stopPropagation()}>
                    {contributorLoading ? 'Checking…' : 'Unlock'}
                  </Button>
                </form>
              )}
              {contributorError && (
                <p className='mt-2 text-sm text-rose-600'>
                  Invalid access code. Please try again.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Reviewer Training (Locked) */}
          <Card
            className='cursor-pointer transition-shadow hover:shadow-md'
            onClick={() => setShowReviewerPrompt(!showReviewerPrompt)}
          >
            <CardContent className='py-5'>
              <div className='flex items-center gap-4'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted'>
                  <Lock className='size-6 text-muted-foreground' />
                </div>
                <div className='flex-1'>
                  <h2 className='font-semibold text-foreground'>
                    Reviewer Training
                  </h2>
                  <p className='mt-0.5 text-sm text-muted-foreground'>
                    Password-protected modules for designated reviewers
                  </p>
                </div>
                <Lock className='size-5 shrink-0 text-muted-foreground/50' />
              </div>

              {showReviewerPrompt && (
                <form onSubmit={handleReviewerSubmit} className='mt-4 flex gap-2'>
                  <input
                    type='password'
                    value={reviewerPassword}
                    onChange={e => {
                      setReviewerPassword(e.target.value);
                      setReviewerError(false);
                    }}
                    onClick={e => e.stopPropagation()}
                    placeholder='Enter reviewer access code'
                    className='flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20'
                  />
                  <Button type='submit' size='sm' disabled={reviewerLoading} onClick={e => e.stopPropagation()}>
                    {reviewerLoading ? 'Checking…' : 'Unlock'}
                  </Button>
                </form>
              )}
              {reviewerError && (
                <p className='mt-2 text-sm text-rose-600'>
                  Invalid access code. Contact your team lead for reviewer access.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
