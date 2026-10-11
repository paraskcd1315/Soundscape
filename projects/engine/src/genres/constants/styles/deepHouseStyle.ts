import type { StyleDefinition } from "../../../models/StyleDefinition";
import { HOUSE_FAMILY } from "../families/houseFamily";

export const deepHouseStyle: StyleDefinition = {
  ...HOUSE_FAMILY,
  id: "deepHouse",
  palette: {
    backgroundTop: "#0b0712",
    backgroundBottom: "#2b1a3a",
    accents: {
      drums: "#ffb86b",
      bass: "#b5651d",
      chords: "#ffd29d",
      pad: "#4b2c5e",
      melody: "#fff1de",
      counter: "#f6c28b",
      texture: "#fff8ef",
    },
  },
};
