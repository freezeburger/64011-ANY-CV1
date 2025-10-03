import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Axy from '@bridges/axy';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ...Object.values(Axy) as any[]
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  activations = {
    first:false,
    second:false,
    third:false
  }
}
