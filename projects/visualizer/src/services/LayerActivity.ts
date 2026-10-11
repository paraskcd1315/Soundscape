import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { TimelineItem } from "@soundscape/engine/services/transport/types/TimelineItem";
import { clamp } from "@soundscape/engine/utils/theory/clamp";
import { LAYER_ACTIVITY_METRICS } from "./constants/LayerActivity.constants";

export class LayerActivity {
  readonly levels = {} as Record<LayerKind, number>;
  private lastBeatTime = 0;
  private lastBeatInBar = 0;
  private secondsPerBeat: number = LAYER_ACTIVITY_METRICS.defaultSecondsPerBeat;

  constructor() {
    for (const kind of LAYER_KINDS) this.levels[kind] = 0;
  }

  update(
    items: readonly TimelineItem[],
    now: number,
    deltaSeconds: number,
  ): void {
    const decay = Math.exp(
      -deltaSeconds * LAYER_ACTIVITY_METRICS.decayPerSecond,
    );
    for (const kind of LAYER_KINDS) this.levels[kind] *= decay;
    for (const item of items) {
      if (item.kind === "beat") {
        if (this.lastBeatTime > 0 && item.time > this.lastBeatTime) {
          this.secondsPerBeat = clamp(
            item.time - this.lastBeatTime,
            LAYER_ACTIVITY_METRICS.minSecondsPerBeat,
            LAYER_ACTIVITY_METRICS.maxSecondsPerBeat,
          );
        }
        this.lastBeatTime = item.time;
        this.lastBeatInBar = item.beatInBar;
      } else if (item.layer) {
        this.levels[item.layer] = Math.max(
          this.levels[item.layer],
          item.velocity,
        );
      }
    }
    if (now < this.lastBeatTime) this.lastBeatTime = now;
  }

  beatPhase(now: number): number {
    if (this.lastBeatTime === 0)
      return (now / LAYER_ACTIVITY_METRICS.idleBarSeconds) % 1;
    const sinceBeat = clamp(
      (now - this.lastBeatTime) / this.secondsPerBeat,
      0,
      1,
    );
    return (
      ((this.lastBeatInBar + sinceBeat) / LAYER_ACTIVITY_METRICS.beatsPerBar) %
      1
    );
  }
}
