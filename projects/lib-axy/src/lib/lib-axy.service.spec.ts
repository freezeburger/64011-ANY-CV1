import { TestBed } from '@angular/core/testing';

import { LibAxyService } from './lib-axy.service';

describe('LibAxyService', () => {
  let service: LibAxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibAxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
