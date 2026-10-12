import type { Settings } from "@soundscape/engine/models/Settings";

export function changesMusic(previous: Settings, next: Settings): boolean {
  return (
    JSON.stringify({ ...previous, masterVolume: 0 }) !==
    JSON.stringify({ ...next, masterVolume: 0 })
  );
}
