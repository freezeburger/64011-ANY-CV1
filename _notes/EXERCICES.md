# EXERCICES — Angular 19 (Workspace: `app-lab` + library `lib-axy`)

Ces exercices visent la **librairie `lib-axy` (prefix `axy`)** d’un workspace Angular **v19**.  
Chaque énoncé propose une **correction masquée** dans une balise `<details>`.  
Objectifs : graphisme & responsive, directives d’effets visuels, virtualisation, chargement dynamique, héritage de directives, encapsulation d’un `<input>`, etc.

> **Rappel CLI**
> Rappel CLI : dans un workspace avec la lib `lib-axy`, utilisez `--project=lib-axy` pour générer **dans la lib** (et pas dans l’app).  
> Exemple : `ng g c components/axy-button --project=lib-axy --standalone --export`


---

## Exercice 1 — Bouton responsive et thème minimal
Créez un composant `AxyButton` stylé et **responsive** (conteneur fluide, tailles sm/md/lg), qui expose :
- une **variation** `appearance` parmi `primary | outline | ghost`,
- des **tailles** `size` `sm | md | lg`,
- un **état** `disabled`,
- un **slot** de contenu (projection).

Utilisez uniquement du CSS moderne (flex/grid, `:where()`, `@container` si souhaité).

**Commandes de génération** (dans la lib) :
```bash
ng g c components/axy-button --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**`components/axy-button/axy-button.component.ts`**
```ts
import { Component, input, computed } from '@angular/core';

type Appearance = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

