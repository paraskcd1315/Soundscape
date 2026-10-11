import {
  STEEL_DRUM_DECAY_SECONDS,
  STEEL_DRUM_PARTIALS,
  STEEL_DRUM_PEAK,
} from "./constants/malletVoice.constants";
import { malletVoice } from "./malletVoice";

export const steelDrumVoice = malletVoice(
  STEEL_DRUM_PARTIALS,
  STEEL_DRUM_PEAK,
  STEEL_DRUM_DECAY_SECONDS,
);
