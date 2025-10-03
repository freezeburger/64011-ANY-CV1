import { Injectable } from '@angular/core';
import { CrudAbstract, CrudEndpoint } from '@bridges/axy';
import { ProductDTO } from '../dto/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudAbstract<ProductDTO> {
  override endpoint:CrudEndpoint = '/api/products';
}
