import type { DrumVoiceId } from "../../models/DrumVoiceId";
import type { DrumVoiceRule } from "../../models/DrumVoiceRule";
import { steps } from "./stepWeights.util";

export function drumRule(
  voice: DrumVoiceId,
  anchors: readonly number[],
  weights: string,
  extra: readonly [number, number],
  presence: number,
): DrumVoiceRule {
  return {
    voice,
    anchors,
    weights: steps(weights),
    minExtra: extra[0],
    maxExtra: extra[1],
    presence,
  };
}
