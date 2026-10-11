import type { BassInterval } from "./BassInterval";

export interface BassStep {
  step: number;
  interval: BassInterval;
  lengthSteps: number;
  weight: number;
}
