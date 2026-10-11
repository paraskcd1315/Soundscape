import type { ChordSymbol } from "../../models/ChordSymbol";
import type { Progression } from "../../models/Progression";
import type { ScaleDefinition } from "../../models/ScaleDefinition";
import type { Settings } from "../../models/Settings";
import type { StyleDefinition } from "../../models/StyleDefinition";
import { createRng } from "../../utils/random/createRng";
import { chordPitchClasses } from "../../utils/theory/chordTones";
import { rootPositionVoicing, voiceLead } from "../../utils/theory/voiceLead";
import type { BarHarmony } from "./types/BarHarmony";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import { timbreFor } from "./timbreFor";

function progressionForSection(
  settings: Settings,
  style: StyleDefinition,
  section: number,
): Progression {
  const base = createRng(settings.seed, "progression-base").pick(
    style.progressions,
  );
  if (section === 0) return base;
  const rng = createRng(settings.seed, "progression", section);
  return rng.chance(settings.variation) ? rng.pick(style.progressions) : base;
}

function sizedChord(
  chord: ChordSymbol,
  settings: Settings,
  style: StyleDefinition,
): ChordSymbol {
  if (settings.complexity < 0.34) {
    return {
      degree: chord.degree,
      size: Math.min(chord.size, style.chords.simpleSize) as 3 | 4 | 5,
    };
  }
  if (settings.complexity > 0.66) {
    return {
      degree: chord.degree,
      size: Math.max(chord.size, style.chords.richSize) as 3 | 4 | 5,
    };
  }
  return chord;
}

export function harmonyAt(
  settings: Settings,
  style: StyleDefinition,
  scale: ScaleDefinition,
  barIndex: number,
): BarHarmony {
  const section = Math.floor(barIndex / COMPOSER_METRICS.sectionBars);
  const relativeBar = barIndex - section * COMPOSER_METRICS.sectionBars;
  const progression = progressionForSection(settings, style, section);
  const chordCounter = Math.floor(relativeBar / progression.barsPerChord);
  const barsIntoChord = relativeBar - chordCounter * progression.barsPerChord;

  let voicing: readonly number[] = [];
  let pitchClasses: readonly number[] = [];
  let chord = progression.chords[0] as ChordSymbol;
  for (let counter = 0; counter <= chordCounter; counter++) {
    chord = sizedChord(
      progression.chords[counter % progression.chords.length] as ChordSymbol,
      settings,
      style,
    );
    pitchClasses = chordPitchClasses(chord, scale, settings.keyRoot);
    voicing =
      counter === 0
        ? rootPositionVoicing(
            pitchClasses,
            style.chords.centerMidi +
              timbreFor(settings, style).chordCenterShift,
          )
        : voiceLead(voicing, pitchClasses);
  }

  return {
    chord,
    pitchClasses,
    voicing,
    isChordStart: barsIntoChord === 0,
    barsRemainingInChord: progression.barsPerChord - barsIntoChord,
  };
}
