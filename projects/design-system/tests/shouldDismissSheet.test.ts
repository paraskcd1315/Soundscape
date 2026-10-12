import { describe, expect, it } from "vitest";
import { shouldDismissSheet } from "../src/foundation/behaviours/utils/shouldDismissSheet.util";

describe("shouldDismissSheet", () => {
  it("dismisses after a drag past a quarter of the sheet", () => {
    expect(shouldDismissSheet(160, 0.1, 600)).toBe(true);
  });

  it("dismisses on a fast downward flick even when the drag is short", () => {
    expect(shouldDismissSheet(60, 1.2, 600)).toBe(true);
  });

  it("keeps the sheet on a fast upward flick even past a quarter", () => {
    expect(shouldDismissSheet(300, -1.2, 600)).toBe(false);
  });

  it("snaps back after a short, slow drag", () => {
    expect(shouldDismissSheet(80, 0.2, 600)).toBe(false);
  });

  it("never dismisses inside the touch slop", () => {
    expect(shouldDismissSheet(4, 3, 600)).toBe(false);
  });
});
