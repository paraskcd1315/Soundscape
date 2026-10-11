import { describe, expect, it } from "vitest";
import { composeBar } from "@soundscape/engine/services/composer/composeBar";
import { harmonyAt } from "@soundscape/engine/services/composer/harmonyAt";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import { SCALES } from "@soundscape/engine/constants/scales.constants";
import {
  avoidPitchClasses,
  clashesWith,
} from "@soundscape/engine/utils/theory/avoidPitchClasses";
import type { NoteEvent } from "@soundscape/engine/models/NoteEvent";

const OVERLAP_TOLERANCE_BEATS = 0.15;
const SEEDS = [3, 17, 42, 99, 512, 2024];
const BARS = 48;

function overlaps(first: NoteEvent, second: NoteEvent): boolean {
  const start = Math.max(first.startBeat, second.startBeat);
  const end = Math.min(
    first.startBeat + first.durationBeats,
    second.startBeat + second.durationBeats,
  );
  return end - start > OVERLAP_TOLERANCE_BEATS;
}

describe("jazz consonance", () => {
  it("keeps the melody off avoid notes of the bar's chord", () => {
    for (const seed of SEEDS) {
      const settings = defaultSettingsFor("jazz", seed);
      const scale = SCALES[settings.scaleId];
      for (let bar = 0; bar < BARS; bar++) {
        const harmony = harmonyAt(settings, STYLES.jazz, scale, bar);
        const avoid = avoidPitchClasses(harmony.pitchClasses);
        const melody = composeBar(settings, bar).filter(
          (event) => event.layer === "melody" && event.durationBeats > 0.25,
        );
        for (const note of melody)
          expect(avoid.has(note.midi % 12)).toBe(false);
      }
    }
  });

  it("never lets the counter line rub a semitone against the melody", () => {
    for (const seed of SEEDS) {
      const settings = defaultSettingsFor("jazz", seed);
      for (let bar = 0; bar < BARS; bar++) {
        const events = composeBar(settings, bar);
        const melody = events.filter((event) => event.layer === "melody");
        const counter = events.filter((event) => event.layer === "counter");
        for (const fill of counter) {
          for (const note of melody) {
            if (!overlaps(fill, note)) continue;
            expect(clashesWith(fill.midi, note.midi)).toBe(false);
          }
        }
      }
    }
  });

  it("keeps the melody register above the comping centre", () => {
    expect(STYLES.jazz.melody.lowMidi).toBeGreaterThan(
      STYLES.jazz.chords.centerMidi,
    );
  });
});
