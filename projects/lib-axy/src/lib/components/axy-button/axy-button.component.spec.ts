import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxyButtonComponent } from './axy-button.component';

describe('AxyButtonComponent', () => {
  let component: AxyButtonComponent;
  let fixture: ComponentFixture<AxyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxyButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
