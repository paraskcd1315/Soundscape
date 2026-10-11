import { SsToast } from "@soundscape/design-system/molecules/ss-toast/SsToast";

export class ToastService {
  readonly toast = new SsToast();

  show(message: string): void {
    this.toast.show(message);
  }
}
