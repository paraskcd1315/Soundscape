import type { StyleDefinition } from "../domain/model/StyleDefinition";
import type { StyleId } from "../domain/model/StyleId";
import { ambientStyle } from "./ambientStyle";
import { chiptuneStyle } from "./chiptuneStyle";
import { jazzStyle } from "./jazzStyle";
import { lofiStyle } from "./lofiStyle";
import { technoStyle } from "./technoStyle";

export const STYLES: Record<StyleId, StyleDefinition> = {
  ambient: ambientStyle,
  lofi: lofiStyle,
  techno: technoStyle,
  chiptune: chiptuneStyle,
  jazz: jazzStyle,
};
