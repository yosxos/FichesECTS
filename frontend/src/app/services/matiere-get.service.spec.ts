import { TestBed } from '@angular/core/testing';

import { MatiereGetService } from './matiere-get.service';

describe('MatiereGetService', () => {
  let service: MatiereGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
