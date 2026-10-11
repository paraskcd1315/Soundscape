import { SsStageLayout } from "@soundscape/design-system/layouts/ss-stage-layout/SsStageLayout";
import { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { APP_STRINGS } from "./core/constants/app.strings";
import { KeyboardService } from "./core/services/keyboard/KeyboardService";
import { PlaybackService } from "./core/services/playback/PlaybackService";
import { PresetLibraryService } from "./core/services/presets/PresetLibraryService";
import { SeedService } from "./core/services/seed/SeedService";
import { SessionService } from "./core/services/session/SessionService";
import { SafeStorage } from "./core/services/storage/SafeStorage";
import { ToastService } from "./core/services/toast/ToastService";
import { AdvancedDrawer } from "./modules/advanced/components/advanced-drawer/AdvancedDrawer";
import { PlayerFooter } from "./modules/player/components/player-footer/PlayerFooter";
import { ActionRail } from "./modules/rail/components/action-rail/ActionRail";
import { StageView } from "./modules/stage/components/stage-view/StageView";

export class App {
  constructor(root: HTMLElement) {
    const storage = new SafeStorage();
    const session = new SessionService(storage);
    const initial = session.initial();
    const store = new SettingsStore(initial.settings);
    session.persist(store);

    const toasts = new ToastService();
    const playback = new PlaybackService(store, toasts);
    const seeds = new SeedService(store, toasts);
    const presets = new PresetLibraryService(store, storage, toasts);

    const layout = new SsStageLayout();
    const stage = new StageView(store, playback.visualizerSource);
    const rail = new ActionRail(store, seeds);
    const advanced = new AdvancedDrawer(store, seeds, presets);
    const player = new PlayerFooter(store, playback, presets, () =>
      advanced.toggle(),
    );

    layout.stage.append(stage.canvas);
    layout.heading.append(stage.title);
    layout.overlay.append(rail.element, player.element);
    root.append(
      layout.element,
      rail.menu.element,
      advanced.element,
      toasts.toast.element,
    );

    new KeyboardService({
      togglePlayback: () => void playback.toggle(),
      newSeed: () => seeds.reroll(),
      toggleAdvanced: () => advanced.toggle(),
      stepPreset: (direction) => presets.step(direction),
    }).bind();

    stage.start();
    if (initial.fromShare) toasts.show(APP_STRINGS.toastSharedLoaded);
  }
}
