import { Component, computed, inject, input } from '@angular/core';
import { Appearances, Colors, Sizes } from '../../types/ui.types';
import { AxyBaseCssDirective } from 'axy-dev';

@Component({
  selector: 'axy-header',
  host: {
    '[class]': 'hostClasses()',
  },
  standalone: true,
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

  variant = input<Appearances>('primary');
  accentColor = input<Colors>('crimson');
  protected hostClasses = computed(() =>
    [this.variant(), `sz-${this.size()}`, `c-${this.accentColor()}`].join(' ')
  );

  baseCss = inject(AxyBaseCssDirective,{ optional: true });
  ngAfterViewInit() {
    if (!this.baseCss) {
      console.warn('AxyButtonComponent - AxyBaseCssDirective not found! Make sure to add <div axyBaseCss> at the root of your application!');
    }
  }
}
