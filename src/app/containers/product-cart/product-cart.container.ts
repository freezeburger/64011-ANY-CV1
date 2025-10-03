import { Component, computed, inject } from '@angular/core';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product-cart',
  imports: [],
  templateUrl: './product-cart.container.html',
  styleUrl: './product-cart.container.scss'
})
export class ProductCartContainer {
  protected productService = inject(ProductService);
  protected productCount = computed(() => ` There is actually ${this.productService.data().length} product(s) available.`);
}
