import "./ss-color-input.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsColorInputOptions } from "./types/SsColorInputOptions";

export class SsColorInput {
  readonly element: HTMLLabelElement;
  private readonly input: HTMLInputElement;

  constructor(options: SsColorInputOptions) {
    this.input = createElement("input", "ss-color-input__field", {
      id: options.id,
      type: "color",
      value: options.value,
    });
    this.input.addEventListener("input", () =>
      options.onInput(this.input.value),
    );
    this.element = createElement(
      "label",
      "ss-color-input",
      { for: options.id },
      this.input,
      createElement("span", "ss-color-input__label", {}, options.label),
    );
  }

  set(value: string): void {
    this.input.value = value;
  }
}
