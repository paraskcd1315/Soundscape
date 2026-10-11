import type { NoteEvent } from "../../domain/model/NoteEvent";
import { createRng } from "../../domain/random/createRng";
import { clamp } from "../../domain/theory/clamp";
import type { BarContext } from "./BarContext";
import { COMPOSER_METRICS } from "./composerMetrics";

const HELD_GATE = 0.98;
const DROP_FLOOR = 43;
const OCTAVE = 12;

export function composePad(context: BarContext): NoteEvent[] {
  const recipe = context.style.pad;
  if (
    !recipe ||
    !context.harmony.isChordStart ||
    context.energy < recipe.minimumEnergy
  )
    return [];

  const rng = createRng(context.settings.seed, "pad", context.barIndex);
  const duration =
    context.harmony.barsRemainingInChord *
    COMPOSER_METRICS.beatsPerBar *
    HELD_GATE;
  const velocity = clamp(
    recipe.velocity * (0.7 + 0.3 * context.energy),
    0.05,
    1,
  );

  return context.harmony.voicing.slice(0, recipe.size).map((midi, index) => ({
    layer: "pad",
    voice: context.timbre.padVoice,
    startBeat: index * COMPOSER_METRICS.strumBeats * 2,
    durationBeats: duration,
    midi: midi - OCTAVE >= DROP_FLOOR ? midi - OCTAVE : midi,
    velocity: clamp(velocity * rng.range(0.85, 1), 0.05, 1),
  }));
}
