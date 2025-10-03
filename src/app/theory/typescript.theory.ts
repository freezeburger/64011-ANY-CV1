
/**
 * @fileoverview TypeScript theory content.
 * Typescript is a superset of JavaScript that adds static types.
 * @see https://www.typescriptlang.org/
 * @license Apache-2.0
 *
 * TypeScript sert à expliquer les types de données dans le code.
 * @see https://www.typescriptlang.org/fr/docs/handbook/typescript-in-5-minutes.html
 * A destination de ceux qui connaissent déjà JavaScript.
 * Et qui doivent reprendre la maintenance d'un projet.
 */


/**
 * Par défaut TypeScript infère les types.
 * Assigner c'est Typer !
 */

let aString = 'hello'; // Type inféré : string
aString = 'world'; // OK
//aString = 42; // Erreur de compilation : Type 'number' is not assignable to type 'string'

/**
 * On peut aussi typer explicitement.
 */
let aNumber: number; // Type explicite : number
aNumber = 3.14; // OK
//aNumber = 'hello'; // Erreur de compilation : Type 'string' is not assignable to type 'number'

/**
 * Types de bases
 */
let isDone: boolean = false; // booléen
let count: number = 42; // nombre (entier ou flottant)
let firstname: string = 'Alice'; // chaîne de caractères
let list: number[] = [1, 2, 3]; // tableau de nombres

let tuple: [string, number] = ['hello', 10]; // tuple (tableau de taille fixe)

enum Color { Red, Green, Blue } // énumération
let c: Color = Color.Green; // valeur de l'énumération

let notSure: any = 4; // type any (n'importe quel type)
// on préfère utiliser unknown
let notSure2: unknown = 4; // type unknown (n'importe quel type, mais plus sûr que any)
notSure2 = 'maybe a string instead';

let u:undefined = undefined; // type undefined
let n:null = null; // type null
let v:void = undefined; // type void (absence de type, pour les fonctions qui ne retournent rien)

/**
 * On peut utiliser des unions de types
 */
let union: string | number; // peut être une chaîne ou un nombre
union = 'hello'; // OK
union = 42; // OK
//union = true; // Erreur de compilation : Type 'boolean' is not assignable to type 'string | number'


/**
 * On peut utiliser des intersections de types
 */
type A = { a: string };
type B = { b: number };
type C = A & B;

/**
 * On peut utiliser les unions pour faire des discréminations de types
 */
type Shape = { kind: 'circle'; radius: number } | { kind: 'square'; size: number };
const s1 : Shape = { kind:'circle',radius:10 };
const s2 : Shape = { kind: 'square', size: 20 };

/**
 * On peut définir ses propres types
 * via des interfaces ou des types
 */
interface Person {  name: string; age: number;}
let person: Person = { name: 'Bob', age: 30 };

// alias de type
type Point = { x: number; y: number; };
let point: Point = { x: 10, y: 20 };

/**
 * TypeScript propose un typage structurel par opposition au typage nominal.
 * Deux types sont compatibles s'ils ont la même structure.
 */
interface Named { name: string; }
let named: Named;
named = person; // OK, car person a une propriété name de type string

/**
 * On peut créer des types génériques
 * c-a-d des types qui dépendent d'un autre type pris en paramètre
 */
function identity<T>(arg: T): T {
  return arg;
}
let output = identity<string>('hello'); // output est de type string
let output2 = identity<number>(42); // output2 est de type number

// L'usage de la lettre T est une convention pas une obligation
class Box<U> {
  contents: U;
  constructor(value: U) {
    this.contents = value;
  }
}
let box = new Box<number>(123); // box est de type Box<number>

/**
 * Les type génariques sont très utilisés dans les collections
 */
let numbers: Array<number> = [1, 2, 3]; // tableau de nombres
let strings: Array<string> = ['a', 'b', 'c']; // tableau de chaînes
let tuples: Array<[string, number]> = [['a', 1], ['b', 2]]; // tableau de tuples

/**
 * Les type de base JavaScrtipt sont référencés dans TypeScript
 * via des types globaux. (des fichiers .d.ts de déclarations de types)
 * Par exemple pour le DOM :
 */
let div: HTMLDivElement = document.createElement('div');
div.innerText = 'Hello TypeScript';


/**
 * Une interface peut hériter d'une autre interface
 */
interface Employee extends Person {
  employeeId: number;
}
let employee: Employee = { name: 'Charlie', age: 25, employeeId: 1234 };


/**
 * TypeScript propose des types utilitaires
 * comme Partial, Readonly, Record, Pick, Omit, etc.
 * Pour manipuler les types sans dupliquer les types.
 * Ainsie préserver des sources de vérité.
 */
type PartialPerson = Partial<Person>; // toutes les propriétés de Person sont optionnelles
let partialPerson: PartialPerson = { name: 'Dave' }; // OK

type ReadonlyPerson = Readonly<Person>; // toutes les propriétés de Person sont en lecture seule
let readonlyPerson: ReadonlyPerson = { name: 'Eve', age: 28 };
//readonlyPerson.age = 29; // Erreur de compilation : Cannot assign to 'age' because it is a read-only property

type PersonWithoutAge = Omit<Person, 'age'>; // Person sans la propriété age
let personWithoutAge: PersonWithoutAge = { name: 'Frank' }; // OK

type PersonName = Pick<Person, 'name'>; // Person avec seulement la propriété name
let personName: PersonName = { name: 'Grace' }; // OK


/**
 * unknown vs any
 */

function processUnknownValue(value: unknown) {
  if (typeof value === 'string') {
    console.log('String value:', value.toUpperCase()); // OK, value est traité comme une string
  }
}

function processAnyValue(value: any) {
  console.log('Any value:', value.toUpperCase()); // Pas d'erreur, mais peut causer une erreur à l'exécution si value n'est pas une string
}

/**
 * On peu aussi abstraire les vérifications de types
 * via des fonctions de type garde (type guards)
 */
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
function processUnknownValueAgain(value: unknown) {
  if (isString(value)) {
    console.log('String value:', value.toUpperCase()); // OK, value est traité comme une string
  }
}


/**
 * Operateur d'extraction de type et de keys
 */
type PersonKeys = keyof Person; // "name" | "age"
let key: PersonKeys = 'age';

//typeof
const user = { id: 1, username: 'alice' };
type User = typeof user; // { id: number; username: string; }


/**
 * Accès au type d'une propriété
 */
type PersonNameType = Person['name']; // string
let anotherName: PersonNameType = 'Bob';
