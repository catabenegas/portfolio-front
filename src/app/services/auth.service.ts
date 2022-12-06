import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  api = 'https://portfolio-back-production-dab2.up.railway.app/api';
  token = '';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  tryToLog(nom: string, pwd: string): any {
    return this.http.post(this.api + '/auth/login', {nombreUsuario: nom, password: pwd});
  }

  // Inicia la sesión guardando el token
  login(token : string) {
    this.tokenService.addToken(token);
  }

  // Se cierra la sesión eliminando el token
  logout() {
    this.tokenService.deleteToken();
  }

  // Servicio verifica si existe la sesión
  public get isLogged(): boolean {
    return (this.tokenService.getToken() !== null);
  }
}
