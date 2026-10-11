import type { DrumGrid } from "../../domain/model/DrumGrid";
import type { SeedTimbre } from "../../domain/model/SeedTimbre";
import type { Settings } from "../../domain/model/Settings";
import type { StyleDefinition } from "../../domain/model/StyleDefinition";
import { createRng } from "../../domain/random/createRng";

export function timbreFor(
  settings: Settings,
  style: StyleDefinition,
): SeedTimbre {
  const rng = createRng(settings.seed, "timbre", style.id);
  const variants = style.variants;
  const fallbackKit: readonly DrumGrid[] = style.drums?.grids ?? [];
  return {
    chordVoice: rng.pick(variants.chordVoices),
    melodyVoice: rng.pick(variants.melodyVoices),
    bassVoice: rng.pick(variants.bassVoices),
    padVoice: rng.pick(variants.padVoices),
    counterVoice: rng.pick(variants.counterVoices),
    stabSteps: rng.pick(variants.stabSteps),
    drumKit:
      variants.drumKits.length > 0 ? rng.pick(variants.drumKits) : fallbackKit,
    chordCenterShift: rng.pick(variants.chordCenterShifts),
    melodyShift: rng.int(-2, 3),
    melodyBusy: rng.range(0.6, 1.5),
    leapBias: rng.range(-0.3, 0.25),
    syncopation: rng.range(0, 1),
  };
}
