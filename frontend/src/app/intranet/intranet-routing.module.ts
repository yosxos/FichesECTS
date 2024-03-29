import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilPrincipalComponent } from '../pages/accueil-principal/accueil-principal.component';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';
import { EditFormationComponent } from './pages/edit-formation/edit-formation.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminguardGuard } from '../guards/adminguard.guard';

const routes: Routes = [
  {path: '', component:AccueilPrincipalComponent},
  {path: 'edit-formation/:id', component:EditFormationComponent, pathMatch: 'full'},
  {path: 'add-formation', component:AddFormationComponent},
  {path:'admin',component:AdminComponent,canActivate:[AdminguardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
