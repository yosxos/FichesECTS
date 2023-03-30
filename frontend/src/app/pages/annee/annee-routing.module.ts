import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ing1Component } from './ing1/ing1.component';
import { Ing2Component } from './ing2/ing2.component';
import { Ing3Component } from './ing3/ing3.component';
import { Preing1Component } from './preing1/preing1.component';
import { Preing2Component } from './preing2/preing2.component';

const routes: Routes = [
  {
    path: 'preing1',
    component: Preing1Component
  },
  {
    path: 'preing2',
    component: Preing2Component
  },
  {
    path: 'ing1',
    component: Ing1Component
  },
  {
    path: 'ing2',
    component: Ing2Component
  },
  {
    path: 'ing3',
    component: Ing3Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AnneeRoutingModule { }
