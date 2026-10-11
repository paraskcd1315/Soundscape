import type { Preset } from "../../../models/Preset";
import { presetSet } from "../utils/presetSet.util";

export const SYNTH_PRESETS: readonly Preset[] = [
  ...presetSet("spaceDreams", 6001, [
    { slug: "orbit", name: "Low Orbit", overrides: { keyRoot: 2 } },
    {
      slug: "nebula",
      name: "Nebula",
      overrides: { keyRoot: 9, scaleId: "lydian", reverb: 0.9 },
    },
    {
      slug: "event-horizon",
      name: "Event Horizon",
      overrides: { keyRoot: 4, scaleId: "minor", energy: 0.3 },
    },
    {
      slug: "starfield",
      name: "Starfield",
      overrides: { keyRoot: 7, energy: 0.55 },
    },
  ]),
  ...presetSet("dreamlandWaves", 6101, [
    { slug: "vhs-summer", name: "VHS Summer", overrides: { keyRoot: 0 } },
    {
      slug: "pastel",
      name: "Pastel Skies",
      overrides: { keyRoot: 5, scaleId: "lydian" },
    },
    {
      slug: "polaroid",
      name: "Polaroid",
      overrides: { keyRoot: 9, tempo: 90 },
    },
    {
      slug: "sleepover",
      name: "Sleepover",
      overrides: { keyRoot: 2, scaleId: "mixolydian", energy: 0.4 },
    },
  ]),
  ...presetSet("retroWave", 6201, [
    { slug: "outrun", name: "Outrun", overrides: { keyRoot: 9, tempo: 112 } },
    { slug: "neon-coast", name: "Neon Coast", overrides: { keyRoot: 4 } },
    {
      slug: "night-call",
      name: "Night Call",
      overrides: { keyRoot: 2, scaleId: "dorian", tempo: 100 },
    },
    {
      slug: "sunset-drive",
      name: "Sunset Drive",
      overrides: { keyRoot: 7, scaleId: "major", energy: 0.7 },
    },
  ]),
  ...presetSet("cyberpunk", 6301, [
    { slug: "night-city", name: "Night City", overrides: { keyRoot: 4 } },
    {
      slug: "chrome",
      name: "Chrome Heart",
      overrides: { keyRoot: 1, scaleId: "harmonicMinor", energy: 0.85 },
    },
    {
      slug: "netrunner",
      name: "Netrunner",
      overrides: { keyRoot: 6, tempo: 128 },
    },
    {
      slug: "blackwall",
      name: "Blackwall",
      overrides: { keyRoot: 9, scaleId: "minor", tempo: 116 },
    },
  ]),
  ...presetSet("edm", 6401, [
    { slug: "mainstage", name: "Mainstage", overrides: { keyRoot: 7 } },
    {
      slug: "festival",
      name: "Festival Lights",
      overrides: { keyRoot: 2, energy: 0.9 },
    },
    {
      slug: "hands-up",
      name: "Hands Up",
      overrides: { keyRoot: 9, scaleId: "minor", tempo: 130 },
    },
    {
      slug: "summer-anthem",
      name: "Summer Anthem",
      overrides: { keyRoot: 5, brightness: 0.85 },
    },
  ]),
];
