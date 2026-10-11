import type { NoteEvent } from "../../domain/model/NoteEvent";
import type { BarContext } from "./BarContext";
import { COMPOSER_METRICS } from "./composerMetrics";

const IMPACT_VELOCITY = 0.95;
const RISER_VELOCITY = 0.55;

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
