import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import type { BarContext } from "./types/BarContext";
import { COMPOSER_METRICS } from "./constants/composer.constants";

export function humanizeEvents(
  events: readonly NoteEvent[],
  context: BarContext,
): NoteEvent[] {
  const amount = context.settings.humanize * context.style.humanizeScale;
  if (amount <= 0) return [...events];
  const rng = createRng(context.settings.seed, "humanize", context.barIndex);
  return events.map((event) => ({
    ...event,
    startBeat: Math.max(
      0,
      event.startBeat +
        rng.range(-1, 1) * COMPOSER_METRICS.humanizeMaxBeats * amount,
    ),
    velocity: clamp(
      event.velocity *
        (1 +
          rng.range(-1, 1) *
            COMPOSER_METRICS.humanizeVelocity *
            context.settings.humanize),
      0.02,
      1,
    ),
  }));
}
