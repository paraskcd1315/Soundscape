export interface SsSwatchOptions {
  label: string;
  colors: readonly string[];
  selected?: boolean;
  onClick: () => void;
}
