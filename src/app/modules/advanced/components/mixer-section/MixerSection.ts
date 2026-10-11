import { SsChannelStrip } from "@soundscape/design-system/molecules/ss-channel-strip/SsChannelStrip";
import { SsSection } from "@soundscape/design-system/molecules/ss-section/SsSection";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { resolvePalette } from "@soundscape/visualizer/utils/resolvePalette.util";
import { LAYER_NAMES } from "../../../../shared/constants/names.constants";
import {
  formatPercent,
  formatText,
} from "../../../../shared/utils/format.util";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";

export class MixerSection {
  readonly element: HTMLElement;
  private readonly strips = new Map<LayerKind, SsChannelStrip>();

  constructor(private readonly store: SettingsStore) {
    const section = new SsSection(ADVANCED_STRINGS.sectionMixer);
    const settings = store.get();
    const accents = this.accents(settings);
    for (const kind of LAYER_KINDS) {
      const mix = settings.layers[kind];
      const strip = new SsChannelStrip({
        id: `mixer-${kind}`,
        label: LAYER_NAMES[kind],
        muteLabel: formatText(ADVANCED_STRINGS.mute, LAYER_NAMES[kind]),
        color: accents[kind],
        level: mix.level,
        muted: mix.muted,
        format: formatPercent,
        onLevel: (level) => store.updateLayer(kind, { level }),
        onMute: (muted) => store.updateLayer(kind, { muted }),
      });
      this.strips.set(kind, strip);
      section.append(strip.element);
    }
    this.element = section.element;
    store.subscribe(() => this.render());
  }

  private accents(settings: Settings): Readonly<Record<LayerKind, string>> {
    return resolvePalette(
      settings.visualizerTheme,
      settings.visualizerColors,
      STYLES[settings.styleId].palette,
    ).accents;
  }

  private render(): void {
    const settings = this.store.get();
    const accents = this.accents(settings);
    this.strips.forEach((strip, kind) => {
      strip.set(settings.layers[kind].level, settings.layers[kind].muted);
      strip.setColor(accents[kind]);
    });
  }
}
