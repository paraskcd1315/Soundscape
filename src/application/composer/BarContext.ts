import type { ScaleDefinition } from "../../domain/model/ScaleDefinition";
import type { Settings } from "../../domain/model/Settings";
import type { StyleDefinition } from "../../domain/model/StyleDefinition";
import type { BarHarmony } from "./BarHarmony";

export interface BarContext {
  settings: Settings;
  style: StyleDefinition;
  scale: ScaleDefinition;
  barIndex: number;
  section: number;
  harmony: BarHarmony;
  nextHarmony: BarHarmony;
  energy: number;
  swingBeats: number;
  isTransitionBar: boolean;
}
