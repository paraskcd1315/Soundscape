import type { DrumGrid } from './DrumGrid';
import type { DrumVoiceId } from './VoiceId';

export interface DrumRecipe {
  grids: readonly DrumGrid[];
  fillChance: number;
  fillVoice: DrumVoiceId;
  minimumEnergy: number;
}
