import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';
import { FormAddEditComponent } from './pages/form-add-edit/form-add-edit.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { EditFormationComponent } from './pages/edit-formation/edit-formation.component';
import { AdminComponent } from './pages/admin/admin.component';



@NgModule({
  declarations: [
    AddFormationComponent,
    FormAddEditComponent,
    EditFormationComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ]
})
export class IntranetModule { }
