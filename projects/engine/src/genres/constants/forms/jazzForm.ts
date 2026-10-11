import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const jazzForm: SongForm = {
  sections: [
    section("head", 16, { mask: { counter: 0.3 } }),
    section("solo", 16, { mask: { chords: 0.8 }, energyShift: 0.1 }),
    section("trading", 8, {
      mask: { chords: 0.6, melody: 0.6, counter: 0.6 },
      energyShift: 0.15,
    }),
    section("head out", 8, { mask: { counter: 0.3 }, energyShift: -0.05 }),
  ],
};
