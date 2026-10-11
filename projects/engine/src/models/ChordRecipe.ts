import type { ChordRhythm } from "./ChordRhythm";
import type { TonalVoiceId } from "./TonalVoiceId";

export interface ChordRecipe {
  voice: TonalVoiceId;
  rhythm: ChordRhythm;
  centerMidi: number;
  simpleSize: 3 | 4;
  richSize: 4 | 5;
  stabSteps: readonly number[];
  arpStepLength: number;
  velocity: number;
  rootless?: boolean;
}
