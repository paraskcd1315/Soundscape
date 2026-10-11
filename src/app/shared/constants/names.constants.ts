import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { ScaleId } from "@soundscape/engine/models/ScaleId";
import type { StyleId } from "@soundscape/engine/models/StyleId";
import type { VisualizerModeId } from "@soundscape/engine/models/VisualizerModeId";
import type { VisualizerThemeId } from "@soundscape/engine/models/VisualizerThemeId";

export const STYLE_NAMES: Readonly<Record<StyleId, string>> = {
  ambient: "Ambient",
  lofi: "Lo-fi",
  techno: "Techno",
  chiptune: "Chiptune",
  jazz: "Jazz",
  trance: "Trance",
  epicTrance: "Epic Trance",
  deepProgressiveTrance: "Deep Progressive Trance",
  progressive: "Progressive",
  melodicProgressive: "Melodic Progressive",
  deepHouse: "Deep House",
  deepProgressiveHouse: "Deep Progressive House",
  chillHouse: "Chill & Tropical House",
  techHouse: "Tech House",
  melodicHouseTechno: "Melodic House & Techno",
  deepMelodicTechno: "Deep Melodic Techno",
  dubTechno: "Dub Techno",
  chillout: "Chillout",
  lounge: "Lounge",
  downtempoLounge: "Downtempo Lounge",
  lofiLounge: "Lo-fi Lounge & Chill",
  smoothLofi: "Smooth Lo-fi Beats",
  futureChill: "Future Chill",
  spaceDreams: "Space Dreams",
  dreamlandWaves: "Dreamland Waves",
  retroWave: "Retro Wave",
  cyberpunk: "Cyberpunk",
  edm: "EDM",
};

export const SCALE_NAMES: Readonly<Record<ScaleId, string>> = {
  major: "Major",
  minor: "Minor",
  dorian: "Dorian",
  phrygian: "Phrygian",
  lydian: "Lydian",
  mixolydian: "Mixolydian",
  majorPentatonic: "Major pentatonic",
  minorPentatonic: "Minor pentatonic",
  harmonicMinor: "Harmonic minor",
};

export const LAYER_NAMES: Readonly<Record<LayerKind, string>> = {
  drums: "Beats",
  bass: "Bass",
  chords: "Chords",
  pad: "Ambience",
  melody: "Melody",
  counter: "Counter",
  texture: "Texture",
};

export const VISUALIZER_MODE_NAMES: Readonly<Record<VisualizerModeId, string>> =
  {
    orbit: "Orbit",
    radial: "Radial",
    bars: "Bars",
    flow: "Flow",
  };

export const VISUALIZER_THEME_NAMES: Readonly<
  Record<VisualizerThemeId, string>
> = {
  style: "Follow style",
  aurora: "Aurora",
  sunset: "Sunset",
  neon: "Neon",
  ocean: "Ocean",
  forest: "Forest",
  mono: "Mono",
  custom: "Custom",
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
