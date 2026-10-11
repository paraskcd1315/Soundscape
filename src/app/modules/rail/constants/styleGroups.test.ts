import { describe, expect, it } from "vitest";
import { STYLE_IDS } from "@soundscape/engine/constants/styleIds.constants";
import { STYLE_GROUPS } from "./styleGroups.constants";

describe("style picker groups", () => {
  it("lists every style exactly once", () => {
    const listed = STYLE_GROUPS.flatMap((group) => group.styleIds);
    expect(new Set(listed).size).toBe(listed.length);
    expect([...listed].sort()).toEqual([...STYLE_IDS].sort());
  });
});
