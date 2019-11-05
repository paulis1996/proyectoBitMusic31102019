import { Component, OnInit } from "@angular/core";
import { Usuario } from "../modelos/usuario.module";
import { LoginService } from "../login.service";
import { UsuarioService } from "../usuario.service";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  templateUrl: "./form-login.component.html",
  styleUrls: ["./form-login.component.css"]
})
export class FormLoginComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit() {}

  login(usuario: Usuario) {
    this._loginService.login(usuario).then(() => {
        this._router.navigate(["descarga"]);
    }).catch(() => {
      alert("Usuario Inválido");
    });
  }
}
