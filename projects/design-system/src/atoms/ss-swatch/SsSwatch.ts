import "./ss-swatch.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsSwatchOptions } from "./types/SsSwatchOptions";
import { swatchGradient } from "./utils/swatchGradient.util";

export class SsSwatch {
  readonly element: HTMLButtonElement;

  constructor(options: SsSwatchOptions) {
    this.element = createElement("button", "ss-swatch", {
      type: "button",
      "aria-label": options.label,
      title: options.label,
    });
    this.setColors(options.colors);
    this.element.addEventListener("click", options.onClick);
    this.setSelected(options.selected ?? false);
  }

  setColors(colors: readonly string[]): void {
    this.element.style.setProperty("--ss-swatch-fill", swatchGradient(colors));
  }

  setSelected(selected: boolean): void {
    this.element.setAttribute("aria-pressed", String(selected));
  }
}
