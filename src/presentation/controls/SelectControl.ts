import type { SelectOption } from "./SelectOption";

export interface SelectControl {
  element: HTMLElement;
  select: HTMLSelectElement;
  set(value: string): void;
  setOptions(options: readonly SelectOption[], value: string): void;
}
