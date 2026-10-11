import type { NoteEvent } from "../../domain/model/NoteEvent";
import { createRng } from "../../domain/random/createRng";
import { clamp } from "../../domain/theory/clamp";
import type { BarContext } from "./BarContext";
import { COMPOSER_METRICS } from "./composerMetrics";
import { stepToBeat } from "./stepToBeat";

const GHOST_VELOCITY = 0.6;
const FILL_VELOCITY_START = 0.55;
const FILL_VELOCITY_GAIN = 0.12;

export function composeDrums(context: BarContext): NoteEvent[] {
  const recipe = context.style.drums;
  if (!recipe || context.energy < recipe.minimumEnergy) return [];

  const rng = createRng(context.settings.seed, "drums", context.barIndex);
  const densityScale = 0.4 + context.settings.density * 1.2;
  const energyScale = 0.7 + 0.3 * context.energy;
  const withFill =
    context.isTransitionBar &&
    rng.chance(recipe.fillChance * (0.5 + context.energy));
  const events: NoteEvent[] = [];

  for (const grid of context.timbre.drumKit) {
    grid.steps.forEach((probability, step) => {
      if (probability <= 0) return;
      if (withFill && step >= COMPOSER_METRICS.fillStartStep) return;
      const guaranteed = probability >= COMPOSER_METRICS.guaranteedHit;
      if (!guaranteed && !rng.chance(clamp(probability * densityScale, 0, 1)))
        return;
      const accent = step % 4 === 0 ? 0.1 : 0;
      const ghost = guaranteed ? 1 : GHOST_VELOCITY;
      events.push({
        layer: "drums",
        voice: grid.voice,
        startBeat: stepToBeat(step, context.swingBeats),
        durationBeats: COMPOSER_METRICS.beatsPerStep,
        midi: 0,
        velocity: clamp(
          (0.6 + accent + rng.range(-0.05, 0.05)) * ghost * energyScale,
          0.05,
          1,
        ),
      });
    });
  }

  if (withFill) {
    for (
      let step = COMPOSER_METRICS.fillStartStep;
      step < COMPOSER_METRICS.stepsPerBar;
      step++
    ) {
      events.push({
        layer: "drums",
        voice: recipe.fillVoice,
        startBeat: stepToBeat(step, context.swingBeats),
        durationBeats: COMPOSER_METRICS.beatsPerStep,
        midi: 0,
        velocity: clamp(
          FILL_VELOCITY_START +
            (step - COMPOSER_METRICS.fillStartStep) * FILL_VELOCITY_GAIN,
          0.05,
          1,
        ),
      });
    }
  }

  return events;
}
