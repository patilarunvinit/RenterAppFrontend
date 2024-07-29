import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='http://localhost:8000/'
  constructor(private http: HttpClient) { }

  login(obj: any) {
    console.log(obj);
    return this.http.post(this.apiroot + 'login', obj);
  }



  Ownerdata() {
    return this.http.get(this.apiroot + 'user',);
  }
  ref_tokan:any;
  refreshTokan() {
    this.ref_tokan= localStorage.getItem('ref_tokan');
    alert(this.ref_tokan)
    // return this.http.get(this.apiroot + 'refresh', this.ref_tokan);
  }
}
