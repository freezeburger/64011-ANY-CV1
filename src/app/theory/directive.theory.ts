import { Component, Directive, Host, HostBinding, HostListener } from '@angular/core';

@Directive({
  // Ici on cible uniquement les <p> avec l'attribut appHighlight
  selector: 'p[appHighlight]',
  host: {
    '[style.backgroundColor]': '"yellow"',
    '(click)': 'notify()'
  }
})
class HighlightDirective {
  // Liaison alternative avec HostBinding (Non recommandée si pas de logique)
  // @HostBinding('style.backgroundColor') backgroundColor = 'yellow';

  constructor() {
    console.log('appHighlight');
  }

  // @HostListener('click')
  notify() {
    console.log('notify');
  }
}


@Component({
  selector: 'app-directive',
  imports: [HighlightDirective],
  template: `
    <p appHighlight>
      P directive works!
    </p>
    <div appHighlight>
      DIV directive works!
    </div>
  `,
  styles: ``
})
export class DirectiveTheory {

}
