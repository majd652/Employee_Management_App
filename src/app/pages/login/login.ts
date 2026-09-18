import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { FormsModule,FormGroup, Validators } from '@angular/forms';
import { globalConstant } from '../../core/globalConstants/tokenConstant';
import { EmployeeFormValidationPipe } from '../../core/pipes/employee-form-validation-pipe';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { LoginModel } from '../../core/models/login.model';
@Component({
  imports: [FormsModule, EmployeeFormValidationPipe,ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  router = inject(Router);
  loginForm: FormGroup;
  login: LoginModel = new LoginModel();
  constructor(private http: HttpClient,private fb:FormBuilder) {
   this.loginForm = this.fb.group({
    userName: ['',Validators.required],
    password: ['',Validators.required]
   })
  }
  markFormGroupTouched(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(key =>{
      const control = formGroup.get(key);
      control?.markAsTouched()
    })
  }
  get f(){
    return this.loginForm.controls
  }
 
  onLogin() {
    if (this.loginForm.valid) {
    this.http.post(environment.API_URL + "login", this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.result) {
          localStorage.setItem(globalConstant.TOKEN_KEY, JSON.stringify(res.data));
          this.router.navigateByUrl('/Admin');
        } else {
          alert("Login failed");
          console.log(res.message);
        }
      }  
    })
    }else{
      this.markFormGroupTouched(this.loginForm);
      alert("Please fill all the fields");
    }
  }
}
