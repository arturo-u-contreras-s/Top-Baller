import { TestBed } from '@angular/core/testing';

import { FootballApiService } from '../Services/football-api.service';

describe('FootballApiService', () => {
  let service: FootballApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
