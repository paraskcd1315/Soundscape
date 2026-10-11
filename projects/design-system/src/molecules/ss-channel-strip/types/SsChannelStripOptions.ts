export interface SsChannelStripOptions {
  id: string;
  label: string;
  muteLabel: string;
  color: string;
  level: number;
  muted: boolean;
  format: (value: number) => string;
  onLevel: (level: number) => void;
  onMute: (muted: boolean) => void;
}
