import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import {
  mixInto,
  nextMixStyle,
} from "@soundscape/engine/services/settings/mixInto";
import { randomSeed } from "@soundscape/engine/services/settings/surpriseSettings";
import { isIdentityChange } from "@soundscape/engine/services/settings/utils/isIdentityChange.util";
import { NotifyService } from "../notify/NotifyService";
import type { PlaybackService } from "../playback/PlaybackService";
import { DJ_MIX_METRICS } from "./constants/djMix.constants";

export class DjMixService extends NotifyService {
  private enabled = false;
  private timer = 0;

  constructor(
    private readonly store: SettingsStore,
    private readonly playback: PlaybackService,
  ) {
    super();
    playback.subscribe(() => this.schedule());
    store.subscribe((next, previous) => {
      if (isIdentityChange(previous, next)) this.schedule();
    });
  }

  get isEnabled(): boolean {
    return this.enabled;
  }

  toggle(): void {
    this.enabled = !this.enabled;
    this.schedule();
    this.notify();
  }

  private schedule(): void {
    window.clearTimeout(this.timer);
    if (!this.enabled || !this.playback.isPlaying) return;
    const bars =
      DJ_MIX_METRICS.minimumBars +
      Math.floor(
        Math.random() *
          (DJ_MIX_METRICS.maximumBars - DJ_MIX_METRICS.minimumBars + 1),
      );
    const barSeconds =
      (DJ_MIX_METRICS.beatsPerBar * DJ_MIX_METRICS.secondsPerMinute) /
      this.store.get().tempo;
    this.timer = window.setTimeout(
      () => this.mix(),
      bars * barSeconds * DJ_MIX_METRICS.millisecondsPerSecond,
    );
  }

  private mix(): void {
    const current = this.store.get();
    const next = nextMixStyle(current.styleId, Math.random());
    this.store.replace(mixInto(current, next, randomSeed()));
  }
}
