import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreIng2Component } from './pre-ing2.component';

describe('PreIng2Component', () => {
  let component: PreIng2Component;
  let fixture: ComponentFixture<PreIng2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreIng2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreIng2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
