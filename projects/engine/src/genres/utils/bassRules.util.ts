import type { BassInterval } from "../../models/BassInterval";
import type { BassPatternRules } from "../../models/BassPatternRules";
import { steps } from "./stepWeights.util";

export function bassRules(
  anchors: readonly number[],
  weights: string,
  extra: readonly [number, number],
  lengths: readonly number[],
  intervals: readonly (readonly [BassInterval, number])[],
  kickInteraction: number,
  walking = false,
): BassPatternRules {
  return {
    anchors,
    weights: steps(weights),
    minExtra: extra[0],
    maxExtra: extra[1],
    lengths,
    intervals: intervals.map(([interval, weight]) => ({ interval, weight })),
    kickInteraction,
    walking,
  };
}
