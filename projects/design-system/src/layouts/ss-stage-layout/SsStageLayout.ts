import "./ss-stage-layout.scss";
import { createElement } from "../../foundation/utils/createElement.util";

export class SsStageLayout {
  readonly element: HTMLDivElement;
  readonly stage: HTMLDivElement;
  readonly heading: HTMLDivElement;
  readonly overlay: HTMLDivElement;

  constructor() {
    this.stage = createElement("div", "ss-stage-layout__stage");
    this.heading = createElement("div", "ss-stage-layout__heading");
    this.overlay = createElement("div", "ss-stage-layout__overlay");
    this.element = createElement(
      "div",
      "ss-stage-layout",
      {},
      this.stage,
      this.heading,
      this.overlay,
    );
  }
}
