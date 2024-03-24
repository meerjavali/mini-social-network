import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userAuthenticated = false;
  authSub:Subscription;

  constructor(private authSer:AuthService){

  }

  ngOnInit(): void {
    this.authSub = this.authSer.getAuthListener().subscribe(Authentication=>{
      this.userAuthenticated = Authentication;
    })
    
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    
  }

}
