import type { TonalVoiceId } from "./TonalVoiceId";

export interface PadRecipe {
  voice: TonalVoiceId;
  size: 3 | 4 | 5;
  velocity: number;
  minimumEnergy: number;
}
