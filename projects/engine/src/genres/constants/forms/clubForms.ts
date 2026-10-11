import type { SongForm } from "../../../models/SongForm";
import { section } from "../../utils/sectionPlan.util";

export const tranceForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: { bass: 0.5, chords: 0, melody: 0, counter: 0, pad: 0.7 },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("build", 8, {
      mask: { melody: 0.4, counter: 0.4 },
      energyShift: -0.05,
      riserAtEnd: true,
    }),
    section("drop", 16, { energyShift: 0.2, impactAtStart: true }),
    section("breakdown", 8, {
      mask: { drums: 0, bass: 0.3, counter: 0.5, pad: 1, melody: 1 },
      energyShift: -0.15,
      riserAtEnd: true,
    }),
    section("drop two", 16, { energyShift: 0.3, impactAtStart: true }),
    section("groove", 8, { mask: { melody: 0.4, counter: 0.6 } }),
  ],
};

export const progressiveForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: { bass: 0.4, chords: 0.3, melody: 0, counter: 0 },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("groove", 16, { mask: { melody: 0.4, counter: 0.5 } }),
    section("build", 8, { mask: { melody: 0.6 }, riserAtEnd: true }),
    section("main", 16, { energyShift: 0.15, impactAtStart: true }),
    section("breakdown", 8, {
      mask: { drums: 0.3, bass: 0.6, melody: 1, pad: 1 },
      energyShift: -0.1,
      riserAtEnd: true,
    }),
    section("main two", 16, { energyShift: 0.2, impactAtStart: true }),
  ],
};

export const houseForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: { bass: 0.5, chords: 0.5, melody: 0, counter: 0 },
      energyShift: -0.15,
      introOnly: true,
    }),
    section("groove", 16, { mask: { melody: 0.5, counter: 0.5 } }),
    section("break", 4, {
      mask: { drums: 0.4, bass: 0.3, melody: 0.7 },
      energyShift: -0.1,
      riserAtEnd: true,
    }),
    section("groove two", 16, { energyShift: 0.1, impactAtStart: true }),
    section("swing", 8, { mask: { melody: 0.6, counter: 0.7 } }),
  ],
};

export const dubForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: { bass: 0.5, chords: 0.7, melody: 0, counter: 0 },
      energyShift: -0.15,
      introOnly: true,
    }),
    section("deep", 16, { mask: { melody: 0.2, counter: 0.3 } }),
    section("drift", 16, { mask: { melody: 0.4, counter: 0.5 } }),
    section("thin", 8, { mask: { drums: 0.6, bass: 0.7 }, energyShift: -0.1 }),
  ],
};

export const anthemForm: SongForm = {
  sections: [
    section("intro", 8, {
      mask: { bass: 0.4, melody: 0, counter: 0 },
      energyShift: -0.2,
      introOnly: true,
    }),
    section("build", 8, {
      mask: { melody: 0.6, counter: 0 },
      energyShift: -0.05,
      riserAtEnd: true,
    }),
    section("drop", 16, { energyShift: 0.3, impactAtStart: true }),
    section("breakdown", 8, {
      mask: { drums: 0, bass: 0.4, melody: 1, pad: 1 },
      energyShift: -0.15,
      riserAtEnd: true,
    }),
    section("drop two", 16, { energyShift: 0.35, impactAtStart: true }),
  ],
};
