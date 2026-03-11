import { module1Steps } from '../data/module1-data';
import { module2Steps } from '../data/module2-data';
import { module3Steps } from '../data/module3-data';
import { module4Steps } from '../data/module4-data';
import { module5Steps } from '../data/module5-data';
import { module6Steps } from '../data/module6-data';
import { module7Steps } from '../data/module7-data';
import type { ModuleId, Step } from '../shared/types';

const MODULE_STEPS: Record<ModuleId, Step[]> = {
  1: module1Steps,
  2: module2Steps,
  3: module3Steps,
  4: module4Steps,
  5: module5Steps,
  6: module6Steps,
  7: module7Steps,
};

export function getModuleSteps(moduleId: ModuleId): Step[] {
  return MODULE_STEPS[moduleId];
}
