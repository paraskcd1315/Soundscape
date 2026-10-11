import "./presets-section.scss";
import { SsButton } from "@soundscape/design-system/atoms/ss-button/SsButton";
import { SsSelect } from "@soundscape/design-system/atoms/ss-select/SsSelect";
import { SsTextInput } from "@soundscape/design-system/atoms/ss-text-input/SsTextInput";
import { createElement } from "@soundscape/design-system/foundation/utils/createElement.util";
import { SsSection } from "@soundscape/design-system/molecules/ss-section/SsSection";
import { APP_CONSTANTS } from "../../../../core/constants/app.constants";
import type { PresetLibraryService } from "../../../../core/services/presets/PresetLibraryService";
import { IMPORT_ACCEPT } from "../../constants/advanced.constants";
import { ADVANCED_STRINGS } from "../../constants/advanced.strings";

export class PresetsSection {
  readonly element: HTMLElement;
  private readonly select: SsSelect;
  private readonly deleteButton: SsButton;

  constructor(private readonly presets: PresetLibraryService) {
    const section = new SsSection(ADVANCED_STRINGS.sectionPresets);
    this.select = new SsSelect({
      id: "preset-select",
      label: ADVANCED_STRINGS.preset,
      choices: this.choices(),
      value: presets.selectedId,
      onChange: (value) => presets.select(value),
    });
    const name = new SsTextInput({
      id: "preset-name",
      label: ADVANCED_STRINGS.presetName,
      value: "",
      placeholder: ADVANCED_STRINGS.presetNamePlaceholder,
      maxLength: APP_CONSTANTS.presetNameMaxLength,
      onCommit: () => undefined,
    });
    const save = new SsButton({
      label: ADVANCED_STRINGS.save,
      icon: "save",
      variant: "primary",
      small: true,
      testId: "preset-save",
      onClick: () => {
        presets.save(name.value);
        name.clear();
      },
    });
    this.deleteButton = new SsButton({
      label: ADVANCED_STRINGS.delete,
      icon: "trash",
      variant: "danger",
      small: true,
      testId: "preset-delete",
      onClick: () => presets.deleteSelected(),
    });
    const share = new SsButton({
      label: ADVANCED_STRINGS.share,
      icon: "share",
      variant: "secondary",
      small: true,
      testId: "preset-share",
      onClick: () => void presets.copyShareLink(),
    });
    const exportButton = new SsButton({
      label: ADVANCED_STRINGS.exportPresets,
      icon: "download",
      variant: "ghost",
      small: true,
      testId: "preset-export",
      onClick: () => presets.exportAll(),
    });
    const fileInput = createElement("input", "ss-visually-hidden", {
      type: "file",
      accept: IMPORT_ACCEPT,
      tabindex: "-1",
      "aria-hidden": "true",
    });
    fileInput.addEventListener("change", () => {
      const file = fileInput.files?.[0];
      if (file) void presets.importFile(file);
      fileInput.value = "";
    });
    const importButton = new SsButton({
      label: ADVANCED_STRINGS.importPresets,
      icon: "upload",
      variant: "ghost",
      small: true,
      testId: "preset-import",
      onClick: () => fileInput.click(),
    });
    section.append(
      this.select.element,
      createElement(
        "div",
        "presets-section__save",
        {},
        name.element,
        save.element,
      ),
      createElement(
        "div",
        "presets-section__actions",
        {},
        share.element,
        this.deleteButton.element,
        exportButton.element,
        importButton.element,
        fileInput,
      ),
    );
    this.element = section.element;
    presets.subscribe(() => this.render());
    this.render();
  }

  private choices() {
    return [
      {
        value: APP_CONSTANTS.customPresetId,
        label: ADVANCED_STRINGS.presetCustom,
      },
      ...this.presets
        .list()
        .map((preset) => ({ value: preset.id, label: preset.name })),
    ];
  }

  private render(): void {
    this.select.setChoices(this.choices(), this.presets.selectedId);
    this.deleteButton.setDisabled(
      this.presets.selectedPreset?.origin !== "user",
    );
  }
}
