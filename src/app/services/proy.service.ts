import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})}; 

@Injectable({
  providedIn: 'root'
})
export class ProyService {
  proyURL = 'https://portfolio-back3233.herokuapp.com/api/proy/'

  constructor(private httpClient: HttpClient) { }

  public mostrarTodo(): Observable<Proyecto[]> {
    return this.httpClient.get<Proyecto[]>(this.proyURL + 'leer', cabecera);
  }

  public mostrar(id: number): Observable<Proyecto> {
    return this.httpClient.get<Proyecto>(this.proyURL + `mostrar/${id}`, cabecera);
  }

  public crear(proy: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.proyURL + 'crear', proy, cabecera);
  }

  public editar(proy: Proyecto, id: number): Observable<any> {
    return this.httpClient.put<any>(this.proyURL + `editar/${id}`, proy, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.proyURL + `borrar/${id}`, cabecera);
  }

}
