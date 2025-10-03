import { Component, computed, input } from '@angular/core';
import { Appearances, Colors, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-card',
  imports: [],
  host: {
    '[class]': 'hostClasses()',
  },
  templateUrl: './axy-card.component.html',
  styleUrl: './axy-card.component.scss'
})
export class AxyCardComponent {
  clickable = input<boolean>(false);

  maxWidth = input<string>('250px');
  size = input<Sizes>('md');

  variant = input<Appearances>('primary');
  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() =>
    [this.variant(), `sz-${this.size()}`, `c-${this.accentColor()}`].join(' ')
  );

}
