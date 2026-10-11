import type { VisualizerThemeId } from "@soundscape/engine/models/VisualizerThemeId";

export type PresetThemeId = Exclude<VisualizerThemeId, "style" | "custom">;
