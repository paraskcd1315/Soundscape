import "./ss-icon.scss";
import {
  SS_FILLED_ICONS,
  SS_ICON_STROKE_WIDTH,
  SS_ICON_VIEWBOX,
  SS_ICONS,
  SVG_NAMESPACE,
} from "./constants/icons.constants";
import type { SsIconName } from "./types/SsIconName";

export class SsIcon {
  readonly element: SVGSVGElement;
  private readonly path: SVGPathElement;

  constructor(name: SsIconName) {
    this.element = document.createElementNS(SVG_NAMESPACE, "svg");
    this.element.setAttribute("viewBox", SS_ICON_VIEWBOX);
    this.element.setAttribute("aria-hidden", "true");
    this.element.classList.add("ss-icon");
    this.path = document.createElementNS(SVG_NAMESPACE, "path");
    this.path.setAttribute("stroke-width", SS_ICON_STROKE_WIDTH);
    this.element.append(this.path);
    this.set(name);
  }

  set(name: SsIconName): void {
    this.path.setAttribute("d", SS_ICONS[name]);
    this.element.classList.toggle(
      "ss-icon--filled",
      SS_FILLED_ICONS.includes(name),
    );
  }
}
