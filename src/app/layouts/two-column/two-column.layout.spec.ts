import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColumnLayout } from './two-column.layout';

describe('TwoColumnLayout', () => {
  let component: TwoColumnLayout;
  let fixture: ComponentFixture<TwoColumnLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoColumnLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoColumnLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
