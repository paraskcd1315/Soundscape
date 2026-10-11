import { describe, expect, it } from "vitest";
import { composeBar } from "../src/application/composer/composeBar";
import { formAt, formLength } from "../src/application/composer/formAt";
import { BUILTIN_PRESETS } from "../src/application/presets/builtinPresets";
import { defaultSettingsFor } from "../src/application/settings/defaultSettingsFor";
import { LAYER_KINDS } from "../src/domain/model/LayerKind";
import { STYLE_IDS } from "../src/domain/model/StyleId";
import { STYLES } from "../src/styles/styleCatalog";

describe.each(STYLE_IDS)("song form %s", (styleId) => {
  const style = STYLES[styleId];

  it("walks every section of its cycle in order", () => {
    const names: string[] = [];
    for (let bar = 0; bar < formLength(style.form); bar++) {
      const name = formAt(style.form, bar).plan.name;
      if (names[names.length - 1] !== name) names.push(name);
    }
    expect(names).toEqual(style.form.sections.map((plan) => plan.name));
    expect(formAt(style.form, formLength(style.form)).plan.name).toBe(
      style.form.sections[0]?.name,
    );
  });

  it("keeps music playing in every bar of the whole cycle", () => {
    const settings = defaultSettingsFor(styleId, 21);
    let soundingUntil = 0;
    for (let bar = 0; bar < formLength(style.form) * 2; bar++) {
      const events = composeBar(settings, bar);
      for (const event of events)
        soundingUntil = Math.max(
          soundingUntil,
          bar * 4 + event.startBeat + event.durationBeats,
        );
      expect(events.length > 0 || soundingUntil > bar * 4).toBe(true);
    }
  });

  it("changes which layers play between sections", () => {
    const settings = defaultSettingsFor(styleId, 21);
    const signatures = new Set<string>();
    let bar = 0;
    for (const plan of style.form.sections) {
      const layers = new Set(
        composeBar(settings, bar + 1).map((event) => event.layer),
      );
      signatures.add(LAYER_KINDS.filter((kind) => layers.has(kind)).join("."));
      bar += plan.bars;
    }
    expect(signatures.size).toBeGreaterThan(1);
  });
});

describe("arrangement moments", () => {
  it("drops the drums in the techno breakdown and brings an impact on the drop", () => {
    const style = STYLES.techno;
    const settings = defaultSettingsFor("techno", 8);
    let start = 0;
    for (const plan of style.form.sections) {
      if (plan.name === "breakdown") {
        const drums = composeBar(settings, start + 2).filter(
          (event) => event.layer === "drums",
        );
        expect(drums).toHaveLength(0);
      }
      if (plan.name === "drop") {
        const first = composeBar(settings, start).filter(
          (event) => event.voice === "kick" && event.velocity >= 0.9,
        );
        expect(first.length).toBeGreaterThan(0);
      }
      start += plan.bars;
    }
  });

  it("puts a riser under the last bar before a drop", () => {
    const settings = defaultSettingsFor("techno", 8);
    const lastBuildBar = 8 + 8 - 1;
    const swells = composeBar(settings, lastBuildBar).filter(
      (event) => event.voice === "swell",
    );
    expect(swells.length).toBeGreaterThan(0);
  });
});

describe("built-in presets", () => {
  it("offers at least four per style with unique ids and names", () => {
    for (const styleId of STYLE_IDS) {
      expect(
        BUILTIN_PRESETS.filter((preset) => preset.settings.styleId === styleId)
          .length,
      ).toBeGreaterThanOrEqual(4);
    }
    expect(new Set(BUILTIN_PRESETS.map((preset) => preset.id)).size).toBe(
      BUILTIN_PRESETS.length,
    );
    expect(new Set(BUILTIN_PRESETS.map((preset) => preset.name)).size).toBe(
      BUILTIN_PRESETS.length,
    );
  });

  it("differ from each other within a style", () => {
    for (const styleId of STYLE_IDS) {
      const signatures = new Set(
        BUILTIN_PRESETS.filter(
          (preset) => preset.settings.styleId === styleId,
        ).map((preset) =>
          JSON.stringify([
            preset.settings.seed,
            preset.settings.tempo,
            preset.settings.scaleId,
            preset.settings.keyRoot,
          ]),
        ),
      );
      expect(signatures.size).toBe(
        BUILTIN_PRESETS.filter((preset) => preset.settings.styleId === styleId)
          .length,
      );
    }
  });
});
