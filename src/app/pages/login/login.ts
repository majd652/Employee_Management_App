import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { tokenConstant } from '../../core/globalConstants/tokenConstant';
@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  router = inject(Router);
  login: any = {
    userName: "",
    password: ""
  }
  constructor(private http: HttpClient) {

  }
  onLogin() {
    this.http.post(environment.API_URL + "login", this.login).subscribe({
      next: (res: any) => {
        if (res.result) {
          localStorage.setItem(tokenConstant.TOKEN_KEY, JSON.stringify(res.data));
          this.router.navigateByUrl('/Admin');
        } else {
          alert("Login failed");
          console.log(res.message);
        }
      }


    })
  }
}
