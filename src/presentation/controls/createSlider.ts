import { el } from "./dom";
import type { SliderControl } from "./SliderControl";

export interface SliderOptions {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (value: number) => string;
  onInput: (value: number) => void;
}

export function createSlider(options: SliderOptions): SliderControl {
  const input = el("input", "slider__input", {
    id: options.id,
    type: "range",
    min: String(options.min),
    max: String(options.max),
    step: String(options.step),
  });
  const output = el("output", "slider__value", { for: options.id });
  const label = el(
    "label",
    "slider__label",
    { for: options.id },
    options.label,
  );
  const element = el("div", "slider", {}, label, output, input);

  const paint = (): void => {
    const value = Number(input.value);
    output.textContent = options.format(value);
    input.setAttribute("aria-valuetext", output.textContent);
    const span = Number(input.max) - Number(input.min);
    const fill = span === 0 ? 0 : ((value - Number(input.min)) / span) * 100;
    input.style.setProperty("--fill", `${fill}%`);
  };

  input.addEventListener("input", () => {
    paint();
    options.onInput(Number(input.value));
  });
  input.value = String(options.value);
  paint();

  return {
    element,
    set(value) {
      input.value = String(value);
      paint();
    },
    setRange(min, max) {
      input.min = String(min);
      input.max = String(max);
      input.disabled = max <= min;
      paint();
    },
  };
}
