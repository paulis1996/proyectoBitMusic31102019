import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cancion } from "../modelos/cancion.module";

@Injectable({
  providedIn: 'root'
})
export class CancionService {

//readonly Url_API = 'http://localhost:3000/api/cancion'
readonly Url_API = 'http://localhost:3000/api/canciones'

  constructor(private http: HttpClient) { }
  getCancion(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>("http://localhost:3000/api/canciones");
  }
  postCancion(cancion): Observable<Cancion[]> {
    return this.http.post<Cancion[]>(
      "http://localhost:3000/api/usuarios",
      cancion
    );
  }

}
