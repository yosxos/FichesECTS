import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFichesComponent } from './add-fiches.component';

describe('AddFichesComponent', () => {
  let component: AddFichesComponent;
  let fixture: ComponentFixture<AddFichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFichesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
