import type { LayerKind } from "../../domain/model/LayerKind";
import type { LayerMix } from "../../domain/model/LayerMix";
import type { Settings } from "../../domain/model/Settings";
import type { StyleId } from "../../domain/model/StyleId";
import { sanitizeSettings } from "./sanitizeSettings";
import { withStyle } from "./withStyle";

export type SettingsListener = (settings: Settings, previous: Settings) => void;

export class SettingsStore {
  private current: Settings;
  private readonly listeners = new Set<SettingsListener>();

  constructor(initial: Settings) {
    this.current = initial;
  }

  get(): Settings {
    return this.current;
  }

  update(patch: Partial<Settings>): void {
    this.commit(
      sanitizeSettings({ ...this.current, ...patch }, this.current.styleId),
    );
  }

  updateLayer(kind: LayerKind, patch: Partial<LayerMix>): void {
    this.update({
      layers: {
        ...this.current.layers,
        [kind]: { ...this.current.layers[kind], ...patch },
      },
    });
  }

  setStyle(styleId: StyleId): void {
    this.commit(sanitizeSettings(withStyle(this.current, styleId), styleId));
  }

  replace(settings: Settings): void {
    this.commit(sanitizeSettings(settings, settings.styleId));
  }

  subscribe(listener: SettingsListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private commit(next: Settings): void {
    const previous = this.current;
    this.current = next;
    this.listeners.forEach((listener) => listener(next, previous));
  }
}
