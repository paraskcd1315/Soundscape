import { el } from "./dom";
import type { SelectControl } from "./SelectControl";
import type { SelectOption } from "./SelectOption";

export interface SelectOptions {
  id: string;
  label: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

function fill(
  select: HTMLSelectElement,
  options: readonly SelectOption[],
  value: string,
): void {
  select.replaceChildren(
    ...options.map((option) => {
      const node = el("option", "", { value: option.value }, option.label);
      node.selected = option.value === value;
      return node;
    }),
  );
}

export function createSelect(options: SelectOptions): SelectControl {
  const select = el("select", "select__input", { id: options.id });
  fill(select, options.options, options.value);
  select.addEventListener("change", () => options.onChange(select.value));
  const label = el(
    "label",
    "select__label",
    { for: options.id },
    options.label,
  );
  const element = el("div", "select", {}, label, select);
  return {
    element,
    select,
    set(value) {
      select.value = value;
    },
    setOptions(next, value) {
      fill(select, next, value);
    },
  };
}
