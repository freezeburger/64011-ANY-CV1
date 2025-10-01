import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartContainer } from './product-cart.container';

describe('ProductCartContainer', () => {
  let component: ProductCartContainer;
  let fixture: ComponentFixture<ProductCartContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCartContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCartContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
