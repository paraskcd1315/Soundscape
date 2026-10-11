import "./ss-chip.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsChipOptions } from "./types/SsChipOptions";

export class SsChip {
  readonly element: HTMLButtonElement;

  constructor(options: SsChipOptions) {
    this.element = createElement(
      "button",
      "ss-chip",
      { type: "button" },
      options.label,
    );
    if (options.testId) this.element.dataset.testid = options.testId;
    this.element.addEventListener("click", options.onClick);
    this.setSelected(options.selected ?? false);
  }

  setSelected(selected: boolean): void {
    this.element.setAttribute("aria-pressed", String(selected));
  }
}
