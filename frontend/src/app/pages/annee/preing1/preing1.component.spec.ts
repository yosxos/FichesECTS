import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preing1Component } from './preing1.component';

describe('Preing1Component', () => {
  let component: Preing1Component;
  let fixture: ComponentFixture<Preing1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Preing1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preing1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
