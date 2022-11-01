import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AboutMe } from '../models/about-me';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class AboutmeService {
  AboutMeURL = 'http://localhost:8080/api/aboutme/';

  constructor(private httpClient: HttpClient) { }

  public mostrar(): Observable<AboutMe> {
    return this.httpClient.get<AboutMe>(this.AboutMeURL + 'leer', cabecera);
  }

  public crear(AboutMe: AboutMe): Observable<any> {
    return this.httpClient.post<any>(this.AboutMeURL + 'crear', AboutMe, cabecera);
  }

  public editar(AboutMe: AboutMe, id: number): Observable<any> {
    return this.httpClient.put<any>(this.AboutMeURL + `editar/${id}`, AboutMe.content, cabecera);
  }

  public borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.AboutMeURL + `borrar/${id}`, cabecera);
  }
}
