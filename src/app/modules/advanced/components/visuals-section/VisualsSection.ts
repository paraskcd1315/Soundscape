import "./visuals-section.scss";
import { SsColorInput } from "@soundscape/design-system/atoms/ss-color-input/SsColorInput";
import { SsSlider } from "@soundscape/design-system/atoms/ss-slider/SsSlider";
import { SsSwatch } from "@soundscape/design-system/atoms/ss-swatch/SsSwatch";
import { createElement } from "@soundscape/design-system/foundation/utils/createElement.util";
import { SsSection } from "@soundscape/design-system/molecules/ss-section/SsSection";
import { SsSegmented } from "@soundscape/design-system/molecules/ss-segmented/SsSegmented";
import { VISUALIZER_MODE_IDS } from "@soundscape/engine/constants/visualizerModeIds.constants";
import { VISUALIZER_THEME_IDS } from "@soundscape/engine/constants/visualizerThemeIds.constants";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { VisualizerModeId } from "@soundscape/engine/models/VisualizerModeId";
import type { VisualizerThemeId } from "@soundscape/engine/models/VisualizerThemeId";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import {
  VISUALIZER_MODE_NAMES,
  VISUALIZER_THEME_NAMES,
} from "../../../../shared/constants/names.constants";
import { formatPercent } from "../../../../shared/utils/format.util";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";
import { themeSwatchColors } from "../../utils/themeSwatchColors.util";

export class VisualsSection {
  readonly element: HTMLElement;
  private readonly mode: SsSegmented;
  private readonly intensity: SsSlider;
  private readonly swatches = new Map<VisualizerThemeId, SsSwatch>();
  private readonly first: SsColorInput;
  private readonly second: SsColorInput;
  private readonly custom: HTMLDivElement;

  constructor(private readonly store: SettingsStore) {
    const section = new SsSection(ADVANCED_STRINGS.sectionVisuals);
    const settings = store.get();
    this.mode = new SsSegmented({
      label: ADVANCED_STRINGS.visualizerMode,
      choices: VISUALIZER_MODE_IDS.map((id) => ({
        value: id,
        label: VISUALIZER_MODE_NAMES[id],
      })),
      value: settings.visualizerMode,
      onChange: (value) =>
        store.update({ visualizerMode: value as VisualizerModeId }),
    });
    this.intensity = new SsSlider({
      id: "visual-intensity",
      label: ADVANCED_STRINGS.visualizerIntensity,
      min: 0,
      max: 1,
      step: 0.01,
      value: settings.visualizerIntensity,
      format: formatPercent,
      onInput: (value) => store.update({ visualizerIntensity: value }),
    });
    const grid = createElement("div", "visuals-section__swatches", {
      role: "radiogroup",
      "aria-label": ADVANCED_STRINGS.visualizerTheme,
    });
    for (const id of VISUALIZER_THEME_IDS) {
      const swatch = new SsSwatch({
        label: VISUALIZER_THEME_NAMES[id],
        colors: themeSwatchColors(id, settings),
        selected: id === settings.visualizerTheme,
        onClick: () => store.update({ visualizerTheme: id }),
      });
      this.swatches.set(id, swatch);
      grid.append(swatch.element);
    }
    this.first = new SsColorInput({
      id: "visual-color-one",
      label: ADVANCED_STRINGS.customFirst,
      value: settings.visualizerColors[0],
      onInput: (value) =>
        store.update({
          visualizerTheme: "custom",
          visualizerColors: [value, this.store.get().visualizerColors[1]],
        }),
    });
    this.second = new SsColorInput({
      id: "visual-color-two",
      label: ADVANCED_STRINGS.customSecond,
      value: settings.visualizerColors[1],
      onInput: (value) =>
        store.update({
          visualizerTheme: "custom",
          visualizerColors: [this.store.get().visualizerColors[0], value],
        }),
    });
    this.custom = createElement(
      "div",
      "visuals-section__custom",
      {},
      this.first.element,
      this.second.element,
    );
    section.append(
      this.mode.element,
      this.intensity.element,
      createElement(
        "span",
        "visuals-section__label",
        {},
        ADVANCED_STRINGS.visualizerTheme,
      ),
      grid,
      this.custom,
    );
    this.element = section.element;
    store.subscribe(() => this.render());
  }

  private render(): void {
    const settings: Settings = this.store.get();
    this.mode.set(settings.visualizerMode);
    this.intensity.set(settings.visualizerIntensity);
    this.swatches.forEach((swatch, id) => {
      swatch.setColors(themeSwatchColors(id, settings));
      swatch.setSelected(id === settings.visualizerTheme);
    });
    this.first.set(settings.visualizerColors[0]);
    this.second.set(settings.visualizerColors[1]);
  }
}
