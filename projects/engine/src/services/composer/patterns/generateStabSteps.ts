import type { StabPatternRules } from "../../../models/StabPatternRules";
import type { SeededRng } from "../../random/SeededRng";
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
