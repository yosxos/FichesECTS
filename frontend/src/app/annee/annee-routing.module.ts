import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ing1Component } from './ing1/ing1.component';
import { Ing2Component } from './ing2/ing2.component';
import { Ing3Component } from './ing3/ing3.component';
import { PreIng1Component } from './pre-ing1/pre-ing1.component';
import { PreIng2Component } from './pre-ing2/pre-ing2.component';

const routes: Routes = [
  {
    path: 'preing1',
    component: PreIng1Component
  },
  {
    path: 'preing2',
    component: PreIng2Component
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
