import type { LayerKind } from "./LayerKind";
import type { LayerMix } from "./LayerMix";
import type { ScaleId } from "./ScaleId";
import type { StyleId } from "./StyleId";
import type { VisualizerModeId } from "./VisualizerModeId";
import type { VisualizerThemeId } from "./VisualizerThemeId";

export interface Settings {
  styleId: StyleId;
  seed: number;
  tempo: number;
  keyRoot: number;
  scaleId: ScaleId;
  energy: number;
  density: number;
  complexity: number;
  variation: number;
  swing: number;
  humanize: number;
  brightness: number;
  reverb: number;
  masterVolume: number;
  layers: Record<LayerKind, LayerMix>;
  visualizerMode: VisualizerModeId;
  visualizerIntensity: number;
  visualizerTheme: VisualizerThemeId;
  visualizerColors: readonly [string, string];
}
