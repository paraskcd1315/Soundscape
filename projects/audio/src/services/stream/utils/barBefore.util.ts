import type { BarPosition } from "../types/BarPosition";

export function barBefore(
  nextBarIndex: number,
  nextBarTime: number,
  barSeconds: number,
  time: number,
): BarPosition {
  let barIndex = nextBarIndex;
  let barTime = nextBarTime;
  while (barTime > time && barIndex > 0) {
    barIndex--;
    barTime -= barSeconds;
  }
  return { barIndex, barTime };
}
