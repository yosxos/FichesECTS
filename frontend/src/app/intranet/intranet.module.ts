import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetRoutingModule } from './intranet-routing.module';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';


@NgModule({
  declarations: [
    AddFormationComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule
  ]
})
export class IntranetModule { }
