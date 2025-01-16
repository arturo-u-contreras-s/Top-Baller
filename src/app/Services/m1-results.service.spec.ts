import { TestBed } from '@angular/core/testing';

import { M1ResultsService } from './m1-results.service';

describe('M1ResultsService', () => {
  let service: M1ResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(M1ResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
