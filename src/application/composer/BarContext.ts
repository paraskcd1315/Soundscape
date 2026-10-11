import type { ScaleDefinition } from "../../domain/model/ScaleDefinition";
import type { SeedTimbre } from "../../domain/model/SeedTimbre";
import type { Settings } from "../../domain/model/Settings";
import type { StyleDefinition } from "../../domain/model/StyleDefinition";
import type { BarHarmony } from "./BarHarmony";
import type { FormPosition } from "./FormPosition";
import type { BarPatterns } from "./patterns/BarPatterns";

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
