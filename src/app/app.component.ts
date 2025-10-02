import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlotTheory } from './theory/slot.theory';

import { Appearances, AxyButtonComponent as AxyButton, HeaderComponent } from '@bridges/axy';
import { PipeTheory } from './theory/pipe.theory';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SlotTheory,  AxyButton, PipeTheory],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-lab';

  variants:Array<Appearances> = ['primary', 'outline', 'ghost'];

  constructor() {
    setInterval(() => {
      this.shift();
    }, 3000);
  }

  shift() {
    const v = this.variants.shift();
    this.variants.push(v!);
  }
}
