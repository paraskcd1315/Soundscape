export const DRUM_VOICE_IDS = [
  "kick",
  "snare",
  "clap",
  "hat",
  "openHat",
  "ride",
  "perc",
  "shaker",
  "rim",
  "brush",
] as const;

export const TONAL_VOICE_IDS = [
  "pad",
  "epiano",
  "bell",
  "subBass",
  "sawBass",
  "stab",
  "pulse",
  "triangle",
  "upright",
  "rhodes",
  "vibes",
  "organ",
  "strings",
  "kalimba",
  "softLead",
] as const;

export const TEXTURE_VOICE_IDS = ["swell", "crackle"] as const;

export type DrumVoiceId = (typeof DRUM_VOICE_IDS)[number];
export type TonalVoiceId = (typeof TONAL_VOICE_IDS)[number];
export type TextureVoiceId = (typeof TEXTURE_VOICE_IDS)[number];
export type VoiceId = DrumVoiceId | TonalVoiceId | TextureVoiceId;
