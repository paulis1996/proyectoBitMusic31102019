import { Component, OnInit } from "@angular/core";
import { Usuario } from '../modelos/usuario.module';
import { UsuarioService } from '../usuario.service';
import { LoginService } from '../login.service';

@Component({
  selector: "cuenta-administrador",
  templateUrl: "./cuenta-administrador.component.html",
  styleUrls: ["./cuenta-administrador.component.css"]
})
export class CuentaAdministradorComponent implements OnInit {
  constructor(
    private _usuarioService: UsuarioService,
    private _loginService: LoginService
  ) {}

  listadoUsuarios: Usuario[] = [];
  listadoOriginal: Usuario[] = [];
  textoBuscado: string;
  usuarioActual: Usuario;

  ngOnInit() {
    this._usuarioService.obtenerUsuarios().subscribe((res: Usuario[]) => {
      this.listadoUsuarios = res;
      this.listadoOriginal = res;
    });
    this.usuarioActual = this._loginService.obtenerUsuario();
  }

  eliminarUsuario(id: string) {
    const usuario = this.listadoUsuarios.find(x => x._id === id);
    if (confirm(`¿Esta seguro de eliminar el usuario ${usuario.nombre}?`)) {
      this._usuarioService.eliminarUsuario(id).subscribe(() => {
        this.listadoUsuarios = this.listadoUsuarios.filter(x => x._id !== id);
      });
    }
  }

  buscar() {
    this.listadoUsuarios = this.listadoOriginal.filter(x => x.nombre.toLocaleLowerCase().includes(this.textoBuscado.toLocaleLowerCase()));
  }
}
