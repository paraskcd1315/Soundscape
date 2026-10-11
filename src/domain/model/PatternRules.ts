import type { BassInterval } from "./BassStep";
import type { DrumVoiceId } from "./VoiceId";

export type StepWeights = readonly number[];

export interface DrumVoiceRule {
  voice: DrumVoiceId;
  anchors: readonly number[];
  weights: StepWeights;
  minExtra: number;
  maxExtra: number;
  presence: number;
}

export interface WeightedInterval {
  interval: BassInterval;
  weight: number;
}

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

export interface StabPatternRules {
  anchors: readonly number[];
  weights: StepWeights;
  minExtra: number;
  maxExtra: number;
}

export interface DrumGroove {
  name: string;
  rules: readonly DrumVoiceRule[];
}

export interface PatternRules {
  templateChance: number;
  drumGrooves: readonly DrumGroove[];
  bass: BassPatternRules;
  stabs: StabPatternRules | null;
}
