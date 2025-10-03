import { Component, computed, input } from '@angular/core';
import { Colors, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  maxWidth = input<string>('1100px');
  size = input<Sizes>('md');

  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() => `sz-${this.size()} c-${this.accentColor()}`);
}
