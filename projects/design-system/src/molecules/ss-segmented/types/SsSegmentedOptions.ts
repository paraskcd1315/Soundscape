import type { SsSelectChoice } from "../../../atoms/ss-select/types/SsSelectChoice";

export interface SsSegmentedOptions {
  label: string;
  choices: readonly SsSelectChoice[];
  value: string;
  onChange: (value: string) => void;
}
