# Extension — Exercice 7B : Intégration par abstraction et héritage

Cette variante de l’exercice 7 illustre une **intégration profonde aux formulaires Angular** (ControlValueAccessor, Reactive Forms)
par le biais d’une **classe abstraite réutilisable**.  
Chaque composant de champ hérite de cette classe, qui centralise :
- la mécanique `ControlValueAccessor`,
- la connexion automatique au `NgControl`,
- la gestion des signaux `value/disabled/touched`,
- l’accessibilité de base (`aria-*`, `describedBy`),
- les erreurs et messages.

---

## 1. Base abstraite — `AxyFormControlAccessor<T>`

```ts
import {
  Directive,
  forwardRef,
  inject,
  signal,
  computed,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';

type ErrorMessages = Partial<Record<string, string>>;

@Directive({
  // Pas de selector : uniquement pour héritage TS
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AxyFormControlAccessor<any>),
      multi: true,
    },
  ],
})
export abstract class AxyFormControlAccessor<T> implements ControlValueAccessor {
  protected ngControl = inject(NgControl, { self: true, optional: true });

  readonly value = signal<T | null>(null);
  readonly disabled = signal<boolean>(false);
  readonly touched = signal<boolean>(false);

  errorMessages: ErrorMessages | undefined;

  readonly cid = Math.random().toString(36).slice(2, 9);
  readonly inputId = `axy-${this.cid}`;
  readonly labelId = `${this.inputId}-label`;
  readonly hintId  = `${this.inputId}-hint`;
  readonly errorId = `${this.inputId}-error`;

  protected control = computed(() => this.ngControl?.control ?? null);

  readonly invalid = computed(() => {
    const c = this.control();
    return !!c && c.invalid && (c.touched || c.dirty);
  });

  readonly ariaInvalid = computed(() => (this.invalid() ? 'true' : 'false'));

  readonly describedBy = computed(() => {
    const ids: string[] = [];
    if (this.hasHint()) ids.push(this.hintId);
    if (this.invalid()) ids.push(this.errorId);
    return ids.length ? ids.join(' ') : null;
  });

  protected hasLabel(): boolean { return false; }
  protected hasHint(): boolean  { return false; }

  firstErrorMessage(): string {
    const c = this.control();
    if (!c || !c.errors) return '';
    const keys = Object.keys(c.errors);
    if (!keys.length) return '';
    const key = keys[0];

    const builtin: Record<string, (e: any) => string> = {
      required: () => 'Ce champ est requis.',
      minlength: (e) => `Longueur minimale: ${e?.requiredLength}.`,
      maxlength: (e) => `Longueur maximale: ${e?.requiredLength}.`,
      email:     () => 'Adresse e-mail invalide.',
      pattern:   () => 'Format invalide.',
    };

    if (this.errorMessages?.[key]) return this.errorMessages[key] as string;
    if (builtin[key]) return builtin[key](c.errors[key]);
    return 'Valeur invalide.';
  }

  private _onChange: (val: T | null) => void = () => {};
  private _onTouched: () => void = () => {};

  writeValue(v: T | null): void { this.value.set(v ?? null); }
  registerOnChange(fn: (val: T | null) => void): void { this._onChange = fn; }
  registerOnTouched(fn: () => void): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled.set(isDisabled); }

  protected emitInput(next: T | null): void {
    this.value.set(next);
    this._onChange(next);
  }
  protected markTouched(): void {
    this.touched.set(true);
    this._onTouched();
  }
}
```

---

## 2. Composant concret — `AxyTextField`

```ts
import { Component } from '@angular/core';
import { AxyFormControlAccessor } from '../../directives/form/axy-form-control-accessor.directive';

type Appearance = 'outlined' | 'filled';

@Component({
  selector: 'axy-text-field',
  standalone: true,
  template: `
    <label class="field" [class.filled]="appearance==='filled'" [attr.for]="inputId">
      @if (label) {
        <span class="label" [attr.id]="labelId">{{ label }}</span>
      }

      <input
        [id]="inputId"
        [attr.aria-labelledby]="label ? labelId : null"
        [attr.aria-describedby]="describedBy()"
        [attr.aria-invalid]="ariaInvalid()"
        [required]="required"
        [disabled]="disabled()"
        [value]="value() ?? ''"
        (input)="onInput($event)"
        (blur)="markTouched()"
        [attr.placeholder]="placeholder ?? null"
        [attr.type]="type"
      />

      @if (hint) { <small class="hint" [attr.id]="hintId">{{ hint }}</small> }

      @if (invalid()) {
        <small class="error" [attr.id]="errorId">{{ firstErrorMessage() }}</small>
      }
    </label>
  `,
  host: { class: 'axy-text-field-host' },
  styles: [`
    :host{ display:block; }
    .field{ display:grid; gap:.25rem; }
    .label{ font-weight:600; }
    .hint{ opacity:.75; }
    .error{ color:crimson; }
    .filled input{ background:#f6f6f6; }
    input[aria-invalid="true"]{ outline: 2px solid rgba(220,20,60,.35); }
  `],
})
export class AxyTextField extends AxyFormControlAccessor<string> {
  label?: string;
  hint?: string;
  placeholder?: string;
  appearance: Appearance = 'outlined';
  required = false;
  type: string = 'text';

  override errorMessages = {
    required: 'Ce champ est requis.',
    email: 'Adresse invalide.',
  };

  protected override hasLabel(): boolean { return !!this.label; }
  protected override hasHint(): boolean  { return !!this.hint; }

  onInput(ev: Event) {
    const v = (ev.target as HTMLInputElement).value ?? '';
    this.emitInput(v);
  }
}
```

---

## 3. Exemple d’utilisation (Reactive Forms)

```ts
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AxyTextField } from 'lib-axy/components/axy-text-field/axy-text-field.component';

@Component({
  standalone: true,
  selector: 'app-text-field-demo',
  imports: [ReactiveFormsModule, AxyTextField],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <axy-text-field
        formControlName="email"
        label="Email"
        placeholder="prenom.nom@domaine.tld"
        [required]="true"
      ></axy-text-field>

      <axy-text-field
        formControlName="username"
        label="Nom d’utilisateur"
        [required]="true"
      ></axy-text-field>

      <button type="submit" [disabled]="form.invalid">Envoyer</button>
    </form>

    <pre>{{ form.value | json }}</pre>
  `,
})
export class TextFieldDemoComponent {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
  });

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

---

## Avantages de l’approche par héritage
- **Factorisation** : toute la logique CVA + erreurs est centralisée.
- **Lisibilité** : les composants de champ se concentrent sur leur UI et leurs options propres.
- **Cohérence** : même gestion des erreurs, de l’accessibilité et des états dans tous les champs.
- **Évolutivité** : facile d’ajouter `AxySelectField`, `AxyDateField`, etc., qui héritent tous de la base.
