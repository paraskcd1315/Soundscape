import type { DrumGrid } from "../../../domain/model/DrumGrid";
import type { DrumVoiceRule } from "../../../domain/model/PatternRules";
import type { SeededRng } from "../../../domain/random/SeededRng";
import { clamp } from "../../../domain/theory/clamp";
import { COMPOSER_METRICS } from "../composerMetrics";
import { pickSteps } from "./pickSteps";

const ANCHOR_VALUE = 1;
const MIN_GHOST = 0.28;
const MAX_GHOST = 0.9;
const GHOST_RANGE = 0.6;

export function extraValue(weight: number, rng: SeededRng): number {
  return (
    Math.round(
      clamp(
        MIN_GHOST + weight * GHOST_RANGE * rng.range(0.8, 1),
        MIN_GHOST,
        MAX_GHOST,
      ) * 100,
    ) / 100
  );
}

export function generateDrumKit(
  rules: readonly DrumVoiceRule[],
  rng: SeededRng,
): DrumGrid[] {
  const kit: DrumGrid[] = [];
  rules.forEach((rule, index) => {
    if (index > 0 && !rng.chance(rule.presence)) return;
    const steps = new Array<number>(COMPOSER_METRICS.stepsPerBar).fill(0);
    for (const anchor of rule.anchors) steps[anchor] = ANCHOR_VALUE;
    const extras = pickSteps(
      rng,
      rule.weights,
      rng.int(rule.minExtra, rule.maxExtra),
      new Set(rule.anchors),
    );
    for (const step of extras)
      steps[step] = extraValue(rule.weights[step] as number, rng);
    kit.push({ voice: rule.voice, steps });
  });
  return kit;
}
