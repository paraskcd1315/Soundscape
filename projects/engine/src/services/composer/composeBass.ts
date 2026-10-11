import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import type { BarContext } from "./types/BarContext";
import { bassPitch } from "./bassPitch";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { stepsToBeats, stepToBeat } from "./stepToBeat";

export function composeBass(context: BarContext): NoteEvent[] {
  const recipe = context.style.bass;
  if (context.energy < recipe.minimumEnergy) return [];

  const pattern = context.patterns.bass;
  const rng = createRng(context.settings.seed, "bass", context.barIndex);
  const densityScale = 0.6 + context.settings.density * 0.8;
  const energyScale = 0.7 + 0.3 * context.energy;
  const approachUp = rng.chance(0.5);
  const events: NoteEvent[] = [];

  for (const step of pattern) {
    const keepProbability =
      step.weight >= COMPOSER_METRICS.guaranteedHit
        ? 1
        : clamp(step.weight * densityScale, 0, 1);
    if (!rng.chance(keepProbability)) continue;
    events.push({
      layer: "bass",
      voice: context.timbre.bassVoice,
      startBeat: stepToBeat(step.step, context.swingBeats),
      durationBeats: stepsToBeats(step.lengthSteps),
      midi: bassPitch(
        step.interval,
        context.harmony,
        context.nextHarmony,
        recipe.baseMidi,
        approachUp,
      ),
      velocity: clamp((0.55 + 0.35 * step.weight) * energyScale, 0.05, 1),
    });
  }

  return events;
}
