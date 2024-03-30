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
  private userId:string;
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
  public getUserId(){
    return this.userId;
  }

  authUserData(){
    const authInformation = this.getAuthData();
    const now = new Date();
    const inFuture = authInformation.expirationDate.getTime() - now.getTime();
    if(inFuture > 0){
      this.token = authInformation.token;
      this.setTimer(inFuture / 1000);
      this.userAuthenticated =true;
      this.userId = authInformation.userId;
      this.authListener.next(true);
      
    }

  }

  updateUser(auth: Auth){
    this.http.post('http://localhost:3000/api/user/signUp', auth )
      .subscribe(res=>{
        console.log(res);
        this.router.navigate(['/']);
        },
         error=>{
        this.authListener.next(false);
       }
    );

  }

  private setTimer(duration:number){
    this.logOutTime= setTimeout(()=>{
      this.logout();
    },duration * 1000 );
  }


  loginUser(auth: Auth){
    this.http.post<{token:string, expiresIn: number,userId: string}>('http://localhost:3000/api/user/login', auth )
      .subscribe(res=>{
        console.log(res.token);
        this.token = res.token;
        this.userId = res.userId;
       this.setTimer(res.expiresIn);
       const now = new Date();
       const expirationDate = new Date(now.getTime() + res.expiresIn * 1000 );
        this.saveAuthData(this.token, expirationDate, this.userId);
        //sending login status to ui
        if(this.token){
          this.userAuthenticated = true;
          this.authListener.next(true);

        }
        this.router.navigate(['/']);
      },error=>{
        this.authListener.next(false);
      }
      );

  }

  logout(){
    // clearing the token and making authentication to false
    this.token=null;
    this.userAuthenticated=false;
    this.userId = null;
    this.authListener.next(false);
    clearTimeout(this.logOutTime);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
  
 private saveAuthData(token:string, expirationDate:Date, userId: string){
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate',expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

  }

  getAuthData(){
     const token = localStorage.getItem('token');
     const expirationDate = localStorage.getItem('expirationDate');
     const userId = localStorage.getItem('userId');


     if(!token && ! expirationDate){
      return null;
     }
     return{
      token: token,
      expirationDate : new Date(expirationDate),  // here creating Date from expirationDate coz expirationDate is in the form of time in ms
      userId : userId
    }
  }
}
