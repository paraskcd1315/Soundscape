import type { Settings } from "../../domain/model/Settings";
import { STYLES } from "../../styles/styleCatalog";
import { defaultSettingsFor } from "./defaultSettingsFor";
import { nextSurpriseStyle } from "./nextSurpriseStyle";
import { withSeedCharacter } from "./withSeedCharacter";

function between(low: number, high: number): number {
  return low + Math.random() * (high - low);
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
  const seed = keepSeed ? current.seed : randomSeed();
  return withSeedCharacter(
    {
      ...defaultSettingsFor(styleId, seed),
      masterVolume: current.masterVolume,
      visualizerMode: current.visualizerMode,
      visualizerIntensity: current.visualizerIntensity,
      layers: current.layers,
      brightness: between(0.35, 0.8),
      reverb: between(
        Math.max(0.1, style.defaultReverb - 0.2),
        Math.min(0.95, style.defaultReverb + 0.2),
      ),
    },
    seed,
  );
}
