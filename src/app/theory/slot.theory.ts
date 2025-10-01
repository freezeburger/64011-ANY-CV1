import { Component } from '@angular/core';

@Component({
  selector: 'app-slot',
  imports: [],
  template: `
    <div>
      <h1>Slot : content projection in Angular</h1>
      <h2>
        <ng-content select="[slot='sub-title']">Default Sub Title</ng-content>
      </h2>
      <hr>
        <ng-content>Default Slot Content</ng-content>
    </div>
  `,
  styles: ``
})
export class SlotTheory {

}
