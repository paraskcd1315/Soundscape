export interface SsTextInputOptions {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  maxLength?: number;
  onCommit: (value: string) => void;
}
