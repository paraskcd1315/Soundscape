import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const chillForm: SongForm = {
  sections: [
    section("intro", 4, {
      mask: { drums: 0, bass: 0.5, melody: 0, counter: 0 },
      energyShift: -0.15,
      introOnly: true,
    }),
    section("a", 8, { mask: { melody: 0.8, counter: 0.4 } }),
    section("b", 8, { energyShift: 0.08 }),
    section("break", 4, {
      mask: { drums: 0.2, counter: 0.6 },
      energyShift: -0.1,
    }),
    section("a again", 8, {
      mask: { melody: 0.9, counter: 0.6 },
      energyShift: 0.05,
    }),
  ],
};

export const songForm: SongForm = {
  sections: [
    section("intro", 4, {
      mask: { melody: 0, counter: 0, bass: 0.5 },
      energyShift: -0.15,
      introOnly: true,
    }),
    section("verse", 8, { mask: { counter: 0.4, melody: 0.7 } }),
    section("chorus", 8, { energyShift: 0.15, impactAtStart: true }),
    section("verse two", 8, { mask: { counter: 0.6 } }),
    section("bridge", 4, {
      mask: { drums: 0.5, melody: 0.6 },
      energyShift: -0.1,
      riserAtEnd: true,
    }),
    section("chorus two", 8, { energyShift: 0.25, impactAtStart: true }),
  ],
};

export const spaceForm: SongForm = {
  sections: [
    section("emerge", 8, {
      mask: { bass: 0.5, melody: 0.2, counter: 0.2, drums: 0 },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("float", 16, { mask: { drums: 0.5 } }),
    section("glow", 16, { energyShift: 0.08, mask: { melody: 0.7 } }),
    section("breathe", 8, {
      mask: { drums: 0.2, melody: 0.5, counter: 0.4 },
      energyShift: -0.12,
    }),
  ],
};
