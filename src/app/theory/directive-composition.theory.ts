import { Component, Directive } from '@angular/core';

@Directive({
  selector: '[appMenu]',
})
export class Menu {
  constructor() {
    console.log('Menu directive instantiated');
  }
}

@Directive({
  selector: '[appTooltip]',
})
export class Tooltip {
  constructor() {
    console.log('Tooltip directive instantiated');
  }
}

@Directive({
  // Cette directive compose les directives Menu et Tooltip
  selector: '[appMenuWithTooltip]',
  hostDirectives: [Tooltip, Menu],
})
export class MenuWithTooltip {
  constructor() {
    console.log('MenuWithTooltip directive instantiated');
  }
}

@Component({
  selector: 'app-directive-composition',
  imports: [MenuWithTooltip],
  template: `
    <p appMenuWithTooltip>
      directive-composition works!
    </p>
  `,
  styles: ``
})
export class DirectiveCompositionTheory {

}
