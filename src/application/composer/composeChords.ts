import type { NoteEvent } from "../../domain/model/NoteEvent";
import { createRng } from "../../domain/random/createRng";
import { clamp } from "../../domain/theory/clamp";
import type { BarContext } from "./BarContext";
import { COMPOSER_METRICS } from "./composerMetrics";
import { stepsToBeats, stepToBeat } from "./stepToBeat";

const STAB_LENGTH_STEPS = 2.5;
const HELD_GATE = 0.98;

function pingPongIndex(position: number, length: number): number {
  if (length <= 1) return 0;
  const cycle = (length - 1) * 2;
  const wrapped = position % cycle;
  return wrapped < length ? wrapped : cycle - wrapped;
}

export function composeChords(context: BarContext): NoteEvent[] {
  const recipe = context.style.chords;
  const { harmony } = context;
  const rng = createRng(context.settings.seed, "chords", context.barIndex);
  const energyScale = 0.8 + 0.2 * context.energy;
  const velocity = clamp(recipe.velocity * energyScale, 0.05, 1);
  const events: NoteEvent[] = [];

  if (recipe.rhythm === "held") {
    if (!harmony.isChordStart) return events;
    const duration =
      harmony.barsRemainingInChord * COMPOSER_METRICS.beatsPerBar * HELD_GATE;
    harmony.voicing.forEach((midi, index) => {
      events.push({
        layer: "chords",
        voice: context.timbre.chordVoice,
        startBeat: index * COMPOSER_METRICS.strumBeats,
        durationBeats: duration,
        midi,
        velocity: clamp(velocity * rng.range(0.9, 1), 0.05, 1),
      });
    });
    return events;
  }

  if (recipe.rhythm === "stab") {
    const keep = 0.65 + 0.35 * context.settings.density;
    const strum =
      context.timbre.chordVoice === "stab" ? 0 : COMPOSER_METRICS.strumBeats;
    context.patterns.stabSteps.forEach((step, stabIndex) => {
      if (stabIndex > 0 && !rng.chance(keep)) return;
      harmony.voicing.forEach((midi, index) => {
        events.push({
          layer: "chords",
          voice: context.timbre.chordVoice,
          startBeat: stepToBeat(step, context.swingBeats) + index * strum,
          durationBeats: stepsToBeats(STAB_LENGTH_STEPS),
          midi,
          velocity: clamp(velocity * rng.range(0.85, 1), 0.05, 1),
        });
      });
    });
    return events;
  }

  for (
    let step = 0;
    step < COMPOSER_METRICS.stepsPerBar;
    step += recipe.arpStepLength
  ) {
    const tone = harmony.voicing[
      pingPongIndex(step / recipe.arpStepLength, harmony.voicing.length)
    ] as number;
    events.push({
      layer: "chords",
      voice: context.timbre.chordVoice,
      startBeat: stepToBeat(step, context.swingBeats),
      durationBeats: stepsToBeats(recipe.arpStepLength),
      midi: tone,
      velocity,
    });
  }
  return events;
}
