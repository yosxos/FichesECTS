import { TestBed } from '@angular/core/testing';

import { GestionFichesService } from './gestion-fiches.service';

describe('GestionFichesService', () => {
  let service: GestionFichesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionFichesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
