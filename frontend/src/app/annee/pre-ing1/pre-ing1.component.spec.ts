import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreIng1Component } from './pre-ing1.component';

describe('PreIng1Component', () => {
  let component: PreIng1Component;
  let fixture: ComponentFixture<PreIng1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreIng1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreIng1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
