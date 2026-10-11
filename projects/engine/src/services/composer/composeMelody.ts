import type { NoteEvent } from "../../models/NoteEvent";
import { createRng } from "../../utils/random/createRng";
import type { SeededRng } from "../random/SeededRng";
import { clamp } from "../../utils/theory/clamp";
import { degreeToMidi } from "../../utils/theory/degreeToMidi";
import { foldIntoRange } from "../../utils/theory/foldIntoRange";
import type { BarContext } from "./types/BarContext";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { motifFor } from "./motifFor";
import { snapToChordTone } from "./snapToChordTone";
import { stepsToBeats, stepToBeat } from "./stepToBeat";
import { varyMotif } from "./varyMotif";
import {
  APPROACH_MAX_BEATS,
  PHRASE_END_REST_BOOST,
} from "./constants/composeMelody.constants";
import { avoidPitchClasses } from "../../utils/theory/avoidPitchClasses";
import { steerOffAvoidNote } from "./steerOffAvoidNote";

export function composeMelody(context: BarContext): NoteEvent[] {
  const recipe = context.style.melody;
  if (context.energy < recipe.minimumEnergy) return [];

  const rng = createRng(context.settings.seed, "melody", context.barIndex);
  const isPhraseEnd =
    context.barIndex % COMPOSER_METRICS.phraseBars ===
    COMPOSER_METRICS.phraseBars - 1;
  const restChance =
    recipe.restChance * (1.3 - context.settings.density * 0.9) +
    (isPhraseEnd ? PHRASE_END_REST_BOOST : 0);
  if (rng.chance(clamp(restChance, 0, 0.95))) return [];

  const motif = varyMotif(
    motifFor(context.settings.seed, context.section, recipe, context.timbre),
    rng,
    context.settings.complexity,
  );
  const keepProbability = 0.6 + 0.4 * context.settings.density;
  const energyScale = 0.7 + 0.3 * context.energy;
  const avoid = avoidPitchClasses(context.harmony.pitchClasses);
  const events: NoteEvent[] = [];

  motif.forEach((note, index) => {
    if (index > 0 && !rng.chance(keepProbability)) return;
    const isStrong = note.step % 4 === 0;
    const rawDegree = note.degreeOffset + context.timbre.melodyShift;
    const degree = isStrong
      ? snapToChordTone(
          rawDegree,
          context.scale,
          context.settings.keyRoot,
          recipe.baseMidi,
          context.harmony.pitchClasses,
        )
      : steerOffAvoidNote(
          rawDegree,
          context.scale,
          context.settings.keyRoot,
          recipe.baseMidi,
          avoid,
        );
    const midi = foldIntoRange(
      degreeToMidi(
        context.scale,
        context.settings.keyRoot,
        degree,
        recipe.baseMidi,
      ),
      recipe.lowMidi,
      recipe.highMidi,
    );
    events.push({
      layer: "melody",
      voice: context.timbre.melodyVoice,
      startBeat: stepToBeat(note.step, context.swingBeats),
      durationBeats: stepsToBeats(note.lengthSteps),
      midi,
      velocity: clamp(
        (0.5 + (isStrong ? 0.15 : 0) + rng.range(0, 0.15)) * energyScale,
        0.05,
        1,
      ),
    });
  });

  return withChromaticApproach(
    events,
    recipe.chromaticChance ?? 0,
    context.harmony.pitchClasses,
    recipe,
    rng,
  );
}

function withChromaticApproach(
  events: NoteEvent[],
  chance: number,
  chordPitchClasses: readonly number[],
  range: { lowMidi: number; highMidi: number },
  rng: SeededRng,
): NoteEvent[] {
  if (chance <= 0) return events;
  return events.map((event, index) => {
    const next = events[index + 1];
    if (!next || Number.isInteger(event.startBeat * 2)) return event;
    if (!chordPitchClasses.includes(next.midi % 12)) return event;
    if (!rng.chance(chance)) return event;
    const preferred = next.midi + (next.midi >= event.midi ? -1 : 1);
    const midi =
      preferred < range.lowMidi || preferred > range.highMidi
        ? 2 * next.midi - preferred
        : preferred;
    return {
      ...event,
      midi,
      durationBeats: Math.min(event.durationBeats, APPROACH_MAX_BEATS),
    };
  });
}
