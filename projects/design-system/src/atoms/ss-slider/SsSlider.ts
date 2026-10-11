import "./ss-slider.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsSliderOptions } from "./types/SsSliderOptions";
import { fillPercent } from "./utils/fillPercent.util";

export class SsSlider {
  readonly element: HTMLDivElement;
  private readonly input: HTMLInputElement;
  private readonly output: HTMLOutputElement;

  constructor(private readonly options: SsSliderOptions) {
    this.input = createElement("input", "ss-slider__input", {
      id: options.id,
      type: "range",
      min: String(options.min),
      max: String(options.max),
      step: String(options.step),
    });
    this.output = createElement("output", "ss-slider__value", {
      for: options.id,
    });
    const label = createElement(
      "label",
      `ss-slider__label${options.hideLabel ? " ss-visually-hidden" : ""}`,
      { for: options.id },
      options.label,
    );
    this.element = createElement(
      "div",
      `ss-slider${options.compact ? " ss-slider--compact" : ""}`,
      {},
      label,
      this.output,
      this.input,
    );
    this.input.value = String(options.value);
    this.input.addEventListener("input", () => {
      this.paint();
      options.onInput(Number(this.input.value));
    });
    this.paint();
  }

  set(value: number): void {
    this.input.value = String(value);
    this.paint();
  }

  setRange(min: number, max: number): void {
    this.input.min = String(min);
    this.input.max = String(max);
    this.input.disabled = max <= min;
    this.paint();
  }

  private paint(): void {
    const value = Number(this.input.value);
    this.output.textContent = this.options.format(value);
    this.input.setAttribute("aria-valuetext", this.output.textContent);
    this.input.style.setProperty(
      "--ss-fill",
      `${fillPercent(value, Number(this.input.min), Number(this.input.max))}%`,
    );
  }
}
