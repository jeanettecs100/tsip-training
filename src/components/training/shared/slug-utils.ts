import { MODULES as CONTRIBUTOR_MODULES } from '../data/modules-config';
import { REVIEWER_MODULES } from '../data/reviewer/r-modules-config';
import { getModuleSteps } from '../steps';
import { getReviewerModuleSteps } from '../steps/reviewer-index';
import type { ModuleConfig, ModuleId, Step } from './types';

// ── helpers ──────────────────────────────────────────────────────────

function buildSlugMaps(modules: ModuleConfig[]) {
  const slugToId = new Map<string, ModuleId>(modules.map(m => [m.slug, m.id]));
  const idToSlug = new Map<ModuleId, string>(modules.map(m => [m.id, m.slug]));
  return { slugToId, idToSlug };
}

const contributor = buildSlugMaps(CONTRIBUTOR_MODULES);
const reviewer = buildSlugMaps(REVIEWER_MODULES);

/** Derive a step slug from a step ID by stripping the module prefix (e.g. 'm1-welcome' → 'welcome', 'r2-direct-changes' → 'direct-changes') */
export function getStepSlug(stepId: string): string {
  return stepId.replace(/^(?:m|r)\d+-/, '');
}

function getStepsForTrack(track: 'contributor' | 'reviewer', moduleId: ModuleId): Step[] {
  return track === 'contributor' ? getModuleSteps(moduleId) : getReviewerModuleSteps(moduleId);
}

// ── contributor ──────────────────────────────────────────────────────

export function resolveContributorModuleSlug(slug: string): ModuleId | undefined {
  return contributor.slugToId.get(slug);
}

export function getContributorModuleSlug(moduleId: ModuleId): string {
  return contributor.idToSlug.get(moduleId)!;
}

// ── reviewer ─────────────────────────────────────────────────────────

export function resolveReviewerModuleSlug(slug: string): ModuleId | undefined {
  return reviewer.slugToId.get(slug);
}

export function getReviewerModuleSlug(moduleId: ModuleId): string {
  return reviewer.idToSlug.get(moduleId)!;
}

// ── shared step resolution ───────────────────────────────────────────

/** Resolve a step slug to its index within the module's step array. Returns -1 if not found. */
export function resolveStepSlug(track: 'contributor' | 'reviewer', moduleId: ModuleId, stepSlug: string): number {
  const steps = getStepsForTrack(track, moduleId);
  return steps.findIndex(s => getStepSlug(s.id) === stepSlug);
}

/** Get the step slug for a given step index within a module. */
export function getStepSlugByIndex(track: 'contributor' | 'reviewer', moduleId: ModuleId, stepIndex: number): string {
  const steps = getStepsForTrack(track, moduleId);
  const safeIndex = Math.max(0, Math.min(stepIndex, steps.length - 1));
  const step = steps[safeIndex];
  return step ? getStepSlug(step.id) : '';
}
