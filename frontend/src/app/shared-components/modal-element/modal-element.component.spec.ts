import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalElementComponent } from './modal-element.component';

describe('ModalElementComponent', () => {
  let component: ModalElementComponent;
  let fixture: ComponentFixture<ModalElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
