import "./ss-player-bar.scss";
import { createElement } from "../../foundation/utils/createElement.util";

export class SsPlayerBar {
  readonly element: HTMLElement;
  readonly leading: HTMLDivElement;
  readonly center: HTMLDivElement;
  readonly trailing: HTMLDivElement;

  constructor(label: string) {
    this.leading = createElement("div", "ss-player-bar__leading");
    this.center = createElement("div", "ss-player-bar__center");
    this.trailing = createElement("div", "ss-player-bar__trailing");
    this.element = createElement(
      "footer",
      "ss-player-bar",
      { "aria-label": label },
      createElement(
        "div",
        "ss-player-bar__inner",
        {},
        this.leading,
        this.center,
        this.trailing,
      ),
    );
  }
}
