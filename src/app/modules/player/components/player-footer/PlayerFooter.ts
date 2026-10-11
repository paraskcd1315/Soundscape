import "./player-footer.scss";
import { SsIconButton } from "@soundscape/design-system/atoms/ss-icon-button/SsIconButton";
import { SsSlider } from "@soundscape/design-system/atoms/ss-slider/SsSlider";
import { createElement } from "@soundscape/design-system/foundation/utils/createElement.util";
import { SsPlayerBar } from "@soundscape/design-system/organisms/ss-player-bar/SsPlayerBar";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { PlaybackService } from "../../../../core/services/playback/PlaybackService";
import type { PresetLibraryService } from "../../../../core/services/presets/PresetLibraryService";
import { seedToText } from "../../../../core/utils/seedText.util";
import {
  formatNowPlayingDetail,
  formatPercent,
  formatText,
} from "../../../../shared/utils/format.util";
import { PLAYER_STRINGS } from "../../constants/player.strings";
import { UNMUTE_FALLBACK_VOLUME } from "../../constants/player.constants";

export class PlayerFooter {
  readonly element: HTMLElement;
  private readonly playButton: SsIconButton;
  private readonly volume: SsSlider;
  private readonly volumeButton: SsIconButton;
  private readonly titleText: HTMLElement;
  private readonly detailText: HTMLElement;
  private volumeBeforeMute = 0;

  constructor(
    private readonly store: SettingsStore,
    private readonly playback: PlaybackService,
    private readonly presets: PresetLibraryService,
    onAdvanced: () => void,
  ) {
    const bar = new SsPlayerBar(PLAYER_STRINGS.barLabel);
    this.titleText = createElement("span", "player-footer__title", {
      "data-testid": "now-playing-title",
    });
    this.detailText = createElement("span", "player-footer__detail", {
      "data-testid": "now-playing-detail",
    });
    bar.leading.append(
      createElement(
        "div",
        "player-footer__now",
        { "aria-live": "polite" },
        createElement(
          "span",
          "player-footer__eyebrow",
          {},
          PLAYER_STRINGS.nowPlayingEyebrow,
        ),
        this.titleText,
        this.detailText,
      ),
    );
    this.playButton = new SsIconButton({
      icon: "play",
      label: PLAYER_STRINGS.play,
      size: "lg",
      accent: true,
      testId: "play-button",
      onClick: () => void playback.toggle(),
    });
    bar.center.append(this.playButton.element);
    this.volumeButton = new SsIconButton({
      icon: "volume",
      label: PLAYER_STRINGS.volume,
      size: "sm",
      testId: "mute-button",
      onClick: () => this.toggleMute(),
    });
    this.volume = new SsSlider({
      id: "player-volume",
      label: PLAYER_STRINGS.volume,
      min: 0,
      max: 1,
      step: 0.01,
      value: store.get().masterVolume,
      compact: true,
      hideLabel: true,
      format: formatPercent,
      onInput: (value) => store.update({ masterVolume: value }),
    });
    const advanced = new SsIconButton({
      icon: "sliders",
      label: PLAYER_STRINGS.advanced,
      size: "md",
      testId: "advanced-button",
      onClick: onAdvanced,
    });
    bar.trailing.append(
      this.volumeButton.element,
      this.volume.element,
      advanced.element,
    );
    this.element = bar.element;
    store.subscribe(() => this.render());
    playback.subscribe(() => this.render());
    presets.subscribe(() => this.render());
    this.render();
  }

  private toggleMute(): void {
    const current = this.store.get().masterVolume;
    if (current > 0) {
      this.volumeBeforeMute = current;
      this.store.update({ masterVolume: 0 });
    } else {
      this.store.update({
        masterVolume: this.volumeBeforeMute || UNMUTE_FALLBACK_VOLUME,
      });
    }
  }

  private render(): void {
    const settings = this.store.get();
    const playing = this.playback.isPlaying;
    this.playButton.setIcon(playing ? "pause" : "play");
    this.playButton.setLabel(
      playing ? PLAYER_STRINGS.pause : PLAYER_STRINGS.play,
    );
    this.volume.set(settings.masterVolume);
    this.volumeButton.setIcon(settings.masterVolume > 0 ? "volume" : "mute");
    const preset = this.presets.selectedPreset;
    this.titleText.textContent =
      preset?.name ??
      `${PLAYER_STRINGS.nowPlayingCustom} · ${formatText(PLAYER_STRINGS.seedTag, seedToText(settings.seed))}`;
    this.detailText.textContent = formatNowPlayingDetail(settings);
  }
}
