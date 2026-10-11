import type { ScaleDefinition } from "../../../models/ScaleDefinition";
import type { SeedTimbre } from "../../../models/SeedTimbre";
import type { Settings } from "../../../models/Settings";
import type { StyleDefinition } from "../../../models/StyleDefinition";
import type { BarHarmony } from "./BarHarmony";
import type { FormPosition } from "./FormPosition";
import type { BarPatterns } from "./BarPatterns";

export interface BarContext {
  settings: Settings;
  style: StyleDefinition;
  scale: ScaleDefinition;
  timbre: SeedTimbre;
  patterns: BarPatterns;
  form: FormPosition;
  barIndex: number;
  section: number;
  harmony: BarHarmony;
  nextHarmony: BarHarmony;
  energy: number;
  swingBeats: number;
  isTransitionBar: boolean;
}
