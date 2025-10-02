import { Component, Pipe, PipeTransform } from '@angular/core';

export interface Post {
  title: string;
  text: string;
  timestamp: number;
}

/**
 * Angular Pipe devrait être créer dans des fichiers séparés
 * Ici c'est pour une simplifcation de la lisibilité.
 *
 * Un pipe est une classe contenant une fonction "transform" qui prend une valeur en entrée et retourne une valeur transformée.
 * Les pipes sont utilisés dans les templates pour transformer les données avant de les afficher.
 * Ils sont souvent utilisés pour formater des dates, des nombres, des chaînes de caractères, etc.
 * Ils peuvent être utilisés avec le symbole | dans les templates.
 * Exemple: {{ post.timestamp | date:'short' }} pour formater une date.
 * Les valeurs retournées par les pipes sont automatiquement MISES en CACHE par Angular pour améliorer les performances.
*/

@Pipe({name: 'postTitle', standalone: true})
class PostTitlePipe implements PipeTransform {
  transform(post: Post, withDate = true): string {
    return  `${post.title} ${withDate ? new Date(post.timestamp).toLocaleString() : ''}`;
  }
}


@Component({
  selector: 'app-pipe',
  imports: [PostTitlePipe],
  template: `
    <p>
     {{post | postTitle }}
     {{post | postTitle:false }}
    </p>
  `,
  styles: ``
})
export class PipeTheory {

  post:Post = { title: 'Angular', text: 'Learn Angular Concepts', timestamp: 1678923200000 };

  /**
   * Deleguer la logique de transformation à un pipe
   */
  /*
  transform(post: Post): string {
    return  `${post.title} ${new Date(post.timestamp).toLocaleString()}`;
  }
  */
}

