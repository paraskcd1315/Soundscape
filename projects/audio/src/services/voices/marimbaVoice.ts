import {
  MARIMBA_DECAY_SECONDS,
  MARIMBA_PARTIALS,
  MARIMBA_PEAK,
} from "./constants/malletVoice.constants";
import { malletVoice } from "./malletVoice";

export const marimbaVoice = malletVoice(
  MARIMBA_PARTIALS,
  MARIMBA_PEAK,
  MARIMBA_DECAY_SECONDS,
);
