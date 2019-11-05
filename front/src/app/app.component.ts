import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "./usuario.service";
import { CancionService } from "./cancion.service";
import { Cancion } from "./modelos/cancion.module";
import { Usuario } from "./modelos/usuario.module";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "frontperfil";

  constructor(
    private cancionservice: CancionService,
    private usuarioservice: UsuarioService
  ) {}

  Canciones: Array<Cancion> = [];
  Usuarios: Array<Usuario> = [];

  ngOnInit() {
    /* this.usuarioservice.getUsuario().subscribe(response => {
      this.Usuarios = response;
    }); */

    this.cancionservice.getCanciones().subscribe(response => {
      this.Canciones = response;
    });
  }
}
