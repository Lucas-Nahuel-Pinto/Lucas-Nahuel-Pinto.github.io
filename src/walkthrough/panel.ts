import { pathFor, type Lang } from '../lib/i18n';
import type { Metric, Project } from '../lib/projects';

/**
 * Project cards for the walkthrough grid and detail screen.
 *
 * The portfolio data (`src/lib/projects.ts`) stays the single source of
 * truth: the Astro component serializes these cards once into the page and
 * the client renders the grid and the detail from that payload, so a hot
 * language switch never needs a reload or a second copy of the copy.
 */
export interface ProjectSkill {
  name: string;
  desc: string;
}

export interface ProjectCardCopy {
  title: string;
  pitch: string;
  tags: string[];
  metric: Metric;
  skills: ProjectSkill[];
  problem: string;
  result: string;
}

export interface ProjectCard {
  slug: string;
  live?: { href: string; label: string };
  repo?: { url: string; label: string };
  copy: Record<Lang, ProjectCardCopy>;
}

/** Shape the projects into the payload the client consumes. */
export function buildCards(projects: readonly Project[]): ProjectCard[] {
  return projects.map((project) => {
    const copy = {} as Record<Lang, ProjectCardCopy>;
    for (const lang of ['es', 'en'] as const) {
      const data = project.content[lang];
      copy[lang] = {
        title: data.caseStudy.title,
        pitch: data.caseStudy.pitch,
        tags: data.caseStudy.tags,
        metric: data.stripe.metric,
        skills: data.caseStudy.skills.cards,
        problem: data.stripe.problem,
        result: data.stripe.result,
      };
    }
    return {
      slug: project.slug,
      ...(project.live ? { live: project.live } : {}),
      ...(project.repo ? { repo: project.repo } : {}),
      copy,
    };
  });
}

/**
 * Read the serialized payload. Returns `null` when it is missing or does not
 * match the shape we expect, so the caller can degrade instead of rendering
 * an empty grid.
 */
export function parseCards(raw: string | null): ProjectCard[] | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(value) || value.length === 0) return null;

  const valid = value.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const card = item as Partial<ProjectCard>;
    if (typeof card.slug !== 'string' || !card.copy) return false;
    return (['es', 'en'] as const).every((lang) => {
      const copy = card.copy?.[lang];
      return (
        !!copy &&
        typeof copy.title === 'string' &&
        typeof copy.pitch === 'string' &&
        Array.isArray(copy.tags) &&
        Array.isArray(copy.skills) &&
        !!copy.metric &&
        typeof copy.metric.value === 'string' &&
        typeof copy.metric.label === 'string'
      );
    });
  });

  return valid ? (value as ProjectCard[]) : null;
}

/** Case-study route for a project in the current language. */
export function projectHref(lang: Lang, slug: string): string {
  return pathFor(lang, `proyectos/${slug}`);
}
