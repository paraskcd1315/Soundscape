import type { Preset } from "../../../models/Preset";

export interface PresetFile {
  app: "soundscape";
  schemaVersion: number;
  presets: Preset[];
}
