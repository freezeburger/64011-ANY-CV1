import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibAxyComponent } from './lib-axy.component';

describe('LibAxyComponent', () => {
  let component: LibAxyComponent;
  let fixture: ComponentFixture<LibAxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibAxyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibAxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
