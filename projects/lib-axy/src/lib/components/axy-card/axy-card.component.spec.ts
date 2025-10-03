import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxyCardComponent } from './axy-card.component';

describe('AxyCardComponent', () => {
  let component: AxyCardComponent;
  let fixture: ComponentFixture<AxyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
