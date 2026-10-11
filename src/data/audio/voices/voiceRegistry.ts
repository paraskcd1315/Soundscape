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
import { acidVoice } from "./acidVoice";
import { brushVoice } from "./brushVoice";
import { choirVoice } from "./choirVoice";
import { hornVoice } from "./hornVoice";
import { muteTrumpetVoice } from "./muteTrumpetVoice";
import { pianoVoice } from "./pianoVoice";
import { kalimbaVoice } from "./kalimbaVoice";
import { organVoice } from "./organVoice";
import { rhodesVoice } from "./rhodesVoice";
import { rimVoice } from "./rimVoice";
import { shakerVoice } from "./shakerVoice";
import { softLeadVoice } from "./softLeadVoice";
import { stringsVoice } from "./stringsVoice";
import { vibesVoice } from "./vibesVoice";
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
  rhodes: rhodesVoice,
  vibes: vibesVoice,
  organ: organVoice,
  strings: stringsVoice,
  kalimba: kalimbaVoice,
  softLead: softLeadVoice,
  shaker: shakerVoice,
  rim: rimVoice,
  brush: brushVoice,
  acid: acidVoice,
  choir: choirVoice,
  piano: pianoVoice,
  horn: hornVoice,
  muteTrumpet: muteTrumpetVoice,
};
