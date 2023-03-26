import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ing3Component } from './ing3.component';

describe('Ing3Component', () => {
  let component: Ing3Component;
  let fixture: ComponentFixture<Ing3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ing3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ing3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
