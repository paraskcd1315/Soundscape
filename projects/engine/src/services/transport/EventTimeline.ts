import { TRANSPORT_METRICS } from "./constants/transport.constants";
import type { TimelineItem } from "./types/TimelineItem";

export class EventTimeline {
  private items: TimelineItem[] = [];

  push(item: TimelineItem): void {
    let index = this.items.length;
    while (
      index > 0 &&
      (this.items[index - 1] as TimelineItem).time > item.time
    )
      index--;
    this.items.splice(index, 0, item);
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

  dropFrom(time: number): void {
    this.items = this.items.filter((item) => item.time < time);
  }
}
