import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';


@NgModule({
  declarations: [
    AccueilComponent,
    AddFormationComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule
  ]
})
export class IntranetModule { }
