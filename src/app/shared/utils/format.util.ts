import type { Settings } from "@soundscape/engine/models/Settings";
import {
  KEY_NAMES,
  SCALE_NAMES,
  STYLE_NAMES,
} from "../constants/names.constants";
import { SHARED_STRINGS } from "../constants/shared.strings";

export function formatText(
  template: string,
  ...args: readonly (string | number)[]
): string {
  return args.reduce<string>(
    (text, value, index) => text.replace(`{${index}}`, String(value)),
    template,
  );
}

export function formatPercent(value: number): string {
  return formatText(SHARED_STRINGS.percent, Math.round(value * 100));
}

export function formatBpm(value: number): string {
  return formatText(SHARED_STRINGS.bpm, Math.round(value));
}

export function formatNowPlayingDetail(settings: Settings): string {
  return formatText(
    SHARED_STRINGS.nowPlayingDetail,
    STYLE_NAMES[settings.styleId],
    KEY_NAMES[settings.keyRoot] ?? "",
    SCALE_NAMES[settings.scaleId],
    Math.round(settings.tempo),
  );
}
