import type { Settings } from "../../../models/Settings";
import type { LayerLevels } from "./LayerLevels";

export interface PresetSeed {
  slug: string;
  name: string;
  overrides: Partial<Omit<Settings, "layers">>;
  levels?: LayerLevels;
}
