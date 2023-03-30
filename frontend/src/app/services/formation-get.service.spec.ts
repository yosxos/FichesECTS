import { TestBed } from '@angular/core/testing';

import { FormationGetService } from './formation-get.service';

describe('FormationGetService', () => {
  let service: FormationGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
