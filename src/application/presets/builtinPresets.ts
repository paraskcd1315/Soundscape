import type { Preset } from "../../domain/model/Preset";
import type { Settings } from "../../domain/model/Settings";
import type { StyleId } from "../../domain/model/StyleId";
import { defaultSettingsFor } from "../settings/defaultSettingsFor";
import { sanitizeSettings } from "../settings/sanitizeSettings";
import { SETTINGS_METRICS } from "../settings/settingsMetrics";

function builtin(
  id: string,
  name: string,
  styleId: StyleId,
  seed: number,
  overrides: Partial<Settings>,
): Preset {
  return {
    schemaVersion: SETTINGS_METRICS.presetSchemaVersion,
    id: `builtin-${id}`,
    name,
    origin: "builtin",
    settings: sanitizeSettings(
      { ...defaultSettingsFor(styleId, seed), ...overrides },
      styleId,
    ),
  };
}

export const BUILTIN_PRESETS: readonly Preset[] = [
  builtin("ambient-deep-drift", "Deep Drift", "ambient", 1001, {
    keyRoot: 2,
    scaleId: "lydian",
    energy: 0.35,
    density: 0.35,
    reverb: 0.92,
    tempo: 56,
  }),
  builtin("ambient-aurora", "Aurora", "ambient", 1002, {
    keyRoot: 7,
    scaleId: "dorian",
    energy: 0.6,
    density: 0.5,
    brightness: 0.72,
    tempo: 70,
    visualizerMode: "flow",
  }),
  builtin("lofi-rainy-study", "Rainy Study", "lofi", 2001, {
    keyRoot: 9,
    scaleId: "dorian",
    energy: 0.4,
    swing: 0.6,
    tempo: 72,
  }),
  builtin("lofi-late-night-bus", "Late Night Bus", "lofi", 2002, {
    keyRoot: 5,
    scaleId: "minor",
    energy: 0.62,
    density: 0.6,
    tempo: 84,
  }),
  builtin("techno-warehouse", "Warehouse", "techno", 3001, {
    keyRoot: 0,
    scaleId: "minor",
    energy: 0.72,
    tempo: 128,
    visualizerMode: "bars",
  }),
  builtin("techno-dark-room", "Dark Room", "techno", 3002, {
    keyRoot: 6,
    scaleId: "phrygian",
    energy: 0.5,
    brightness: 0.45,
    tempo: 124,
  }),
  builtin("chiptune-level-one", "Level One", "chiptune", 4001, {
    keyRoot: 0,
    scaleId: "major",
    energy: 0.7,
    tempo: 140,
    visualizerMode: "bars",
  }),
  builtin("chiptune-boss-rush", "Boss Rush", "chiptune", 4002, {
    keyRoot: 9,
    scaleId: "minor",
    energy: 0.9,
    complexity: 0.7,
    tempo: 160,
  }),
  builtin("jazz-blue-hour", "Blue Hour", "jazz", 5001, {
    keyRoot: 2,
    scaleId: "dorian",
    energy: 0.35,
    swing: 0.85,
    tempo: 96,
  }),
  builtin("jazz-uptown", "Uptown", "jazz", 5002, {
    keyRoot: 7,
    scaleId: "mixolydian",
    energy: 0.6,
    complexity: 0.7,
    tempo: 126,
  }),
];
