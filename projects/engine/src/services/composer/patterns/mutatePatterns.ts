import type { BassStep } from "../../../models/BassStep";
import type { DrumGrid } from "../../../models/DrumGrid";
import type { BassPatternRules } from "../../../models/BassPatternRules";
import type { DrumVoiceRule } from "../../../models/DrumVoiceRule";
import type { StabPatternRules } from "../../../models/StabPatternRules";
import type { StepWeights } from "../../../models/StepWeights";
import type { SeededRng } from "../../random/SeededRng";
import { COMPOSER_METRICS } from "../constants/composer.constants";
import { extraValue } from "./generateDrumKit";
import { pickSteps } from "./pickSteps";
import { REMOVE_SHARE, ADD_SHARE, SHIFT_SHARE, RETUNE_SHARE, WALK_CHOICES } from "./constants/mutatePatterns.constants";

function occupiedSteps(steps: readonly number[]): Set<number> {
  return new Set(
    steps
      .map((value, step) => (value > 0 ? step : -1))
      .filter((step) => step >= 0),
  );
}

function shiftedStep(
  step: number,
  weights: StepWeights,
  taken: ReadonlySet<number>,
  rng: SeededRng,
): number {
  const target = step + (rng.chance(0.5) ? 1 : -1);
  const allowed =
    target >= 0 &&
    target < COMPOSER_METRICS.stepsPerBar &&
    (weights[target] as number) > 0.05 &&
    !taken.has(target);
  return allowed ? target : step;
}

function mutateGrid(
  grid: DrumGrid,
  rule: DrumVoiceRule,
  rng: SeededRng,
  amount: number,
): DrumGrid {
  const steps = [...grid.steps];
  const anchors = new Set(rule.anchors);
  const extras = () =>
    steps
      .map((value, step) => ({ value, step }))
      .filter((entry) => entry.value > 0 && !anchors.has(entry.step));
  for (const hit of extras()) {
    if (rng.chance(amount * REMOVE_SHARE) && extras().length > rule.minExtra) {
      steps[hit.step] = 0;
    } else if (rng.chance(amount * SHIFT_SHARE)) {
      const target = shiftedStep(
        hit.step,
        rule.weights,
        occupiedSteps(steps),
        rng,
      );
      if (target !== hit.step) {
        steps[target] = steps[hit.step] as number;
        steps[hit.step] = 0;
      }
    }
  }
  if (extras().length < rule.maxExtra && rng.chance(amount * ADD_SHARE)) {
    const [added] = pickSteps(rng, rule.weights, 1, occupiedSteps(steps));
    if (added !== undefined)
      steps[added] = extraValue(rule.weights[added] as number, rng);
  }
  return { voice: grid.voice, steps };
}

export function mutateKit(
  kit: readonly DrumGrid[],
  rules: readonly DrumVoiceRule[],
  rng: SeededRng,
  amount: number,
): DrumGrid[] {
  return kit.map((grid) => {
    const rule = rules.find((entry) => entry.voice === grid.voice);
    return rule ? mutateGrid(grid, rule, rng, amount) : grid;
  });
}

export function mutateBass(
  pattern: readonly BassStep[],
  rules: BassPatternRules,
  rng: SeededRng,
  amount: number,
): BassStep[] {
  if (rules.walking) {
    return pattern.map((step, index) =>
      index > 0 && index < pattern.length - 1 && rng.chance(amount * 0.5)
        ? { ...step, interval: rng.pick(WALK_CHOICES) }
        : step,
    );
  }
  const anchors = new Set(rules.anchors);
  const floor = rules.minExtra + anchors.size;
  let next = pattern.filter(
    (step) =>
      anchors.has(step.step) ||
      pattern.length <= floor ||
      !rng.chance(amount * REMOVE_SHARE),
  );
  if (
    next.filter((step) => !anchors.has(step.step)).length < rules.maxExtra &&
    rng.chance(amount * ADD_SHARE)
  ) {
    const [added] = pickSteps(
      rng,
      rules.weights,
      1,
      new Set(next.map((step) => step.step)),
    );
    if (added !== undefined) {
      next = [
        ...next,
        {
          step: added,
          interval: rng.pick(rules.intervals).interval,
          lengthSteps: rng.pick(rules.lengths),
          weight: 0.8,
        },
      ];
    }
  }
  next = next.map((step) =>
    !anchors.has(step.step) && rng.chance(amount * RETUNE_SHARE)
      ? { ...step, interval: rng.pick(rules.intervals).interval }
      : step,
  );
  next.sort((a, b) => a.step - b.step);
  return next.map((step, index) => ({
    ...step,
    lengthSteps: Math.max(
      1,
      Math.min(
        step.lengthSteps,
        (next[index + 1]?.step ?? COMPOSER_METRICS.stepsPerBar) - step.step,
      ),
    ),
  }));
}

export function mutateStabs(
  steps: readonly number[],
  rules: StabPatternRules,
  rng: SeededRng,
  amount: number,
): number[] {
  const anchors = new Set(rules.anchors);
  const floor = rules.minExtra + anchors.size;
  let next = steps.filter(
    (step) =>
      anchors.has(step) ||
      steps.length <= floor ||
      !rng.chance(amount * REMOVE_SHARE),
  );
  if (
    next.filter((step) => !anchors.has(step)).length < rules.maxExtra &&
    rng.chance(amount * ADD_SHARE)
  ) {
    const [added] = pickSteps(rng, rules.weights, 1, new Set(next));
    if (added !== undefined) next = [...next, added];
  }
  return next.sort((a, b) => a - b);
}
