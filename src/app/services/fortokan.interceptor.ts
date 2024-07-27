import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    if (req.url.includes('https://0696-103-148-62-157.ngrok-free.app/login')) {
      return next.handle(req); // Skip interception for login requests
    }
    else{
      let datalocal:any = localStorage.getItem("hotelUser")
    let localTokan = JSON.parse(datalocal);
    console.log(localTokan)
    const request = req.clone({
      headers: req.headers.set('Authorization', 'bearer' + localTokan)});

    return next.handle(request);
    }
    // let datalocal:any = localStorage.getItem("hotelUser")
    // let localTokan = JSON.parse(datalocal);
    // console.log(localTokan)
    // const request = req.clone({
    //   headers: req.headers.set('Authorization', 'bearer' + localTokan)});

    // // Pass the cloned request instead of the original request to the next handler
    // return next.handle(request);
  }
}