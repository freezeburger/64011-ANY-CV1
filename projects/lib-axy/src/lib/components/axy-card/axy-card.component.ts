import { Component, computed, input } from '@angular/core';
import { Appearances, Colors, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-card',
  imports: [],
  host:{
    '[class]': 'hostClasses()',
  },
  templateUrl: './axy-card.component.html',
  styleUrl: './axy-card.component.scss'
})
export class AxyCardComponent {
  variant = input<Appearances>('primary');
  clickable = input<boolean>(false);

  maxWidth = input<string>('50px');
  size = input<Sizes>('md');

  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() => `sz-${this.size()} c-${this.accentColor()}`);

}
