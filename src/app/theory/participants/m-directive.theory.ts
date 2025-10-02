import {
  computed,
  Directive,
  ElementRef,
  inject, input,
  output,
  signal,
} from '@angular/core';


/***
Dans la lib, créez une directive AxyLongPress (usage sur un <button> ou n’importe quel host).
Comportement :
appui prolongé 800ms → émet un événement activated,
un effet visuel de progression (remplissage) durant l’appui,
annulation si relâché avant 800ms.
***/

@Directive({
  selector: '[MaxyLongPress]',
  host: {
    '(mousedown)': 'startProgress()',
    '(mouseup)': 'cancelProgress()',
    '(mouseleave)': 'cancelProgress()'
  }
})
export class MAxyLongPressDirective {

  private readonly MAX_COUNT = 100;
  private readonly DEFAULT_DURATION = 800;

  private hostElement = inject(ElementRef<HTMLElement>);
  private buttonElement: HTMLElement | null = null;
  private target !: HTMLElement;

  color = input<string>('blue');
  duration = input<number>(this.DEFAULT_DURATION);
  activated = output<boolean>();

  counter = signal<number>(0);
  cssBackground = computed(() => `linear-gradient(to right, ${this.color()} ${this.counter()}%, transparent ${this.counter()}%)`);
  activatedSignal = computed(() => this.counter() === this.MAX_COUNT);

  private interval!: ReturnType<typeof setInterval>;

  ngAfterViewInit(): void {
    this.buttonElement = this.hostElement.nativeElement.querySelector('button');
    this.target = this.buttonElement ?? this.hostElement.nativeElement;
  }

  public startProgress(): void {
    this.interval = setInterval(this.counterIncrement, this.duration() / this.MAX_COUNT);
  }

  public cancelProgress(): void {
    if (!this.activatedSignal()) {
      this.counter.set(0);
      this.target.style.background = "transparent";
    }

    clearInterval(this.interval);
  }

  private counterIncrement = (): void => {
    this.counter.set(this.counter() + 1);
    this.target.style.background = this.cssBackground();

    if (this.activatedSignal()) {
      this.activated.emit(true);
      clearInterval(this.interval);
    }
  };
}