@Component({
  selector: 'axy-button',
  standalone: true,
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      [class]="classes()"
      ><ng-content /></button>
  `,
  host: {
    // Alternative canonique (commentée) :
    // '[class.axy-button-host]': 'true',
  },
  styles: [`
    :host{ display:inline-block }
    button{
      border:0; cursor:pointer; border-radius:.5rem;
      padding:.5rem 1rem; font-weight:600; inline-size: 100%;
    }
    @container (min-width: 420px) {
      /* si conteneur queries activées autour */
      button{ inline-size: auto; }
    }
    .sm{ font-size:.875rem; padding:.375rem .75rem }
    .md{ font-size:1rem; }
    .lg{ font-size:1.125rem; padding:.625rem 1.25rem }

    .primary{ background: var(--axy-primary, CanvasText); color: var(--axy-on-primary, Canvas); }
    .outline{ background: transparent; color: var(--axy-primary, CanvasText); outline: 2px solid currentColor; }
    .ghost{ background: transparent; color: inherit; }
    button:disabled{ opacity:.5; cursor:not-allowed }
  `],
})
export class AxyButton {
  appearance = input<Appearance>('primary'); // Alternative: @Input() appearance: Appearance = 'primary';
  size = input<Size>('md');                  // Alternative: @Input() size: Size = 'md';
  disabled = input<boolean>(false);          // Alternative: @Input() disabled = false;

  classes = computed(() => `${this.size()} ${this.appearance()}`);
}
```
</details>


---

## Exercice 2 — Directive `LongPress` avec effet de remplissage
Dans la lib, créez une **directive** `AxyLongPress` (usage sur un `<button>` ou n’importe quel host).  
Comportement :
- appui prolongé **800ms** → émet un événement `activated`,
- un **effet visuel** de **progression** (remplissage) durant l’appui,
- annulation si relâché avant 800ms.

**Commandes :**
```bash
ng g d directives/axy-long-press --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**`directives/axy-long-press.directive.ts`**
```ts
import { Directive, ElementRef, effect, inject, output } from '@angular/core';

@Directive({
  selector: '[axyLongPress]',
  standalone: true,
  host: {
    '(pointerdown)': 'onDown($event)',
    '(pointerup)': 'onUp()',
    '(pointerleave)': 'onUp()',
    '(keydown.space)': 'onDown($event)',
    '(keyup.space)': 'onUp()',
    'style.position': 'relative',
    'style.overflow': 'hidden',
  }
})
export class AxyLongPress {
  private el = inject(ElementRef<HTMLElement>);

  activated = output<void>(); // Alternative: @Output() activated = new EventEmitter<void>();

  private timer: any = null;
  private startTs = 0;
  private raf = 0;
  private dur = 800;

  onDown(ev: Event) {
    ev.preventDefault();
    if (this.timer) return;
    this.startTs = performance.now();
    const bar = this.ensureBar();
    bar.style.width = '0%';
    bar.style.opacity = '1';

    const tick = () => {
      const p = Math.min(1, (performance.now() - this.startTs) / this.dur);
      bar.style.width = (p * 100).toFixed(2) + '%';
      if (p >= 1) {
        this.onUp(true);
        this.activated.emit();
      } else {
        this.raf = requestAnimationFrame(tick);
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  onUp(success = false) {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    const bar = this.el.nativeElement.querySelector<HTMLElement>(':scope > .axy-longpress-bar');
    if (bar) {
      bar.style.opacity = success ? '0' : '0.2';
      bar.style.transition = 'opacity .2s ease';
    }
    this.timer = null;
  }

  private ensureBar() {
    let bar = this.el.nativeElement.querySelector<HTMLElement>(':scope > .axy-longpress-bar');
    if (!bar) {
      bar = document.createElement('div');
      Object.assign(bar.style, {
        position: 'absolute', inset: 'auto 0 0 0', height: '3px',
        background: 'currentColor', opacity: '0', width: '0%',
        pointerEvents: 'none'
      });
      bar.className = 'axy-longpress-bar';
      this.el.nativeElement.appendChild(bar);
    }
    return bar;
  }
}
```

**Utilisation (dans l’app ou une démo de la lib)** :
```html
<axy-button axyLongPress (activated)="onDanger()">
  Supprimer (Long press)
</axy-button>
```
</details>


---

## Exercice 3 — `AxyButtonConfirm` combinant composant + directive
Composez un composant `AxyButtonConfirm` qui **utilise** `AxyLongPress` en interne.  
Affichez un **état** visuel : « Maintenez pour confirmer ».

**Commandes :**
```bash
ng g c components/axy-button-confirm --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**`components/axy-button-confirm/axy-button-confirm.component.ts`**
```ts
import { Component, signal } from '@angular/core';
import { AxyButton } from '../axy-button/axy-button.component';
import { AxyLongPress } from '../../directives/axy-long-press.directive';

@Component({
  selector: 'axy-button-confirm',
  standalone: true,
  imports: [AxyButton, AxyLongPress],
  template: `
    <axy-button
      appearance="outline"
      (activated)="confirm()"
      axyLongPress
      (pointerdown)="pressing.set(true)"
      (pointerup)="pressing.set(false)"
    >
      @if (pressing()) { <span>Maintenez pour confirmer…</span> }
      @else { <span>Confirmer</span> }
    </axy-button>
  `
})
export class AxyButtonConfirm {
  pressing = signal(false);
  confirm(){ /* do something */ }
}
```
</details>


---

## Exercice 4 — Virtualisation d’une grande liste (`cdk-virtual-scroll-viewport`)
Exposez un composant `AxyVirtualList` qui prend :
- `items: readonly T[]` (**input signal**),
- un **template de rendu** via `<ng-template let-item>`,
- une **hauteur item** et une **hauteur viewport**.

**Commandes :**
```bash
ng add @angular/cdk
ng g c components/axy-virtual-list --project=lib-axy  
```

<details>
<summary>✅ Correction</summary>

**`components/axy-virtual-list/axy-virtual-list.component.ts`**
```ts
import { Component, TemplateRef, ViewChild, ViewContainerRef, input } from '@angular/core';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'axy-virtual-list',
  standalone: true,
  imports: [ScrollingModule, NgTemplateOutlet],
  template: `
    <cdk-virtual-scroll-viewport
      [itemSize]="itemSize()" [style.height.px]="viewportHeight()">
      @for (item of items(); track item) {
        <ng-container
          [ngTemplateOutlet]="tpl"
          [ngTemplateOutletContext]="{ $implicit: item }">
        </ng-container>
      }
    </cdk-virtual-scroll-viewport>
  `
})
export class AxyVirtualList<T> {
  items = input<readonly T[]>([]);      // Alternative: @Input() items: readonly T[] = [];
  itemSize = input<number>(40);
  viewportHeight = input<number>(320);

  // fournie par l’usage
  tpl!: TemplateRef<T>;
}
```

**Utilisation** :
```html
<axy-virtual-list [items]="bigArray" [itemSize]="48" [viewportHeight]="480">
  <ng-template let-item #tpl>
    <div class="row">{{ item.label }}</div>
  </ng-template>
</axy-virtual-list>
```
</details>


---

## Exercice 5 — Chargement **dynamique** d’un composant (au niveau composant)
Créez `AxyDynamicHost` capable de **charger un composant** passé en **input** (type `Type<any>`) + **props** (`Record<string, any>`).  
Utilisez `ViewContainerRef.createComponent` et `EnvironmentInjector`.

**Commandes :**
```bash
ng g c components/axy-dynamic-host --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

```ts
import { Component, Type, ViewChild, ViewContainerRef, input, inject, EnvironmentInjector } from '@angular/core';

@Component({
  selector: 'axy-dynamic-host',
  standalone: true,
  template: `<ng-container #host></ng-container>`,
})
export class AxyDynamicHost {
  component = input<Type<any> | null>(null);
  props = input<Record<string, any>>({});

  @ViewChild('host', { read: ViewContainerRef, static: true })
  private vcr!: ViewContainerRef;

  private env = inject(EnvironmentInjector);

  ngOnChanges() {
    this.vcr.clear();
    const Cmp = this.component();
    if (!Cmp) return;
    const ref = this.vcr.createComponent(Cmp, { environmentInjector: this.env });
    Object.assign(ref.instance as object, this.props());
  }
}
```
</details>


---

## Exercice 6 — Héritage de **directive** par un composant
Créez une directive **abstraite** `AxyFocusable` offrant : `focus()` + gestion de `tabindex`.  
Puis un composant `AxyFocusChip` **hérite** (extends) la directive pour devenir `focusable` nativement.

**Commandes :**
```bash
ng g d directives/axy-focusable --project=lib-axy 
ng g c components/axy-focus-chip --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**`directives/axy-focusable.directive.ts`**
```ts
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[axyFocusable]',
  standalone: true,
  host: {
    'tabindex': '0',
    '(keydown.enter)': 'focus()',
  }
})
export abstract class AxyFocusable {
  protected el = inject(ElementRef<HTMLElement>);
  focus(){ this.el.nativeElement.focus(); }
}
```

**`components/axy-focus-chip/axy-focus-chip.component.ts`**
```ts
import { Component } from '@angular/core';
import { AxyFocusable } from '../../directives/axy-focusable.directive';

@Component({
  selector: 'axy-focus-chip',
  standalone: true,
  // pas besoin de lister la directive en "imports" si on étend (inheritance côté TS)
  template: `<span class="chip"><ng-content /></span>`,
  host: {
    'class': 'axy-chip',
    'tabindex': '0', // hérite du comportement de focus()
  },
  styles: [`
    .chip{ display:inline-flex; align-items:center; gap:.25rem;
      padding:.25rem .5rem; border-radius:999px; background:var(--chip-bg, #eee) }
    :host(:focus-visible){ outline: 2px solid dodgerblue; }
  `]
})
export class AxyFocusChip extends AxyFocusable {}
```
</details>


---

## Exercice 7 — Encapsulation d’un `<input>` (FormControl & `model()`)
Implémentez `AxyTextField` :
- support **FormControl** (ControlValueAccessor) **ou** liaison **`model()`** bidirectionnelle,
- slots : `label`, `hint`, `error`,
- variantes : `outlined | filled`,
- états : `required`, `disabled`.

**Commandes :**
```bash
ng g c components/axy-text-field --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**Approche moderne (model) :**

```ts
import { Component, model } from '@angular/core';

@Component({
  selector: 'axy-text-field',
  standalone: true,
  template: `
    <label class="field" [class.filled]="appearance==='filled'">
      @if (label) { <span class="label">{{ label }}</span> }
      <input
        [required]="required" [disabled]="disabled"
        [value]="value()"
        (input)="value.set(($event.target as HTMLInputElement).value)"
        />
      @if (hint) { <small class="hint">{{ hint }}</small> }
      @if (error && invalid) { <small class="error">{{ error }}</small> }
    </label>
  `,
  styles:[`
    .field{ display:grid; gap:.25rem }
    .label{ font-weight:600 }
    .hint{ opacity:.7 } .error{ color:crimson }
    .filled input{ background:#f6f6f6 }
  `]
})
export class AxyTextField {
  value = model<string>(''); // <axy-text-field [(value)]="...">
  label?: string;
  hint?: string;
  error?: string;
  appearance: 'outlined'|'filled' = 'outlined';
  required = false;
  disabled = false;
  invalid = false;
}
```

**Alternative canonique (ControlValueAccessor)** — à proposer si intégration profonde aux `FormsModule`/`ReactiveFormsModule` :  
*(laissez un commentaire dans le code renvoyant vers CVA standard avec `NG_VALUE_ACCESSOR`)*
</details>


---

## Exercice 8 — `@defer` : chargement paresseux d’un panneau d’info
Créez `AxyInfoPanel` qui **diffère** le rendu d’une section lourde (par ex. graphiques) avec `@defer` et un **placeholder**.

**Commandes :**
```bash
ng g c components/axy-info-panel --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'axy-info-panel',
  standalone: true,
  template: `
    <section class="panel">
      <h3>Statistiques</h3>
      @defer (on idle) {
        <axy-heavy-chart /> <!-- Exemple: composant lourd -->
      } @placeholder {
        <p>Pré-chargement…</p>
      }
    </section>
  `
})
export class AxyInfoPanel {}
```
</details>


---

## Exercice 9 — Composant `AxyGrid` responsive (CSS Grid + slots)
Construisez un conteneur `AxyGrid` qui accepte :
- `cols` (xs/sm/md/lg) → transforme en `grid-template-columns`,
- `gap`,
- **slots** nommés par attribut (`slot="header" | "footer" | "aside"`).

**Commandes :**
```bash
ng g c components/axy-grid --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

```ts
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'axy-grid',
  standalone: true,
  template: `
    <div [style]="style()">
      <header><ng-content select="[slot=header]"/></header>
      <aside><ng-content select="[slot=aside]"/></aside>
      <main><ng-content /></main>
      <footer><ng-content select="[slot=footer]"/></footer>
    </div>
  `,
  styles:[`
    :host{ display:block }
    div{ display:grid; min-height:0; min-width:0 }
    header{ grid-area: h } aside{ grid-area: a }
    main{ grid-area: m } footer{ grid-area: f }
  `]
})
export class AxyGrid {
  cols = input<{ xs:number; sm:number; md:number; lg:number }>(
    { xs:1, sm:2, md:3, lg:4 }
  );
  gap = input<string>('1rem');

  style = computed(() => ({
    display: 'grid',
    gap: this.gap(),
    gridTemplateAreas: `'h h' 'a m' 'f f'`,
    gridTemplateColumns: `repeat(${this.cols().md}, minmax(0,1fr))`
  }));
}
```
</details>


---

## Exercice 10 — `AxyToastService` + composant hôte déclaratif
Créez un **service** de toasts + un composant `AxyToaster` qui **écoute** le service et affiche une **pile** avec `@for`.  
Servez-vous de **signals** et **inject()**.

**Commandes :**
```bash
ng g s services/axy-toast --project=lib-axy
ng g c components/axy-toaster --project=lib-axy 
```

<details>
<summary>✅ Correction</summary>

**`services/axy-toast.service.ts`**
```ts
import { Injectable, signal } from '@angular/core';
export type Toast = { id:number; text:string; kind?:'info'|'success'|'error' };
@Injectable({ providedIn: 'root' })
export class AxyToastService {
  private seq = 0;
  readonly items = signal<Toast[]>([]);
  show(text:string, kind:Toast['kind']='info'){
    const id = ++this.seq;
    this.items.update(arr => [...arr, { id, text, kind }]);
    setTimeout(() => this.dismiss(id), 3000);
  }
  dismiss(id:number){ this.items.update(arr => arr.filter(t => t.id !== id)); }
}
```

**`components/axy-toaster/axy-toaster.component.ts`**
```ts
import { Component, inject } from '@angular/core';
import { AxyToastService } from '../../services/axy-toast.service';

@Component({
  selector: 'axy-toaster',
  standalone: true,
  template: `
    <div class="toaster">
      @for (t of svc.items(); track t.id) {
        <div class="toast" [class]="t.kind">{{ t.text }}</div>
      }
    </div>
  `,
  host: { 'class': 'toaster-host' },
  styles:[`
    .toaster{ position:fixed; inset:auto 1rem 1rem auto; display:grid; gap:.5rem }
    .toast{ padding:.5rem .75rem; border-radius:.5rem; background:#333; color:white }
    .success{ background:#17653e } .error{ background:#8a182a } .info{ background:#2f3f78 }
  `]
})
export class AxyToaster {
  svc = inject(AxyToastService);
}
```
</details>

---

## Notes de qualité et alternatives canoniques

- **`inject()`** vs `@Inject(...)` : préférez `inject()` dans les contextes statiques et pour éviter l’injection via constructeur.
- **`host`** metadata vs `@HostBinding`/`@HostListener` : choisissez `host` quand la déclaration est simple et statique.  
  *Alternative* :
  ```ts
  // @HostBinding('class.active') active = true;
  // @HostListener('click') onClick(){ ... }
  ```
- **`input()` / `output()` / `model()`** : API signals moderne.  
  *Alternative* :
  ```ts
  // @Input() value = '';
  // @Output() changed = new EventEmitter<string>();
  ```
- **Control Flow `@if/@for/@defer`** : obligez-vous à bannir `*ngIf`/`*ngFor` dans ces exercices pour pratiquer la nouvelle syntaxe.

Bon code ✨
