import type { SliderDefinition } from "./SliderDefinition";

export const SETTINGS_SLIDERS: readonly SliderDefinition[] = [
  { key: "tempo", label: "tempo", step: 1, unit: "bpm" },
  { key: "energy", label: "energy", step: 0.01, unit: "percent" },
  { key: "density", label: "density", step: 0.01, unit: "percent" },
  { key: "complexity", label: "complexity", step: 0.01, unit: "percent" },
  { key: "variation", label: "variation", step: 0.01, unit: "percent" },
  { key: "swing", label: "swing", step: 0.01, unit: "percent" },
  { key: "humanize", label: "humanize", step: 0.01, unit: "percent" },
  { key: "brightness", label: "brightness", step: 0.01, unit: "percent" },
  { key: "reverb", label: "reverb", step: 0.01, unit: "percent" },
];
