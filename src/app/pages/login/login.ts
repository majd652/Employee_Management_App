import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    debugger;
    this.http.post(environment.API_URL + "login", this.login).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.router.navigateByUrl('/dashboard');
        } else {
          alert("Login failed");
          console.log(res.message);
          debugger;
        }
      }


    })
  }
}
