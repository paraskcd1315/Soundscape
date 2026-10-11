import type { TonalVoiceId } from './VoiceId';

export interface MelodyRecipe {
  voice: TonalVoiceId;
  baseMidi: number;
  lowMidi: number;
  highMidi: number;
  restChance: number;
  minimumNotes: number;
  maximumNotes: number;
  noteLengthSteps: readonly number[];
  stepBias: number;
  minimumEnergy: number;
}
