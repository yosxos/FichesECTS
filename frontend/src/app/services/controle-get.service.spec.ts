import { TestBed } from '@angular/core/testing';

import { ControleGetService } from './controle-get.service';

describe('ControleGetService', () => {
  let service: ControleGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControleGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
