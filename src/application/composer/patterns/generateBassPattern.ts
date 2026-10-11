import type { BassInterval, BassStep } from "../../../domain/model/BassStep";
import type { DrumGrid } from "../../../domain/model/DrumGrid";
import type { BassPatternRules } from "../../../domain/model/PatternRules";
import type { SeededRng } from "../../../domain/random/SeededRng";
import { clamp } from "../../../domain/theory/clamp";
import { COMPOSER_METRICS } from "../composerMetrics";
import { pickSteps } from "./pickSteps";

const WALK_MIDDLE: readonly BassInterval[] = ["third", "fifth", "root"];
const KICK_THRESHOLD = 0.95;
const WALK_LENGTH = 4;

function kickSteps(kit: readonly DrumGrid[]): Set<number> {
  const steps = new Set<number>();
  kit
    .find((grid) => grid.voice === "kick")
    ?.steps.forEach((value, step) => {
      if (value >= KICK_THRESHOLD) steps.add(step);
    });
  return steps;
}

function pickInterval(rules: BassPatternRules, rng: SeededRng): BassInterval {
  const total = rules.intervals.reduce((sum, entry) => sum + entry.weight, 0);
  let cursor = rng.next() * total;
  for (const entry of rules.intervals) {
    cursor -= entry.weight;
    if (cursor < 0) return entry.interval;
  }
  return "root";
}

function walkingLine(rules: BassPatternRules, rng: SeededRng): BassStep[] {
  const last = rules.anchors.length - 1;
  return rules.anchors.map((step, index) => ({
    step,
    interval:
      index === 0
        ? "root"
        : index === last
          ? "approach"
          : rng.pick(WALK_MIDDLE),
    lengthSteps: WALK_LENGTH,
    weight: index === 0 ? 1 : rng.range(0.8, 0.9),
  }));
}

function kickAdjusted(
  rules: BassPatternRules,
  kit: readonly DrumGrid[],
): number[] {
  const kicks = kickSteps(kit);
  return rules.weights.map((weight, step) => {
    if (!kicks.has(step)) return weight;
    const factor =
      rules.kickInteraction >= 0
        ? 1 + rules.kickInteraction * 2
        : 1 + rules.kickInteraction;
    return weight * factor + Math.max(0, rules.kickInteraction) * 0.2;
  });
}

export function generateBassPattern(
  rules: BassPatternRules,
  kit: readonly DrumGrid[],
  rng: SeededRng,
): BassStep[] {
  if (rules.walking) return walkingLine(rules, rng);
  const extras = pickSteps(
    rng,
    kickAdjusted(rules, kit),
    rng.int(rules.minExtra, rules.maxExtra),
    new Set(rules.anchors),
  );
  const steps = [...rules.anchors, ...extras].sort((a, b) => a - b);
  return steps.map((step, index) => ({
    step,
    interval: index === 0 ? "root" : pickInterval(rules, rng),
    lengthSteps: Math.max(
      1,
      Math.min(
        rng.pick(rules.lengths),
        (steps[index + 1] ?? COMPOSER_METRICS.stepsPerBar) - step,
      ),
    ),
    weight: rules.anchors.includes(step)
      ? 1
      : clamp(rng.range(0.7, 0.92), 0, 0.94),
  }));
}
