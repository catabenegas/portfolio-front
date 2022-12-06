import { Educacion } from './../models/educacion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})}; 

@Injectable({
  providedIn: 'root'
})
export class EduService {
  eduURL = 'https://portfolio-back-production-dab2.up.railway.app/api/edu/'

  constructor(private httpClient: HttpClient) { }

  public mostrarTodo(): Observable<Educacion[]> {
    return this.httpClient.get<Educacion[]>(this.eduURL + 'leer', cabecera);
  }

  public mostrar(id: number): Observable<Educacion> {
    return this.httpClient.get<Educacion>(this.eduURL + `mostrar/${id}`, cabecera);
  }

  public crear(edu: Educacion): Observable<any> {
    return this.httpClient.post<any>(this.eduURL + 'crear', edu, cabecera);
  }

  public editar(edu: Educacion, id: number): Observable<any> {
    return this.httpClient.put<any>(this.eduURL + `editar/${id}`, edu, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.eduURL + `borrar/${id}`, cabecera);
  }

}
