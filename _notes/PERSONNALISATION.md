

# Rehearsal

## Outils

* IDE
    * VS Code
    * Jetbrains
    * Visual Studio
* NodeJS + NPM
    * terminal `node -v` utiliser LTS
    * https://nodejs.org/fr/about/previous-releases
    * `@angular/cli` - `npm i -g @angular/cli`
    * `ng add @compodoc/compodoc`
* DevTools Web
    * https://angular.dev/tools/devtools
* Documentation
    * https://angular.dev/
    * https://developer.mozilla.org/fr/

## Projet / Workspace Angular :

`ng new app-lab`

## Concepts Fondamentaux 

> Angular propose 5 concepts de repartiton du code selon son rôle dans l'IHM

* `@NgModule`  - Organisation (rassembler les autyrtes concepts)
* `@Component` - Unité (HTML / CSS / JS en TS) de l'IHM
* `@Directive` - Abstraction, élévation des composants.
* `@Pipe`      - Abstraction, regle de présentation.
* `@Service`   - Abstraction, regle logique partageable.

## Mécanismes de meta-programmation

> La relation entre le code dféveloppé et les fonctionnalités du framework est assurée par des annontations appelées "décorateurs"
> **Il y 19 décorateurs.**

**Creation**
* `@NgModule`               - EVOLUTION -> Standalone Component
* `@Component` 
* `@Directive` 
* `@Pipe`      
* `@Injectable` (Service)   

**Communication**
* `@Input`                  - EVOLUTION -> Syntaxe fonctionnelle
* `@Output`                 - EVOLUTION -> Syntaxe fonctionnelle
* `@Attribute` 
* `@HostListener`       ❓ 
* `@HostBinding`        ❓
* `@ContentChild`       ❓  - EVOLUTION -> Syntaxe fonctionnelle
* `@ContentChildren`    ❓  - EVOLUTION -> Syntaxe fonctionnelle
* `@ViewChild`          ❓  - EVOLUTION -> Syntaxe fonctionnelle
* `@ViewChildren`       ❓  - EVOLUTION -> Syntaxe fonctionnelle

**Injection**
* `@Inject`                 - EVOLUTION -> Syntaxe fonctionnelle
* `@Optional`               - EVOLUTION -> Syntaxe fonctionnelle
* `@Host`               ❓   - EVOLUTION -> Syntaxe fonctionnelle
* `@Self`                   - EVOLUTION -> Syntaxe fonctionnelle
* `@SkipSelf`               - EVOLUTION -> Syntaxe fonctionnelle

## Mécanismes utilitaires

* Routing SPA
    * guard
    * resolver
* Injection de dépendance
* Client Http
    * interceptor
* Modele de réactivité (zoneJS + Observale)

## Evolutions

* Standalone Component
* Syntaxe Fonctionnelle
* Syntaxe de Control Flow
* Modele de réactivité (Signal)


## @angular/cli

`ng generate` ou `ng g` `--help`

## Structure de projet

> Modélisation TypeScript

* AppShell (Component)      - Souvent 'app-root'
* Page (Component)          - Navigation
* Containers (Component)    - Encapsuler un expérience utilisateur.
    * Service Spécialisé
    * Composent spécialisé
    * Directive / Pipes Spécialisées
* Layout (Component)        - Agencement dans l'écran
* Presentation  (Component) - Fondation Visuelle
* Service Applicatif
    * Utilitaire
    * Fonctionnels
* Directive / Pipes Applicatif

## Command Line

> programm command [option]
    - CommandVerbeuse `generate` vs Raccourcis `g`
    - Option Verbeuse `--version` vs Raccourcis `-v`

## Code Smell

* Complexité Cyclomatique (TS/HTML)
* Redondance Negative
* Mono Responsablité non respectée
    * class verbeuse et template verbeux
    * absence de service spécialisé
    * injection trop nombreuses
    * utilisation de httpCLient en dehors des services

## Lab