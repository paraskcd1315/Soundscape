import type { Ticker } from "../../application/transport/Ticker";
import { TRANSPORT_METRICS } from "../../application/transport/transportMetrics";

const WORKER_SOURCE = `
let timer = null;
onmessage = (message) => {
  if (message.data === 'start') {
    if (timer === null) timer = setInterval(() => postMessage(0), ${TRANSPORT_METRICS.tickMilliseconds});
  } else {
    clearInterval(timer);
    timer = null;
  }
};
`;

export class WorkerTicker implements Ticker {
  private worker: Worker | null = null;
  private url: string | null = null;
  private fallback: number | null = null;

  start(onTick: () => void): void {
    this.stop();
    try {
      this.url = URL.createObjectURL(
        new Blob([WORKER_SOURCE], { type: "text/javascript" }),
      );
      this.worker = new Worker(this.url);
      this.worker.onmessage = () => onTick();
      this.worker.postMessage("start");
    } catch {
      this.fallback = window.setInterval(
        onTick,
        TRANSPORT_METRICS.tickMilliseconds,
      );
    }
  }

  stop(): void {
    if (this.worker) {
      this.worker.postMessage("stop");
      this.worker.terminate();
      this.worker = null;
    }
    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
    if (this.fallback !== null) {
      window.clearInterval(this.fallback);
      this.fallback = null;
    }
  }
}
