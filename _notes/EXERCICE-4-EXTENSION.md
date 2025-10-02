# Extension — Exercice 4 : Virtualisation **typée** avec directive de template

Cette extension améliore l’exercice 4 en fournissant un **typage fort** du `let-item` du `<ng-template>` projeté,
grâce à une **directive de template typée** avec *context guard* + l’API **`contentChild(...)`** (fonctionnelle, signal).  
Compatible Angular **v19**, nouvelle syntaxe de flow (`@if`, `@for`).

---

## 1) Commandes de génération

```bash
# Directive de template typée
ng g d directives/axy-item-tpl --project=lib-axy --standalone --prefix=axy

# Composant (si besoin de le régénérer)
ng g c components/axy-virtual-list --project=lib-axy --standalone --export --prefix=axy
```

---

## 2) Directive typée — `AxyItemTplDirective<T>`

> Sert uniquement à **typer** le contexte du `ng-template` projeté (`let-item`).  
> La liaison `[axyItemTplOf]` est **optionnelle** et n’est utilisée **que pour l’inférence de type** côté template.

**`lib-axy/directives/axy-item-tpl.directive.ts`**
```ts
import { Directive, Input, TemplateRef } from '@angular/core';

export interface AxyItemContext<T> {
  $implicit: T;
}

@Directive({
  selector: 'ng-template[axyItemTpl]',
  standalone: true,
})
export class AxyItemTplDirective<T> {
  /** Transporte uniquement le type de l'array pour l'inférence (pas utilisé à l'exécution). */
  @Input('axyItemTplOf') declare of?: readonly T[];

  constructor(public template: TemplateRef<AxyItemContext<T>>) {}

  // ⭐ Context guard : informe Angular que le contexte du template = { $implicit: T }
  static ngTemplateContextGuard<T>(
    _dir: AxyItemTplDirective<T>,
    _ctx: unknown
  ): _ctx is AxyItemContext<T> {
    return true;
  }
}
```

---

## 3) Composant corrigé — `AxyVirtualList<T>` (API `contentChild` + flow moderne)

**`lib-axy/components/axy-virtual-list/axy-virtual-list.component.ts`**
```ts
import { Component, input, contentChild } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import { AxyItemTplDirective } from '../../directives/axy-item-tpl.directive';

/**
 * Usage attendu :
 * <axy-virtual-list [items]="users">
 *   <ng-template axyItemTpl [axyItemTplOf]="users" let-item>
 *     <div class="row">{{ item.name }} – {{ item.email }}</div>
 *   </ng-template>
 * </axy-virtual-list>
 */
@Component({
  selector: 'axy-virtual-list',
  standalone: true,
  imports: [ScrollingModule, NgTemplateOutlet],
  template: `
    <cdk-virtual-scroll-viewport
      [itemSize]="itemSize()"
      [style.height.px]="viewportHeight()"
    >
      @if (tpl()) {
        @for (item of items(); track item) {
          <ng-container
            [ngTemplateOutlet]="tpl()!.template"
            [ngTemplateOutletContext]="{ $implicit: item }" />
        }
      } @else {
        <div class="axy-virtual-list__placeholder">
          Aucun template fourni. Ajoutez :
          <code>&lt;ng-template axyItemTpl let-item&gt;...&lt;/ng-template&gt;</code>
        </div>
      }
    </cdk-virtual-scroll-viewport>
  `,
})
export class AxyVirtualList<T> {
  /** Données à virtualiser */
  items = input<readonly T[]>([]);
  /** Hauteur d'un item en px */
  itemSize = input<number>(40);
  /** Hauteur du viewport en px */
  viewportHeight = input<number>(320);

  /** Récupère le template typé projeté */
  tpl = contentChild.required<AxyItemTplDirective<T>>(AxyItemTplDirective);
}
```

---

## 4) Exemple d’usage — **typage fort** dans le template appelant

```html
<axy-virtual-list [items]="users">
  <!-- "users" est User[] ⇒ let-item est inféré comme User -->
  <ng-template axyItemTpl [axyItemTplOf]="users" let-item>
    <div class="row">{{ item.name }} – {{ item.email }}</div>
  </ng-template>
</axy-virtual-list>
```

> Grâce à `[axyItemTplOf]="users"` + `ngTemplateContextGuard`, **`let-item`** est correctement typé.

---

## 5) Points clés & alternatives

- **`contentChild.required(...)`** → échoue tôt si aucun `<ng-template>` n’est fourni (DX plus claire).
- On pourrait utiliser `contentChild(TemplateRef)` mais **sans typage** du `let-item` côté appelant.
- Si vous avez **plusieurs slots de template**, créez plusieurs directives (`axyHeaderTpl`, `axyFooterTpl`, …) chacune avec son **context guard**.
- Le `track` de `@for` ici est `track item` (par **identité**). Pour des objets, exposez une clé stable, ex. `track item.id`.

Bon code ✨
