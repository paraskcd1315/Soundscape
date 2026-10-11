import type { DrumGroove } from "../../../models/DrumGroove";
import { drumRule } from "../../utils/drumRule.util";

const QUARTERS = [0, 4, 8, 12];
const BACKBEAT = [4, 12];
const OFFBEATS = [2, 6, 10, 14];

export const TRANCE_DRIVE: DrumGroove = {
  name: "trance drive",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "...............4", [0, 1], 0.95),
    drumRule("openHat", OFFBEATS, "", [0, 0], 1),
    drumRule("hat", [], "5.5.5.5.5.5.5.5.", [4, 8], 0.9),
    drumRule("shaker", [], "4444444444444444", [6, 12], 0.6),
    drumRule("ride", [], "..6...6...6...6.", [2, 4], 0.35),
  ],
};

export const BIG_ROOM: DrumGroove = {
  name: "big room",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 1),
    drumRule("openHat", OFFBEATS, "", [0, 0], 1),
    drumRule("hat", [], "6.6.6.6.6.6.6.6.", [2, 6], 0.8),
    drumRule("perc", [], ".....3.....3...6", [1, 2], 0.5),
  ],
};

export const PROGRESSIVE_ROLL: DrumGroove = {
  name: "progressive roll",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 0.8),
    drumRule("rim", [], ".3...4.3.3...4.5", [1, 3], 0.6),
    drumRule("hat", OFFBEATS, "", [0, 0], 1),
    drumRule("shaker", [], "3535353535353535", [8, 14], 0.85),
    drumRule("openHat", [], "......6.......6.", [0, 1], 0.4),
    drumRule("perc", [], "...4.....3....5.", [1, 2], 0.45),
  ],
};

export const DEEP_HOUSE_SWING: DrumGroove = {
  name: "deep house swing",
  rules: [
    drumRule("kick", QUARTERS, ".......2.......3", [0, 1], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 1),
    drumRule("openHat", OFFBEATS, "", [0, 0], 0.95),
    drumRule("hat", [], "3.3.3.3.3.3.3.3.", [3, 6], 0.9),
    drumRule("shaker", [], "4646464646464646", [6, 10], 0.75),
    drumRule("rim", [], "...4..5....4..5.", [1, 3], 0.5),
  ],
};

export const TECH_HOUSE_PERC: DrumGroove = {
  name: "tech house percussion",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 1),
    drumRule("hat", [], "6666666666666666", [10, 15], 1),
    drumRule("openHat", OFFBEATS, "", [0, 0], 0.9),
    drumRule("perc", [], ".5.6.5.6.5.6.5.7", [3, 6], 0.95),
    drumRule("rim", [], "..4..5....4..5..", [2, 4], 0.7),
    drumRule("shaker", [], "5555555555555555", [6, 10], 0.6),
  ],
};

export const TROPICAL_BOUNCE: DrumGroove = {
  name: "tropical bounce",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 0.9),
    drumRule("openHat", OFFBEATS, "", [0, 0], 0.85),
    drumRule("hat", [], "4.3.4.3.4.3.4.3.", [3, 6], 0.8),
    drumRule("perc", [], "...5..4....5..6.", [2, 4], 0.7),
    drumRule("shaker", [], "3333333333333333", [6, 10], 0.5),
  ],
};

export const MELODIC_TECHNO: DrumGroove = {
  name: "melodic techno",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 0.85),
    drumRule("hat", OFFBEATS, ".4.4.4.4.4.4.4.4", [2, 5], 1),
    drumRule("ride", [], "5555555555555555", [8, 14], 0.55),
    drumRule("rim", [6, 14], "", [0, 0], 0.5),
    drumRule("perc", [], "...4.....5.....4", [1, 2], 0.5),
  ],
};

export const DUB_SPARSE: DrumGroove = {
  name: "dub sparse",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("rim", [6, 14], "...3.......3....", [0, 1], 0.8),
    drumRule("hat", [], "..6...6...6...6.", [2, 4], 0.75),
    drumRule("openHat", [], "......5.......5.", [0, 1], 0.4),
    drumRule("shaker", [], "2323232323232323", [4, 8], 0.5),
  ],
};

