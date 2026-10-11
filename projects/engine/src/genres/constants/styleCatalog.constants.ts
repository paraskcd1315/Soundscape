import type { StyleDefinition } from "../../models/StyleDefinition";
import type { StyleId } from "../../models/StyleId";
import { ambientStyle } from "./styles/ambientStyle";
import { chiptuneStyle } from "./styles/chiptuneStyle";
import { jazzStyle } from "./styles/jazzStyle";
import { lofiStyle } from "./styles/lofiStyle";
import { technoStyle } from "./styles/technoStyle";

export const STYLES: Record<StyleId, StyleDefinition> = {
  ambient: ambientStyle,
  lofi: lofiStyle,
  techno: technoStyle,
  chiptune: chiptuneStyle,
  jazz: jazzStyle,
};
