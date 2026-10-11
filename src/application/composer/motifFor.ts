import type { MelodyRecipe } from "../../domain/model/MelodyRecipe";
import type { SeedTimbre } from "../../domain/model/SeedTimbre";
import { createRng } from "../../domain/random/createRng";
import { SeededRng } from "../../domain/random/SeededRng";
import { clamp } from "../../domain/theory/clamp";
import { COMPOSER_METRICS } from "./composerMetrics";
import type { MotifNote } from "./MotifNote";

const MIN_OFFSET = -3;
const MAX_OFFSET = 7;
const MAX_START_OFFSET = 4;
const WIDE_LEAP = 3;

function stepWeight(step: number, syncopation: number): number {
  if (step % 4 === 0) return 3 - 2 * syncopation;
  if (step % 2 === 0) return 2;
  return 1 + 2 * syncopation;
}

function pickOnsets(
  rng: SeededRng,
  count: number,
  syncopation: number,
): number[] {
  const available = Array.from(
    { length: COMPOSER_METRICS.stepsPerBar },
    (_, step) => step,
  );
  const weight = (step: number): number => stepWeight(step, syncopation);
  const chosen: number[] = [];
  while (chosen.length < count && available.length > 0) {
    const total = available.reduce((sum, step) => sum + weight(step), 0);
    let cursor = rng.next() * total;
    let index = 0;
    while (
      index < available.length - 1 &&
      cursor >= weight(available[index] as number)
    ) {
      cursor -= weight(available[index] as number);
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
  timbre: Pick<SeedTimbre, "melodyBusy" | "leapBias" | "syncopation">,
): MotifNote[] {
  const rng = createRng(seed, "motif", section);
  const count = clamp(
    Math.round(
      rng.int(recipe.minimumNotes, recipe.maximumNotes) * timbre.melodyBusy,
    ),
    1,
    COMPOSER_METRICS.stepsPerBar / 2,
  );
  const onsets = pickOnsets(rng, count, timbre.syncopation);
  const stepBias = clamp(recipe.stepBias - timbre.leapBias, 0.15, 0.95);
  let offset = rng.int(0, MAX_START_OFFSET);

  return onsets.map((step, index) => {
    if (index > 0) {
      const move = rng.chance(stepBias)
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
