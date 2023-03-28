import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './intranet/pages/accueil/accueil.component';
import { AccueilPrincipalComponent } from './pages/accueil-principal/accueil-principal.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';

const routes: Routes = [
  { path: '', component: AccueilPrincipalComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
