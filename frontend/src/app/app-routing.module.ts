import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './intranet/pages/accueil/accueil.component';
import { AddFichesComponent } from './intranet/pages/add-fiches/add-fiches.component';
import { AccueilPrincipalComponent } from './pages/accueil-principal/accueil-principal.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

const routes: Routes = [
  { path: '', component: AccueilPrincipalComponent },
  { path: 'connexion', component: ConnexionComponent },
  {
    path: 'annee',
    loadChildren: () => import('./pages/annee/annee.module').then(m => m.AnneeModule)
  },
  { path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
