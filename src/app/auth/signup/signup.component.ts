import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  authData: Auth;
  constructor(private auth : AuthService){}

  submitForm(signUpForm:NgForm){
    if(signUpForm.invalid){
      return;
    }
    this.auth.updateUser(this.authData= {email: signUpForm.value.email, password:signUpForm.value.password});


  }

}
