import type { LayerKind } from "@soundscape/engine/models/LayerKind";

export const TRANSITION_METRICS = {
  fadeInBars: 2,
  lateEntryBar: 1,
  fadeOutBars: 2,
  earlyExitBars: 1,
  tailSeconds: 3,
  softFadeMinSeconds: 1.2,
  softFadeMaxSeconds: 3,
  disposeSeconds: 0.05,
  beatsPerBar: 4,
  secondsPerMinute: 60,
} as const;

export const LATE_ENTRY_LAYERS: readonly LayerKind[] = ["drums", "bass"];

export const EARLY_EXIT_LAYERS: readonly LayerKind[] = ["bass", "drums"];

export const ALL_OTHER_LAYERS: readonly LayerKind[] = [
  "chords",
  "pad",
  "melody",
  "counter",
  "texture",
];
