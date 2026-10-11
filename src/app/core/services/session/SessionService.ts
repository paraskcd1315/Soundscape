import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { Settings } from "@soundscape/engine/models/Settings";
import { APP_CONSTANTS } from "../../constants/app.constants";
import { decodeShare } from "../share/ShareCodec";
import { SessionRepository } from "../storage/SessionRepository";
import type { SafeStorage } from "../storage/SafeStorage";
import type { InitialSession } from "./types/InitialSession";

export class SessionService {
  private readonly repository: SessionRepository;
  private saveTimer = 0;

  constructor(storage: SafeStorage) {
    this.repository = new SessionRepository(storage);
  }

  initial(): InitialSession {
    const shared = this.readSharedSettings();
    if (shared) return { settings: shared, fromShare: true };
    return {
      settings:
        this.repository.load() ??
        defaultSettingsFor(APP_CONSTANTS.fallbackStyle),
      fromShare: false,
    };
  }

  persist(store: SettingsStore): void {
    store.subscribe((settings) => {
      window.clearTimeout(this.saveTimer);
      this.saveTimer = window.setTimeout(
        () => this.repository.save(settings),
        APP_CONSTANTS.sessionSaveDelayMilliseconds,
      );
    });
    window.addEventListener("pagehide", () => {
      window.clearTimeout(this.saveTimer);
      this.repository.save(store.get());
    });
  }

  private readSharedSettings(): Settings | null {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash.startsWith(APP_CONSTANTS.shareParameter)) return null;
    const decoded = decodeShare(
      hash.slice(APP_CONSTANTS.shareParameter.length),
    );
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    return decoded;
  }
}
