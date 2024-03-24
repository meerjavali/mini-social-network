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

  updateUser(auth: Auth){
    this.http.post('http://localhost:3000/api/user/signUp', auth )
      .subscribe(res=>{
        console.log(res);
        this.router.navigate(['/']);
        
      });

  }
  loginUser(auth: Auth){
    this.http.post<{token:string, expiresIn: number}>('http://localhost:3000/api/user/login', auth )
      .subscribe(res=>{
        console.log(res.token);
        this.token = res.token;
        this.logOutTime= setTimeout(()=>{
          this.logout();
        },res.expiresIn );
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
    this.router.navigate(['/']);
  }
}
