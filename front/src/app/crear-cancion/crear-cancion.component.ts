import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../servicios/cancion.service';


@Component({
  selector: "crear-cancion",
  templateUrl: "./crear-cancion.component.html",
  styleUrls: ["./crear-cancion.component.css"]
})
export class CrearCancionComponent implements OnInit {

  listaCanciones:any = []

  constructor(private builder: FormBuilder, 
    private _cancionservice: CancionService ) { } //notacion para servicios

  cancionForm: FormGroup = this.builder.group({
    titulo: ['', Validators.required],
    duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    genero: ['', Validators.required],
    artista: ['', Validators.required], //Para añadir varios validators
    archivo:['',Validators.required]
  })
  ngOnInit() {}
  enviar(registerInfo: FormGroup) {
    this.listaCanciones = registerInfo

    this._cancionservice.postCancion(this.listaCanciones).subscribe(response=>{
      alert ('Se creó la canción correctamente') // En angular material ya hay mensajes prestablecidos 
      //this.obtenerCanciones()
    })
    
  }
}