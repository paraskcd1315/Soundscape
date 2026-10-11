import type { Settings } from "@soundscape/engine/models/Settings";

export interface InitialSession {
  settings: Settings;
  fromShare: boolean;
}
