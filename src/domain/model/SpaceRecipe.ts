import type { LayerKind } from "./LayerKind";

export interface SpaceRecipe {
  reverbSeconds: number;
  reverbDecay: number;
  delayBeats: number;
  delayFeedback: number;
  delayMix: number;
  delaySends: Record<LayerKind, number>;
  wobbleDepthSeconds: number;
  wobbleHz: number;
  drive: number;
  rumble: number;
  toneCeilingHz: number;
}
