import { SsSelect } from "@soundscape/design-system/atoms/ss-select/SsSelect";
import { SsTextInput } from "@soundscape/design-system/atoms/ss-text-input/SsTextInput";
import { SsSection } from "@soundscape/design-system/molecules/ss-section/SsSection";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { APP_CONSTANTS } from "../../../../core/constants/app.constants";
import type { SeedService } from "../../../../core/services/seed/SeedService";
import { seedToText } from "../../../../core/utils/seedText.util";
import {
  KEY_NAMES,
  SCALE_NAMES,
} from "../../../../shared/constants/names.constants";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";

export class MusicSection {
  readonly element: HTMLElement;
  private readonly key: SsSelect;
  private readonly scale: SsSelect;
  private readonly seed: SsTextInput;

  constructor(
    private readonly store: SettingsStore,
    seeds: SeedService,
  ) {
    const section = new SsSection(ADVANCED_STRINGS.sectionMusic);
    const settings = store.get();
    this.key = new SsSelect({
      id: "music-key",
      label: ADVANCED_STRINGS.key,
      choices: KEY_NAMES.map((name, index) => ({
        value: String(index),
        label: name,
      })),
      value: String(settings.keyRoot),
      onChange: (value) => store.update({ keyRoot: Number(value) }),
    });
    this.scale = new SsSelect({
      id: "music-scale",
      label: ADVANCED_STRINGS.scale,
      choices: this.scaleChoices(settings),
      value: settings.scaleId,
      onChange: (value) =>
        store.update({ scaleId: value as Settings["scaleId"] }),
    });
    this.seed = new SsTextInput({
      id: "music-seed",
      label: ADVANCED_STRINGS.seed,
      value: seedToText(settings.seed),
      maxLength: APP_CONSTANTS.seedMaxLength,
      onCommit: (value) => {
        seeds.applyText(value);
        this.seed.set(seedToText(this.store.get().seed));
      },
    });
    section.append(this.key.element, this.scale.element, this.seed.element);
    this.element = section.element;
    store.subscribe(() => this.render());
  }

  private scaleChoices(settings: Settings) {
    return STYLES[settings.styleId].scaleIds.map((id) => ({
      value: id,
      label: SCALE_NAMES[id],
    }));
  }

  private render(): void {
    const settings = this.store.get();
    this.key.set(String(settings.keyRoot));
    this.scale.setChoices(this.scaleChoices(settings), settings.scaleId);
    this.seed.set(seedToText(settings.seed));
  }
}
