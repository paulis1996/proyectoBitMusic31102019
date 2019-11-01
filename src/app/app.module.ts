import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ListaReproduccionComponent } from "./lista-reproduccion/lista-reproduccion.component";
import { DescargaComponent } from "./descarga/descarga.component";
import { InfoPerfilComponent } from './info-perfil/info-perfil.component';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import { ActualizarCancionComponent } from './actualizar-cancion/actualizar-cancion.component';
import { FormRegistroComponent } from './form-registro/form-registro.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { CuentaAdministradorComponent } from './cuenta-administrador/cuenta-administrador.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/inicio"
  },
  {
    path: "descarga",
    component: DescargaComponent
  },
  { path: "reproduccion", component: ListaReproduccionComponent }
];

@NgModule({
  declarations: [AppComponent, ListaReproduccionComponent, DescargaComponent, InfoPerfilComponent, CrearCancionComponent, ActualizarCancionComponent, FormRegistroComponent, FormLoginComponent, CuentaAdministradorComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
