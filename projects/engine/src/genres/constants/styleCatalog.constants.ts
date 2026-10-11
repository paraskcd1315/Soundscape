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
import { deepHouseStyle } from "./styles/deepHouseStyle";
import { deepProgressiveHouseStyle } from "./styles/deepProgressiveHouseStyle";
import { chillHouseStyle } from "./styles/chillHouseStyle";
import { techHouseStyle } from "./styles/techHouseStyle";
import { melodicHouseTechnoStyle } from "./styles/melodicHouseTechnoStyle";
import { deepMelodicTechnoStyle } from "./styles/deepMelodicTechnoStyle";
import { dubTechnoStyle } from "./styles/dubTechnoStyle";

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
  deepHouse: deepHouseStyle,
  deepProgressiveHouse: deepProgressiveHouseStyle,
  chillHouse: chillHouseStyle,
  techHouse: techHouseStyle,
  melodicHouseTechno: melodicHouseTechnoStyle,
  deepMelodicTechno: deepMelodicTechnoStyle,
  dubTechno: dubTechnoStyle,
};
