import { SHEET_DRAG } from "../constants/sheetDrag.constants";

export function shouldDismissSheet(
  distance: number,
  velocity: number,
  sheetHeight: number,
): boolean {
  if (distance <= SHEET_DRAG.slopPixels) return false;
  if (velocity >= SHEET_DRAG.dismissVelocityPixelsPerMs) return true;
  if (velocity <= -SHEET_DRAG.dismissVelocityPixelsPerMs) return false;
  return distance >= sheetHeight * SHEET_DRAG.dismissFraction;
}
