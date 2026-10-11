export interface Ticker {
  start(onTick: () => void): void;
  stop(): void;
}
