/**
 * Rubric Text Utilities (inlined from @tsip/shared)
 */

import type { RubricRules, RubricValue } from './shared-types';

/**
 * Parse rubric from text format into structured RubricValue.
 */
export function parseRubricFromText(text: string): RubricValue {
  const normalized = text.replace(/\\n/g, '\n');
  const lines = normalized.split('\n');
  const sections: RubricValue['sections'] = [];
  let currentSection: RubricValue['sections'][0] | null = null;

  const pointsRegex = /\[([+-]?\d+)\]\s*$/;
  const criterionNumberingRegex = /^\d+\.\d+[.):]?\s+/;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^[-=~*#]+$/.test(line)) continue;

    const pointsMatch = line.match(pointsRegex);
    const hasCriterionNumbering = criterionNumberingRegex.test(line);

    if (pointsMatch || hasCriterionNumbering) {
      const points = pointsMatch ? parseInt(pointsMatch[1]!, 10) : null;
      let question = line.replace(pointsRegex, '').trim();
      question = question.replace(/^\d+\.?\d*[.):]?\s*/, '');

      if (!currentSection) {
        currentSection = {
          id: crypto.randomUUID(),
          name: 'General',
          criteria: [],
        };
      }

      if (question) {
        currentSection.criteria.push({
          id: crypto.randomUUID(),
          question,
          points,
        });
      }
    } else {
      let sectionName = line
        .replace(/^#+\s*/, '')
        .replace(/^Section\s*\d*:?\s*/i, '')
        .trim();

      if (
        sectionName.toLowerCase().includes('rubric') &&
        sectionName.toLowerCase().includes('evaluation')
      ) {
        continue;
      }
      if (/^total\s*criteria/i.test(sectionName)) continue;
      if (!sectionName) continue;

      if (currentSection && currentSection.criteria.length > 0) {
        sections.push(currentSection);
      }

      currentSection = {
        id: crypto.randomUUID(),
        name: sectionName,
        criteria: [],
      };
    }
  }

  if (currentSection && currentSection.criteria.length > 0) {
    sections.push(currentSection);
  }

  return { sections };
}

/**
 * Export rubric to simple text format for human editing.
 */
export function exportRubricToText(rubric: RubricValue): string {
  const lines: string[] = [];

  rubric.sections.forEach((section, sectionIdx) => {
    const sectionNum = sectionIdx + 1;
    if (sectionIdx > 0) lines.push('');

    lines.push(`Section ${sectionNum}: ${section.name}`);
    lines.push('');

    section.criteria.forEach((criterion, criterionIdx) => {
      const criterionNum = `${sectionNum}.${criterionIdx + 1}`;
      const pointsSuffix =
        criterion.points == null
          ? ''
          : criterion.points >= 0
            ? ` [+${criterion.points}]`
            : ` [${criterion.points}]`;
      lines.push(`${criterionNum}. ${criterion.question}${pointsSuffix}`);
    });
  });

  return lines.join('\n');
}

/**
 * Build a RubricValue skeleton from rubric rules.
 */
export function buildRubricFromRules(rules: RubricRules): RubricValue {
  if (!rules.sections || rules.sections.length === 0) {
    return { sections: [] };
  }

  return {
    sections: rules.sections.map(rule => ({
      id: crypto.randomUUID(),
      name: rule.name,
      criteria: (rule.requiredCriteria ?? []).map(rc => ({
        id: crypto.randomUUID(),
        question: rc.question,
        points: rc.points,
      })),
    })),
  };
}
