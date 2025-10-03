import { Component, inject } from '@angular/core';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.container.html',
  styleUrl: './product-list.container.scss'
})
export class ProductListContainer {
  productService = inject(ProductService);
}
