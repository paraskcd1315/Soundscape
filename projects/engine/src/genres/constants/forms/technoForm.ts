import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const technoForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: {
        bass: 0,
        chords: 0,
        pad: 0.5,
        melody: 0,
        counter: 0,
        texture: 0.6,
      },
      energyShift: -0.25,
    }),
    section("build", 8, {
      mask: { chords: 0.6, melody: 0, counter: 0.5 },
      energyShift: -0.05,
      riserAtEnd: true,
    }),
    section("drop", 16, { energyShift: 0.2, impactAtStart: true }),
    section("breakdown", 8, {
      mask: { drums: 0, bass: 0.3, chords: 0, counter: 0, texture: 0.6 },
      energyShift: -0.2,
      riserAtEnd: true,
    }),
    section("drop two", 16, { energyShift: 0.3, impactAtStart: true }),
    section("outro", 8, {
      mask: {
        bass: 0.6,
        chords: 0,
        pad: 0.5,
        melody: 0,
        counter: 0,
        texture: 0.3,
      },
      energyShift: -0.3,
    }),
  ],
};
