import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import { degreeToMidi } from "../../utils/theory/degreeToMidi";
import { foldIntoRange } from "../../utils/theory/foldIntoRange";
import type { BarContext } from "./types/BarContext";
import { stepsToBeats, stepToBeat } from "./stepToBeat";
import { PLACEMENT_OCTAVES, OCTAVE, SCALE_TONE_BASE, SCALE_DEGREES } from "./constants/composeCounter.constants";

export function composeCounter(context: BarContext): NoteEvent[] {
  const recipe = context.style.counter;
  if (!recipe || context.energy < recipe.minimumEnergy) return [];

  const rng = createRng(context.settings.seed, "counter", context.barIndex);
  const { density, complexity } = context.settings;
  if (!rng.chance(clamp(recipe.chance * (0.5 + density * 0.8), 0, 0.95)))
    return [];

  const count = rng.int(1, complexity > 0.6 ? 3 : 2);
  const available = [...recipe.steps];
  const energyScale = 0.7 + 0.3 * context.energy;
  const events: NoteEvent[] = [];

  for (let index = 0; index < count && available.length > 0; index++) {
    const step = available.splice(
      rng.int(0, available.length - 1),
      1,
    )[0] as number;
    const useScaleTone = rng.chance(complexity * 0.5);
    const raw = useScaleTone
      ? degreeToMidi(
          context.scale,
          context.settings.keyRoot,
          rng.int(0, SCALE_DEGREES - 1),
          SCALE_TONE_BASE,
        )
      : (rng.pick(context.harmony.pitchClasses) as number) +
        OCTAVE * PLACEMENT_OCTAVES;
    events.push({
      layer: "counter",
      voice: context.timbre.counterVoice,
      startBeat: stepToBeat(step, context.swingBeats),
      durationBeats: stepsToBeats(rng.pick(recipe.lengthSteps)),
      midi: foldIntoRange(raw, recipe.lowMidi, recipe.highMidi),
      velocity: clamp(rng.range(0.3, 0.55) * energyScale, 0.05, 1),
    });
  }

  return events;
}
