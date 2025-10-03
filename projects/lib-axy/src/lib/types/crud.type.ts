import { AcknowledgementStatus, HumanResponse, WithUniqueId } from "./generics.types";

/**
 * CRUD operations
 * Should not be used directly, but through a service class
 * @template T Type of the managed entity, must extend WithUniqueId
 * Extends the CrudAbstract to implement it
 */
export interface CrudService<T extends WithUniqueId>/* contrainte de type */ {

  readonly endpoint:string
  data: T[];
  state:AcknowledgementStatus;

  create: (data: Omit<T, 'id'>) => Promise<HumanResponse<T>>;

  read: (id?: T['id']) => Promise<HumanResponse<T | T[]>>;

  update: (target: T, data: Partial<Omit<T, 'id'>>) => Promise<HumanResponse<T>>;

  delete: (target: T) => Promise<HumanResponse<T>>;
}
