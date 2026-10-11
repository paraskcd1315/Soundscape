import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const chiptuneForm: SongForm = {
  sections: [
    section("intro", 4, {
      mask: { melody: 0, counter: 0, texture: 0 },
      energyShift: -0.15,
    }),
    section("verse", 8, { mask: { counter: 0, texture: 0.5 } }),
    section("chorus", 8, { energyShift: 0.15, impactAtStart: true }),
    section("bridge", 8, {
      mask: { drums: 0.5, melody: 0.6 },
      energyShift: -0.1,
      riserAtEnd: true,
    }),
    section("final chorus", 8, { energyShift: 0.25, impactAtStart: true }),
    section("outro", 4, {
      mask: { melody: 0, counter: 0, texture: 0 },
      energyShift: -0.2,
    }),
  ],
};
