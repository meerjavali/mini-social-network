import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "./error/error.component";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
   constructor(private dialog:MatDialog){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse )=>{
             let errorMessage ="An unknown error Occured !!";
             if(error.error.message){
                errorMessage = error.error.message;
             }
            this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
            return throwError(error);
        }))
        
    }
}