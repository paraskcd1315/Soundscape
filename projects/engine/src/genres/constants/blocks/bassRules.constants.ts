import type { BassPatternRules } from "../../../models/BassPatternRules";
import { bassRules } from "../../utils/bassRules.util";

export const OFFBEAT_BASS = bassRules(
  [2, 6, 10, 14],
  "...5...5...5...6",
  [0, 2],
  [2],
  [
    ["root", 0.85],
    ["octave", 0.15],
  ],
  -1,
);

export const TRANCE_ROLL_BASS = bassRules(
  [2, 6, 10, 14],
  "..x7..x7..x7..x8",
  [2, 4],
  [1],
  [
    ["root", 0.8],
    ["octave", 0.12],
    ["fifth", 0.08],
  ],
  -1,
);

export const PROGRESSIVE_ROLL_BASS = bassRules(
  [],
  ".6x8.6x8.6x8.6x9",
  [6, 10],
  [1, 2],
  [
    ["root", 0.7],
    ["octave", 0.15],
    ["fifth", 0.15],
  ],
  -0.9,
);

export const DEEP_HOUSE_BASS = bassRules(
  [],
  "...7..8.3.8...7.",
  [3, 5],
  [1, 2, 3],
  [
    ["root", 0.6],
    ["fifth", 0.2],
    ["octave", 0.2],
  ],
  -0.6,
);

export const TECH_HOUSE_BASS = bassRules(
  [],
  ".4x6.4x6.4x6.5x7",
  [5, 8],
  [1],
  [
    ["root", 0.75],
    ["octave", 0.2],
    ["fifth", 0.05],
  ],
  -0.9,
);

export const SUB_DRONE_BASS = bassRules(
  [0],
  "........3.......",
  [0, 1],
  [8, 16],
  [
    ["root", 0.85],
    ["fifth", 0.15],
  ],
  0,
);

export const OCTAVE_BOUNCE_BASS = bassRules(
  [0, 2, 4, 6, 8, 10, 12, 14],
  "",
  [0, 0],
  [2],
  [
    ["root", 0.5],
    ["octave", 0.5],
  ],
  0,
);

export const REESE_DRIVE_BASS = bassRules(
  [0, 3, 6, 8, 11, 14],
  ".6..6..6.6..6..6",
  [1, 3],
  [1, 2],
  [
    ["root", 0.85],
    ["octave", 0.15],
  ],
  0,
);

export const CHILL_SYNC_BASS = bassRules(
  [0],
  ".......7..8...4.",
  [1, 2],
  [2, 3, 4],
  [
    ["root", 0.65],
    ["fifth", 0.25],
    ["octave", 0.1],
  ],
  0.3,
);

export const TWO_STEP_SUB = bassRules(
  [0, 10],
  "......4.......3.",
  [0, 1],
  [4, 6],
  [
    ["root", 0.8],
    ["fifth", 0.2],
  ],
  0.6,
);

export const BIG_ROOM_BASS = bassRules(
  [2, 6, 10, 14],
  "",
  [0, 0],
  [2],
  [
    ["root", 0.9],
    ["octave", 0.1],
  ],
  -1,
);

export const DUB_PULSE_BASS = bassRules(
  [0],
  "......5.......5.",
  [0, 2],
  [2, 4],
  [
    ["root", 0.9],
    ["fifth", 0.1],
  ],
  0,
);

export const WALKING_LOUNGE_BASS: BassPatternRules = bassRules(
  [0, 4, 8, 12],
  "",
  [0, 0],
  [4],
  [
    ["root", 0.4],
    ["fifth", 0.3],
    ["third", 0.3],
  ],
  0,
  true,
);
