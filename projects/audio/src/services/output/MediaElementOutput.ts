export class MediaElementOutput {
  private readonly stream: MediaStreamAudioDestinationNode;
  private readonly element: HTMLAudioElement;
  private routedToElement = true;

  constructor(
    private readonly context: AudioContext,
    private readonly source: AudioNode,
  ) {
    this.stream = context.createMediaStreamDestination();
    this.element = new Audio();
    this.element.srcObject = this.stream.stream;
    source.connect(this.stream);
  }

  async start(): Promise<void> {
    if (!this.routedToElement) return;
    try {
      await this.element.play();
    } catch {
      this.routeToSpeakers();
    }
  }

  stop(): void {
    this.element.pause();
  }

  private routeToSpeakers(): void {
    this.routedToElement = false;
    this.source.disconnect(this.stream);
    this.source.connect(this.context.destination);
  }
}
