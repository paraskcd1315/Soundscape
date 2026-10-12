export interface SheetDragOptions {
  panel: HTMLElement;
  handle: HTMLElement | null;
  scroller: HTMLElement;
  enabled: () => boolean;
  onDismiss: () => void;
}
