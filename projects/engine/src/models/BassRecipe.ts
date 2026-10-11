import type { BassStep } from './BassStep';
import type { TonalVoiceId } from './TonalVoiceId';

export interface BassRecipe {
  voice: TonalVoiceId;
  baseMidi: number;
  patterns: readonly (readonly BassStep[])[];
  minimumEnergy: number;
}
