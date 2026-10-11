import type { NoteEvent } from "../../domain/model/NoteEvent";
import type { Settings } from "../../domain/model/Settings";
import { clamp } from "../../domain/theory/clamp";
import { SCALES } from "../../domain/theory/scales";
import { STYLES } from "../../styles/styleCatalog";
import type { BarContext } from "./BarContext";
import { composeBass } from "./composeBass";
import { composeChords } from "./composeChords";
import { composeCounter } from "./composeCounter";
import { composeDrums } from "./composeDrums";
import { composePad } from "./composePad";
import { timbreFor } from "./timbreFor";
import { composeMelody } from "./composeMelody";
import { composeTexture } from "./composeTexture";
import { COMPOSER_METRICS } from "./composerMetrics";
import { energyAt } from "./energyAt";
import { harmonyAt } from "./harmonyAt";
import { humanizeEvents } from "./humanizeEvents";

export function composeBar(settings: Settings, barIndex: number): NoteEvent[] {
  const style = STYLES[settings.styleId];
  const scale = SCALES[settings.scaleId];
  const swing = clamp(
    settings.swing,
    style.swingRange.min,
    style.swingRange.max,
  );

  const context: BarContext = {
    settings,
    style,
    scale,
    timbre: timbreFor(settings, style),
    barIndex,
    section: Math.floor(barIndex / COMPOSER_METRICS.sectionBars),
    harmony: harmonyAt(settings, style, scale, barIndex),
    nextHarmony: harmonyAt(settings, style, scale, barIndex + 1),
    energy: energyAt(settings, barIndex),
    swingBeats: swing * COMPOSER_METRICS.swingMaxBeats,
    isTransitionBar:
      barIndex % COMPOSER_METRICS.phraseBars ===
      COMPOSER_METRICS.phraseBars - 1,
  };

  return humanizeEvents(
    [
      ...composeDrums(context),
      ...composeBass(context),
      ...composeChords(context),
      ...composePad(context),
      ...composeMelody(context),
      ...composeCounter(context),
      ...composeTexture(context),
    ],
    context,
  );
}
