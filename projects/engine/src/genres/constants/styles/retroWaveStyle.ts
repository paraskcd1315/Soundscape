import type { StyleDefinition } from "../../../models/StyleDefinition";
import { SYNTH_FAMILY } from "../families/synthFamily";

export const retroWaveStyle: StyleDefinition = {
  ...SYNTH_FAMILY,
  id: "retroWave",
  palette: {
    backgroundTop: "#14002b",
    backgroundBottom: "#4b0f5a",
    accents: {
      drums: "#ff2a6d",
      bass: "#05d9e8",
      chords: "#ff6ec7",
      pad: "#3a0ca3",
      melody: "#f9f871",
      counter: "#ff9e00",
      texture: "#d1f7ff",
    },
  },
};
