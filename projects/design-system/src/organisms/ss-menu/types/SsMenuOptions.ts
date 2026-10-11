import type { SsSelectChoice } from "../../../atoms/ss-select/types/SsSelectChoice";

export interface SsMenuOptions {
  label: string;
  choices: readonly SsSelectChoice[];
  value: string;
  onSelect: (value: string) => void;
}
