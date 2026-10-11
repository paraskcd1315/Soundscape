import type { SectionPlan } from "../../domain/model/SectionPlan";

export interface FormPosition {
  plan: SectionPlan;
  barInSection: number;
  isFirstBar: boolean;
  isLastBar: boolean;
}
