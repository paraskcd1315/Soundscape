import type { LayerKind } from "../../../models/LayerKind";

export type TimelineItemKind = "note" | "beat";

export interface TimelineItem {
  kind: TimelineItemKind;
  time: number;
  layer: LayerKind | null;
  midi: number;
  velocity: number;
  beatInBar: number;
  barIndex: number;
}
