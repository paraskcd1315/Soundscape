import type { VoiceId } from "@soundscape/engine/models/VoiceId";
import { bellVoice } from "../services/voices/bellVoice";
import { clapVoice } from "../services/voices/clapVoice";
import { crackleVoice } from "../services/voices/crackleVoice";
import { epianoVoice } from "../services/voices/epianoVoice";
import { hatVoice } from "../services/voices/hatVoice";
import { kickVoice } from "../services/voices/kickVoice";
import { openHatVoice } from "../services/voices/openHatVoice";
import { padVoice } from "../services/voices/padVoice";
import { percVoice } from "../services/voices/percVoice";
import { pulseVoice } from "../services/voices/pulseVoice";
import { rideVoice } from "../services/voices/rideVoice";
import { sawBassVoice } from "../services/voices/sawBassVoice";
import { snareVoice } from "../services/voices/snareVoice";
import { stabVoice } from "../services/voices/stabVoice";
import { subBassVoice } from "../services/voices/subBassVoice";
import { swellVoice } from "../services/voices/swellVoice";
import { triangleVoice } from "../services/voices/triangleVoice";
import { uprightVoice } from "../services/voices/uprightVoice";
import { acidVoice } from "../services/voices/acidVoice";
import { brushVoice } from "../services/voices/brushVoice";
import { choirVoice } from "../services/voices/choirVoice";
import { hornVoice } from "../services/voices/hornVoice";
import { muteTrumpetVoice } from "../services/voices/muteTrumpetVoice";
import { pianoVoice } from "../services/voices/pianoVoice";
import { kalimbaVoice } from "../services/voices/kalimbaVoice";
import { organVoice } from "../services/voices/organVoice";
import { rhodesVoice } from "../services/voices/rhodesVoice";
import { rimVoice } from "../services/voices/rimVoice";
import { shakerVoice } from "../services/voices/shakerVoice";
import { softLeadVoice } from "../services/voices/softLeadVoice";
import { stringsVoice } from "../services/voices/stringsVoice";
import { vibesVoice } from "../services/voices/vibesVoice";
import type { VoiceRenderer } from "../types/VoiceRenderer";

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
