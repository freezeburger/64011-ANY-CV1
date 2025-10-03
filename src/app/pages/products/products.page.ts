import { Component } from '@angular/core';
import { ProductListContainer } from '../../containers/product-list/product-list.container';
import { ProductCartContainer } from '../../containers/product-cart/product-cart.container';

@Component({
  selector: 'app-products',
  imports: [
    ProductListContainer,
    ProductCartContainer
  ],
  templateUrl: './products.page.html',
  styleUrl: './products.page.scss'
})
export class ProductsPage {

}
