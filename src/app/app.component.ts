import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@bridges/axy';
import { SlotTheory } from './theory/slot.theory';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SlotTheory],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-lab';
}
