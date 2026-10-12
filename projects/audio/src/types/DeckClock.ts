import type { Ticker } from "@soundscape/engine/services/transport/types/Ticker";

export interface DeckClock {
  ticker: Ticker;
  inBackground: () => boolean;
}
