import type { StyleDefinition } from "../../../models/StyleDefinition";
import { CHILL_FAMILY } from "../families/chillFamily";

export const chilloutStyle: StyleDefinition = {
  ...CHILL_FAMILY,
  id: "chillout",
  palette: {
    backgroundTop: "#1a0e05",
    backgroundBottom: "#5c2b12",
    accents: {
      drums: "#ffcf99",
      bass: "#d97b3f",
      chords: "#ffb37a",
      pad: "#7a3b1d",
      melody: "#fff4e3",
      counter: "#ffd6a5",
      texture: "#fffaf0",
    },
  },
};
