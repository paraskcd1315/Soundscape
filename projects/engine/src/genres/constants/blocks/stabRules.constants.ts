import type { StabPatternRules } from "../../../models/StabPatternRules";
import { steps } from "../../utils/stepWeights.util";

export const OFFBEAT_STABS: StabPatternRules = {
  anchors: [],
  weights: steps("..2x..2x..2x..2x"),
  minExtra: 2,
  maxExtra: 4,
};

export const FIRST_OFFBEAT_STABS: StabPatternRules = {
  anchors: [2],
  weights: steps("......5...4...3."),
  minExtra: 0,
  maxExtra: 2,
};

export const DUB_THROWS: StabPatternRules = {
  anchors: [],
  weights: steps("...8......5...7."),
  minExtra: 1,
  maxExtra: 2,
};

export const SYNCOPATED_STABS: StabPatternRules = {
  anchors: [0],
  weights: steps("...6..7...5..6.."),
  minExtra: 1,
  maxExtra: 3,
};
