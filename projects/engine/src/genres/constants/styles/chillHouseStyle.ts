import type { StyleDefinition } from "../../../models/StyleDefinition";
import { DEEP_HOUSE_BASS } from "../blocks/bassRules.constants";
import { TROPICAL_BOUNCE } from "../blocks/grooves.constants";
import { TROPICAL_SPACE } from "../blocks/spaces.constants";
import { FIRST_OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { HOUSE_FAMILY } from "../families/houseFamily";
import { grooveGrids } from "../../utils/grooveGrids.util";
import {
  BALEARIC_LOOP,
  MAJOR_ANTHEM,
  NOSTALGIC_MAJOR,
} from "../progressions.constants";

export const chillHouseStyle: StyleDefinition = {
  ...HOUSE_FAMILY,
  id: "chillHouse",
  tempoRange: { min: 100, max: 118 },
  defaultTempo: 110,
  defaultSwing: 0.12,
  defaultBrightness: 0.6,
  scaleIds: ["major", "mixolydian", "minor"],
  defaultScaleId: "major",
  progressions: [MAJOR_ANTHEM, NOSTALGIC_MAJOR, BALEARIC_LOOP],
  drums: { ...HOUSE_FAMILY.drums, grids: grooveGrids(TROPICAL_BOUNCE) },
  chords: {
    ...HOUSE_FAMILY.chords,
    voice: "pluck",
    stabSteps: [2, 6, 10, 14],
    velocity: 0.45,
  },
  melody: {
    ...HOUSE_FAMILY.melody,
    voice: "marimba",
    restChance: 0.35,
    maximumNotes: 7,
    lowMidi: 65,
    highMidi: 89,
  },
  counter: { ...HOUSE_FAMILY.counter, voice: "steelDrum" },
  pad: { voice: "junoPad", size: 4, velocity: 0.3, minimumEnergy: 0.05 },
  variants: {
    ...HOUSE_FAMILY.variants,
    chordVoices: ["pluck", "epiano", "nylonGuitar"],
    melodyVoices: ["marimba", "steelDrum", "flute", "vocalChop"],
    counterVoices: ["steelDrum", "marimba", "pluck"],
    padVoices: ["junoPad", "pad", "strings"],
  },
  patterns: {
    templateChance: 0.45,
    drumGrooves: [TROPICAL_BOUNCE],
    bass: DEEP_HOUSE_BASS,
    stabs: FIRST_OFFBEAT_STABS,
  },
  space: TROPICAL_SPACE,
  palette: {
    backgroundTop: "#03181a",
    backgroundBottom: "#0b4d48",
    accents: {
      drums: "#ffd166",
      bass: "#06d6a0",
      chords: "#9ef01a",
      pad: "#118ab2",
      melody: "#fff3b0",
      counter: "#ff9f1c",
      texture: "#fffbe6",
    },
  },
};
