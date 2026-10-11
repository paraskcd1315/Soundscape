import { sanitizeSettings } from "@soundscape/engine/services/settings/sanitizeSettings";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { SafeStorage } from "./SafeStorage";
import { STORAGE_KEYS } from "../../constants/storageKeys.constants";

export class SessionRepository {
  constructor(private readonly storage: SafeStorage) {}

  load(): Settings | null {
    const text = this.storage.read(STORAGE_KEYS.session);
    if (!text) return null;
    try {
      return sanitizeSettings(JSON.parse(text));
    } catch {
      return null;
    }
  }

  save(settings: Settings): void {
    this.storage.write(STORAGE_KEYS.session, JSON.stringify(settings));
  }
}
