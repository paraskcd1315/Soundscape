import type { Settings } from "../../../models/Settings";

export const IDENTITY_KEYS: readonly (keyof Settings)[] = [
  "styleId",
  "seed",
  "keyRoot",
  "scaleId",
];
