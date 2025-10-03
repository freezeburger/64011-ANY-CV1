import { Component, computed, input } from '@angular/core';
import { Colors, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = input<string | undefined>();
  subtitle = input<string | undefined>();

  sticky = input<boolean>(true);

  maxWidth = input<string>('1100px');
  size = input<Sizes>('md');

  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() => `sz-${this.size()} c-${this.accentColor()}`);
}
