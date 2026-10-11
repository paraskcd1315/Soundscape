import { PresetService } from "../../application/presets/PresetService";
import { defaultSettingsFor } from "../../application/settings/defaultSettingsFor";
import { SettingsStore } from "../../application/settings/SettingsStore";
import {
  randomSeed,
  surpriseSettings,
} from "../../application/settings/surpriseSettings";
import { Player } from "../../data/audio/Player";
import { decodeShare, encodeShare } from "../../data/share/ShareCodec";
import { LocalPresetRepository } from "../../data/storage/LocalPresetRepository";
import { SafeStorage } from "../../data/storage/SafeStorage";
import { SessionRepository } from "../../data/storage/SessionRepository";
import { STYLE_IDS } from "../../domain/model/StyleId";
import type { Preset } from "../../domain/model/Preset";
import type { Settings } from "../../domain/model/Settings";
import { VISUALIZER_MODE_IDS } from "../../domain/model/VisualizerModeId";
import { STYLES } from "../../styles/styleCatalog";
import { createButton } from "../controls/createButton";
import { createNameDialog } from "../controls/createNameDialog";
import { createSelect } from "../controls/createSelect";
import { createSlider } from "../controls/createSlider";
import { createToast } from "../controls/createToast";
import { el } from "../controls/dom";
import { STYLE_NAMES, VISUALIZER_MODE_NAMES } from "../i18n/names";
import { t } from "../i18n/t";
import { Visualizer } from "../visualizer/Visualizer";
import { downloadText } from "./downloadText";
import { formatSliderValue } from "./formatSliderValue";
import { seedToText, textToSeed } from "./seedText";
import { createSettingsPanel } from "./SettingsPanel";

const SAVE_DELAY_MILLISECONDS = 300;
const CUSTOM_PRESET_VALUE = "";
const SHARE_PARAMETER = "s=";
const EXPORT_FILE_NAME = "soundscape-presets.soundscape.json";

export class App {
  private readonly storage = new SafeStorage();
  private readonly session = new SessionRepository(this.storage);
  private readonly presets = new PresetService(
    new LocalPresetRepository(this.storage),
  );
  private readonly store: SettingsStore;
  private readonly player: Player;
  private readonly toast = createToast();
  private readonly nameDialog = createNameDialog();
  private visualizer!: Visualizer;
  private selectedPresetId = CUSTOM_PRESET_VALUE;
  private seedLocked = false;
  private saveTimer = 0;
  private applyingPreset = false;
  private hasStarted = false;
  private syncPlayback: () => void = () => undefined;

  constructor(private readonly root: HTMLElement) {
    const shared = this.readSharedSettings();
    this.store = new SettingsStore(
      shared ?? this.session.load() ?? defaultSettingsFor("lofi"),
    );
    this.player = new Player(this.store);
    this.build();
    if (shared) this.toast.show(t("toastSharedLoaded"));
    if (!this.storage.isPersistent) this.toast.show(t("toastStorageOff"));
  }

