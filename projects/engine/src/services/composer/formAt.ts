import type { SectionPlan } from "../../models/SectionPlan";
import type { SongForm } from "../../models/SongForm";
import type { FormPosition } from "./types/FormPosition";

function lengthOf(sections: readonly SectionPlan[]): number {
  return sections.reduce((sum, plan) => sum + plan.bars, 0);
}

function loopSections(form: SongForm): readonly SectionPlan[] {
  const body = form.sections.filter((plan) => !plan.introOnly);
  return body.length > 0 ? body : form.sections;
}

export function formLength(form: SongForm): number {
  return lengthOf(form.sections);
}

export function loopLength(form: SongForm): number {
  return lengthOf(loopSections(form));
}

export function formAt(form: SongForm, barIndex: number): FormPosition {
  const firstPass = formLength(form);
  const sections = barIndex < firstPass ? form.sections : loopSections(form);
  let remaining =
    barIndex < firstPass
      ? barIndex
      : (barIndex - firstPass) % lengthOf(sections);
  for (const plan of sections) {
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
  const last = sections[sections.length - 1] as FormPosition["plan"];
  return {
    plan: last,
    barInSection: last.bars - 1,
    isFirstBar: false,
    isLastBar: true,
  };
}
