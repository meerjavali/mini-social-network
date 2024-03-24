import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string;
  private authListener = new Subject<boolean>();
  constructor(private http: HttpClient) { }

  public getToken(){
    return this.token;
  }

  public getAuthListener(){
    return this.authListener.asObservable();
  }

  updateUser(auth: Auth){
    this.http.post('http://localhost:3000/api/user/signUp', auth )
      .subscribe(res=>{
        console.log(res);
        
      });

  }
  loginUser(auth: Auth){
    this.http.post<{token:string}>('http://localhost:3000/api/user/login', auth )
      .subscribe(res=>{
        console.log(res.token);
        this.token = res.token;
        //sending login status to ui
        this.authListener.next(true);
      });

  }
}
