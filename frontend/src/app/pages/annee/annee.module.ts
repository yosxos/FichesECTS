import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ing1Component } from './ing1/ing1.component';
import { Ing2Component } from './ing2/ing2.component';
import { Ing3Component } from './ing3/ing3.component';
import { Preing1Component } from './preing1/preing1.component';
import { Preing2Component } from './preing2/preing2.component';
import { AnneeRoutingModule } from './annee-routing.module';



@NgModule({
  declarations: [
    Ing1Component,
    Ing2Component,
    Ing3Component,
    Preing1Component,
    Preing2Component
  ],
  imports: [
    CommonModule,
    AnneeRoutingModule
  ]
})
export class AnneeModule { }
