import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormationComponent } from './modal-formation.component';

describe('ModalFormationComponent', () => {
  let component: ModalFormationComponent;
  let fixture: ComponentFixture<ModalFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
