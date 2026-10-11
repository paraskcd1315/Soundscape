export function swatchGradient(colors: readonly string[]): string {
  if (colors.length === 0) return "transparent";
  if (colors.length === 1) return colors[0] as string;
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}
