import { Component, Inject, Injectable } from '@angular/core';


/**
 * En JavaScript toutes les classes héritent d'une super classe appelée Object.
 * En JavaScript toutes les classes de bases sont extensibles.
 * En JavaScript une classe peut hériter d'une seule autre classe à la fois
 *
 * En TypeScript, une classe peut implémenter plusieurs interfaces.
 * En TypeScript, une classe peut hériter d'une classe abstraite.
 */

class CustomArray extends Array<number> {
  sum(): number {
    return this.reduce((a, b) => a + b, 0);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomArrayService extends CustomArray {
  constructor() {
    super();
    this.push(1, 2, 3);
    console.log('Sum:', this.sum());
  }
}

abstract class BaseComponent {
  constructor() {
    this.notify();
  }
  notify(): void {
    console.log('Notification from BaseComponent', this);
  }
}

@Component({
  selector: 'app-inheritance',
  imports: [],
  template: `
    <p>
      inheritance works!
    </p>
  `,
  styles: ``
})
export class InheritanceTheory extends BaseComponent {

}
