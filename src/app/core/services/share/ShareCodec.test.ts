import { describe, expect, it } from "vitest";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { decodeShare, encodeShare } from "./ShareCodec";

describe("ShareCodec", () => {
  it("round-trips settings", () => {
    const settings = {
      ...defaultSettingsFor("chiptune", 123456),
      tempo: 150,
      keyRoot: 7,
    };
    expect(decodeShare(encodeShare(settings))).toEqual(settings);
  });

  it("refuses junk", () => {
    expect(decodeShare("%%%")).toBeNull();
    expect(decodeShare(btoa('{"v":2,"s":{}}'))).toBeNull();
  });
});
