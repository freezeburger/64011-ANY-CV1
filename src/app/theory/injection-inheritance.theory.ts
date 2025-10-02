import { HttpClient } from '@angular/common/http';
import { Component, Directive, inject, Inject, Injector, Optional } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
  selector: '[appInjectionInheritance]',
})
export class InjectionInheritance {

  /**
   * Prendre soin de regrouper les injection en début de code.
   */
  private router = inject(Router, { optional: true });
  constructor() {
    console.log('Router injected in InjectionInheritance:', this.router);
  }

  /* constructor(
    // @Optional() @Inject(Router) private router: Router
    @Optional() private router: Router
  ) {
    console.log('Router injected in DirectiveInheritance:', this.router);
  } */

}

@Component({
  selector: 'app-injection-inheritance',
  imports: [],
  template: `
    <p>
      injection-inheritance works!
    </p>
  `,
  styles: ``
})
export class InjectionInheritanceTheory extends InjectionInheritance {

  private http = inject(HttpClient, { optional: true });
  constructor() {
    super();
    console.log('HttpClient injected in InjectionInheritanceTheory:', this.http);
  }

  /* constructor(@Optional() private http: HttpClient, injector: Injector) {
    super(injector.get(Router, null) as Router);
  } */

}
