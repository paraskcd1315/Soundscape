import { SsDrawer } from "@soundscape/design-system/organisms/ss-drawer/SsDrawer";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { PresetLibraryService } from "../../../../core/services/presets/PresetLibraryService";
import type { SeedService } from "../../../../core/services/seed/SeedService";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";
import { MixerSection } from "../mixer-section/MixerSection";
import { MusicSection } from "../music-section/MusicSection";
import { PresetsSection } from "../presets-section/PresetsSection";
import { SoundSection } from "../sound-section/SoundSection";
import { VisualsSection } from "../visuals-section/VisualsSection";

export class AdvancedDrawer {
  readonly drawer = new SsDrawer({
    title: ADVANCED_STRINGS.title,
    closeLabel: ADVANCED_STRINGS.close,
  });

  constructor(
    store: SettingsStore,
    seeds: SeedService,
    presets: PresetLibraryService,
  ) {
    this.drawer.element.dataset.testid = "advanced-drawer";
    this.drawer.body.append(
      new PresetsSection(presets).element,
      new MusicSection(store, seeds).element,
      new SoundSection(store).element,
      new MixerSection(store).element,
      new VisualsSection(store).element,
    );
  }

  get element(): HTMLDivElement {
    return this.drawer.element;
  }

  toggle(): void {
    this.drawer.toggle();
  }
}
