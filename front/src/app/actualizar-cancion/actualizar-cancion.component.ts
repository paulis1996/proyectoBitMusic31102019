import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../servicios/cancion.service';
import { NotificacionService } from '../servicios/notificacion.service';

@Component({
  selector: "actualizar-cancion",
  templateUrl: "./actualizar-cancion.component.html",
  styleUrls: ["./actualizar-cancion.component.css"]
})
export class ActualizarCancionComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder,
    private _cancionservice: CancionService, private notificacionService: NotificacionService) { } //notacion para servicios

  _id = '';
  archivoAnterior = '';
  isLoadingResults = false;
  cancionForm: FormGroup = this.builder.group({
    _id: [''],
    titulo: ['', Validators.required],
    duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    genero: ['', Validators.required],
    artista: ['', Validators.required], //Para añadir varios validators
    archivo: [null]
  })

  ngOnInit() {
    this.getCancion(this.route.snapshot.params.id);
  }

  onSelectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.cancionForm.patchValue({
      archivo: file
    });
    this.cancionForm.get('archivo').updateValueAndValidity()
  }

  getCancion(id: any) {
    console.log("this.cancionForm.value" + id);
    this._cancionservice.getCancion(id).subscribe((data: any) => {
      this._id = data.canciones._id;
      this.archivoAnterior = data.canciones.archivo;
      this.cancionForm.setValue({
        _id: data.canciones._id,
        titulo: data.canciones.titulo,
        duracion: data.canciones.duracion,
        genero: data.canciones.genero,
        artista: data.canciones.artista,
        archivo:null
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this._cancionservice.updateCancion(this._id, this.cancionForm.value)
      .subscribe((res: any) => {
        const id = res.cancionActualizada._id;
        this.isLoadingResults = false;
        this.router.navigate(['/ActualizarCancion', id]);
        this.notificacionService.success("Canción actualizada satisfactoriamente!");
      }, (err: any) => {
        console.log(err);
        this.notificacionService.error("Error al actualizar la canción");
        this.isLoadingResults = false;
      }
      );
  }


}
