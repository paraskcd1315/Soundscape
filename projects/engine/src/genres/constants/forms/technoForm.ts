import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const technoForm: SongForm = {
  sections: [
    section("intro", 4, {
      mask: {
        bass: 0.5,
        chords: 0,
        pad: 0.6,
        melody: 0,
        counter: 0,
        texture: 0.6,
      },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("build", 8, {
      mask: { chords: 0.7, melody: 0.4, counter: 0.5 },
      energyShift: -0.05,
      riserAtEnd: true,
    }),
    section("drop", 16, { energyShift: 0.2, impactAtStart: true }),
    section("breakdown", 4, {
      mask: { drums: 0, bass: 0.8, chords: 0.7, counter: 0.4, texture: 0.8 },
      energyShift: -0.1,
      riserAtEnd: true,
    }),
    section("drop two", 16, { energyShift: 0.3, impactAtStart: true }),
    section("groove", 8, {
      mask: { chords: 0.6, melody: 0.5, counter: 0.6, texture: 0.6 },
    }),
  ],
};
