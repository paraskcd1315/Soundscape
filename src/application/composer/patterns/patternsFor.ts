import type { SeedTimbre } from "../../../domain/model/SeedTimbre";
import type { Settings } from "../../../domain/model/Settings";
import type { StyleDefinition } from "../../../domain/model/StyleDefinition";
import { createRng } from "../../../domain/random/createRng";
import { COMPOSER_METRICS } from "../composerMetrics";
import type { BarPatterns } from "./BarPatterns";
import { generateBassPattern } from "./generateBassPattern";
import { generateDrumKit } from "./generateDrumKit";
import { generateStabSteps } from "./generateStabSteps";
import { mutateBass, mutateKit, mutateStabs } from "./mutatePatterns";

const CACHE_LIMIT = 64;
const REBUILD_SHARE = 0.25;
const MIN_MUTATION = 0.15;
const cache = new Map<string, BarPatterns>();

function buildFresh(
  settings: Settings,
  style: StyleDefinition,
  timbre: SeedTimbre,
  salt: string,
): BarPatterns {
  const rules = style.patterns;
  const rng = createRng(settings.seed, "pattern-base", style.id, salt);
  const useTemplate = (): boolean => rng.chance(rules.templateChance);
  const drumKit =
    style.drums === null
      ? []
      : useTemplate() && timbre.drumKit.length > 0
        ? timbre.drumKit
        : generateDrumKit(rules.drums, rng);
  const bass =
    useTemplate() && !rules.bass.walking
      ? rng.pick(style.bass.patterns)
      : generateBassPattern(rules.bass, drumKit, rng);
  const stabSteps =
    rules.stabs === null || useTemplate()
      ? timbre.stabSteps
      : generateStabSteps(rules.stabs, rng);
  return { drumKit, bass, stabSteps };
}

function evolve(
  base: BarPatterns,
  settings: Settings,
  style: StyleDefinition,
  section: number,
): BarPatterns {
  const rules = style.patterns;
  const rng = createRng(settings.seed, "pattern-section", style.id, section);
  const amount = MIN_MUTATION + settings.variation * (1 - MIN_MUTATION);
  return {
    drumKit:
      style.drums === null
        ? []
        : mutateKit(base.drumKit, rules.drums, rng, amount),
    bass: mutateBass(base.bass, rules.bass, rng, amount),
    stabSteps:
      rules.stabs === null
        ? base.stabSteps
        : mutateStabs(base.stabSteps, rules.stabs, rng, amount),
  };
}

export function patternsFor(
  settings: Settings,
  style: StyleDefinition,
  timbre: SeedTimbre,
  barIndex: number,
): BarPatterns {
  const section = Math.floor(barIndex / COMPOSER_METRICS.sectionBars);
  const key = [
    settings.seed,
    style.id,
    section,
    settings.variation.toFixed(2),
    timbre.drumKit.length,
    timbre.stabSteps.join("."),
  ].join("|");
  const cached = cache.get(key);
  if (cached) return cached;

  const base = buildFresh(settings, style, timbre, "base");
  let result = base;
  if (section > 0) {
    const rebuild = createRng(
      settings.seed,
      "pattern-rebuild",
      style.id,
      section,
    ).chance(settings.variation * REBUILD_SHARE);
    result = rebuild
      ? buildFresh(settings, style, timbre, `section-${section}`)
      : evolve(base, settings, style, section);
  }

  if (cache.size >= CACHE_LIMIT)
    cache.delete(cache.keys().next().value as string);
  cache.set(key, result);
  return result;
}
