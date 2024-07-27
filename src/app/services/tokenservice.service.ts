import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='https://19b4-103-148-62-157.ngrok-free.app/'
  constructor(private http: HttpClient) { }

  login(obj: any) {
    console.log(obj);
    return this.http.post(this.apiroot + 'login', obj);
  }
}
