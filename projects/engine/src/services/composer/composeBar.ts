import type { NoteEvent } from "../../models/NoteEvent";
import type { Settings } from "../../models/Settings";
import { clamp } from "../../utils/theory/clamp";
import { SCALES } from "../../constants/scales.constants";
import { STYLES } from "../../genres/constants/styleCatalog.constants";
import type { LayerKind } from "../../models/LayerKind";
import type { BarContext } from "./types/BarContext";
import { composeAccents } from "./composeAccents";
import { formAt } from "./formAt";
import { layerActive } from "./layerActive";
import { composeBass } from "./composeBass";
import { composeChords } from "./composeChords";
import { composeCounter } from "./composeCounter";
import { composeDrums } from "./composeDrums";
import { composePad } from "./composePad";
import { patternsFor } from "./patterns/patternsFor";
import { timbreFor } from "./timbreFor";
import { composeMelody } from "./composeMelody";
import { composeTexture } from "./composeTexture";
import { COMPOSER_METRICS } from "./constants/composer.constants";
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

  const timbre = timbreFor(settings, style);
  const form = formAt(style.form, barIndex);
  const context: BarContext = {
    settings,
    style,
    scale,
    timbre,
    patterns: patternsFor(settings, style, timbre, barIndex),
    barIndex,
    section: Math.floor(barIndex / COMPOSER_METRICS.sectionBars),
    harmony: harmonyAt(settings, style, scale, barIndex),
    nextHarmony: harmonyAt(settings, style, scale, barIndex + 1),
    form,
    energy: clamp(energyAt(settings, barIndex) + form.plan.energyShift, 0, 1),
    swingBeats: swing * COMPOSER_METRICS.swingMaxBeats,
    isTransitionBar:
      form.isLastBar ||
      barIndex % COMPOSER_METRICS.phraseBars ===
        COMPOSER_METRICS.phraseBars - 1,
  };
  const on = (layer: LayerKind): boolean =>
    layerActive(settings.seed, form, layer, barIndex);

  const melody = on("melody") ? composeMelody(context) : [];

  return [
    ...humanizeEvents(
      [
        ...(on("drums") ? composeDrums(context) : []),
        ...(on("bass") ? composeBass(context) : []),
        ...(on("chords") ? composeChords(context) : []),
        ...(on("pad") ? composePad(context) : []),
        ...melody,
        ...(on("counter") ? composeCounter(context, melody) : []),
        ...(on("texture") ? composeTexture(context) : []),
      ],
      context,
    ),
    ...composeAccents(context),
  ];
}
