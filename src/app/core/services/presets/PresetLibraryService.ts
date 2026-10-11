import { PresetService } from "@soundscape/engine/services/presets/PresetService";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { Preset } from "@soundscape/engine/models/Preset";
import { APP_CONSTANTS } from "../../constants/app.constants";
import { APP_STRINGS } from "../../constants/app.strings";
import { downloadText } from "../../utils/downloadText.util";
import { formatText } from "../../../shared/utils/format.util";
import { NotifyService } from "../notify/NotifyService";
import { encodeShare } from "../share/ShareCodec";
import { LocalPresetRepository } from "../storage/LocalPresetRepository";
import type { SafeStorage } from "../storage/SafeStorage";
import type { ToastService } from "../toast/ToastService";

export class PresetLibraryService extends NotifyService {
  private readonly presets: PresetService;
  private selected: string = APP_CONSTANTS.customPresetId;
  private applying = false;

  constructor(
    private readonly store: SettingsStore,
    private readonly storage: SafeStorage,
    private readonly toasts: ToastService,
  ) {
    super();
    this.presets = new PresetService(new LocalPresetRepository(storage));
    store.subscribe(() => {
      if (this.applying || this.selected === APP_CONSTANTS.customPresetId)
        return;
      this.selected = APP_CONSTANTS.customPresetId;
      this.notify();
    });
  }

  get selectedId(): string {
    return this.selected;
  }

  get selectedPreset(): Preset | undefined {
    return this.presets.find(this.selected);
  }

  list(): Preset[] {
    return this.presets.list();
  }

  select(id: string): void {
    const preset = this.presets.find(id);
    if (!preset) {
      this.selected = APP_CONSTANTS.customPresetId;
      this.notify();
      return;
    }
    this.apply(preset.id, {
      ...preset.settings,
      masterVolume: this.store.get().masterVolume,
    });
  }

  step(direction: number): void {
    const all = this.presets.list();
    const index = all.findIndex((preset) => preset.id === this.selected);
    const next = all[(index + direction + all.length) % all.length];
    if (next) this.select(next.id);
  }

  save(name: string): void {
    const trimmed = name.trim();
    if (!trimmed) {
      this.toasts.show(APP_STRINGS.toastNameNeeded);
      return;
    }
    const saved = this.presets.saveUser(trimmed, this.store.get());
    this.apply(saved.id, saved.settings);
    this.toasts.show(formatText(APP_STRINGS.toastSaved, saved.name));
    if (!this.storage.isPersistent)
      this.toasts.show(APP_STRINGS.toastStorageOff);
  }

  deleteSelected(): void {
    const preset = this.selectedPreset;
    if (!preset || preset.origin !== "user") {
      this.toasts.show(APP_STRINGS.toastBuiltinLocked);
      return;
    }
    this.presets.remove(preset.id);
    this.selected = APP_CONSTANTS.customPresetId;
    this.notify();
    this.toasts.show(formatText(APP_STRINGS.toastDeleted, preset.name));
  }

  async copyShareLink(): Promise<void> {
    const url = `${window.location.origin}${window.location.pathname}#${APP_CONSTANTS.shareParameter}${encodeShare(this.store.get())}`;
    try {
      await navigator.clipboard.writeText(url);
      this.toasts.show(APP_STRINGS.toastLinkCopied);
    } catch {
      this.toasts.show(APP_STRINGS.toastLinkFailed);
    }
  }

  exportAll(): void {
    const user = this.presets
      .list()
      .filter((preset) => preset.origin === "user");
    const entries: Preset[] =
      user.length > 0
        ? user
        : [
            {
              schemaVersion: 1,
              id: "current",
              name: APP_STRINGS.exportCurrentName,
              origin: "user",
              settings: this.store.get(),
            },
          ];
    downloadText(
      APP_CONSTANTS.exportFileName,
      this.presets.exportFile(entries),
    );
  }

  async importFile(file: File): Promise<void> {
    const outcome = this.presets.importFile(await file.text());
    this.toasts.show(
      outcome.added > 0
        ? formatText(APP_STRINGS.toastImported, outcome.added)
        : APP_STRINGS.toastImportFailed,
    );
    this.notify();
  }

  private apply(id: string, settings: Preset["settings"]): void {
    this.applying = true;
    this.selected = id;
    this.store.replace(settings);
    this.applying = false;
    this.notify();
  }
}
