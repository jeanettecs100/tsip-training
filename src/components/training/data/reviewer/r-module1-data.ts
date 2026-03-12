import type { Step } from '../../shared/types';

export const reviewerModule1Steps: Step[] = [
  {
    type: 'content',
    id: 'r1-welcome',
    title: 'Welcome to the TSIP Reviewer Program',
    body: 'Thank you for being a TSIP reviewer! As a reviewer, your goal is to help audit the body of data that is being created, and to maintain the very high bar that we have for quality. As such, we only bring on reviewers who we\'ve worked with extensively already and trust to a very high degree.',
    callout: {
      type: 'info',
      text: 'The quality of TSIP\'s data hinges on reviewers. Every task you approve becomes part of the benchmark dataset — your judgment directly shapes what AI models learn from.',
    },
  },
  {
    type: 'content',
    id: 'r1-north-stars',
    title: 'Three North Stars',
    body: 'Everything you do as a reviewer should be guided by three north stars. These are non-negotiable principles that define what it means to be a TSIP reviewer.',
    sections: [
      {
        body: '1. An Extremely High Bar for Quality',
        bullets: [
          'We are looking for 99th percentile task quality — the type of work that you would only submit as an absolute final version',
          'Every task you approve should reflect the caliber of work you would personally put your name on',
          'If a task is "good enough" but not outstanding, it is not good enough',
        ],
        callout: {
          type: 'danger',
          text: 'Settling for "close enough" undermines the entire dataset. If something feels borderline, it needs revision.',
        },
      },
      {
        body: '2. A Relentless Drive for Nothing to Fall Through the Cracks',
        bullets: [
          'Zero tolerance for any mistakes and gaps in quality',
          'Sometimes this means working with taskers iteratively over as many rounds as it takes to arrive at the right outcome',
          'Every criterion, every assumption, every formula reference — nothing should go unchecked',
        ],
      },
      {
        body: '3. Pride of Work',
        bullets: [
          'The body of data that you approve as a reviewer will be sample-checked by our QA team',
          'As a reviewer, you should take pride in the quality of all the data that you approve',
          'Your approval is a reflection of your caliber of performance as a trusted reviewer',
        ],
        callout: {
          type: 'tip',
          text: 'Think of your approval as a personal seal of quality. If QA tests are run on a task that you approved, it should hold up under the highest scrutiny.',
        },
      },
    ],
  },
];
