import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='https://0696-103-148-62-157.ngrok-free.app/'
  constructor(private http: HttpClient) { }

  login(obj: any) {
    // debugger
    console.log(obj);
    return this.http.post(this.apiroot + 'login', obj);
  }



  Ownerdata() {
    debugger
    return this.http.get(this.apiroot + 'user',);
  }
}
