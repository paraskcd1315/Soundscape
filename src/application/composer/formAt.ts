import type { SongForm } from "../../domain/model/SongForm";
import type { FormPosition } from "./FormPosition";

export function formLength(form: SongForm): number {
  return form.sections.reduce((sum, plan) => sum + plan.bars, 0);
}

export function formAt(form: SongForm, barIndex: number): FormPosition {
  let remaining = barIndex % formLength(form);
  for (const plan of form.sections) {
    if (remaining < plan.bars) {
      return {
        plan,
        barInSection: remaining,
        isFirstBar: remaining === 0,
        isLastBar: remaining === plan.bars - 1,
      };
    }
    remaining -= plan.bars;
  }
  const last = form.sections[form.sections.length - 1] as FormPosition["plan"];
  return {
    plan: last,
    barInSection: last.bars - 1,
    isFirstBar: false,
    isLastBar: true,
  };
}
