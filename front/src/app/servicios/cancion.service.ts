import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of  } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Cancion } from "../modelos/cancion.module";


@Injectable({
  providedIn: 'root'
})
export class CancionService {

readonly httpOptions = {
    //headers: new HttpHeaders({'Content-Type': 'application/json'})
    //headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
    //headers: new HttpHeaders({ "Accept": "application/json" })
  };

//readonly Url_API = 'http://localhost:3000/api/cancion'
readonly Url_API = 'http://localhost:3000/api/canciones'

  constructor(private http: HttpClient) { }
  getCanciones(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.Url_API);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  postCancion(cancion:Cancion): Observable<Cancion> {
      var formData: any = new FormData();
      formData.append("titulo", cancion.titulo);
      formData.append("duracion", cancion.duracion);
      formData.append("genero", cancion.genero);
      formData.append("artista", cancion.artista);
      formData.append("archivo", cancion.archivo);
      return this.http.post<Cancion>(this.Url_API, formData, this.httpOptions);
  }

  getCancion(id: number): Observable<Cancion> {
    const url = this.Url_API+"/"+id;
    console.log(url);
    return this.http.get<Cancion>(url).pipe(
      tap(_ => console.log('fetched Cancion id=${id}')),
      catchError(this.handleError<Cancion>('getCancion id=${id}'))
    );
  }

  updateCancion(_id:String, cancion:Cancion): Observable<Cancion> {
    var formData: any = new FormData();
    formData.append("_id", _id);
    formData.append("titulo", cancion.titulo);
    formData.append("duracion", cancion.duracion);
    formData.append("genero", cancion.genero);
    formData.append("artista", cancion.artista);
    formData.append("archivo", cancion.archivo);
    return this.http.put<Cancion>(this.Url_API, formData, this.httpOptions);
  }
  deleteCancion(id: any): Observable<Cancion> {
    const url = this.Url_API+"/"+id;
    return this.http.delete<Cancion>(url, this.httpOptions).pipe(
      tap(_ => console.log('deleted Cancion id='+id)),
      catchError(this.handleError<Cancion>('deleteCancion'))
    );
  }
}
