import type { NoteEvent } from "../../models/NoteEvent";
import type { BarContext } from "./types/BarContext";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { IMPACT_VELOCITY, RISER_VELOCITY } from "./constants/composeAccents.constants";

export function composeAccents(context: BarContext): NoteEvent[] {
  const events: NoteEvent[] = [];
  const { plan, isFirstBar, isLastBar } = context.form;

  if (plan.impactAtStart && isFirstBar && context.style.drums !== null) {
    for (const voice of ["kick", "openHat"] as const) {
      events.push({
        layer: "drums",
        voice,
        startBeat: 0,
        durationBeats: 1,
        midi: 0,
        velocity: IMPACT_VELOCITY,
      });
    }
  }

  if (plan.riserAtEnd && isLastBar) {
    events.push({
      layer: "texture",
      voice: "swell",
      startBeat: 0,
      durationBeats: COMPOSER_METRICS.beatsPerBar,
      midi: 0,
      velocity: RISER_VELOCITY,
    });
  }

  return events;
}
