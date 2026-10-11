import type { CounterRecipe } from "./CounterRecipe";
import type { DrumRecipe } from "./DrumRecipe";
import type { StyleDefinition } from "./StyleDefinition";

export type StyleFamily = Omit<
  StyleDefinition,
  "id" | "palette" | "drums" | "counter"
> & {
  drums: DrumRecipe;
  counter: CounterRecipe;
};
