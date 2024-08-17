import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
   debugger
    if (req.url.includes('http://localhost:8000/login')) {
      return next.handle(req); // Skip interception for login requests
    }
    else if(req.url.includes('http://localhost:8000/refresh')){
      return next.handle(req);
    }
    else{
      let datalocal:any = localStorage.getItem("hotelUser")
    let localTokan = JSON.parse(datalocal);
    // console.log(localTokan)
    
    const request = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${localTokan}`)});
    // alert(datalocal)
    return next.handle(request)
  }
   
    
  }
}