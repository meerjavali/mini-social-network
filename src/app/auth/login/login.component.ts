import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Auth } from '../auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  isLoading = false;
  authData: Auth;
  authstateSub: Subscription;
  constructor(private authService:AuthService){}
  
  ngOnInit(): void{
    this.authstateSub = this.authService.getAuthListener().subscribe(value=>{
      this.isLoading=value;
    })
  }

  submitForm(loginForm:NgForm){ 
    this.isLoading=true;
  this.authService.loginUser(this.authData= {email: loginForm.value.email, password:loginForm.value.password})
  }
  ngOnDestroy(): void {
    this.authstateSub.unsubscribe();
    
  }

}
