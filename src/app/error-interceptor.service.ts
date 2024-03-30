import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";


export class ErrorInterceptor implements HttpInterceptor{
   
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse )=>{
            console.log("we are in error interceptoor",error);
            alert(error.error.error.message);
            return throwError(error);
        }))
        
    }
}