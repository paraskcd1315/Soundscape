import { SsSlider } from "@soundscape/design-system/atoms/ss-slider/SsSlider";
import { SsSection } from "@soundscape/design-system/molecules/ss-section/SsSection";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { formatBpm, formatPercent } from "../../../../shared/utils/format.util";
import { SOUND_SLIDERS } from "../../constants/advanced.constants";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";
import type { SoundSettingKey } from "../../types/SoundSettingKey";
import { sliderRange } from "../../utils/sliderRange.util";

export class SoundSection {
  readonly element: HTMLElement;
  private readonly sliders = new Map<SoundSettingKey, SsSlider>();

  constructor(private readonly store: SettingsStore) {
    const section = new SsSection(ADVANCED_STRINGS.sectionSound);
    const settings = store.get();
    for (const spec of SOUND_SLIDERS) {
      const range = sliderRange(spec.key, settings.styleId);
      const slider = new SsSlider({
        id: `sound-${spec.key}`,
        label: spec.label,
        min: range.min,
        max: range.max,
        step: spec.step,
        value: settings[spec.key],
        format: spec.key === "tempo" ? formatBpm : formatPercent,
        onInput: (value) => store.update({ [spec.key]: value }),
      });
      this.sliders.set(spec.key, slider);
      section.append(slider.element);
    }
    this.element = section.element;
    store.subscribe(() => this.render());
  }

  private render(): void {
    const settings = this.store.get();
    this.sliders.forEach((slider, key) => {
      const range = sliderRange(key, settings.styleId);
      slider.setRange(range.min, range.max);
      slider.set(settings[key]);
    });
  }
}
