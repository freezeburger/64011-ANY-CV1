import { inject, signal, Signal } from "@angular/core";
import { CrudService } from "./crud.type";
import { AcknowledgementStatus, HumanResponse, WithUniqueId } from "./generics.types";
import { HttpClient } from "@angular/common/http";


export abstract class CrudAbstract<T extends WithUniqueId> implements CrudService<T> {

  endpoint!: string;
  data = signal<T[]>([]);

  state: AcknowledgementStatus = AcknowledgementStatus.PENDING;

  protected http = inject(HttpClient);

  constructor() {
    setTimeout(() => {
      if (!this.endpoint) {
        throw new Error("Endpoint is required");
      }
    });
  }

  create(data: Omit<T, "id">): Promise<HumanResponse<T>> {

    return new Promise((resolve) => {
      this.http.post<T>(this.endpoint, data).subscribe(
        data => {
          this.data.update((current) => [data, ...current]);
          resolve({ message: "Created", data: data as T });
        }
      );
    });
  }

  read(id?: T["id"] | undefined): Promise<HumanResponse<T | T[]>> {

    const url = id ? `${this.endpoint}/${id}` : this.endpoint;

    return new Promise((resolve) => {
      if (id) {
        this.http.get<T>(url).subscribe(
          data => {
            this.data.update((current) => current.map(item => item.id === data.id ? data : item));
            resolve({ message: "Retrieved", data: data as T });
          }
        );
      } else {
        this.http.get<T[]>(url).subscribe(
          data => {
            this.data.set(data);
            resolve({ message: "Retrieved", data: data as T[] });
          }
        );
      }
    });
  }

  update(target: T, data: Partial<Omit<T, "id">>): Promise<HumanResponse<T>> {
    return new Promise((resolve) => {
      this.http.put<T>(`${this.endpoint}/${target.id}`, data).subscribe(
        data => {
          this.data.update((current) => current.map(item => item.id === data.id ? data : item));
          resolve({ message: "Updated", data: data as T });
        }
      );
    });
  }

  delete(target: T): Promise<HumanResponse<T>> {
    return new Promise((resolve) => {
      this.http.delete<T>(`${this.endpoint}/${target.id}`).subscribe(
        () => {
          this.data.update((current) => current.filter(item => item.id !== target.id));
          resolve({ message: "Deleted", data: target });
        }
      );
    });
  }
}

