import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import {
  randomSeed,
  surpriseSettings,
} from "@soundscape/engine/services/settings/surpriseSettings";
import { withSeedCharacter } from "@soundscape/engine/services/settings/withSeedCharacter";
import { APP_STRINGS } from "../../constants/app.strings";
import { textToSeed } from "../../utils/seedText.util";
import { NotifyService } from "../notify/NotifyService";
import type { ToastService } from "../toast/ToastService";

export class SeedService extends NotifyService {
  private locked = false;

  constructor(
    private readonly store: SettingsStore,
    private readonly toasts: ToastService,
  ) {
    super();
  }

  get isLocked(): boolean {
    return this.locked;
  }

  toggleLock(): void {
    this.locked = !this.locked;
    this.notify();
  }

  reroll(): void {
    if (this.locked) {
      this.toasts.show(APP_STRINGS.toastSeedLocked);
      return;
    }
    this.store.replace(withSeedCharacter(this.store.get(), randomSeed()));
  }

  applyText(text: string): void {
    const seed = textToSeed(text);
    if (seed === null) return;
    if (this.locked) {
      this.toasts.show(APP_STRINGS.toastSeedLocked);
      return;
    }
    this.store.replace(withSeedCharacter(this.store.get(), seed));
  }

  surprise(): void {
    this.store.replace(surpriseSettings(this.store.get(), this.locked));
  }
}
