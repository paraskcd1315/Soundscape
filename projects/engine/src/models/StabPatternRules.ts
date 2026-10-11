import type { StepWeights } from "./StepWeights";

export interface StabPatternRules {
  anchors: readonly number[];
  weights: StepWeights;
  minExtra: number;
  maxExtra: number;
}
