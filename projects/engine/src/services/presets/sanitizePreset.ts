import type { Preset } from "../../models/Preset";
import { sanitizeSettings } from "../settings/sanitizeSettings";
import { SETTINGS_METRICS } from "../settings/constants/settings.constants";

export function sanitizePreset(raw: unknown): Preset | null {
  if (typeof raw !== "object" || raw === null) return null;
  const source = raw as Record<string, unknown>;
  if (typeof source.name !== "string") return null;
  const name = source.name
    .trim()
    .slice(0, SETTINGS_METRICS.presetNameMaxLength);
  if (name.length === 0) return null;
  if (
    typeof source.schemaVersion === "number" &&
    source.schemaVersion > SETTINGS_METRICS.presetSchemaVersion
  )
    return null;
  const settings = sanitizeSettings(source.settings);
  const id =
    typeof source.id === "string" && source.id.length > 0
      ? source.id
      : `user-${Date.now().toString(36)}`;
  return {
    schemaVersion: SETTINGS_METRICS.presetSchemaVersion,
    id,
    name,
    origin: "user",
    settings,
  };
}
