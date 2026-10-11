import type { Preset } from "../../domain/model/Preset";

export interface PresetFile {
  app: "soundscape";
  schemaVersion: number;
  presets: Preset[];
}
