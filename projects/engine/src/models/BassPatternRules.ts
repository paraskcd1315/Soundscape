import type { StepWeights } from "./StepWeights";
import type { WeightedInterval } from "./WeightedInterval";

export interface BassPatternRules {
  anchors: readonly number[];
  weights: StepWeights;
  minExtra: number;
  maxExtra: number;
  lengths: readonly number[];
  intervals: readonly WeightedInterval[];
  kickInteraction: number;
  walking: boolean;
}
