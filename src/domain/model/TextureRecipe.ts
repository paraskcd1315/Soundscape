import type { VoiceId } from "./VoiceId";

export type TextureKind = "bells" | "crackle" | "offbeat" | "arp" | "none";

export interface TextureRecipe {
  kind: TextureKind;
  voice: VoiceId | null;
  baseMidi: number;
  chance: number;
}
