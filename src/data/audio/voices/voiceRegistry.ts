import type { VoiceId } from "../../../domain/model/VoiceId";
import { bellVoice } from "./bellVoice";
import { clapVoice } from "./clapVoice";
import { crackleVoice } from "./crackleVoice";
import { epianoVoice } from "./epianoVoice";
import { hatVoice } from "./hatVoice";
import { kickVoice } from "./kickVoice";
import { openHatVoice } from "./openHatVoice";
import { padVoice } from "./padVoice";
import { percVoice } from "./percVoice";
import { pulseVoice } from "./pulseVoice";
import { rideVoice } from "./rideVoice";
import { sawBassVoice } from "./sawBassVoice";
import { snareVoice } from "./snareVoice";
import { stabVoice } from "./stabVoice";
import { subBassVoice } from "./subBassVoice";
import { swellVoice } from "./swellVoice";
import { triangleVoice } from "./triangleVoice";
import { uprightVoice } from "./uprightVoice";
import type { VoiceRenderer } from "./VoiceRenderer";

export const VOICES: Record<VoiceId, VoiceRenderer> = {
  pad: padVoice,
  epiano: epianoVoice,
  bell: bellVoice,
  subBass: subBassVoice,
  sawBass: sawBassVoice,
  stab: stabVoice,
  pulse: pulseVoice,
  triangle: triangleVoice,
  upright: uprightVoice,
  kick: kickVoice,
  snare: snareVoice,
  clap: clapVoice,
  hat: hatVoice,
  openHat: openHatVoice,
  ride: rideVoice,
  perc: percVoice,
  swell: swellVoice,
  crackle: crackleVoice,
};
