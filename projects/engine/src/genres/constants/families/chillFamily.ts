import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { CHILL_SYNC_BASS } from "../blocks/bassRules.constants";
import { BALEARIC, BROKEN_BEAT } from "../blocks/grooves.constants";
import { CHILLOUT_SPACE } from "../blocks/spaces.constants";
import { SYNCOPATED_STABS } from "../blocks/stabRules.constants";
import { chillForm } from "../forms/chillForms";
import {
  BALEARIC_LOOP,
  MAJOR_SEVENTH_DRIFT,
  SLOW_PAIR,
} from "../progressions.constants";

export const CHILL_FAMILY: StyleFamily = {
  tempoRange: { min: 88, max: 112 },
  defaultTempo: 100,
  swingRange: { min: 0, max: 0.3 },
  defaultSwing: 0.08,
  humanizeScale: 1,
  defaultReverb: 0.5,
  defaultBrightness: 0.45,
  ducking: false,
  scaleIds: ["dorian", "major", "minor", "lydian"],
  defaultScaleId: "dorian",
  progressions: [BALEARIC_LOOP, MAJOR_SEVENTH_DRIFT, SLOW_PAIR],
  drums: {
    grids: grooveGrids(BALEARIC),
    fillChance: 0.15,
    fillVoice: "rim",
    minimumEnergy: 0.15,
  },
  bass: {
    voice: "subBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      bassSteps([0, 10], 6, ["root", "fifth"]),
      bassSteps([0, 7, 10], 3, ["root", "fifth", "root"]),
    ],
  },
  chords: {
    voice: "rhodes",
    rhythm: "held",
    centerMidi: 60,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [0, 7, 10],
    arpStepLength: 2,
    velocity: 0.5,
  },
  melody: {
    voice: "flute",
    baseMidi: 72,
    lowMidi: 64,
    highMidi: 86,
    restChance: 0.5,
    minimumNotes: 2,
    maximumNotes: 5,
    noteLengthSteps: [2, 3, 4, 6],
    stepBias: 0.75,
    minimumEnergy: 0.2,
    velocityScale: 0.8,
  },
  texture: { kind: "bells", voice: "bell", baseMidi: 84, chance: 0.25 },
  pad: { voice: "strings", size: 4, velocity: 0.32, minimumEnergy: 0.05 },
  counter: {
    voice: "nylonGuitar",
    lowMidi: 60,
    highMidi: 79,
    chance: 0.4,
    steps: [2, 6, 10, 14, 3, 11],
    lengthSteps: [2, 3, 4],
    minimumEnergy: 0.25,
    velocityScale: 0.8,
  },
  variants: {
    chordVoices: ["rhodes", "epiano", "nylonGuitar", "pad"],
    melodyVoices: ["flute", "vibes", "nylonGuitar", "softLead"],
    bassVoices: ["subBass", "upright"],
    padVoices: ["strings", "pad", "junoPad"],
    counterVoices: ["nylonGuitar", "vibes", "marimba"],
    stabSteps: [
      [0, 7, 10],
      [2, 10],
    ],
    drumKits: [grooveGrids(BROKEN_BEAT)],
    chordCenterShifts: [-2, 0, 2],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [BALEARIC, BROKEN_BEAT],
    bass: CHILL_SYNC_BASS,
    stabs: SYNCOPATED_STABS,
  },
  form: chillForm,
  space: CHILLOUT_SPACE,
};
