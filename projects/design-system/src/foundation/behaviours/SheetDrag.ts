import { SHEET_DRAG } from "./constants/sheetDrag.constants";
import type { SheetDragOptions } from "./types/SheetDragOptions";
import { shouldDismissSheet } from "./utils/shouldDismissSheet.util";

export class SheetDrag {
  private startY = 0;
  private lastY = 0;
  private lastTime = 0;
  private velocity = 0;
  private fromHandle = false;
  private armed = false;
  private dragging = false;

  constructor(private readonly options: SheetDragOptions) {
    const { panel } = options;
    panel.addEventListener("touchstart", (event) => this.start(event), {
      passive: true,
    });
    panel.addEventListener("touchmove", (event) => this.move(event), {
      passive: false,
    });
    panel.addEventListener("touchend", () => this.end());
    panel.addEventListener("touchcancel", () => this.end());
  }

  private get atTop(): boolean {
    return this.options.scroller.scrollTop <= 0;
  }

  private start(event: TouchEvent): void {
    const touch = event.touches[0];
    if (!touch || event.touches.length > 1 || !this.options.enabled()) return;
    this.fromHandle =
      this.options.handle?.contains(event.target as Node) ?? false;
    this.armed = this.fromHandle || this.atTop;
    this.dragging = false;
    this.startY = touch.clientY;
    this.lastY = touch.clientY;
    this.lastTime = event.timeStamp;
    this.velocity = 0;
  }

  private move(event: TouchEvent): void {
    const touch = event.touches[0];
    if (!this.armed || !touch) return;
    const distance = touch.clientY - this.startY;
    if (!this.dragging) {
      if (distance < 0 && !this.fromHandle) {
        this.armed = false;
        return;
      }
      event.preventDefault();
      if (distance <= SHEET_DRAG.slopPixels) return;
      this.dragging = true;
      this.options.panel.style.transition = "none";
    }
    event.preventDefault();
    const elapsed = event.timeStamp - this.lastTime;
    if (elapsed > 0) this.velocity = (touch.clientY - this.lastY) / elapsed;
    this.lastY = touch.clientY;
    this.lastTime = event.timeStamp;
    this.options.panel.style.transform = `translateY(${Math.max(0, distance)}px)`;
  }

  private end(): void {
    if (!this.dragging) return;
    this.dragging = false;
    this.armed = false;
    const { panel } = this.options;
    const dismiss = shouldDismissSheet(
      this.lastY - this.startY,
      this.velocity,
      panel.getBoundingClientRect().height,
    );
    if (dismiss) {
      panel.style.transition = "";
      panel.style.transform = "";
      this.options.onDismiss();
      return;
    }
    panel.style.transition = SHEET_DRAG.settleTransition;
    panel.style.transform = "";
    panel.addEventListener(
      "transitionend",
      () => {
        if (!this.dragging) panel.style.transition = "";
      },
      { once: true },
    );
  }
}