  private build(): void {
    const settings = this.store.get();

    const canvas = el("canvas", "stage__canvas", { "aria-hidden": "true" });
    const playButton = el(
      "button",
      "stage__play",
      { type: "button", "aria-label": t("play") },
      t("play"),
    );
    const intro = el(
      "div",
      "stage__intro",
      {},
      el("h1", "stage__title", {}, t("appName")),
      el("p", "stage__tagline", {}, t("tagline")),
      playButton,
      el("p", "stage__hint", {}, t("introHint")),
    );
    const stage = el("main", "stage", {}, canvas, intro);

    const styleSelect = createSelect({
      id: "style",
      label: t("style"),
      options: STYLE_IDS.map((id) => ({ value: id, label: STYLE_NAMES[id] })),
      value: settings.styleId,
      onChange: (value) => this.store.setStyle(value as Settings["styleId"]),
    });
    const seedInput = el("input", "seed__input", {
      id: "seed",
      type: "text",
      inputmode: "text",
      autocomplete: "off",
      spellcheck: "false",
      maxlength: "7",
    });
    seedInput.addEventListener("change", () => {
      const parsed = textToSeed(seedInput.value);
      if (this.seedLocked) this.toast.show(t("toastSeedLocked"));
      else if (parsed !== null) this.store.update({ seed: parsed });
      seedInput.value = seedToText(this.store.get().seed);
    });
    const seedLabel = el("label", "seed__label", { for: "seed" }, t("seed"));
    const lockButton = createButton({
      label: t("lockSeed"),
      text: "🔓",
      className: "button--icon",
      onClick: () => {
        this.seedLocked = !this.seedLocked;
        lockButton.textContent = this.seedLocked ? "🔒" : "🔓";
        lockButton.setAttribute("aria-pressed", String(this.seedLocked));
        lockButton.title = this.seedLocked ? t("unlockSeed") : t("lockSeed");
      },
    });
    const diceButton = createButton({
      label: t("newSeed"),
      text: "🎲",
      className: "button--icon",
      onClick: () => this.rerollSeed(),
    });
    const surpriseButton = createButton({
      label: t("surprise"),
      className: "button--accent",
      onClick: () =>
        this.store.replace(surpriseSettings(this.store.get(), this.seedLocked)),
    });
    const header = el(
      "header",
      "topbar",
      {},
      el("span", "topbar__brand", {}, t("appName")),
      styleSelect.element,
      el("div", "seed", {}, seedLabel, seedInput, diceButton, lockButton),
      surpriseButton,
    );

    const panel = createSettingsPanel(this.store);
    const details = el(
      "details",
      "panel",
      { open: "" },
      el("summary", "panel__summary", {}, t("settings")),
      panel.element,
    );

    const toggleButton = createButton({
      label: t("play"),
      className: "button--play",
      onClick: () => void this.togglePlayback(),
    });
    const volume = createSlider({
      id: "volume",
      label: t("volume"),
      min: 0,
      max: 1,
      step: 0.01,
      value: settings.masterVolume,
      format: (value) => formatSliderValue({ unit: "percent" }, value),
      onInput: (value) => this.store.update({ masterVolume: value }),
    });
    const presetSelect = createSelect({
      id: "preset",
      label: t("preset"),
      options: [],
      value: CUSTOM_PRESET_VALUE,
      onChange: (value) => this.loadPreset(value),
    });
    const saveButton = createButton({
      label: t("savePreset"),
      text: "💾",
      className: "button--icon",
      onClick: () => void this.savePreset(),
    });
    const deleteButton = createButton({
      label: t("deletePreset"),
      text: "🗑",
      className: "button--icon",
      onClick: () => this.deletePreset(),
    });
    const shareButton = createButton({
      label: t("sharePreset"),
      text: "🔗",
      className: "button--icon",
      onClick: () => void this.copyShareLink(),
    });
    const exportButton = createButton({
      label: t("exportPresets"),
      text: "⬇",
      className: "button--icon",
      onClick: () => this.exportPresets(),
    });
    const importInput = el("input", "visually-hidden", {
      type: "file",
      accept: ".json,application/json",
      "aria-label": t("importPresets"),
    });
    importInput.addEventListener(
      "change",
      () => void this.importPresets(importInput),
    );
    const importButton = createButton({
      label: t("importPresets"),
      text: "⬆",
      className: "button--icon",
      onClick: () => importInput.click(),
    });
    const vizSelect = createSelect({
      id: "viz",
      label: t("visualizer"),
      options: VISUALIZER_MODE_IDS.map((id) => ({
        value: id,
        label: VISUALIZER_MODE_NAMES[id],
      })),
      value: settings.visualizerMode,
      onChange: (value) =>
        this.store.update({
          visualizerMode: value as Settings["visualizerMode"],
        }),
    });
    const fullscreenButton = createButton({
      label: t("fullscreen"),
      text: "⛶",
      className: "button--icon",
      onClick: () => void this.toggleFullscreen(stage),
    });

    const transport = el(
      "section",
      "transport",
      {},
      toggleButton,
      volume.element,
      presetSelect.element,
      el(
        "div",
        "transport__actions",
        {},
        saveButton,
        deleteButton,
        shareButton,
        exportButton,
        importButton,
        importInput,
      ),
      vizSelect.element,
      fullscreenButton,
    );

    this.root.replaceChildren(
      header,
      stage,
      transport,
      details,
      this.toast.element,
      this.nameDialog.element,
    );

    this.visualizer = new Visualizer(
      canvas,
      {
        analyser: () => this.player.analyser(),
        currentTime: () => this.player.currentTime(),
        timeline: this.player.timeline,
      },
      STYLES[settings.styleId].palette,
      settings.visualizerMode,
    );
    this.visualizer.setIntensity(settings.visualizerIntensity);
    this.visualizer.start();

    const refreshPresets = (): void => {
      const all = this.presets.list();
      const builtin = all.filter((preset) => preset.origin === "builtin");
      const user = all.filter((preset) => preset.origin === "user");
      presetSelect.select.replaceChildren(
        el("option", "", { value: CUSTOM_PRESET_VALUE }, t("presetCustom")),
        this.group(t("presetBuiltinGroup"), builtin),
        ...(user.length > 0 ? [this.group(t("presetUserGroup"), user)] : []),
      );
      presetSelect.set(this.selectedPresetId);
      deleteButton.disabled =
        this.presets.find(this.selectedPresetId)?.origin !== "user";
    };

    const reflect = (current: Settings, previous: Settings | null): void => {
      styleSelect.set(current.styleId);
      if (document.activeElement !== seedInput)
        seedInput.value = seedToText(current.seed);
      vizSelect.set(current.visualizerMode);
      volume.set(current.masterVolume);
      panel.sync(current);
      const style = STYLES[current.styleId];
      this.visualizer.setPalette(style.palette);
      this.visualizer.setMode(current.visualizerMode);
      this.visualizer.setIntensity(current.visualizerIntensity);
      this.root.style.setProperty("--accent", style.palette.accents.melody);
      this.root.style.setProperty("--accent-deep", style.palette.accents.bass);
      this.root.style.setProperty("--surface-top", style.palette.backgroundTop);
      this.root.style.setProperty(
        "--surface-bottom",
        style.palette.backgroundBottom,
      );
      if (previous && !this.applyingPreset)
        this.selectedPresetId = CUSTOM_PRESET_VALUE;
      refreshPresets();
      window.clearTimeout(this.saveTimer);
      this.saveTimer = window.setTimeout(
        () => this.session.save(current),
        SAVE_DELAY_MILLISECONDS,
      );
    };

    this.store.subscribe(reflect);
    reflect(settings, null);

    const syncPlayback = (): void => {
      const label = this.player.isPlaying ? t("pause") : t("play");
      toggleButton.textContent = this.player.isPlaying ? "⏸" : "▶";
      toggleButton.setAttribute("aria-label", label);
      toggleButton.title = label;
      toggleButton.setAttribute("aria-pressed", String(this.player.isPlaying));
      intro.classList.toggle(
        "stage__intro--hidden",
        this.player.isPlaying || this.hasStarted,
      );
    };
    this.syncPlayback = syncPlayback;
    playButton.addEventListener("click", () => void this.togglePlayback());
    canvas.addEventListener("click", () => void this.togglePlayback());
    syncPlayback();

    window.addEventListener("keydown", (event) => this.onKey(event, stage));
  }

