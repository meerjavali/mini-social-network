import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  logOutTime: any;
  private userAuthenticated =false;
  private authListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  public getToken(){
    return this.token;
  }

  public getAuthListener(){
    return this.authListener.asObservable();
  }
  public getAuth(){
    return this.userAuthenticated;
  }

  authUserData(){
    const authInformation = this.getAuthData();
    const now = new Date();
    const inFuture = authInformation.expirationDate.getTime() - now.getTime();
    if(inFuture > 0){
      this.token = authInformation.token;
      this.setTimer(inFuture / 1000);
      this.userAuthenticated =true;
      this.authListener.next(true);
      
    }

  }

  updateUser(auth: Auth){
    this.http.post('http://localhost:3000/api/user/signUp', auth )
      .subscribe(res=>{
        console.log(res);
        this.router.navigate(['/']);
        
      });

  }

  private setTimer(duration:number){
    this.logOutTime= setTimeout(()=>{
      this.logout();
    },duration * 1000 );
  }


  loginUser(auth: Auth){
    this.http.post<{token:string, expiresIn: number}>('http://localhost:3000/api/user/login', auth )
      .subscribe(res=>{
        console.log(res.token);
        this.token = res.token;
       this.setTimer(res.expiresIn);
       const now = new Date();
       const expirationDate = new Date(now.getTime() + res.expiresIn * 1000 );
        this.saveAuthData(this.token, expirationDate);
        //sending login status to ui
        if(this.token){
          this.userAuthenticated = true;
          this.authListener.next(true);

        }
        this.router.navigate(['/']);
      });

  }

  logout(){
    // clearing the token and making authentication to false
    this.token=null;
    this.userAuthenticated=false;
    this.authListener.next(false);
    clearTimeout(this.logOutTime);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  
 private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');

  }

  getAuthData(){
     const token = localStorage.getItem('token');
     const expirationDate = localStorage.getItem('expirationDate');

     if(!token && ! expirationDate){
      return null;
     }
     return{
      token: token,
      expirationDate : new Date(expirationDate)  // here creating Date from expirationDate coz expirationDate is in the form of time in ms
     }
  }
}
