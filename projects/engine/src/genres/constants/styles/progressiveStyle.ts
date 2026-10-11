import type { StyleDefinition } from "../../../models/StyleDefinition";
import { PROGRESSIVE_FAMILY } from "../families/progressiveFamily";

export const progressiveStyle: StyleDefinition = {
  ...PROGRESSIVE_FAMILY,
  id: "progressive",
  palette: {
    backgroundTop: "#0b0b18",
    backgroundBottom: "#26284f",
    accents: {
      drums: "#c9c3ff",
      bass: "#6c5ce7",
      chords: "#a29bfe",
      pad: "#3b3a78",
      melody: "#f0edff",
      counter: "#dcd6ff",
      texture: "#f7f5ff",
    },
  },
};
