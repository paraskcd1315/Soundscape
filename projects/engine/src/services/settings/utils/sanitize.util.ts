import { LAYER_KINDS } from "../../../constants/layerKinds.constants";
import type { LayerKind } from "../../../models/LayerKind";
import type { LayerMix } from "../../../models/LayerMix";
import { clamp } from "../../../utils/theory/clamp";
import type { LooseRecord } from "../types/LooseRecord";

export function isRecord(value: unknown): value is LooseRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function numberOr(
  value: unknown,
  fallback: number,
  low: number,
  high: number,
): number {
  return typeof value === "number" && Number.isFinite(value)
    ? clamp(value, low, high)
    : fallback;
}

export function sanitizeLayers(
  raw: unknown,
  fallback: Record<LayerKind, LayerMix>,
): Record<LayerKind, LayerMix> {
  const layers = {} as Record<LayerKind, LayerMix>;
  const source = isRecord(raw) ? raw : {};
  for (const kind of LAYER_KINDS) {
    const entry = source[kind];
    const base = fallback[kind];
    layers[kind] = isRecord(entry)
      ? {
          level: numberOr(entry.level, base.level, 0, 1),
          muted: entry.muted === true,
        }
      : base;
  }
  return layers;
}
