import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
 constructor(private authSer:AuthService){

 }
 ngOnInit():void{
  this.authSer.authUserData();
 }
 ngOnDestroy(): void {
   
 }
}

