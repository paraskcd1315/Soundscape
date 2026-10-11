import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const ambientForm: SongForm = {
  sections: [
    section("emerge", 8, {
      mask: { bass: 0.5, chords: 0.5, melody: 0.2, counter: 0.2, texture: 0.6 },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("bloom", 16, { energyShift: 0.1 }),
    section("drift", 16, { mask: { chords: 0.5, melody: 0.6 } }),
    section("breathe", 8, {
      mask: { bass: 0.7, chords: 0.7, melody: 0.5, counter: 0.4, texture: 0.6 },
      energyShift: -0.12,
    }),
  ],
};
