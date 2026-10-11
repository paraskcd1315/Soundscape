import type { Preset } from "../../../models/Preset";
import { presetSet } from "../utils/presetSet.util";

export const TRANCE_PRESETS: readonly Preset[] = [
  ...presetSet("trance", 3001, [
    {
      slug: "sunrise",
      name: "Sunrise Anthem",
      overrides: { keyRoot: 7, scaleId: "major", energy: 0.75 },
    },
    {
      slug: "classic",
      name: "Classic 138",
      overrides: { keyRoot: 9, scaleId: "minor", tempo: 138 },
    },
    {
      slug: "euphoria",
      name: "Euphoria",
      overrides: {
        keyRoot: 2,
        scaleId: "major",
        brightness: 0.85,
        energy: 0.85,
      },
    },
    {
      slug: "night-drive",
      name: "Night Drive",
      overrides: { keyRoot: 4, scaleId: "dorian", tempo: 136, energy: 0.6 },
    },
  ]),
  ...presetSet("epicTrance", 3101, [
    {
      slug: "cathedral",
      name: "Cathedral of Light",
      overrides: { keyRoot: 9, reverb: 0.7 },
    },
    {
      slug: "valkyrie",
      name: "Valkyrie",
      overrides: { keyRoot: 2, energy: 0.85 },
    },
    {
      slug: "ancient",
      name: "Ancient Shores",
      overrides: { keyRoot: 4, scaleId: "phrygian" },
    },
    {
      slug: "final-hour",
      name: "Final Hour",
      overrides: { keyRoot: 5, scaleId: "minor", energy: 0.9 },
    },
  ]),
  ...presetSet("deepProgressiveTrance", 3201, [
    { slug: "undertow", name: "Undertow", overrides: { keyRoot: 2 } },
    {
      slug: "pale-moon",
      name: "Pale Moon",
      overrides: { keyRoot: 7, scaleId: "minor", energy: 0.5 },
    },
    {
      slug: "drift-signal",
      name: "Drift Signal",
      overrides: { keyRoot: 11, scaleId: "phrygian" },
    },
    {
      slug: "low-tide",
      name: "Low Tide",
      overrides: { keyRoot: 4, tempo: 128, density: 0.4 },
    },
  ]),
  ...presetSet("progressive", 3301, [
    {
      slug: "warehouse-dawn",
      name: "Warehouse Dawn",
      overrides: { keyRoot: 8 },
    },
    {
      slug: "patagonia",
      name: "Patagonia",
      overrides: { keyRoot: 2, scaleId: "dorian", tempo: 122 },
    },
    {
      slug: "long-road",
      name: "Long Road",
      overrides: { keyRoot: 10, energy: 0.6, variation: 0.6 },
    },
    {
      slug: "tidal",
      name: "Tidal",
      overrides: { keyRoot: 5, scaleId: "phrygian", tempo: 124 },
    },
  ]),
  ...presetSet("melodicProgressive", 3401, [
    { slug: "afterglow", name: "Afterglow", overrides: { keyRoot: 6 } },
    {
      slug: "northern",
      name: "Northern Lights",
      overrides: { keyRoot: 1, brightness: 0.65 },
    },
    {
      slug: "petals",
      name: "Petals",
      overrides: { keyRoot: 9, scaleId: "dorian", energy: 0.55 },
    },
    {
      slug: "horizon",
      name: "Horizon Line",
      overrides: { keyRoot: 3, tempo: 124 },
    },
  ]),
];
