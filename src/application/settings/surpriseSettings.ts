import type { Settings } from "../../domain/model/Settings";
import { STYLES } from "../../styles/styleCatalog";
import { defaultSettingsFor } from "./defaultSettingsFor";
import { nextSurpriseStyle } from "./nextSurpriseStyle";
import { sanitizeSettings } from "./sanitizeSettings";

function between(low: number, high: number): number {
  return low + Math.random() * (high - low);
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 0xffffffff) >>> 0;
}

export function surpriseSettings(
  current: Settings,
  keepSeed: boolean,
): Settings {
  const styleId = nextSurpriseStyle(current.styleId);
  const style = STYLES[styleId];
  const base = defaultSettingsFor(
    styleId,
    keepSeed ? current.seed : randomSeed(),
  );
  return sanitizeSettings(
    {
      ...base,
      masterVolume: current.masterVolume,
      visualizerMode: current.visualizerMode,
      visualizerIntensity: current.visualizerIntensity,
      layers: current.layers,
      tempo: Math.round(between(style.tempoRange.min, style.tempoRange.max)),
      keyRoot: Math.floor(Math.random() * 12),
      scaleId: pick(style.scaleIds),
      energy: between(0.3, 0.85),
      density: between(0.3, 0.75),
      complexity: between(0.25, 0.75),
      variation: between(0.2, 0.7),
      swing: between(style.swingRange.min, style.swingRange.max),
      brightness: between(0.35, 0.8),
      reverb: between(
        Math.max(0.1, style.defaultReverb - 0.2),
        Math.min(0.95, style.defaultReverb + 0.2),
      ),
    },
    styleId,
  );
}
