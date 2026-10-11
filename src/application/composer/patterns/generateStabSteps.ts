import type { StabPatternRules } from "../../../domain/model/PatternRules";
import type { SeededRng } from "../../../domain/random/SeededRng";
import { pickSteps } from "./pickSteps";

export function generateStabSteps(
  rules: StabPatternRules,
  rng: SeededRng,
): number[] {
  const extras = pickSteps(
    rng,
    rules.weights,
    rng.int(rules.minExtra, rules.maxExtra),
    new Set(rules.anchors),
  );
  return [...rules.anchors, ...extras].sort((a, b) => a - b);
}
