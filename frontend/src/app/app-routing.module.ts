import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilPrincipalComponent } from './pages/accueil-principal/accueil-principal.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { AuthgardGuard } from './guards/authgard.guard';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: AccueilPrincipalComponent },
  { path: 'connexion', component: ConnexionComponent },
  {path: 'inscription',component: InscriptionComponent},
  {path: 'confirmation',component: ConfirmationComponent},
  { path:'intranet', loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule),canActivate:[AuthgardGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
