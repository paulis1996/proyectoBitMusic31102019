import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../servicios/cancion.service';


@Component({
  selector: "crear-cancion",
  templateUrl: "./crear-cancion.component.html",
  styleUrls: ["./crear-cancion.component.css"]
})
export class CrearCancionComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private builder: FormBuilder, 
    private _cancionservice: CancionService ) { } //notacion para servicios
  
  isLoadingResults = false;
  cancionForm: FormGroup = this.builder.group({
    titulo: ['', Validators.required],
    duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    genero: ['', Validators.required],
    artista: ['', Validators.required], //Para añadir varios validators
    archivo:[null,Validators.required]
  })
  ngOnInit() {}
  enviar() {
    this.isLoadingResults = true;
    console.log(this.cancionForm.value);
    this._cancionservice.postCancion(this.cancionForm.value).subscribe(response=>{
      const id = response._id;
        this.isLoadingResults = false;
        this.router.navigate(['/ConsultarCanciones']);
        alert ('Se creó la canción correctamente') // En angular material ya hay mensajes prestablecidos 
    })
  }
  onSelectFile(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.cancionForm.patchValue({
      archivo: file
    });
    this.cancionForm.get('archivo').updateValueAndValidity()

  }
}