import type { Preset } from "../../../models/Preset";
import { presetSet } from "../utils/presetSet.util";

export const CHILL_PRESETS: readonly Preset[] = [
  ...presetSet("chillout", 5001, [
    { slug: "cafe-sunset", name: "Café Sunset", overrides: { keyRoot: 9 } },
    {
      slug: "salt-air",
      name: "Salt Air",
      overrides: { keyRoot: 2, scaleId: "lydian", tempo: 96 },
    },
    {
      slug: "terrace",
      name: "Terrace",
      overrides: { keyRoot: 7, scaleId: "major", energy: 0.45 },
    },
    {
      slug: "ibiza-dusk",
      name: "Ibiza Dusk",
      overrides: { keyRoot: 4, tempo: 104 },
    },
  ]),
  ...presetSet("lounge", 5101, [
    { slug: "martini", name: "Martini Hour", overrides: { keyRoot: 5 } },
    {
      slug: "velvet-bossa",
      name: "Velvet Bossa",
      overrides: { keyRoot: 0, tempo: 96 },
    },
    {
      slug: "rooftop",
      name: "Rooftop",
      overrides: { keyRoot: 3, scaleId: "dorian" },
    },
    {
      slug: "hotel-lobby",
      name: "Hotel Lobby",
      overrides: { keyRoot: 8, scaleId: "lydian", energy: 0.4 },
    },
  ]),
  ...presetSet("downtempoLounge", 5201, [
    { slug: "slow-burn", name: "Slow Burn", overrides: { keyRoot: 2 } },
    {
      slug: "smoke-rings",
      name: "Smoke Rings",
      overrides: { keyRoot: 9, tempo: 86 },
    },
    {
      slug: "night-tram",
      name: "Night Tram",
      overrides: { keyRoot: 5, scaleId: "minor" },
    },
    {
      slug: "low-lamp",
      name: "Low Lamp",
      overrides: { keyRoot: 11, energy: 0.4 },
    },
  ]),
  ...presetSet("lofiLounge", 5301, [
    { slug: "rainy-cafe", name: "Rainy Café", overrides: { keyRoot: 2 } },
    {
      slug: "vinyl-lounge",
      name: "Vinyl Lounge",
      overrides: { keyRoot: 7, scaleId: "major" },
    },
    {
      slug: "window-seat",
      name: "Window Seat",
      overrides: { keyRoot: 4, tempo: 76 },
    },
    {
      slug: "late-tea",
      name: "Late Tea",
      overrides: { keyRoot: 9, scaleId: "lydian", energy: 0.35 },
    },
  ]),
  ...presetSet("smoothLofi", 5401, [
    { slug: "study-desk", name: "Study Desk", overrides: { keyRoot: 5 } },
    {
      slug: "midnight-ink",
      name: "Midnight Ink",
      overrides: { keyRoot: 10, tempo: 80 },
    },
    {
      slug: "warm-tape",
      name: "Warm Tape",
      overrides: { keyRoot: 0, energy: 0.45 },
    },
    {
      slug: "city-blinds",
      name: "City Blinds",
      overrides: { keyRoot: 3, tempo: 88 },
    },
  ]),
  ...presetSet("futureChill", 5501, [
    { slug: "neon-rain", name: "Neon Rain", overrides: { keyRoot: 8 } },
    {
      slug: "two-step-dream",
      name: "Two-Step Dream",
      overrides: { keyRoot: 1, scaleId: "dorian" },
    },
    {
      slug: "afterimage",
      name: "Afterimage",
      overrides: { keyRoot: 6, tempo: 136 },
    },
    {
      slug: "frostline",
      name: "Frostline",
      overrides: { keyRoot: 11, scaleId: "phrygian", energy: 0.45 },
    },
  ]),
];