  private group(
    label: string,
    presets: readonly Preset[],
  ): HTMLOptGroupElement {
    const group = el("optgroup", "", { label });
    for (const preset of presets)
      group.append(el("option", "", { value: preset.id }, preset.name));
    return group;
  }

  private readSharedSettings(): Settings | null {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash.startsWith(SHARE_PARAMETER)) return null;
    const decoded = decodeShare(hash.slice(SHARE_PARAMETER.length));
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
    return decoded;
  }

  private async togglePlayback(): Promise<void> {
    try {
      if (this.player.isPlaying) await this.player.pause();
      else {
        await this.player.play();
        this.hasStarted = true;
      }
    } catch {
      this.toast.show(t("toastAudioFailed"));
    }
    this.syncPlayback();
  }

  private rerollSeed(): void {
    if (this.seedLocked) {
      this.toast.show(t("toastSeedLocked"));
      return;
    }
    this.store.update({ seed: randomSeed() });
  }

  private loadPreset(id: string): void {
    const preset = this.presets.find(id);
    if (!preset) {
      this.selectedPresetId = CUSTOM_PRESET_VALUE;
      return;
    }
    this.applyingPreset = true;
    this.selectedPresetId = preset.id;
    this.store.replace({
      ...preset.settings,
      masterVolume: this.store.get().masterVolume,
    });
    this.applyingPreset = false;
  }

  private async savePreset(): Promise<void> {
    const current = this.presets.find(this.selectedPresetId);
    const name = await this.nameDialog.ask(
      current?.origin === "user" ? current.name : "",
    );
    if (!name) return;
    const saved = this.presets.saveUser(name, this.store.get());
    this.applyingPreset = true;
    this.selectedPresetId = saved.id;
    this.store.replace(saved.settings);
    this.applyingPreset = false;
    this.toast.show(t("toastSaved", saved.name));
    if (!this.storage.isPersistent) this.toast.show(t("toastStorageOff"));
  }

  private deletePreset(): void {
    const preset = this.presets.find(this.selectedPresetId);
    if (!preset || preset.origin !== "user") {
      this.toast.show(t("toastBuiltinLocked"));
      return;
    }
    this.presets.remove(preset.id);
    this.selectedPresetId = CUSTOM_PRESET_VALUE;
    this.store.replace(this.store.get());
    this.toast.show(t("toastDeleted", preset.name));
  }

  private async copyShareLink(): Promise<void> {
    const url = `${window.location.origin}${window.location.pathname}#${SHARE_PARAMETER}${encodeShare(this.store.get())}`;
    try {
      await navigator.clipboard.writeText(url);
      this.toast.show(t("toastLinkCopied"));
    } catch {
      this.toast.show(t("toastLinkFailed"));
    }
  }

  private exportPresets(): void {
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
              name: t("exportEmptyName"),
              origin: "user",
              settings: this.store.get(),
            },
          ];
    downloadText(EXPORT_FILE_NAME, this.presets.exportFile(entries));
  }

  private async importPresets(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    const outcome = this.presets.importFile(await file.text());
    this.toast.show(
      outcome.added > 0
        ? t("toastImported", outcome.added)
        : t("toastImportFailed"),
    );
    this.store.replace(this.store.get());
  }

  private async toggleFullscreen(stage: HTMLElement): Promise<void> {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await stage.requestFullscreen();
  }

  private onKey(event: KeyboardEvent, stage: HTMLElement): void {
    const target = event.target as HTMLElement | null;
    if (
      target &&
      (target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA")
    )
      return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.code === "Space") {
      event.preventDefault();
      void this.togglePlayback();
    } else if (event.key === "f" || event.key === "F") {
      void this.toggleFullscreen(stage);
    } else if (event.key === "r" || event.key === "R") {
      this.rerollSeed();
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      this.stepPreset(event.key === "ArrowRight" ? 1 : -1);
    }
  }

  private stepPreset(direction: number): void {
    const all = this.presets.list();
    const index = all.findIndex(
      (preset) => preset.id === this.selectedPresetId,
    );
    const next = all[(index + direction + all.length) % all.length];
    if (next) this.loadPreset(next.id);
  }
}
