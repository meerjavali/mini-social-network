import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  authData: Auth;
  constructor(private authService:AuthService){}

  submitForm(loginForm:NgForm){ 
    this.isLoading=true;
  this.authService.loginUser(this.authData= {email: loginForm.value.email, password:loginForm.value.password})
  }

}
