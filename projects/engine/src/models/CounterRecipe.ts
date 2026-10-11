import type { TonalVoiceId } from "./TonalVoiceId";

export interface CounterRecipe {
  voice: TonalVoiceId;
  lowMidi: number;
  highMidi: number;
  chance: number;
  steps: readonly number[];
  lengthSteps: readonly number[];
  minimumEnergy: number;
}
