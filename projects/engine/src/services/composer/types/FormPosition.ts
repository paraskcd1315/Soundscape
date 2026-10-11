import type { SectionPlan } from "../../../models/SectionPlan";

export interface FormPosition {
  plan: SectionPlan;
  barInSection: number;
  isFirstBar: boolean;
  isLastBar: boolean;
}
