import type { StyleDefinition } from "../../../models/StyleDefinition";
import { DUB_PULSE_BASS } from "../blocks/bassRules.constants";
import { DUB_SPARSE } from "../blocks/grooves.constants";
import { DUB_SPACE } from "../blocks/spaces.constants";
import { DUB_THROWS } from "../blocks/stabRules.constants";
import { MELODIC_TECHNO_FAMILY } from "../families/melodicTechnoFamily";
import { dubForm } from "../forms/clubForms";
import { DRONE, SLOW_PAIR } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const dubTechnoStyle: StyleDefinition = {
  ...MELODIC_TECHNO_FAMILY,
  id: "dubTechno",
  tempoRange: { min: 118, max: 128 },
  defaultTempo: 122,
  defaultBrightness: 0.35,
  defaultReverb: 0.55,
  scaleIds: ["minor", "dorian"],
  defaultScaleId: "minor",
  progressions: [DRONE, SLOW_PAIR],
  drums: {
    ...MELODIC_TECHNO_FAMILY.drums,
    grids: grooveGrids(DUB_SPARSE),
    fillChance: 0.05,
  },
  bass: {
    voice: "subBass",
    baseMidi: 33,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 6, 8, 14], 2)],
  },
  chords: {
    voice: "dubChord",
    rhythm: "stab",
    centerMidi: 55,
    simpleSize: 4,
    richSize: 4,
    stabSteps: [3, 10],
    arpStepLength: 2,
    velocity: 0.55,
  },
  melody: {
    ...MELODIC_TECHNO_FAMILY.melody,
    voice: "dubChord",
    restChance: 0.8,
    maximumNotes: 3,
    minimumEnergy: 0.5,
  },
  texture: { kind: "crackle", voice: "crackle", baseMidi: 0, chance: 0.5 },
  pad: { voice: "pad", size: 4, velocity: 0.26, minimumEnergy: 0.05 },
  counter: null,
  variants: {
    ...MELODIC_TECHNO_FAMILY.variants,
    chordVoices: ["dubChord"],
    melodyVoices: ["dubChord", "bell"],
    padVoices: ["pad", "strings"],
    bassVoices: ["subBass"],
    stabSteps: [[3, 10], [3], [6, 14], [3, 11]],
    drumKits: [],
  },
  patterns: {
    templateChance: 0.4,
    drumGrooves: [DUB_SPARSE],
    bass: DUB_PULSE_BASS,
    stabs: DUB_THROWS,
  },
  form: dubForm,
  space: DUB_SPACE,
  palette: {
    backgroundTop: "#03070a",
    backgroundBottom: "#0f2424",
    accents: {
      drums: "#5e8c8a",
      bass: "#1f4e4c",
      chords: "#9ad1c9",
      pad: "#173836",
      melody: "#d8f3ee",
      counter: "#7fb7ae",
      texture: "#c9e4de",
    },
  },
};
