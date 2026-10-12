import { describe, expect, it } from "vitest";
import { secureUrl } from "./secureUrl.util";

describe("secureUrl", () => {
  it("moves an http page to https", () => {
    expect(
      secureUrl({
        href: "http://paraskcd.com/Soundscape/?s=abc",
        protocol: "http:",
        hostname: "paraskcd.com",
      }),
    ).toBe("https://paraskcd.com/Soundscape/?s=abc");
  });

  it("leaves an https page alone", () => {
    expect(
      secureUrl({
        href: "https://paraskcd.com/Soundscape/",
        protocol: "https:",
        hostname: "paraskcd.com",
      }),
    ).toBeNull();
  });

  it("leaves a local preview alone", () => {
    expect(
      secureUrl({
        href: "http://localhost:4173/",
        protocol: "http:",
        hostname: "localhost",
      }),
    ).toBeNull();
  });
});
