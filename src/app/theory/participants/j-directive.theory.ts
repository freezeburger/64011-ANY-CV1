import { Directive, ViewChild, viewChild } from '@angular/core';

@Directive({
  selector: '[JaxyLongPress]',
  standalone: true,
  host: {
  },
  queries: {
    slider: new ViewChild('slider')
  }
})
export class JAxyLongPressDirective {
  // private slider = viewChild('slider');
  // @ViewChild('slider', { static: true }) _slider: any;

  ngAfterViewInit() {
    console.log("Debug JCA ", this);
    // console.log("Debug JCA ", this._slider);
  }

}


