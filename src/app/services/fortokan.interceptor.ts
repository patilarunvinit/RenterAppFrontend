import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError,switchMap,of } from 'rxjs';
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
   
    let url = 'https://adnyatech.pythonanywhere.com/'
    const excludedUrls = [
       url + 'login',
       url + 'refresh',
       url + 'request_otp',
       url + 'verify_otp',
       url + 'reset_password',

    ];
    
    if (excludedUrls.some(excludedUrl => req.url.startsWith(excludedUrl))) {
      return next.handle(req); // Skip interception for URLs in the excludedUrls list
    }
    else{
      let datalocal:any = localStorage.getItem("hotelUser")
      let localTokan = JSON.parse(datalocal);
    
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localTokan}`)});
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handleAuthError(error, req, next);
          } 
          return of(null as unknown as HttpEvent<any>);
        })
      );
    }
  }
   




  private handleAuthError(error: HttpErrorResponse, authReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.services.refreshTokan().pipe(
      switchMap((response: { access: string }) => { 
        const newAuthReq = authReq.clone({
          setHeaders: {
            Authorization: `Bearer ${response.access}`
          }
        });
        return next.handle(newAuthReq);
      }),
      catchError((err) => {
        return of(null as unknown as HttpEvent<any>);
      })
    );
  }


}
  
