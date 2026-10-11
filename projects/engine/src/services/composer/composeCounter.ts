import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import { degreeToMidi } from "../../utils/theory/degreeToMidi";
import { foldIntoRange } from "../../utils/theory/foldIntoRange";
import type { BarContext } from "./types/BarContext";
import { stepsToBeats, stepToBeat } from "./stepToBeat";
import {
  PLACEMENT_OCTAVES,
  OCTAVE,
  SCALE_TONE_BASE,
  SCALE_DEGREES,
} from "./constants/composeCounter.constants";
import { avoidPitchClasses } from "../../utils/theory/avoidPitchClasses";
import { sitsWithMelody } from "./utils/sitsWithMelody.util";

export function composeCounter(
  context: BarContext,
  melody: readonly NoteEvent[],
): NoteEvent[] {
  const recipe = context.style.counter;
  if (!recipe || context.energy < recipe.minimumEnergy) return [];

  const rng = createRng(context.settings.seed, "counter", context.barIndex);
  const { density, complexity } = context.settings;
  if (!rng.chance(clamp(recipe.chance * (0.5 + density * 0.8), 0, 0.95)))
    return [];

  const count = rng.int(1, complexity > 0.6 ? 3 : 2);
  const available = [...recipe.steps];
  const energyScale =
    (0.7 + 0.3 * context.energy) * (recipe.velocityScale ?? 1);
  const avoid = avoidPitchClasses(context.harmony.pitchClasses);
  const events: NoteEvent[] = [];

  for (let index = 0; index < count && available.length > 0; index++) {
    const step = available.splice(
      rng.int(0, available.length - 1),
      1,
    )[0] as number;
    const startBeat = stepToBeat(step, context.swingBeats);
    const durationBeats = stepsToBeats(rng.pick(recipe.lengthSteps));
    const scaleTone = degreeToMidi(
      context.scale,
      context.settings.keyRoot,
      rng.int(0, SCALE_DEGREES - 1),
      SCALE_TONE_BASE,
    );
    const useScaleTone =
      rng.chance(complexity * 0.5) && !avoid.has(scaleTone % OCTAVE);
    const candidates = [
      ...(useScaleTone ? [scaleTone] : []),
      ...rng
        .shuffle(context.harmony.pitchClasses)
        .map((pitchClass) => pitchClass + OCTAVE * PLACEMENT_OCTAVES),
    ].map((raw) => foldIntoRange(raw, recipe.lowMidi, recipe.highMidi));
    const midi = candidates.find((candidate) =>
      sitsWithMelody(candidate, startBeat, durationBeats, melody),
    );
    if (midi === undefined) continue;
    events.push({
      layer: "counter",
      voice: context.timbre.counterVoice,
      startBeat,
      durationBeats,
      midi,
      velocity: clamp(rng.range(0.3, 0.55) * energyScale, 0.05, 1),
    });
  }

  return events;
}
