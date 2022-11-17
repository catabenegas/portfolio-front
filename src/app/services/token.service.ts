import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  key = 'token';

  getToken() : string | null
  {
    return localStorage.getItem(this.key)
  }

  deleteToken()
  {
    localStorage.removeItem(this.key)
  }

  addToken(token : string)
  {
    localStorage.setItem(this.key, token)
  }

}
