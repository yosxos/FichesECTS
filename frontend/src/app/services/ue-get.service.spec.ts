import { TestBed } from '@angular/core/testing';

import { UeGetService } from './ue-get.service';

describe('UeGetService', () => {
  let service: UeGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UeGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
