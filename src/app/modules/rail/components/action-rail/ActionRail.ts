import { SsIconButton } from "@soundscape/design-system/atoms/ss-icon-button/SsIconButton";
import { SsFloatingRail } from "@soundscape/design-system/organisms/ss-floating-rail/SsFloatingRail";
import { SsMenu } from "@soundscape/design-system/organisms/ss-menu/SsMenu";
import type { StyleId } from "@soundscape/engine/models/StyleId";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import type { SeedService } from "../../../../core/services/seed/SeedService";
import type { DjMixService } from "../../../../core/services/djMix/DjMixService";
import { STYLE_NAMES } from "../../../../shared/constants/names.constants";
import { formatText } from "../../../../shared/utils/format.util";
import { RAIL_STRINGS } from "../../constants/rail.strings";
import { STYLE_GROUPS } from "../../constants/styleGroups.constants";

export class ActionRail {
  readonly element: HTMLElement;
  readonly menu: SsMenu;
  private readonly styleButton: SsIconButton;
  private readonly lockButton: SsIconButton;
  private readonly mixButton: SsIconButton;

  constructor(
    private readonly store: SettingsStore,
    private readonly seeds: SeedService,
    private readonly djMix: DjMixService,
  ) {
    const rail = new SsFloatingRail(RAIL_STRINGS.railLabel);
    this.menu = new SsMenu({
      label: RAIL_STRINGS.styleMenu,
      groups: STYLE_GROUPS.map((group) => ({
        label: group.label,
        choices: group.styleIds.map((id) => ({
          value: id,
          label: STYLE_NAMES[id],
        })),
      })),
      value: store.get().styleId,
      onSelect: (value) => store.setStyle(value as StyleId),
    });
    this.styleButton = new SsIconButton({
      icon: "music",
      label: "",
      size: "lg",
      testId: "style-button",
      onClick: () => this.menu.toggle(this.styleButton.element),
    });
    this.styleButton.element.setAttribute("aria-haspopup", "menu");
    const surprise = new SsIconButton({
      icon: "sparkles",
      label: RAIL_STRINGS.surprise,
      size: "lg",
      accent: true,
      testId: "surprise-button",
      onClick: () => seeds.surprise(),
    });
    const reroll = new SsIconButton({
      icon: "dice",
      label: RAIL_STRINGS.newSeed,
      size: "lg",
      testId: "new-seed-button",
      onClick: () => seeds.reroll(),
    });
    this.lockButton = new SsIconButton({
      icon: "unlock",
      label: RAIL_STRINGS.lockSeed,
      size: "lg",
      testId: "lock-seed-button",
      onClick: () => seeds.toggleLock(),
    });
    this.mixButton = new SsIconButton({
      icon: "shuffle",
      label: RAIL_STRINGS.djMixOn,
      size: "lg",
      testId: "dj-mix-button",
      onClick: () => djMix.toggle(),
    });
    rail.append(
      this.styleButton.element,
      surprise.element,
      reroll.element,
      this.lockButton.element,
      this.mixButton.element,
    );
    this.element = rail.element;
    store.subscribe(() => this.render());
    seeds.subscribe(() => this.render());
    djMix.subscribe(() => this.render());
    this.render();
  }

  private render(): void {
    const styleId = this.store.get().styleId;
    this.menu.set(styleId);
    this.styleButton.setLabel(
      formatText(RAIL_STRINGS.styleButton, STYLE_NAMES[styleId]),
    );
    const locked = this.seeds.isLocked;
    this.lockButton.setIcon(locked ? "lock" : "unlock");
    this.lockButton.setLabel(
      locked ? RAIL_STRINGS.unlockSeed : RAIL_STRINGS.lockSeed,
    );
    this.lockButton.setPressed(locked);
    const mixing = this.djMix.isEnabled;
    this.mixButton.setPressed(mixing);
    this.mixButton.setLabel(
      mixing ? RAIL_STRINGS.djMixOff : RAIL_STRINGS.djMixOn,
    );
  }
}
