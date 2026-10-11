export function fillPercent(value: number, min: number, max: number): number {
  const span = max - min;
  return span === 0 ? 0 : ((value - min) / span) * 100;
}
