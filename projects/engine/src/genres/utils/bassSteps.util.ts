import type { BassInterval } from "../../models/BassInterval";
import type { BassStep } from "../../models/BassStep";

export function bassSteps(
  starts: readonly number[],
  lengthSteps: number,
  intervals: readonly BassInterval[] = ["root"],
): BassStep[] {
  return starts.map((step, index) => ({
    step,
    interval: intervals[index % intervals.length] as BassInterval,
    lengthSteps,
    weight: 1,
  }));
}
