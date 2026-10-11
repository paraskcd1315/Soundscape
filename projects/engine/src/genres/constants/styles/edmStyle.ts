import type { StyleDefinition } from "../../../models/StyleDefinition";
import { BIG_ROOM_BASS } from "../blocks/bassRules.constants";
import { BIG_ROOM } from "../blocks/grooves.constants";
import { EDM_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { TRANCE_FAMILY } from "../families/tranceFamily";
import { anthemForm } from "../forms/clubForms";
import { MAJOR_ANTHEM, MINOR_EPIC } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const edmStyle: StyleDefinition = {
  ...TRANCE_FAMILY,
  id: "edm",
  tempoRange: { min: 124, max: 132 },
  defaultTempo: 128,
  defaultBrightness: 0.75,
  scaleIds: ["major", "minor"],
  defaultScaleId: "major",
  progressions: [MAJOR_ANTHEM, MINOR_EPIC],
  drums: {
    ...TRANCE_FAMILY.drums,
    grids: grooveGrids(BIG_ROOM),
    fillChance: 0.6,
    fillVoice: "clap",
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [bassSteps([2, 6, 10, 14], 2)],
  },
  chords: {
    ...TRANCE_FAMILY.chords,
    voice: "supersaw",
    stabSteps: [0, 3, 6, 10, 12],
    velocity: 0.55,
  },
  melody: {
    ...TRANCE_FAMILY.melody,
    voice: "pluck",
    restChance: 0.25,
    noteLengthSteps: [1, 1, 2, 2],
  },
  variants: {
    ...TRANCE_FAMILY.variants,
    chordVoices: ["supersaw", "supersaw", "stab"],
    melodyVoices: ["pluck", "supersaw", "vocalChop"],
    counterVoices: ["pluck", "supersaw", "bell"],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [BIG_ROOM],
    bass: BIG_ROOM_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: anthemForm,
  space: EDM_SPACE,
  palette: {
    backgroundTop: "#020014",
    backgroundBottom: "#16004d",
    accents: {
      drums: "#00e5ff",
      bass: "#651fff",
      chords: "#ff4081",
      pad: "#311b92",
      melody: "#ffffff",
      counter: "#ffea00",
      texture: "#e1f5fe",
    },
  },
};
