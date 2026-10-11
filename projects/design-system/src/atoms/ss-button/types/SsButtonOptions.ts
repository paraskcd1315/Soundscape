import type { SsIconName } from "../../ss-icon/types/SsIconName";
import type { SsButtonVariant } from "./SsButtonVariant";

export interface SsButtonOptions {
  label: string;
  variant?: SsButtonVariant;
  small?: boolean;
  icon?: SsIconName;
  testId?: string;
  onClick: () => void;
}
