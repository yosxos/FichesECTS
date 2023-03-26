import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreIng1Component } from './pre-ing1/pre-ing1.component';
import { PreIng2Component } from './pre-ing2/pre-ing2.component';
import { Ing1Component } from './ing1/ing1.component';
import { Ing2Component } from './ing2/ing2.component';
import { Ing3Component } from './ing3/ing3.component';
import { AnneeRoutingModule } from './annee-routing.module';


@NgModule({
  declarations: [
    PreIng1Component,
    PreIng2Component,
    Ing1Component,
    Ing2Component,
    Ing3Component
  ],
  imports: [
    CommonModule,
    AnneeRoutingModule
  ]
})

export class AnneeModule { }
