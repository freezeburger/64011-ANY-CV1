import { Component, Directive, inject, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlotTheory } from './theory/slot.theory';

import { Appearances, AxyButtonComponent as AxyButton, AxyLongPressDirective, AxyLongPressTargetDirective, HeaderComponent } from '@bridges/axy';

import { PipeTheory } from './theory/pipe.theory';
import { DirectiveTheory } from './theory/directive.theory';
import { DirectiveCompositionTheory } from './theory/directive-composition.theory';
import { InheritanceTheory } from './theory/inheritance.theory';
import { DirectiveInheritance, DirectiveInheritanceTheory } from './theory/directive-inheritance.theory';
import { TemplateQueryTheory } from './theory/template-query.theory';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SlotTheory,
    AxyButton,
    PipeTheory,
    DirectiveTheory,
    DirectiveCompositionTheory,
    InheritanceTheory,
    DirectiveInheritance,
    DirectiveInheritanceTheory,
    TemplateQueryTheory,
    AxyLongPressDirective,
    AxyLongPressTargetDirective
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
