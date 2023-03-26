import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ing2Component } from './ing2.component';

describe('Ing2Component', () => {
  let component: Ing2Component;
  let fixture: ComponentFixture<Ing2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ing2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
