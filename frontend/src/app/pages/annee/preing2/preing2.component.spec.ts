import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preing2Component } from './preing2.component';

describe('Preing2Component', () => {
  let component: Preing2Component;
  let fixture: ComponentFixture<Preing2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Preing2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Preing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
