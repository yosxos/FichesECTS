import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFichesComponent } from './add-fiches/add-fiches.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'addFiche', component: AddFichesComponent},
  {
    path: 'annee',
    loadChildren: () => import('./annee/annee.module').then(m => m.AnneeModule)
  },
  {path: 'parametres', component: ConnexionComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
