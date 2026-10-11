import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const lofiForm: SongForm = {
  sections: [
    section("intro", 4, {
      mask: { drums: 0, bass: 0, melody: 0, counter: 0 },
      energyShift: -0.15,
      introOnly: true,
    }),
    section("groove a", 8, { mask: { melody: 0.8, counter: 0.4 } }),
    section("groove b", 8, { energyShift: 0.1 }),
    section("break", 4, {
      mask: { drums: 0, counter: 0.6 },
      energyShift: -0.1,
    }),
    section("groove a again", 8, {
      mask: { melody: 0.9, counter: 0.7 },
      energyShift: 0.05,
    }),
  ],
};
