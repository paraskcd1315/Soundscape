import { sanitizeSettings } from "@soundscape/engine/services/settings/sanitizeSettings";
import type { Settings } from "@soundscape/engine/models/Settings";

const VERSION = 1;

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(code: string): string {
  const padded = code
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(code.length / 4) * 4, "=");
  const binary = atob(padded);
  return new TextDecoder().decode(
    Uint8Array.from(binary, (character) => character.charCodeAt(0)),
  );
}

export function encodeShare(settings: Settings): string {
  return toBase64Url(JSON.stringify({ v: VERSION, s: settings }));
}

export function decodeShare(code: string): Settings | null {
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(code));
    if (typeof parsed !== "object" || parsed === null) return null;
    const envelope = parsed as { v?: unknown; s?: unknown };
    if (
      envelope.v !== VERSION ||
      typeof envelope.s !== "object" ||
      envelope.s === null
    )
      return null;
    return sanitizeSettings(envelope.s);
  } catch {
    return null;
  }
}
