import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[axyLongPress]',
  standalone: true,
  host: {
    '(pointerdown)': 'onDown($event)',
    '(pointerup)': 'onUp()',
    '(pointerleave)': 'onUp()',
    '(keydown.space)': 'onDown($event)',
    '(keyup.space)': 'onUp()',
    'style.position': 'relative',
    'style.overflow': 'hidden',
  }
})
export class AxyLongPress {

  private el = inject(ElementRef<HTMLElement>);

  activated = output<void>(); // Alternative: @Output() activated = new EventEmitter<void>();

  private timer: any = null;
  private startTs = 0;
  private raf = 0;
  private dur = 800;

  onDown(ev: Event) {
    ev.preventDefault();
    if (this.timer) return;
    this.startTs = performance.now();
    const bar = this.ensureBar();
    bar.style.width = '0%';
    bar.style.opacity = '1';

    const tick = () => {
      const p = Math.min(1, (performance.now() - this.startTs) / this.dur);
      bar.style.width = (p * 100).toFixed(2) + '%';
      if (p >= 1) {
        this.onUp(true);
        this.activated.emit();
      } else {
        this.raf = requestAnimationFrame(tick);
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  onUp(success = false) {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    const bar = this.el.nativeElement.querySelector(':scope > .axy-longpress-bar');
    if (bar) {
      bar.style.opacity = success ? '0' : '0.2';
      bar.style.transition = 'opacity .2s ease';
    }
    this.timer = null;
  }

  private ensureBar() {
    let bar = this.el.nativeElement.querySelector(':scope > .axy-longpress-bar');
    if (!bar) {
      bar = document.createElement('div');
      Object.assign(bar.style, {
        position: 'absolute', inset: 'auto 0 0 0', height: '3px',
        background: 'currentColor', opacity: '0', width: '0%',
        pointerEvents: 'none'
      });
      bar.className = 'axy-longpress-bar';
      this.el.nativeElement.appendChild(bar);
    }
    return bar;
  }
}
