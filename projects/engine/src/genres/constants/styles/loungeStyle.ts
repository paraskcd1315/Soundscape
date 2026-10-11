import type { StyleDefinition } from "../../../models/StyleDefinition";
import { WALKING_LOUNGE_BASS } from "../blocks/bassRules.constants";
import { BOSSA } from "../blocks/grooves.constants";
import { LOUNGE_SPACE } from "../blocks/spaces.constants";
import { SYNCOPATED_STABS } from "../blocks/stabRules.constants";
import { CHILL_FAMILY } from "../families/chillFamily";
import { JAZZ_TWO_FIVE, MAJOR_SEVENTH_DRIFT } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const loungeStyle: StyleDefinition = {
  ...CHILL_FAMILY,
  id: "lounge",
  tempoRange: { min: 90, max: 110 },
  defaultTempo: 100,
  defaultSwing: 0.2,
  scaleIds: ["major", "dorian", "lydian"],
  defaultScaleId: "major",
  progressions: [JAZZ_TWO_FIVE, MAJOR_SEVENTH_DRIFT],
  drums: {
    ...CHILL_FAMILY.drums,
    grids: grooveGrids(BOSSA),
    fillVoice: "brush",
  },
  bass: {
    voice: "upright",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      bassSteps([0, 8], 8, ["root", "fifth"]),
      bassSteps([0, 6, 8, 14], 2, ["root", "fifth", "fifth", "approach"]),
    ],
  },
  chords: {
    ...CHILL_FAMILY.chords,
    voice: "nylonGuitar",
    rhythm: "stab",
    stabSteps: [0, 3, 6, 10, 12],
    rootless: true,
  },
  melody: {
    ...CHILL_FAMILY.melody,
    voice: "vibes",
    restChance: 0.4,
    maximumNotes: 6,
    lowMidi: 65,
  },
  counter: {
    ...CHILL_FAMILY.counter,
    voice: "muteTrumpet",
    lowMidi: 62,
    highMidi: 81,
  },
  texture: { kind: "none", voice: null, baseMidi: 0, chance: 0 },
  pad: null,
  variants: {
    ...CHILL_FAMILY.variants,
    chordVoices: ["nylonGuitar", "rhodes", "piano"],
    melodyVoices: ["vibes", "flute", "muteTrumpet"],
    bassVoices: ["upright"],
    counterVoices: ["muteTrumpet", "vibes", "flute"],
    stabSteps: [
      [0, 3, 6, 10, 12],
      [0, 6, 10],
    ],
    drumKits: [],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [BOSSA],
    bass: WALKING_LOUNGE_BASS,
    stabs: SYNCOPATED_STABS,
  },
  space: LOUNGE_SPACE,
  palette: {
    backgroundTop: "#140a0a",
    backgroundBottom: "#3d1d1a",
    accents: {
      drums: "#e9c46a",
      bass: "#9c6644",
      chords: "#f4a261",
      pad: "#5e3023",
      melody: "#fefae0",
      counter: "#e76f51",
      texture: "#fff8e7",
    },
  },
};
