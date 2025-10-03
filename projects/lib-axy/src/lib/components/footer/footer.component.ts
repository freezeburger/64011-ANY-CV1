import { Component, computed, input } from '@angular/core';
import { Appearances, Colors, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-footer',
  host: {
    '[class]': 'hostClasses()',
  },
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  maxWidth = input<string>('1100px');
  size = input<Sizes>('md');

  variant = input<Appearances>('primary');
  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() =>
    [this.variant(), `sz-${this.size()}`, `c-${this.accentColor()}`].join(' ')
  );
}
