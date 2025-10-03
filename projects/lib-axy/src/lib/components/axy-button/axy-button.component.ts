import { Component, computed, input } from '@angular/core';
import { Appearances, Sizes } from '../../types/ui.types';

@Component({
  selector: 'axy-button',
  imports: [],
  templateUrl: './axy-button.component.html',
  styleUrl: './axy-button.component.scss'
})
export class AxyButtonComponent {
  /*
  @Input() size: Sizes = 'md';
  @Input() appearance : Appearances = 'primary';
  @Input() disabled: boolean = false;

  protected classes(){
    return `${this.size} ${this.appearance}`
  }
  */

  size = input<Sizes>( 'md' );
  appearance = input<Appearances>( 'primary' );
  disabled = input<boolean>( false );

  protected classes = computed(()=>{
    return `${this.size()} ${this.appearance()}`
  })

}
