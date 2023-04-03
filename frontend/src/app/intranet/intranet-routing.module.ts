import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AddFichesComponent } from './pages/add-fiches/add-fiches.component';

const routes: Routes = [
  {path: 'addFiche', component:AddFichesComponent},
  {path: '', component:AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