export const BROKEN_BEAT: DrumGroove = {
  name: "broken beat",
  rules: [
    drumRule("kick", [0, 10], ".......7......3.", [1, 2], 1),
    drumRule("snare", BACKBEAT, "...........3...3", [0, 2], 1),
    drumRule("hat", [], "6464646464646464", [8, 12], 0.95),
    drumRule("openHat", [], "..............6.", [0, 1], 0.5),
    drumRule("perc", [], "...4.....4...5..", [1, 2], 0.5),
  ],
};

export const BALEARIC: DrumGroove = {
  name: "balearic",
  rules: [
    drumRule("kick", [0, 8], "..........5.....", [0, 1], 1),
    drumRule("rim", BACKBEAT, "", [0, 0], 0.9),
    drumRule("shaker", [], "4545454545454545", [8, 14], 0.85),
    drumRule("perc", [], "...5..4....5..5.", [2, 4], 0.7),
    drumRule("hat", [], "..5...5...5...5.", [2, 4], 0.5),
  ],
};

export const BOSSA: DrumGroove = {
  name: "bossa",
  rules: [
    drumRule("kick", [0, 8], "......4.......4.", [0, 2], 1),
    drumRule("rim", [0, 3, 6, 10, 12], "", [0, 0], 0.95),
    drumRule("brush", [], "6.6.6.6.6.6.6.6.", [6, 8], 0.9),
    drumRule("shaker", [], "3434343434343434", [6, 12], 0.6),
  ],
};

export const TWO_STEP: DrumGroove = {
  name: "two step",
  rules: [
    drumRule("kick", [0, 10], "...........4....", [0, 1], 1),
    drumRule("clap", BACKBEAT, "", [0, 0], 1),
    drumRule("hat", [], "5646564656465646", [8, 12], 0.95),
    drumRule("rim", [6, 14], "", [0, 0], 0.6),
    drumRule("shaker", [], "3333333333333333", [6, 10], 0.5),
  ],
};

export const HALF_TIME_GLOW: DrumGroove = {
  name: "half time glow",
  rules: [
    drumRule("kick", [0], "......6...6.....", [1, 2], 1),
    drumRule("snare", [8], "", [0, 0], 1),
    drumRule("hat", [], "4.4.4.4.4.4.4.4.", [4, 8], 0.85),
    drumRule("shaker", [], "2222222222222222", [4, 8], 0.5),
  ],
};

export const SYNTHWAVE_DRIVE: DrumGroove = {
  name: "synthwave drive",
  rules: [
    drumRule("kick", QUARTERS, "", [0, 0], 1),
    drumRule("gatedSnare", BACKBEAT, "", [0, 0], 1),
    drumRule("hat", [], "6464646464646464", [10, 14], 0.95),
    drumRule("openHat", [], "...5.......5....", [0, 2], 0.5),
    drumRule("tom", [], "............5677", [0, 3], 0.25),
  ],
};

export const DARKSYNTH_STOMP: DrumGroove = {
  name: "darksynth stomp",
  rules: [
    drumRule("kick", QUARTERS, "......5...5.....", [0, 2], 1),
    drumRule("gatedSnare", BACKBEAT, "", [0, 0], 1),
    drumRule("hat", [], "7676767676767676", [12, 16], 1),
    drumRule("perc", [], "..5...6...5...7.", [2, 4], 0.8),
    drumRule("tom", [], "............6789", [0, 3], 0.3),
  ],
};

export const SOFT_PULSE: DrumGroove = {
  name: "soft pulse",
  rules: [
    drumRule("kick", [0, 8], "", [0, 0], 0.7),
    drumRule("shaker", [], "2323232323232323", [4, 8], 0.6),
    drumRule("hat", [], "..3...3...3...3.", [1, 3], 0.4),
  ],
};
