import type { RgbColor } from "./RgbColor";

const HEX_PATTERN = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

export function parseHex(hex: string): RgbColor {
  const match = HEX_PATTERN.exec(hex);
  if (!match) return [255, 255, 255];
  return [
    parseInt(match[1] as string, 16),
    parseInt(match[2] as string, 16),
    parseInt(match[3] as string, 16),
  ];
}

export function mixRgb(from: RgbColor, to: RgbColor, amount: number): RgbColor {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

export function toCss(color: RgbColor, alpha = 1): string {
  return `rgba(${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])},${alpha})`;
}
