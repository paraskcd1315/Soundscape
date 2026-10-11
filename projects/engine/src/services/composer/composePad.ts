import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import type { BarContext } from "./types/BarContext";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { HELD_GATE, DROP_FLOOR, OCTAVE } from "./constants/composePad.constants";

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
