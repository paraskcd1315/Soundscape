import type { BassStep } from './BassStep';
import type { TonalVoiceId } from './VoiceId';

export interface BassRecipe {
  voice: TonalVoiceId;
  baseMidi: number;
  patterns: readonly (readonly BassStep[])[];
  minimumEnergy: number;
}
