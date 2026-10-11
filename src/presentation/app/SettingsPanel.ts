import type { SettingsStore } from "../../application/settings/SettingsStore";
import { LAYER_KINDS } from "../../domain/model/LayerKind";
import type { Settings } from "../../domain/model/Settings";
import { STYLES } from "../../styles/styleCatalog";
import { createSelect } from "../controls/createSelect";
import { createSlider } from "../controls/createSlider";
import { el } from "../controls/dom";
import type { SelectControl } from "../controls/SelectControl";
import type { SliderControl } from "../controls/SliderControl";
import { KEY_NAMES, SCALE_NAMES } from "../i18n/names";
import { t } from "../i18n/t";
import { formatSliderValue } from "./formatSliderValue";
import { createLayerStrip } from "./LayerStrip";
import type { LayerStrip } from "./LayerStrip";
import { SETTINGS_SLIDERS } from "./sliderDefinitions";
import type { NumericSettingKey } from "./SliderDefinition";

export interface SettingsPanel {
  element: HTMLElement;
  sync(settings: Settings): void;
}

const KEY_OPTIONS = KEY_NAMES.map((name, index) => ({
  value: String(index),
  label: name,
}));

function rangeFor(
  key: NumericSettingKey,
  settings: Settings,
): [number, number] {
  const style = STYLES[settings.styleId];
  if (key === "tempo") return [style.tempoRange.min, style.tempoRange.max];
  if (key === "swing") return [style.swingRange.min, style.swingRange.max];
  return [0, 1];
}

export function createSettingsPanel(store: SettingsStore): SettingsPanel {
  const initial = store.get();

  const keySelect: SelectControl = createSelect({
    id: "setting-key",
    label: t("key"),
    options: KEY_OPTIONS,
    value: String(initial.keyRoot),
    onChange: (value) => store.update({ keyRoot: Number(value) }),
  });
  const scaleSelect: SelectControl = createSelect({
    id: "setting-scale",
    label: t("scale"),
    options: [],
    value: initial.scaleId,
    onChange: (value) =>
      store.update({ scaleId: value as Settings["scaleId"] }),
  });

  const sliders = new Map<NumericSettingKey, SliderControl>();
  for (const definition of SETTINGS_SLIDERS) {
    const [min, max] = rangeFor(definition.key, initial);
    sliders.set(
      definition.key,
      createSlider({
        id: `setting-${definition.key}`,
        label: t(definition.label),
        min,
        max,
        step: definition.step,
        value: initial[definition.key],
        format: (value) => formatSliderValue(definition, value),
        onInput: (value) => store.update({ [definition.key]: value }),
      }),
    );
  }

  const strips = new Map<string, LayerStrip>();
  const layerList = el("div", "panel__layers");
  for (const kind of LAYER_KINDS) {
    const strip = createLayerStrip({
      kind,
      mix: initial.layers[kind],
      accent: STYLES[initial.styleId].palette.accents[kind],
      onLevel: (level) => store.updateLayer(kind, { level }),
      onMute: (muted) => store.updateLayer(kind, { muted }),
    });
    strips.set(kind, strip);
    layerList.append(strip.element);
  }

  const selects = el(
    "div",
    "panel__selects",
    {},
    keySelect.element,
    scaleSelect.element,
  );
  const grid = el(
    "div",
    "panel__grid",
    {},
    ...Array.from(sliders.values(), (slider) => slider.element),
  );
  const layers = el(
    "div",
    "panel__group",
    {},
    el("h2", "panel__heading", {}, t("layers")),
    layerList,
  );
  const element = el("div", "panel__body", {}, selects, grid, layers);

  const sync = (settings: Settings): void => {
    keySelect.set(String(settings.keyRoot));
    const style = STYLES[settings.styleId];
    scaleSelect.setOptions(
      style.scaleIds.map((id) => ({ value: id, label: SCALE_NAMES[id] })),
      settings.scaleId,
    );
    for (const definition of SETTINGS_SLIDERS) {
      const slider = sliders.get(definition.key) as SliderControl;
      const [min, max] = rangeFor(definition.key, settings);
      slider.setRange(min, max);
      slider.set(settings[definition.key]);
    }
    for (const kind of LAYER_KINDS) {
      const strip = strips.get(kind) as LayerStrip;
      strip.set(settings.layers[kind]);
      const swatch = strip.element.querySelector<HTMLElement>(".strip__swatch");
      if (swatch) swatch.style.background = style.palette.accents[kind];
    }
  };
  sync(initial);

  return { element, sync };
}
