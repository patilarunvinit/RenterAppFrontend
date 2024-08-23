import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError,switchMap } from 'rxjs';
import { Router } from '@angular/router'; 
import {TokenserviceService} from './tokenservice.service'





@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private router:Router,
    private services:TokenserviceService,

  ){}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
   
    if (req.url.includes('https://bfbe-103-148-62-157.ngrok-free.app/login')) {
      return next.handle(req); // Skip interception for login requests
    }
    else if(req.url.includes('https://bfbe-103-148-62-157.ngrok-free.app/refresh')){
      return next.handle(req);
    }
    else{
      let datalocal:any = localStorage.getItem("hotelUser")
      let localTokan = JSON.parse(datalocal);
    // console.log(localTokan)
    
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localTokan}`)});
    // alert(datalocal)
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Handle unauthorized error, e.g., redirect to login
            // this.services.refreshTokan();
            return this.handleAuthError(error, req, next);
          } else if (error.status === 403) {
            // Handle forbidden error, e.g., show a message
            console.error('Forbidden request:', error.message);
          }
          // Rethrow the error
          return throwError(error);
        })
      );
    }
  }
   




  private handleAuthError(error: HttpErrorResponse, authReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.services.refreshTokan().pipe(
      switchMap((response: { access: string }) => { // Ensure ResponseType matches
        const newAuthReq = authReq.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access}`
          }
        });
        return next.handle(newAuthReq);
      }),
      catchError((err) => {
        this.router.navigate(['/home']); // Redirect to login
        return throwError(err);
      })
    );
  }


}
  
