import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  Login() {
    // El servicio authService.login ya redirecciona
    // en caso de inicio de sesión positivo.
//    this.authService.login(this.email, this.password)
  }

  ngOnInit() {}
}
