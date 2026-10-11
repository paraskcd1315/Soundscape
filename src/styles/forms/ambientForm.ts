import type { SongForm } from "../../domain/model/SongForm";
import { section } from "./sectionPlan";

export const ambientForm: SongForm = {
  sections: [
    section("emerge", 8, {
      mask: { bass: 0.5, chords: 0.5, melody: 0.2, counter: 0.2, texture: 0.6 },
      energyShift: -0.2,
    }),
    section("bloom", 16, { energyShift: 0.1 }),
    section("drift", 16, { mask: { chords: 0.5, melody: 0.6 } }),
    section("fade", 8, {
      mask: { bass: 0.5, chords: 0.5, melody: 0.2, counter: 0.3, texture: 0.5 },
      energyShift: -0.25,
    }),
  ],
};
