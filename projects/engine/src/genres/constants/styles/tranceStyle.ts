import type { StyleDefinition } from "../../../models/StyleDefinition";
import { TRANCE_FAMILY } from "../families/tranceFamily";

export const tranceStyle: StyleDefinition = {
  ...TRANCE_FAMILY,
  id: "trance",
  scaleIds: ["major", "minor", "dorian"],
  defaultScaleId: "major",
  palette: {
    backgroundTop: "#04102a",
    backgroundBottom: "#0a3c7a",
    accents: {
      drums: "#7fd6ff",
      bass: "#2f6bff",
      chords: "#9ff3ff",
      pad: "#2a3f9f",
      melody: "#ffffff",
      counter: "#b4c9ff",
      texture: "#e4f7ff",
    },
  },
};
