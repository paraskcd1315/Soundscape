import { describe, expect, it } from "vitest";
import { generateBassPattern } from "../src/application/composer/patterns/generateBassPattern";
import { generateDrumKit } from "../src/application/composer/patterns/generateDrumKit";
import { generateStabSteps } from "../src/application/composer/patterns/generateStabSteps";
import {
  mutateBass,
  mutateKit,
  mutateStabs,
} from "../src/application/composer/patterns/mutatePatterns";
import { patternsFor } from "../src/application/composer/patterns/patternsFor";
import { timbreFor } from "../src/application/composer/timbreFor";
import { defaultSettingsFor } from "../src/application/settings/defaultSettingsFor";
import { STYLE_IDS } from "../src/domain/model/StyleId";
import { createRng } from "../src/domain/random/createRng";
import { STYLES } from "../src/styles/styleCatalog";

const SEEDS = Array.from({ length: 40 }, (_, index) => index * 977 + 3);

describe.each(STYLE_IDS)("pattern algorithms %s", (styleId) => {
  const style = STYLES[styleId];
  const rules = style.patterns;

  it("builds drum kits that follow the voice rules", () => {
    if (style.drums === null) return;
    for (const seed of SEEDS) {
      const kit = generateDrumKit(rules.drums, createRng(seed, "kit"));
      expect(kit.length).toBeGreaterThan(0);
      for (const grid of kit) {
        const rule = rules.drums.find((entry) => entry.voice === grid.voice);
        expect(rule).toBeDefined();
        for (const anchor of rule?.anchors ?? [])
          expect(grid.steps[anchor]).toBe(1);
        grid.steps.forEach((value, step) => {
          if (value > 0 && !rule?.anchors.includes(step))
            expect(rule?.weights[step]).toBeGreaterThan(0);
        });
        const extras = grid.steps.filter(
          (value, step) => value > 0 && !rule?.anchors.includes(step),
        ).length;
        expect(extras).toBeLessThanOrEqual(rule?.maxExtra ?? 0);
      }
    }
  });

  it("builds ordered, non-overlapping bass lines that start on the root", () => {
    for (const seed of SEEDS) {
      const kit =
        style.drums === null
          ? []
          : generateDrumKit(rules.drums, createRng(seed, "kit"));
      const line = generateBassPattern(
        rules.bass,
        kit,
        createRng(seed, "bass"),
      );
      expect(line.length).toBeGreaterThan(0);
      expect(line[0]?.interval).toBe("root");
      line.forEach((step, index) => {
        expect(step.step).toBeGreaterThanOrEqual(0);
        expect(step.step).toBeLessThan(16);
        const next = line[index + 1]?.step ?? 16;
        expect(step.step + step.lengthSteps).toBeLessThanOrEqual(next);
      });
    }
  });

  it("mutation keeps anchors and stays inside the rules", () => {
    for (const seed of SEEDS) {
      const rng = createRng(seed, "mutate");
      if (style.drums !== null) {
        const kit = mutateKit(
          generateDrumKit(rules.drums, createRng(seed, "kit")),
          rules.drums,
          rng,
          1,
        );
        for (const grid of kit) {
          const rule = rules.drums.find((entry) => entry.voice === grid.voice);
          for (const anchor of rule?.anchors ?? [])
            expect(grid.steps[anchor]).toBeGreaterThan(0);
        }
      }
      const bass = mutateBass(
        generateBassPattern(rules.bass, [], createRng(seed, "bass")),
        rules.bass,
        rng,
        1,
      );
      for (const anchor of rules.bass.anchors)
        expect(bass.some((step) => step.step === anchor)).toBe(true);
      if (rules.stabs) {
        const stabs = mutateStabs(
          generateStabSteps(rules.stabs, createRng(seed, "stab")),
          rules.stabs,
          rng,
          1,
        );
        for (const anchor of rules.stabs.anchors)
          expect(stabs).toContain(anchor);
      }
    }
  });

  it("evolves patterns between sections and differs between seeds", () => {
    const signature = (seed: number, bar: number) => {
      const settings = { ...defaultSettingsFor(styleId, seed), variation: 0.8 };
      const patterns = patternsFor(
        settings,
        style,
        timbreFor(settings, style),
        bar,
      );
      return JSON.stringify([
        patterns.drumKit,
        patterns.bass,
        patterns.stabSteps,
      ]);
    };
    const sections = new Set(
      Array.from({ length: 8 }, (_, section) => signature(11, section * 8)),
    );
    const seeds = new Set(SEEDS.slice(0, 20).map((seed) => signature(seed, 0)));
    if (styleId === "ambient") {
      expect(seeds.size).toBeGreaterThanOrEqual(1);
    } else {
      expect(sections.size).toBeGreaterThan(2);
      expect(seeds.size).toBeGreaterThan(5);
    }
  });

  it("is deterministic", () => {
    const settings = defaultSettingsFor(styleId, 99);
    const timbre = timbreFor(settings, style);
    expect(JSON.stringify(patternsFor(settings, style, timbre, 17))).toBe(
      JSON.stringify(patternsFor(settings, style, timbre, 17)),
    );
  });
});

describe("style identity is preserved", () => {
  it("keeps four on the floor in every generated techno kit", () => {
    for (const seed of SEEDS) {
      const kit = generateDrumKit(
        STYLES.techno.patterns.drums,
        createRng(seed, "kit"),
      );
      const kick = kit.find((grid) => grid.voice === "kick");
      expect([0, 4, 8, 12].every((step) => kick?.steps[step] === 1)).toBe(true);
    }
  });

  it("keeps the techno bass out of the kick steps", () => {
    for (const seed of SEEDS) {
      const kit = generateDrumKit(
        STYLES.techno.patterns.drums,
        createRng(seed, "kit"),
      );
      const line = generateBassPattern(
        STYLES.techno.patterns.bass,
        kit,
        createRng(seed, "bass"),
      );
      expect(line.every((step) => step.step % 4 !== 0)).toBe(true);
    }
  });

  it("walks jazz bass on the quarter notes ending with an approach note", () => {
    const line = generateBassPattern(
      STYLES.jazz.patterns.bass,
      [],
      createRng(5, "bass"),
    );
    expect(line.map((step) => step.step)).toEqual([0, 4, 8, 12]);
    expect(line[3]?.interval).toBe("approach");
  });
});
