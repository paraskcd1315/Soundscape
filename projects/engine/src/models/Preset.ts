import type { PresetOrigin } from './PresetOrigin';
import type { Settings } from './Settings';

export interface Preset {
  schemaVersion: number;
  id: string;
  name: string;
  origin: PresetOrigin;
  settings: Settings;
}
