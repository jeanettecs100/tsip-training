import { reviewerModule1Steps } from '../data/reviewer/r-module1-data';
import { reviewerModule2Steps } from '../data/reviewer/r-module2-data';
import { reviewerModule3Steps } from '../data/reviewer/r-module3-data';
import { reviewerModule4Steps } from '../data/reviewer/r-module4-data';
import { reviewerModule5Steps } from '../data/reviewer/r-module5-data';
import { reviewerModule6Steps } from '../data/reviewer/r-module6-data';
import type { ModuleId, Step } from '../shared/types';

const REVIEWER_MODULE_STEPS: Record<number, Step[]> = {
  1: reviewerModule1Steps,
  2: reviewerModule2Steps,
  3: reviewerModule3Steps,
  4: reviewerModule4Steps,
  5: reviewerModule5Steps,
  6: reviewerModule6Steps,
};

export function getReviewerModuleSteps(moduleId: ModuleId): Step[] {
  return REVIEWER_MODULE_STEPS[moduleId] ?? [];
}
