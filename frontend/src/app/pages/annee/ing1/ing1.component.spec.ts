import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ing1Component } from './ing1.component';

describe('Ing1Component', () => {
  let component: Ing1Component;
  let fixture: ComponentFixture<Ing1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ing1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ing1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
