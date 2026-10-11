import type { StyleId } from "@soundscape/engine/models/StyleId";

export interface StyleGroup {
  label: string;
  styleIds: readonly StyleId[];
}
