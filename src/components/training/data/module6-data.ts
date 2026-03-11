import type { Step } from '../shared/types';

export const module6Steps: Step[] = [
  {
    type: 'content',
    id: 'm6-intro',
    title: 'Putting It All Together',
    body: 'You have covered the TSIP workflow, spreadsheet quality dimensions, prompt construction, rubric authoring, and platform navigation. Now it is time to validate your understanding with an end-to-end practice task before you take your final assessment!',
    callout: {
      type: 'info',
      text: 'The following practice items draw on concepts from every earlier module. Work through each one carefully and take as much time as you need.',
    },
  },
  {
    type: 'task-form-preview',
    id: 'm6-practice-form',
    title: 'Practice: Submit a Task',
    body: 'Use the form below to practice filling out a task submission. The seed workbook is already provided — your job is to write a prompt and build a rubric, just as you would on the real platform. Hit submit when you are ready and the form will validate your work.',
    mode: 'practice',
    callout: {
      type: 'tip',
      text: 'This is a safe sandbox — nothing is sent to a reviewer. Use it to get comfortable with the form fields before working on real assignments.',
    },
  },
];
