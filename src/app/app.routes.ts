import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent:() => import('./pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'products',
    loadComponent:() => import('./pages/products/products.page').then(m => m.ProductsPage)
  }
];
