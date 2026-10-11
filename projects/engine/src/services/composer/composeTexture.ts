import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import { clamp } from "../../utils/theory/clamp";
import { foldIntoRange } from "../../utils/theory/foldIntoRange";
import type { BarContext } from "./types/BarContext";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { stepsToBeats, stepToBeat } from "./stepToBeat";
import { BELL_STEPS, OFFBEAT_STEPS, BELL_LENGTH_BEATS, SWELL_BARS, CRACKLE_MIN, CRACKLE_MAX, ARP_ENERGY_FLOOR, OCTAVE } from "./constants/composeTexture.constants";

function swellEvent(
  startBeat: number,
  beats: number,
  velocity: number,
): NoteEvent {
  return {
    layer: "texture",
    voice: "swell",
    startBeat,
    durationBeats: beats,
    midi: 0,
    velocity,
  };
}

export function composeTexture(context: BarContext): NoteEvent[] {
  const recipe = context.style.texture;
  if (recipe.kind === "none" || recipe.voice === null) return [];

  const rng = createRng(context.settings.seed, "texture", context.barIndex);
  const events: NoteEvent[] = [];
  const { density } = context.settings;

  if (recipe.kind === "bells") {
    if (rng.chance(recipe.chance * (0.4 + density))) {
      const count = rng.int(1, 2);
      for (let index = 0; index < count; index++) {
        const pitchClass = rng.pick(context.harmony.pitchClasses);
        events.push({
          layer: "texture",
          voice: recipe.voice,
          startBeat: stepToBeat(rng.pick(BELL_STEPS), context.swingBeats),
          durationBeats: BELL_LENGTH_BEATS,
          midi: foldIntoRange(
            pitchClass + OCTAVE * 6,
            recipe.baseMidi,
            recipe.baseMidi + OCTAVE - 1,
          ),
          velocity: rng.range(0.3, 0.5),
        });
      }
    }
    if (context.barIndex % (SWELL_BARS * 2) === 0 && rng.chance(0.5)) {
      events.push(
        swellEvent(0, SWELL_BARS * COMPOSER_METRICS.beatsPerBar, 0.4),
      );
    }
  }

  if (recipe.kind === "crackle") {
    const count = Math.round(
      rng.range(CRACKLE_MIN, CRACKLE_MAX) * recipe.chance,
    );
    for (let index = 0; index < count; index++) {
      events.push({
        layer: "texture",
        voice: recipe.voice,
        startBeat: rng.range(0, COMPOSER_METRICS.beatsPerBar),
        durationBeats: 0.05,
        midi: 0,
        velocity: rng.range(0.15, 0.45),
      });
    }
  }

  if (recipe.kind === "offbeat") {
    for (const step of OFFBEAT_STEPS) {
      if (!rng.chance(recipe.chance * (0.4 + 0.6 * context.energy))) continue;
      events.push({
        layer: "texture",
        voice: recipe.voice,
        startBeat: stepToBeat(step, context.swingBeats),
        durationBeats: COMPOSER_METRICS.beatsPerStep,
        midi: 0,
        velocity: rng.range(0.25, 0.5),
      });
    }
    const isRiserBar =
      context.barIndex % COMPOSER_METRICS.sectionBars ===
      COMPOSER_METRICS.sectionBars - 1;
    if (isRiserBar && rng.chance(0.2 + 0.8 * context.energy)) {
      events.push(
        swellEvent(
          0,
          COMPOSER_METRICS.beatsPerBar,
          clamp(0.3 + 0.4 * context.energy, 0, 1),
        ),
      );
    }
  }

  if (recipe.kind === "arp" && context.energy >= ARP_ENERGY_FLOOR) {
    const tones = context.harmony.voicing;
    for (let step = 0; step < COMPOSER_METRICS.stepsPerBar; step++) {
      if (!rng.chance(recipe.chance * density * 1.5)) continue;
      const tone = tones[step % tones.length] as number;
      events.push({
        layer: "texture",
        voice: recipe.voice,
        startBeat: stepToBeat(step, context.swingBeats),
        durationBeats: stepsToBeats(1),
        midi: foldIntoRange(
          tone,
          recipe.baseMidi - OCTAVE,
          recipe.baseMidi + OCTAVE,
        ),
        velocity: rng.range(0.25, 0.4),
      });
    }
  }

  return events;
}
