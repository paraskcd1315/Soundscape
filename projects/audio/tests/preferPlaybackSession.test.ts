import { describe, expect, it } from "vitest";
import { preferPlaybackSession } from "../src/utils/preferPlaybackSession.util";
import { AUDIO_SESSION_PLAYBACK } from "../src/constants/audioSession.constants";

describe("preferPlaybackSession", () => {
  it("sets the session type to playback where the browser has an audio session", () => {
    const target = { audioSession: { type: "auto" } };
    preferPlaybackSession(target);
    expect(target.audioSession.type).toBe(AUDIO_SESSION_PLAYBACK);
  });

  it("does nothing where the browser has no audio session", () => {
    expect(() => preferPlaybackSession({})).not.toThrow();
  });
});
