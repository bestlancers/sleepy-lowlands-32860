import { TestBed } from '@angular/core/testing';

import { GetparamsService } from './getparams.service';

describe('GetparamsService', () => {
  let service: GetparamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetparamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
