import type { RgbColor } from "../types/RgbColor";
import { HEX_PATTERN } from "./constants/colorMath.util.constants";

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

export function toHex(color: RgbColor): string {
  return `#${color.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
}

export function mixHex(from: string, to: string, amount: number): string {
  return toHex(mixRgb(parseHex(from), parseHex(to), amount));
}

export function toCss(color: RgbColor, alpha = 1): string {
  return `rgba(${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])},${alpha})`;
}
