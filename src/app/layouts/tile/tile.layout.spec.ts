import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileLayout } from './tile.layout';

describe('TileLayout', () => {
  let component: TileLayout;
  let fixture: ComponentFixture<TileLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
