export interface SsSliderOptions {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  compact?: boolean;
  hideLabel?: boolean;
  format: (value: number) => string;
  onInput: (value: number) => void;
}
