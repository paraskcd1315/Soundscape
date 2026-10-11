import type { BassRecipe } from './BassRecipe';
import type { ChordRecipe } from './ChordRecipe';
import type { DrumRecipe } from './DrumRecipe';
import type { MelodyRecipe } from './MelodyRecipe';
import type { NumericRange } from './NumericRange';
import type { Progression } from './Progression';
import type { ScaleId } from './ScaleId';
import type { StyleId } from './StyleId';
import type { StylePalette } from './StylePalette';
import type { TextureRecipe } from './TextureRecipe';

export interface StyleDefinition {
  id: StyleId;
  tempoRange: NumericRange;
  defaultTempo: number;
  swingRange: NumericRange;
  defaultSwing: number;
  humanizeScale: number;
  defaultReverb: number;
  defaultBrightness: number;
  ducking: boolean;
  scaleIds: readonly ScaleId[];
  defaultScaleId: ScaleId;
  progressions: readonly Progression[];
  drums: DrumRecipe | null;
  bass: BassRecipe;
  chords: ChordRecipe;
  melody: MelodyRecipe;
  texture: TextureRecipe;
  palette: StylePalette;
}
