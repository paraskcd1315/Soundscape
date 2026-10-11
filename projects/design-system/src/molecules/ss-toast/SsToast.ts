import "./ss-toast.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import { TOAST_VISIBLE_MILLISECONDS } from "./constants/toast.constants";

export class SsToast {
  readonly element: HTMLDivElement;
  private timer = 0;

  constructor() {
    this.element = createElement("div", "ss-toast", {
      role: "status",
      "aria-live": "polite",
    });
  }

  show(message: string): void {
    this.element.textContent = message;
    this.element.classList.add("ss-toast--visible");
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(
      () => this.element.classList.remove("ss-toast--visible"),
      TOAST_VISIBLE_MILLISECONDS,
    );
  }
}
