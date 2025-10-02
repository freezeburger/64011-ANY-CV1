import { Component, Directive } from '@angular/core';


@Directive({
  selector: '[appDirectiveInheritance]',
  host: {
    '[style.cursor]': "'pointer'",
    '(click)': 'onClick()'
  }
})
export class DirectiveInheritance {
  onClick() {
    console.log('DirectiveInheritance clicked!');
  }
}

@Component({
  selector: 'app-directive-inheritance',
  imports: [],
  template: `
    <p>
      directive-inheritance works!
    </p>
  `,
  styles: ``
})
export class DirectiveInheritanceTheory extends DirectiveInheritance {
}
