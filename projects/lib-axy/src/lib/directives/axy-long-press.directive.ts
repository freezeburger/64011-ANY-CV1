import {
  computed,
  Directive,
  input,
  signal,
  effect,
  output,
  untracked,
  inject,
  ElementRef,
  contentChild
} from '@angular/core';

@Directive({
  selector: '[axyLongPressTarget]'
})
export class AxyLongPressTargetDirective {
  // Just a marker directive
  host = inject(ElementRef<HTMLElement>);
}

@Directive({
  selector: '[axyLongPress]',
  host: {
    /* '[style.background]': 'background()', */
    '(mousedown)': 'start()',
    '(mouseup)': 'cancel()',
    '(mouseleave)': 'cancel()',
    'tabindex': '0',
    'role': 'button',
    ['style.cursor']: `'pointer'`
  }
})
export class AxyLongPressDirective {

  public duration = input<number>(1000); // Durée en ms
  public color = input<'crimson' | 'lightgreen' | 'orange'>('lightgreen'); // Couleur de fond
  public activated = output<void>();

  private pressed = signal<boolean>(false);
  private progress = signal<number>(0);
  private background = computed(() => `linear-gradient(to right, ${this.color()} ${this.progress()}%, transparent ${this.progress()}%)`);

  private customTarget = contentChild(AxyLongPressTargetDirective, { descendants: true});
  private host = inject(ElementRef<HTMLElement>);
  private target:ElementRef<HTMLElement> = this.customTarget()?.host ?? this.host;

  private readonly FRAME_DURATION = 1000 / 60; // Durée d'une frame en ms (~60fps) ou 16.67ms
  private readonly INCREMENT = untracked(() => 100 / (this.duration() / this.FRAME_DURATION));

  private timer: ReturnType<typeof setInterval> | null = null;

  private activatedState = false;

  ngAfterViewInit() {
    this.target = this.customTarget()?.host ?? this.host;
    console.log("LongPress Target", this.target);
    this.activated.subscribe(() => {
      this.activatedState = true;
    });
  }

  protected start(): void {
    this.pressed.set(true);
  }

  protected cancel(): void {
    this.pressed.set(false);
  }

  private activation = effect(onCleanup => {

    if (this.progress() >= 100 && !this.activatedState) {
      console.log("LongPress Activated");
      this.activated.emit();
    }

  });

  private cleanup = effect(() => {

    console.log("LongPress Finished : Cleanup");

    this.timer && clearInterval(this.timer);

    if (!this.pressed() && this.progress() > 0 && this.progress() < 100) {
      this.progress.set(0);
    }

  });

  private render = effect(() => {
    this.target.nativeElement.style.background = this.background();
  });

  private progression = effect(() => {

    if (this.pressed()) {

      console.log("LongPress Started", this.INCREMENT);

      const mutate = () => {
        this.progress.update((prev: number) => prev + this.INCREMENT);
      };

      this.timer = setInterval(mutate, this.FRAME_DURATION);
    }
  });

}
