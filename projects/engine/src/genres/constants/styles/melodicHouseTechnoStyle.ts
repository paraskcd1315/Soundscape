import type { StyleDefinition } from "../../../models/StyleDefinition";
import { MELODIC_TECHNO_FAMILY } from "../families/melodicTechnoFamily";
import { anthemForm } from "../forms/clubForms";

export const melodicHouseTechnoStyle: StyleDefinition = {
  ...MELODIC_TECHNO_FAMILY,
  id: "melodicHouseTechno",
  defaultBrightness: 0.6,
  melody: {
    ...MELODIC_TECHNO_FAMILY.melody,
    voice: "supersaw",
    restChance: 0.35,
  },
  form: anthemForm,
  palette: {
    backgroundTop: "#000000",
    backgroundBottom: "#1b0b2e",
    accents: {
      drums: "#e0e0e0",
      bass: "#7b2ff7",
      chords: "#f107a3",
      pad: "#3a0ca3",
      melody: "#ffffff",
      counter: "#c77dff",
      texture: "#f8f0ff",
    },
  },
};
