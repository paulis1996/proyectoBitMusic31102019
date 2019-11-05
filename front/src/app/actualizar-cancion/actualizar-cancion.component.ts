import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../servicios/cancion.service';

@Component({
  selector: "actualizar-cancion",
  templateUrl: "./actualizar-cancion.component.html",
  styleUrls: ["./actualizar-cancion.component.css"]
})
export class ActualizarCancionComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder,
    private _cancionservice: CancionService) { } //notacion para servicios


  _id = '';
  isLoadingResults = false;
  cancionForm: FormGroup = this.builder.group({
    titulo: ['', Validators.required],
    duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    genero: ['', Validators.required],
    artista: ['', Validators.required], //Para añadir varios validators
    archivo: [null, Validators.required]
  })

  ngOnInit() {
    this.getCancion(this.route.snapshot.params.id);
    this.cancionForm = this.builder.group({
      titulo: ['', Validators.required],
      duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      genero: ['', Validators.required],
      artista: ['', Validators.required], //Para añadir varios validators
      archivo: [null, Validators.required]
    });
  }
  enviar() {
    console.log(this.cancionForm.value);
    this._cancionservice.postCancion(this.cancionForm.value).subscribe(response => {
      alert('Se creó la canción correctamente') // En angular material ya hay mensajes prestablecidos 
    })
  }
  onSelectFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.cancionForm.patchValue({
      archivo: file
    });
    this.cancionForm.get('archivo').updateValueAndValidity()

  }
  

  getCancion(id: any) {
    console.log("this.cancionForm.value"+id);
    this._cancionservice.getCancion(id).subscribe((data: any) => {
      console.log(data);
      this._id = data._id;
      this.cancionForm.setValue({
        id:data.id,
        titulo: data.titulo,
        duracion: data.duracion,
        genero: data.genero,
        artista: data.artista,
        archivo: data.archivo
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this._cancionservice.updateCancion(this._id, this.cancionForm.value)
      .subscribe((res: any) => {
        const id = res._id;
        this.isLoadingResults = false;
        this.router.navigate(['/consultarCancion', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }


}
