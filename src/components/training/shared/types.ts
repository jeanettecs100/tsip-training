export type ModuleId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TrainingMode = 'contributor' | 'reviewer';

export type ModuleStatus = 'locked' | 'current' | 'completed';

export type StepType =
  | 'content'
  | 'checklist'
  | 'multiple-choice'
  | 'matching'
  | 'ordering'
  | 'scenario'
  | 'dashboard-preview'
  | 'task-form-preview'
  | 'assessment-results';

export interface ContentTable {
  headers: string[];
  rows: string[][];
  columnStyles?: Record<number, 'good' | 'bad' | 'bold'>;
  columnWidths?: string[];
}

export interface ContentCallout {
  type: 'info' | 'warning' | 'tip' | 'danger';
  text: string;
}

export interface NumberedList {
  title: string;
  items: string[];
  start?: number;
}

export interface ExampleFile {
  label: string;
  filename: string;
  url: string;
}

export interface AnnotatedBlock {
  label: string;
  text: string;
  color: 'blue' | 'amber' | 'emerald';
}

export interface AnnotatedExample {
  blocks: AnnotatedBlock[];
}

export interface ContentSection {
  body?: string;
  bullets?: string[];
  table?: ContentTable;
  numberedList?: NumberedList;
  callout?: ContentCallout;
  exampleFiles?: ExampleFile[];
  annotatedExample?: AnnotatedExample;
  collapsible?: boolean;
}

export interface ContentStep {
  type: 'content';
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  table?: ContentTable;
  numberedList?: NumberedList;
  callout?: ContentCallout;
  note?: string | { body: string; table: ContentTable };
  exampleFiles?: ExampleFile[];
  annotatedExample?: AnnotatedExample;
  sections?: ContentSection[];
}

export interface MultipleChoiceStep {
  type: 'multiple-choice';
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  callout?: ContentCallout;
}

export interface MatchingStep {
  type: 'matching';
  id: string;
  instruction: string;
  pairs: Array<{ term: string; definition: string }>;
}

export interface OrderingStep {
  type: 'ordering';
  id: string;
  instruction: string;
  items: string[];
}

export interface ScenarioStep {
  type: 'scenario';
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DashboardPreviewStep {
  type: 'dashboard-preview';
  id: string;
  title: string;
  body: string;
  callout?: ContentCallout;
}

export interface TaskFormPreviewStep {
  type: 'task-form-preview';
  id: string;
  title: string;
  body: string;
  mode: 'readonly' | 'practice';
  callout?: ContentCallout;
}

export interface ChecklistGroup {
  label: string;
  items: string[];
}

export interface ChecklistStep {
  type: 'checklist';
  id: string;
  title: string;
  body?: string;
  groups: ChecklistGroup[];
}

export interface AssessmentResultsStep {
  type: 'assessment-results';
  id: string;
  title: string;
}

export type Step =
  | ContentStep
  | ChecklistStep
  | MultipleChoiceStep
  | MatchingStep
  | OrderingStep
  | ScenarioStep
  | DashboardPreviewStep
  | TaskFormPreviewStep
  | AssessmentResultsStep;

export interface ModuleConfig {
  id: ModuleId;
  title: string;
  description: string;
  iconName: string;
}

export interface ModuleScore {
  correct: number;
  total: number;
}

// Maps step ID → selected answer index (for MC/scenario) or -1 (for matching/ordering always-correct)
export type QuizAnswerMap = Record<string, number>;

export interface TrainingProgress {
  completedModules: ModuleId[];
  currentModule: ModuleId;
  currentStepIndex: number;
  moduleScores?: Partial<Record<ModuleId, ModuleScore>>;
  moduleQuizAnswers?: Partial<Record<ModuleId, QuizAnswerMap>>;
}
