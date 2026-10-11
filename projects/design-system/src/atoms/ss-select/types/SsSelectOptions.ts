import type { SsSelectChoice } from "./SsSelectChoice";

export interface SsSelectOptions {
  id: string;
  label: string;
  choices: readonly SsSelectChoice[];
  value: string;
  onChange: (value: string) => void;
}
