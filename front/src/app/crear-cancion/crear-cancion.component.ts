import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CancionService } from '../servicios/cancion.service';


@Component({
  selector: "crear-cancion",
  templateUrl: "./crear-cancion.component.html",
  styleUrls: ["./crear-cancion.component.css"]
})
export class CrearCancionComponent implements OnInit {

  listaCanciones:any = [];
  reader : FileReader;
  constructor(private builder: FormBuilder, 
    private _cancionservice: CancionService ) { } //notacion para servicios

  cancionForm: FormGroup = this.builder.group({
    titulo: ['', Validators.required],
    duracion: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    genero: ['', Validators.required],
    artista: ['', Validators.required], //Para añadir varios validators
    archivo:[null,Validators.required]
  })
  ngOnInit() {}
  enviar() {
    console.log(this.cancionForm.value);
    this._cancionservice.postCancion(this.cancionForm.value).subscribe(response=>{
      alert ('Se creó la canción correctamente') // En angular material ya hay mensajes prestablecidos 
      //this.obtenerCanciones()
    })
  }
  onSelectFile(event){
    /*let fileList: FileList = event.target.files;
    if(fileList.length > 0){
      this.reader = new FileReader();
      this.reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0].name);
    }*/
    const file = (event.target as HTMLInputElement).files[0];
    this.cancionForm.patchValue({
      archivo: file
    });
    this.cancionForm.get('archivo').updateValueAndValidity()

  }
}