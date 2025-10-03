// axy-base-css.directive.ts
import { Directive, inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({ selector: '[axyBaseCss]', standalone: true })
export class AxyBaseCssDirective implements OnInit {


  private doc = inject(DOCUMENT);

  ngOnInit() {
    if (this.doc.getElementById('axy-base-css')) return;
    const s = this.doc.createElement('style');
    s.id = 'axy-base-css';
    s.textContent = `
      :root{ --ui-surface:#0f1524; --ui-surface-2:#151b2b; --ui-text:#eef3ff; --ui-muted:#a8b2c8; --ui-radius:14px; --ui-shadow:0 10px 28px rgba(8,12,20,.28); --ui-pad:14px; }
      html,body{ height:100vh;margin:0; font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Noto Sans", "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"; background:  #79d0ffff; color: var(--ui-text); }
      *, *::before, *::after { box-sizing: border-box; }
      app-root{display: flex; flex-direction: column; height:100vh;}
       app-root > :nth-child(1) {
        flex: 0 0 5vh; /* hauteur fixe 5vh */
      }

      /* 2e enfant (contenu central) */
       app-root > :nth-child(2) {
        flex: 1 1 auto; /* prend tout l’espace restant */
        min-height: 0;  /* pour autoriser le scroll */
        overflow-y: auto;
         align-items: start;
      }

      /* 3e enfant (footer) */
       app-root > :nth-child(3) {
        flex: 0 0 5vh; /* hauteur fixe 5vh */
      }
      `;
    this.doc.head.appendChild(s);
  }
}
