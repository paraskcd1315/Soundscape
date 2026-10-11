import "./ss-segmented.scss";
import { SsChip } from "../../atoms/ss-chip/SsChip";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsSegmentedOptions } from "./types/SsSegmentedOptions";

export class SsSegmented {
  readonly element: HTMLDivElement;
  private readonly chips = new Map<string, SsChip>();

  constructor(options: SsSegmentedOptions) {
    const group = createElement("div", "ss-segmented__group", {
      role: "group",
      "aria-label": options.label,
    });
    for (const choice of options.choices) {
      const chip = new SsChip({
        label: choice.label,
        onClick: () => options.onChange(choice.value),
      });
      this.chips.set(choice.value, chip);
      group.append(chip.element);
    }
    this.element = createElement(
      "div",
      "ss-segmented",
      {},
      createElement("span", "ss-segmented__label", {}, options.label),
      group,
    );
    this.set(options.value);
  }

  set(value: string): void {
    this.chips.forEach((chip, key) => chip.setSelected(key === value));
  }
}
