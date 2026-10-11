import "./stage-view.scss";
import { createElement } from "@soundscape/design-system/foundation/utils/createElement.util";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { Visualizer } from "@soundscape/visualizer/services/Visualizer";
import type { VisualizerSource } from "@soundscape/visualizer/types/VisualizerSource";
import { resolvePalette } from "@soundscape/visualizer/utils/resolvePalette.util";
import { STAGE_STRINGS } from "../../constants/stage.strings";
import { SHARED_STRINGS } from "../../../../shared/constants/shared.strings";

export class StageView {
  readonly canvas: HTMLCanvasElement;
  readonly title: HTMLElement;
  private readonly visualizer: Visualizer;

  constructor(store: SettingsStore, source: VisualizerSource) {
    const settings = store.get();
    this.canvas = createElement("canvas", "stage-view__canvas", {
      role: "img",
      "aria-label": STAGE_STRINGS.canvasLabel,
      "data-testid": "visualizer",
    });
    this.title = createElement(
      "h1",
      "stage-view__title",
      { "data-testid": "app-title" },
      SHARED_STRINGS.appName,
    );
    this.visualizer = new Visualizer(
      this.canvas,
      source,
      this.paletteFor(settings),
      settings.visualizerMode,
    );
    this.visualizer.setIntensity(settings.visualizerIntensity);
    store.subscribe((next) => this.render(next));
  }

  start(): void {
    this.visualizer.start();
  }

  private render(settings: Settings): void {
    this.visualizer.setMode(settings.visualizerMode);
    this.visualizer.setIntensity(settings.visualizerIntensity);
    this.visualizer.setPalette(this.paletteFor(settings));
  }

  private paletteFor(settings: Settings) {
    return resolvePalette(
      settings.visualizerTheme,
      settings.visualizerColors,
      STYLES[settings.styleId].palette,
    );
  }
}
