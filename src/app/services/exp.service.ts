import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})}; 

@Injectable({ 
  providedIn: 'root'
})
export class ExpService {
  expURL = 'https://portfolio-backend-yea1.onrender.com/api/exp/'

  constructor(private httpClient: HttpClient) { }

  public mostrarTodo(): Observable<Experiencia[]> {
    return this.httpClient.get<Experiencia[]>(this.expURL + 'leer', cabecera);
  }

  public mostrar(id: number): Observable<Experiencia> {
    return this.httpClient.get<Experiencia>(this.expURL + `mostrar/${id}`, cabecera);
  }

  public crear(exp: Experiencia): Observable<any> {
    return this.httpClient.post<any>(this.expURL + 'crear', exp, cabecera);
  }

  public editar(exp: Experiencia, id: number): Observable<any> {
    return this.httpClient.put<any>(this.expURL + `editar/${id}`, exp, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.expURL + `borrar/${id}`, cabecera);
  }
}
