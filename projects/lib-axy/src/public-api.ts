/*
 * Public API Surface of lib-axy
 * Tout ce qui doit etre accessible par les applications qui consomment la librarie
 * (components, services, modules, ...)
 * Doit etre exporte ici
 */


/**
 * Générer dans un dossier "components" un composant header et le rendre accessible via cette API publique
 * ng generate component components/header --project=lib-axy
 * ng build --project lib-axy
 */

export * from './lib/components/header/header.component';
export * from './lib/components/footer/footer.component';
export * from './lib/components/axy-button/axy-button.component';
