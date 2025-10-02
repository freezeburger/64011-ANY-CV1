import { Component, ComponentFactory, ComponentFactoryResolver, contentChildren, ElementRef, inject, viewChild, viewChildren, ɵgetComponentDef, ɵɵgetComponentDepsFactory } from '@angular/core';
import { AxyButtonComponent } from 'axy-dev';

@Component({
  selector: 'app-template-query',
  imports: [AxyButtonComponent],
  template: `
    <div #container>
      <axy-button>Click me</axy-button>
      <ul>
        <li #listItem>Lorem, ipsum.</li>
        <li #listItem>Voluptate, ab.</li>
        <li #listItem>Eligendi, quae.</li>
      </ul>
      <ng-content></ng-content>
    </div>
  `,
  styles: ``
})
export class TemplateQueryTheory {

  protected host = inject(ElementRef<HTMLElement>).nativeElement;
  protected container = viewChild<ElementRef<HTMLDivElement>>('container');
  protected button = viewChild(AxyButtonComponent);

  protected listItems = viewChildren<ElementRef<HTMLLIElement>>('listItem');
  protected contents = contentChildren<ElementRef<HTMLElement>>('content');

  ngAfterViewInit() {
    console.log('Host:', this.host);
    console.log('Container:', this.container()?.nativeElement);
    console.log('Button:', this.button());
    console.log('List items:', this.listItems());
    console.log('Content children:', this.contents()?.at(0)?.nativeElement);

    // Accessing the generated component definition to see the content selectors
    // Attention: this is not a public API and may change without notice

    console.log('Slots:', (TemplateQueryTheory as any)?.ɵcmp?.ngContentSelectors);
    console.log('Slots:', ɵgetComponentDef(TemplateQueryTheory)?.ngContentSelectors);


  }

}
