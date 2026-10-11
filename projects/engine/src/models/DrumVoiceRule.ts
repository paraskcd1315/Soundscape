import type { DrumVoiceId } from "./DrumVoiceId";
import type { StepWeights } from "./StepWeights";

export interface DrumVoiceRule {
  voice: DrumVoiceId;
  anchors: readonly number[];
  weights: StepWeights;
  minExtra: number;
  maxExtra: number;
  presence: number;
}
