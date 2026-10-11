import type { Settings } from "../../../models/Settings";

export type SettingsListener = (settings: Settings, previous: Settings) => void;
