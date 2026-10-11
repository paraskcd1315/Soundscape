import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { LayerMix } from "@soundscape/engine/models/LayerMix";
import { createSlider } from "../controls/createSlider";
import { el } from "../controls/dom";
import type { SliderControl } from "../controls/SliderControl";
import { LAYER_NAMES } from "../i18n/names";
import { t } from "../i18n/t";
import { formatSliderValue } from "./formatSliderValue";

export interface LayerStrip {
  element: HTMLElement;
  set(mix: LayerMix): void;
}

export interface LayerStripOptions {
  kind: LayerKind;
  mix: LayerMix;
  accent: string;
  onLevel: (level: number) => void;
  onMute: (muted: boolean) => void;
}

export function createLayerStrip(options: LayerStripOptions): LayerStrip {
  const slider: SliderControl = createSlider({
    id: `layer-${options.kind}`,
    label: LAYER_NAMES[options.kind],
    min: 0,
    max: 1,
    step: 0.01,
    value: options.mix.level,
    format: (value) => formatSliderValue({ unit: "percent" }, value),
    onInput: options.onLevel,
  });
  const mute = el("button", "strip__mute", {
    type: "button",
    "aria-pressed": String(options.mix.muted),
    "aria-label": t("mute", LAYER_NAMES[options.kind]),
    title: t("mute", LAYER_NAMES[options.kind]),
  });
  mute.textContent = "M";
  mute.addEventListener("click", () =>
    options.onMute(mute.getAttribute("aria-pressed") !== "true"),
  );
  const swatch = el("span", "strip__swatch");
  swatch.style.background = options.accent;
  const element = el("div", "strip", {}, swatch, slider.element, mute);

  return {
    element,
    set(mix) {
      slider.set(mix.level);
      mute.setAttribute("aria-pressed", String(mix.muted));
      element.classList.toggle("strip--muted", mix.muted);
    },
  };
}
