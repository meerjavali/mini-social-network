import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  authData: Auth;
  authstateSub: Subscription;
  constructor(private auth : AuthService){}
  ngOnInit(): void{
    this.authstateSub = this.auth.getAuthListener().subscribe(value=>{
      this.isLoading=value;
    })
  }
  

  submitForm(signUpForm:NgForm){
    if(signUpForm.invalid){
      return;
    }
    this.isLoading=true;
    this.auth.updateUser(this.authData= {email: signUpForm.value.email, password:signUpForm.value.password});


  }
  ngOnDestroy(): void {
    this.authstateSub.unsubscribe();
    
  }

}
