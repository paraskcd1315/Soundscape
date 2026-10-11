import type { StyleDefinition } from "../../models/StyleDefinition";
import type { StyleId } from "../../models/StyleId";
import { ambientStyle } from "./styles/ambientStyle";
import { chiptuneStyle } from "./styles/chiptuneStyle";
import { deepProgressiveTranceStyle } from "./styles/deepProgressiveTranceStyle";
import { epicTranceStyle } from "./styles/epicTranceStyle";
import { jazzStyle } from "./styles/jazzStyle";
import { lofiStyle } from "./styles/lofiStyle";
import { melodicProgressiveStyle } from "./styles/melodicProgressiveStyle";
import { progressiveStyle } from "./styles/progressiveStyle";
import { technoStyle } from "./styles/technoStyle";
import { tranceStyle } from "./styles/tranceStyle";

export const STYLES: Record<StyleId, StyleDefinition> = {
  ambient: ambientStyle,
  lofi: lofiStyle,
  techno: technoStyle,
  chiptune: chiptuneStyle,
  jazz: jazzStyle,
  trance: tranceStyle,
  epicTrance: epicTranceStyle,
  deepProgressiveTrance: deepProgressiveTranceStyle,
  progressive: progressiveStyle,
  melodicProgressive: melodicProgressiveStyle,
};
