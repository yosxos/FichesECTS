import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';
import { FormAddEditComponent } from './pages/form-add-edit/form-add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [
    AddFormationComponent,
    FormAddEditComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class IntranetModule { }
