import type { StepWeights } from "../../../domain/model/PatternRules";
import type { SeededRng } from "../../../domain/random/SeededRng";

interface Candidate {
  weight: number;
  step: number;
}

export function pickSteps(
  rng: SeededRng,
  weights: StepWeights,
  count: number,
  taken: ReadonlySet<number>,
): number[] {
  const candidates: Candidate[] = weights
    .map((weight, step) => ({ weight, step }))
    .filter((entry) => entry.weight > 0 && !taken.has(entry.step));
  const chosen: number[] = [];
  while (chosen.length < count && candidates.length > 0) {
    const total = candidates.reduce((sum, entry) => sum + entry.weight, 0);
    let cursor = rng.next() * total;
    let index = 0;
    while (
      index < candidates.length - 1 &&
      cursor >= (candidates[index] as Candidate).weight
    ) {
      cursor -= (candidates[index] as Candidate).weight;
      index++;
    }
    chosen.push((candidates.splice(index, 1)[0] as Candidate).step);
  }
  return chosen.sort((a, b) => a - b);
}
