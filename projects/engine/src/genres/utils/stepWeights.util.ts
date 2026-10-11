import type { StepWeights } from "../../models/StepWeights";
import { STEP_WEIGHT_CODES } from "../constants/stepWeightCodes.constants";

export function steps(pattern: string): StepWeights {
  return Array.from(pattern).map((code) => STEP_WEIGHT_CODES[code] ?? 0);
}
