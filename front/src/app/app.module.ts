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
    path: "**", component: ErrorComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, CrearCancionComponent, ErrorComponent,ListaReproduccionComponent, DescargaComponent, InfoPerfilComponent, ActualizarCancionComponent, FormRegistroComponent, FormLoginComponent, CuentaAdministradorComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
