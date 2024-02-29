import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  updateUser(auth: Auth){
    this.http.post('http://localhost:3000/api/user/signUp', auth )
      .subscribe(res=>{
        console.log(res);
      });

  }
}
