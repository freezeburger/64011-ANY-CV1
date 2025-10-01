import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotTheory } from './slot.theory';

describe('SlotTheory', () => {
  let component: SlotTheory;
  let fixture: ComponentFixture<SlotTheory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotTheory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotTheory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
