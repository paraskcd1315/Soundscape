import type { Preset } from "../../../models/Preset";
import { presetSet } from "../utils/presetSet.util";

export const HOUSE_PRESETS: readonly Preset[] = [
  ...presetSet("deepHouse", 4001, [
    { slug: "after-hours", name: "After Hours", overrides: { keyRoot: 5 } },
    {
      slug: "velvet",
      name: "Velvet Room",
      overrides: { keyRoot: 10, scaleId: "dorian", swing: 0.24 },
    },
    {
      slug: "sunday",
      name: "Sunday Session",
      overrides: { keyRoot: 2, energy: 0.45, tempo: 120 },
    },
    {
      slug: "basement",
      name: "Basement Soul",
      overrides: { keyRoot: 7, brightness: 0.35 },
    },
  ]),
  ...presetSet("deepProgressiveHouse", 4101, [
    { slug: "fogline", name: "Fogline", overrides: { keyRoot: 4 } },
    {
      slug: "still-water",
      name: "Still Water",
      overrides: { keyRoot: 9, scaleId: "dorian", energy: 0.5 },
    },
    {
      slug: "glass-city",
      name: "Glass City",
      overrides: { keyRoot: 1, tempo: 123 },
    },
    {
      slug: "mooring",
      name: "Mooring",
      overrides: { keyRoot: 6, scaleId: "phrygian" },
    },
  ]),
  ...presetSet("chillHouse", 4201, [
    { slug: "island", name: "Island Hop", overrides: { keyRoot: 7 } },
    {
      slug: "golden-hour",
      name: "Golden Hour",
      overrides: { keyRoot: 2, scaleId: "mixolydian", tempo: 108 },
    },
    { slug: "lagoon", name: "Lagoon", overrides: { keyRoot: 9, energy: 0.5 } },
    {
      slug: "palm-shade",
      name: "Palm Shade",
      overrides: { keyRoot: 4, scaleId: "minor", tempo: 112 },
    },
  ]),
  ...presetSet("techHouse", 4301, [
    {
      slug: "groove-machine",
      name: "Groove Machine",
      overrides: { keyRoot: 5 },
    },
    {
      slug: "rolling",
      name: "Rolling Deep",
      overrides: { keyRoot: 0, energy: 0.8 },
    },
    {
      slug: "peak-room",
      name: "Peak Room",
      overrides: { keyRoot: 10, tempo: 127, energy: 0.85 },
    },
    {
      slug: "late-shift",
      name: "Late Shift",
      overrides: { keyRoot: 3, scaleId: "dorian" },
    },
  ]),
  ...presetSet("melodicHouseTechno", 4401, [
    { slug: "afterlife", name: "Afterlife", overrides: { keyRoot: 7 } },
    {
      slug: "monolith",
      name: "Monolith",
      overrides: { keyRoot: 5, scaleId: "phrygian", energy: 0.8 },
    },
    {
      slug: "aurora",
      name: "Aurora Drop",
      overrides: { keyRoot: 6, brightness: 0.7 },
    },
    {
      slug: "silhouette",
      name: "Silhouette",
      overrides: { keyRoot: 2, tempo: 123 },
    },
  ]),
  ...presetSet("deepMelodicTechno", 4501, [
    { slug: "submerged", name: "Submerged", overrides: { keyRoot: 4 } },
    {
      slug: "cold-light",
      name: "Cold Light",
      overrides: { keyRoot: 9, scaleId: "minor" },
    },
    { slug: "vault", name: "Vault", overrides: { keyRoot: 1, energy: 0.45 } },
    {
      slug: "black-sand",
      name: "Black Sand",
      overrides: { keyRoot: 6, scaleId: "dorian", tempo: 120 },
    },
  ]),
  ...presetSet("dubTechno", 4601, [
    { slug: "echospace", name: "Echo Chamber", overrides: { keyRoot: 2 } },
    {
      slug: "fog-signal",
      name: "Fog Signal",
      overrides: { keyRoot: 4, scaleId: "dorian" },
    },
    {
      slug: "tape-loop",
      name: "Tape Loop",
      overrides: { keyRoot: 0, reverb: 0.7, tempo: 120 },
    },
    {
      slug: "deepchord",
      name: "Deep Chord",
      overrides: { keyRoot: 3, energy: 0.45 },
    },
  ]),
];
