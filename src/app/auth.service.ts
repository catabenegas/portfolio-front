import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  /*api = 'https://localhost:4200/api'; //Quizá deba cambiar esto...
  token = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    this.http.post(this.api + '/authenticate', {email: email, password: password})
            .subscribe((resp: any) => {
              // Se redirecciona al usuario a su perfil?
              this.router.navigate(['profile']);
              // Guardamos el token en el storage
              localStorage.setItem('auth_token', resp.token);
            })
  }

  // Se cierra la sesión eliminando el token
  logout() {
    localStorage.removeItem('token');
  }

  // Servicio verifica si existe la sesión
  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }*/
}
