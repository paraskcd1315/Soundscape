export interface SliderControl {
  element: HTMLElement;
  set(value: number): void;
  setRange(min: number, max: number): void;
}
