import { Player } from "@soundscape/audio/services/player/Player";
import { StreamPlayer } from "@soundscape/audio/services/stream/StreamPlayer";
import type { MusicPlayer } from "@soundscape/audio/types/MusicPlayer";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { VisualizerSource } from "@soundscape/visualizer/types/VisualizerSource";
import { TOUCH_MEDIA_QUERY } from "../../constants/app.constants";
import { APP_STRINGS } from "../../constants/app.strings";
import { NotifyService } from "../notify/NotifyService";
import type { ToastService } from "../toast/ToastService";

export class PlaybackService extends NotifyService {
  private readonly player: MusicPlayer;

  constructor(
    store: SettingsStore,
    private readonly toasts: ToastService,
  ) {
    super();
    this.player =
      window.matchMedia(TOUCH_MEDIA_QUERY).matches && StreamPlayer.isSupported()
        ? new StreamPlayer(store)
        : new Player(store);
  }

  get isPlaying(): boolean {
    return this.player.isPlaying;
  }

  get visualizerSource(): VisualizerSource {
    return {
      analyser: () => this.player.analyser(),
      currentTime: () => this.player.currentTime(),
      timeline: this.player.timeline,
    };
  }

  async toggle(): Promise<void> {
    try {
      const action = this.player.isPlaying
        ? this.player.pause()
        : this.player.play();
      this.notify();
      await action;
    } catch {
      this.toasts.show(APP_STRINGS.toastAudioFailed);
    }
    this.notify();
  }
}
