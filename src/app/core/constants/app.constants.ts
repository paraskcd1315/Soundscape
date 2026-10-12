export const APP_CONSTANTS = {
  shareParameter: "s=",
  exportFileName: "soundscape-presets.soundscape.json",
  sessionSaveDelayMilliseconds: 300,
  customPresetId: "",
  seedRadix: 36,
  seedMaxLength: 7,
  presetNameMaxLength: 60,
  fallbackStyle: "lofi",
} as const;

export const TOUCH_MEDIA_QUERY = "(pointer: coarse)";

export const SEED_TEXT_PATTERN = /^[0-9a-z]{1,7}$/;
