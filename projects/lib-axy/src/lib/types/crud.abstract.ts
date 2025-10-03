import { CrudService } from "./crud.type";
import { WithUniqueId } from "./generics.types";


export abstract class CrudAbstract<T extends WithUniqueId> implements CrudService<T> {
}
