import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragComponent } from './drag/drag.component';
import { BodyComponent } from './body/body.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SublevelMenuComponent } from './sidenav/sublevel-menu.component';
import { AddFichesComponent } from './add-fiches/add-fiches.component';
import { ConnexionComponent } from './connexion/connexion.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DragComponent,
    BodyComponent,
    DashboardComponent,
    SidenavComponent,
    SublevelMenuComponent,
    AddFichesComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


 
 

export class AppModule { }
