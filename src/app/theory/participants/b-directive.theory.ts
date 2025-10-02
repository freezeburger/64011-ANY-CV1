import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[BaxyLongPress]',
  standalone: true,
  host: {
    '[style]': `  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: purple;
    opacity: 70%;
    transition: width ${pressDuration}ms linear;
  }

  &:active::after {
    width: 100%;
  }
  }`,
  }
})
export class BAxyLongPressDirective {

  @Output() activated = new EventEmitter<void>();

  private pressTimer: any;
  private readonly pressDuration = 800;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
  }

  @HostListener('mousedown') onDown() {
    this.startPress();
  }

  @HostListener('mouseup') onUp() {
    this.cancelPress();
  }

  private startPress(): void {
    this.setProgress('100%');
    this.pressTimer = setTimeout(() => {
      this.activated.emit();
    }, this.pressDuration);
  }

  private cancelPress(): void {
    clearTimeout(this.pressTimer);
    this.setProgress('0%');
  }

  private setProgress(value: string): void {
    this.renderer.setStyle(this.el.nativeElement, '--progress', value);
  }
}
