import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";

import { ListaReproduccionComponent } from "./lista-reproduccion/lista-reproduccion.component";
import { DescargaComponent } from "./descarga/descarga.component";
import { InfoPerfilComponent } from './info-perfil/info-perfil.component';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import { ActualizarCancionComponent } from './actualizar-cancion/actualizar-cancion.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { CuentaAdministradorComponent } from './cuenta-administrador/cuenta-administrador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ConsultarCancionesComponent } from './consultar-canciones/consultar-canciones.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,MatMenuModule,
  MatCardModule,
  MatFormFieldModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ConfirmacionDialogComponent } from './confirmacion-dialog/confirmacion-dialog.component';
import { CustomMaterialModule } from './confirmacion-dialog/custom-material.module';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/Inicio"
  },
  {
    path: "Inicio",
    component: HomeComponent
  },/* 
  {
    path: "descarga",
    component: DescargaComponent
  },
  { path: "reproduccion", component: ListaReproduccionComponent }, */
  {
    path: "CrearCancion", component: CrearCancionComponent
  },
  {
    path: "ConsultarCanciones", component: ConsultarCancionesComponent
  },
  {
    path: "ActualizarCancion/:id", component: ActualizarCancionComponent
  },
  {
    path: "**", component: ErrorComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, CrearCancionComponent, ErrorComponent, 
        ListaReproduccionComponent, DescargaComponent, InfoPerfilComponent, ActualizarCancionComponent, FormRegistroComponent,
        FormLoginComponent, CuentaAdministradorComponent, ConsultarCancionesComponent, ConfirmacionDialogComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule, HttpClientModule, 
        BrowserAnimationsModule,CustomMaterialModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,MatMenuModule,
        MatCardModule,ScrollingModule,
        MatFormFieldModule],
  providers: [],
  entryComponents: [ConfirmacionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
