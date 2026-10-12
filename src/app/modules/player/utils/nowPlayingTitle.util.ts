import type { Settings } from "@soundscape/engine/models/Settings";
import { seedToText } from "../../../core/utils/seedText.util";
import { formatText } from "../../../shared/utils/format.util";
import { PLAYER_STRINGS } from "../constants/player.strings";

export function nowPlayingTitle(
  settings: Settings,
  presetName: string | undefined,
): string {
  return (
    presetName ??
    `${PLAYER_STRINGS.nowPlayingCustom} · ${formatText(PLAYER_STRINGS.seedTag, seedToText(settings.seed))}`
  );
}
