import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { AccueilPrincipalComponent } from './pages/accueil-principal/accueil-principal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormationComponent } from './pages/modal-formation/modal-formation.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    FooterComponent,
    HeaderComponent,
    AccueilPrincipalComponent,
    ModalFormationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
