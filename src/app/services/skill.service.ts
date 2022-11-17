import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  skillURL = 'https://portfolio-back3233.herokuapp.com/api/skill/'

  constructor(private httpClient: HttpClient) { }

  public mostrarTodo(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.skillURL + 'leer', cabecera);
  }

  public mostrar(id: number): Observable<Skill> {
    return this.httpClient.get<Skill>(this.skillURL + `mostrar/${id}`, cabecera);
  }

  public crear(skill: Skill): Observable<any> {
    return this.httpClient.post<any>(this.skillURL + 'crear', skill, cabecera);
  }

  public editar(skill: Skill, id: number): Observable<any> {
    return this.httpClient.put<any>(this.skillURL + `editar/${id}`, skill, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.skillURL + `borrar/${id}`, cabecera);
  }

}