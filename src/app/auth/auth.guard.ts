import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard {
    

    constructor(private authService: AuthService, private router: Router){

    }
    canActivate(route:ActivatedRouteSnapshot, status:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>{

        const isAuth = this.authService.getAuth();
        if(!isAuth)
        {   this.router.navigate(['auth/login'])
            
        }

        return isAuth;

    }
}