import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";
import { Usuario } from '../modelos/usuario.module';

@Component({
  selector: "descarga",
  templateUrl: "./descarga.component.html",
  styleUrls: ["./descarga.component.css"]
})
export class DescargaComponent implements OnInit {
  constructor(private _loginService: LoginService, private router: Router) {}

  activo = false;
  usuarioActual: Usuario;

  ngOnInit() {
    this.usuarioActual = this._loginService.obtenerUsuario();
  }

  cerrarSesion() {
    this._loginService.logout();
    this.router.navigate(["/"]);
  }

  get() {
    this.activo = !this.activo;
  }
}
