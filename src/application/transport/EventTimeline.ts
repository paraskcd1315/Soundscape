import { TRANSPORT_METRICS } from "./transportMetrics";
import type { TimelineItem } from "./TimelineItem";

export class EventTimeline {
  private items: TimelineItem[] = [];

  push(item: TimelineItem): void {
    this.items.push(item);
    if (this.items.length > TRANSPORT_METRICS.timelineLimit) {
      this.items.splice(0, this.items.length - TRANSPORT_METRICS.timelineLimit);
    }
  }

  takeDue(now: number): TimelineItem[] {
    let count = 0;
    while (
      count < this.items.length &&
      (this.items[count] as TimelineItem).time <= now
    )
      count++;
    return count === 0 ? [] : this.items.splice(0, count);
  }

  clear(): void {
    this.items = [];
  }
}
