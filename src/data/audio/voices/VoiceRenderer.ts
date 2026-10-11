import type { VoiceRig } from "./VoiceRig";
import type { VoiceSpec } from "./VoiceSpec";

export type VoiceRenderer = (rig: VoiceRig, spec: VoiceSpec) => number;
