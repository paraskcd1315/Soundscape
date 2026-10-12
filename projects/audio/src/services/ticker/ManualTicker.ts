import type { Ticker } from "@soundscape/engine/services/transport/types/Ticker";

export class ManualTicker implements Ticker {
  private onTick: (() => void) | null = null;

  start(onTick: () => void): void {
    this.onTick = onTick;
  }

  stop(): void {
    this.onTick = null;
  }

  tick(): void {
    this.onTick?.();
  }
}
