import type { TextureKind } from "./TextureKind";
import type { VoiceId } from "./VoiceId";

export interface TextureRecipe {
  kind: TextureKind;
  voice: VoiceId | null;
  baseMidi: number;
  chance: number;
}
