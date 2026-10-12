import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import type { TimelineItem } from "@soundscape/engine/services/transport/types/TimelineItem";

export class OffsetTimeline extends EventTimeline {
  private from = -Infinity;
  private until = Infinity;

  constructor(
    private readonly target: EventTimeline,
    private readonly offset: number,
  ) {
    super();
  }

  acceptFrom(time: number): void {
    this.from = time;
  }

  acceptUntil(time: number): void {
    this.until = time;
  }

  override push(item: TimelineItem): void {
    const time = item.time + this.offset;
    if (time < this.from || time >= this.until) return;
    this.target.push({ ...item, time });
  }
}
