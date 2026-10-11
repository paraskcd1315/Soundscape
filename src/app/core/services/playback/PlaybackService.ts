import { Player } from "@soundscape/audio/services/player/Player";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { VisualizerSource } from "@soundscape/visualizer/types/VisualizerSource";
import { APP_STRINGS } from "../../constants/app.strings";
import { NotifyService } from "../notify/NotifyService";
import type { ToastService } from "../toast/ToastService";

export class PlaybackService extends NotifyService {
  private readonly player: Player;

  constructor(
    store: SettingsStore,
    private readonly toasts: ToastService,
  ) {
    super();
    this.player = new Player(store);
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
      if (this.player.isPlaying) await this.player.pause();
      else await this.player.play();
    } catch {
      this.toasts.show(APP_STRINGS.toastAudioFailed);
    }
    this.notify();
  }
}
