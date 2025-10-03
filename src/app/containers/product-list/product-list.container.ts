import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { AxyComponentsPipesDirectives } from '@bridges/axy';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ...AxyComponentsPipesDirectives
  ],
  templateUrl: './product-list.container.html',
  styleUrl: './product-list.container.scss'
})
export class ProductListContainer {
  productService = inject(ProductService);
}
