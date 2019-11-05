import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsuarioService } from "../usuario.service";
import { Usuario } from "../modelos/usuario.module";
import { Router } from "@angular/router";

@Component({
  selector: "form-registro",
  templateUrl: "./form-registro.component.html",
  styleUrls: ["./form-registro.component.css"]
})
export class FormRegistroComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private _usuarioservice: UsuarioService,
    private router: Router
  ) {}

  registroForm: FormGroup = this.builder.group({
    nombre: ["", Validators.required],
    edad: ["", Validators.required],
    correo: ["", Validators.required],
    password: ["", Validators.required]
  });

  enviar(registro: Usuario) {
    this._usuarioservice.postUsuario(registro).subscribe(
      response => {
        this.router.navigate(["login"]);
      },
      error => {
        alert("Ha ocurrido un error al crear el usuario");
      }
    );
  }

  ngOnInit() {}
}
