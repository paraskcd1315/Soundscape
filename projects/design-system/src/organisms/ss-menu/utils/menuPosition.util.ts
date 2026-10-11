import { MENU_EDGE_PX, MENU_GAP_PX } from "../constants/menu.constants";

export function menuPosition(
  anchor: DOMRect,
  menu: DOMRect,
  viewportWidth: number,
  viewportHeight: number,
): { left: number; top: number } {
  const fitsLeft = anchor.left - menu.width - MENU_GAP_PX >= MENU_EDGE_PX;
  const left = fitsLeft
    ? anchor.left - menu.width - MENU_GAP_PX
    : Math.max(
        MENU_EDGE_PX,
        Math.min(
          anchor.right - menu.width,
          viewportWidth - menu.width - MENU_EDGE_PX,
        ),
      );
  const preferredTop = fitsLeft
    ? anchor.top + anchor.height / 2 - menu.height / 2
    : anchor.bottom + MENU_GAP_PX;
  const top = Math.max(
    MENU_EDGE_PX,
    Math.min(preferredTop, viewportHeight - menu.height - MENU_EDGE_PX),
  );
  return { left, top };
}
