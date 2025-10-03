import { AcknowledgementStatus, HumanResponse, WithUniqueId } from "axy-dev";

/**
 * CRUD operations
 */
interface CrudService<T extends WithUniqueId>/* contrainte de type */ {

  readonly endpoint:string
  data: T[];
  state:AcknowledgementStatus;

  create: (data: Omit<T, 'id'>) => Promise<HumanResponse<T>>;

  read: (id?: T['id']) => Promise<HumanResponse<T | T[]>>;

  update: (target: T, data: Partial<Omit<T, 'id'>>) => Promise<HumanResponse<T>>;

  delete: (target: T) => Promise<HumanResponse<T>>;
}
