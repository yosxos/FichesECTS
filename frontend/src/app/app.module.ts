import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AccueilPrincipalComponent } from './pages/accueil-principal/accueil-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from './pages/modal-formation/modal-formation.component';
import { subscribeOn } from 'rxjs';
import { SublevelMenuComponent } from './pages/sidenav/sublevel-menu.component';
import { SidenavComponent } from './pages/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    FooterComponent,
    AccueilPrincipalComponent,
    ModalFormationComponent,
    SidenavComponent,
    SublevelMenuComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
