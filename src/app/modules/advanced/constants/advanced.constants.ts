import type { SoundSliderSpec } from "../types/SoundSliderSpec";
import { ADVANCED_STRINGS } from "./advanced.strings";

export const SOUND_SLIDERS: readonly SoundSliderSpec[] = [
  { key: "tempo", label: ADVANCED_STRINGS.tempo, step: 1 },
  { key: "energy", label: ADVANCED_STRINGS.energy, step: 0.01 },
  { key: "density", label: ADVANCED_STRINGS.density, step: 0.01 },
  { key: "complexity", label: ADVANCED_STRINGS.complexity, step: 0.01 },
  { key: "variation", label: ADVANCED_STRINGS.variation, step: 0.01 },
  { key: "swing", label: ADVANCED_STRINGS.swing, step: 0.01 },
  { key: "humanize", label: ADVANCED_STRINGS.humanize, step: 0.01 },
  { key: "brightness", label: ADVANCED_STRINGS.brightness, step: 0.01 },
  { key: "reverb", label: ADVANCED_STRINGS.reverb, step: 0.01 },
];

export const IMPORT_ACCEPT = ".json,application/json";
