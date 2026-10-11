export function foldIntoRange(midi: number, low: number, high: number): number {
  let folded = midi;
  while (folded < low) folded += 12;
  while (folded > high) folded -= 12;
  return folded;
}
