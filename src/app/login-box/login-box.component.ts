import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent implements OnInit {

  username = '';
  password = '';
  failed : boolean = false;
  errorMsg = '';

  constructor(private authService: AuthService) {}

  Login() {
    this.username = (<HTMLInputElement>document.getElementById('uname')).value;
    this.password = (<HTMLInputElement>document.getElementById('pwd')).value;
    this.authService.tryToLog(this.username, this.password).subscribe((data : any) => {
      this.authService.login(data.token);
      var cajaLogin = document.getElementById('cajaLogin');
      if (cajaLogin != null)
      {
        cajaLogin.style.display='none';
      }
      this.failed = false;
    },
    (err : any) =>
    {
      this.errorMsg = err.error.message;
      this.failed = true;
    });
  }

  isLogged() {
    return this.authService.isLogged
  }

  Logout() {
    this.authService.logout()
  }

  ngOnInit() {}
}
