import type { MelodyRecipe } from "../../domain/model/MelodyRecipe";
import { createRng } from "../../domain/random/createRng";
import { SeededRng } from "../../domain/random/SeededRng";
import { clamp } from "../../domain/theory/clamp";
import { COMPOSER_METRICS } from "./composerMetrics";
import type { MotifNote } from "./MotifNote";

const MIN_OFFSET = -3;
const MAX_OFFSET = 7;
const MAX_START_OFFSET = 4;
const WIDE_LEAP = 3;

function stepWeight(step: number): number {
  if (step % 4 === 0) return 3;
  if (step % 2 === 0) return 2;
  return 1;
}

function pickOnsets(rng: SeededRng, count: number): number[] {
  const available = Array.from(
    { length: COMPOSER_METRICS.stepsPerBar },
    (_, step) => step,
  );
  const chosen: number[] = [];
  while (chosen.length < count && available.length > 0) {
    const total = available.reduce((sum, step) => sum + stepWeight(step), 0);
    let cursor = rng.next() * total;
    let index = 0;
    while (
      index < available.length - 1 &&
      cursor >= stepWeight(available[index] as number)
    ) {
      cursor -= stepWeight(available[index] as number);
      index++;
    }
    chosen.push(available.splice(index, 1)[0] as number);
  }
  return chosen.sort((a, b) => a - b);
}

export function motifFor(
  seed: number,
  section: number,
  recipe: MelodyRecipe,
): MotifNote[] {
  const rng = createRng(seed, "motif", section);
  const count = rng.int(recipe.minimumNotes, recipe.maximumNotes);
  const onsets = pickOnsets(rng, count);
  let offset = rng.int(0, MAX_START_OFFSET);

  return onsets.map((step, index) => {
    if (index > 0) {
      const move = rng.chance(recipe.stepBias)
        ? rng.chance(0.5)
          ? 1
          : -1
        : rng.int(-WIDE_LEAP, WIDE_LEAP);
      offset = clamp(offset + move, MIN_OFFSET, MAX_OFFSET);
    }
    const nextOnset = onsets[index + 1] ?? COMPOSER_METRICS.stepsPerBar;
    const lengthSteps = Math.max(
      1,
      Math.min(rng.pick(recipe.noteLengthSteps), nextOnset - step),
    );
    return { step, degreeOffset: offset, lengthSteps };
  });
}
