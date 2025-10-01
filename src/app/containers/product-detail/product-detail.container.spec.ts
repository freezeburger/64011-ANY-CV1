import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailContainer } from './product-detail.container';

describe('ProductDetailContainer', () => {
  let component: ProductDetailContainer;
  let fixture: ComponentFixture<ProductDetailContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
