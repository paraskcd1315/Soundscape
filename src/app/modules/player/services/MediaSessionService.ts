import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { PlaybackService } from "../../../core/services/playback/PlaybackService";
import type { PresetLibraryService } from "../../../core/services/presets/PresetLibraryService";
import { formatNowPlayingDetail } from "../../../shared/utils/format.util";
import { PLAYER_STRINGS } from "../constants/player.strings";
import { nowPlayingTitle } from "../utils/nowPlayingTitle.util";

export class MediaSessionService {
  constructor(
    private readonly store: SettingsStore,
    private readonly playback: PlaybackService,
    private readonly presets: PresetLibraryService,
  ) {}

  bind(): void {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.setActionHandler("play", () => {
      if (!this.playback.isPlaying) void this.playback.toggle();
    });
    navigator.mediaSession.setActionHandler("pause", () => {
      if (this.playback.isPlaying) void this.playback.toggle();
    });
    this.store.subscribe(() => this.render());
    this.playback.subscribe(() => this.render());
    this.presets.subscribe(() => this.render());
    this.render();
  }

  private render(): void {
    const settings = this.store.get();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: nowPlayingTitle(settings, this.presets.selectedPreset?.name),
      artist: PLAYER_STRINGS.mediaArtist,
      album: formatNowPlayingDetail(settings),
    });
    navigator.mediaSession.playbackState = this.playback.isPlaying
      ? "playing"
      : "paused";
  }
}
