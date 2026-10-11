import type { KeyboardActions } from "./types/KeyboardActions";
import { isTypingTarget } from "./utils/isTypingTarget.util";

export class KeyboardService {
  constructor(private readonly actions: KeyboardActions) {}

  bind(): void {
    window.addEventListener("keydown", (event) => this.handle(event));
  }

  private handle(event: KeyboardEvent): void {
    if (
      isTypingTarget(event.target) ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey
    )
      return;
    if (event.code === "Space") {
      event.preventDefault();
      this.actions.togglePlayback();
    } else if (event.key === "r" || event.key === "R") {
      this.actions.newSeed();
    } else if (event.key === "a" || event.key === "A") {
      this.actions.toggleAdvanced();
    } else if (event.key === "ArrowRight") {
      this.actions.stepPreset(1);
    } else if (event.key === "ArrowLeft") {
      this.actions.stepPreset(-1);
    }
  }
}
