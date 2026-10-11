import type { LayerKind } from "../../domain/model/LayerKind";
import type { ScaleId } from "../../domain/model/ScaleId";
import type { StyleId } from "../../domain/model/StyleId";
import type { VisualizerModeId } from "../../domain/model/VisualizerModeId";

export const STYLE_NAMES: Record<StyleId, string> = {
  ambient: "Ambient",
  lofi: "Lo-fi",
  techno: "Techno",
  chiptune: "Chiptune",
  jazz: "Jazz",
};

export const SCALE_NAMES: Record<ScaleId, string> = {
  major: "Major",
  minor: "Minor",
  dorian: "Dorian",
  phrygian: "Phrygian",
  lydian: "Lydian",
  mixolydian: "Mixolydian",
  majorPentatonic: "Major pentatonic",
  minorPentatonic: "Minor pentatonic",
};

export const LAYER_NAMES: Record<LayerKind, string> = {
  drums: "Drums",
  bass: "Bass",
  chords: "Chords",
  pad: "Pad",
  melody: "Melody",
  counter: "Counter",
  texture: "Texture",
};

export const VISUALIZER_MODE_NAMES: Record<VisualizerModeId, string> = {
  bars: "Bars",
  radial: "Radial",
  flow: "Flow",
};

export const KEY_NAMES: readonly string[] = [
  "C",
  "C♯",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];
