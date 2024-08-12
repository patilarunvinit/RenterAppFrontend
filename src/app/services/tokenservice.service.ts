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
  
  
  addAdrress(addr:any) {
    return this.http.post(this.apiroot + 'addAddress',addr);
  }
  
  
  getadrress(filter:any) {
    debugger
    return this.http.get(this.apiroot + 'getaddress?available=' + filter);
  }

  addRenter(renter:any) {
    console.log(renter)
    return this.http.post(this.apiroot + 'addrenter',renter);
  }

 
  getadrressforlease() {
    return this.http.get(this.apiroot + 'addressforlease');
  }

  getreanterforlease() {
    return this.http.get(this.apiroot + 'renterforlease');
  }

  addpayment(payment:any) {
    return this.http.post(this.apiroot + 'addpayment',payment);
  }

  addlease(lease:any) {
    console.log(lease)
    return this.http.post(this.apiroot + 'addlease',lease);
  }

  getaddresssingle(id:any) {
    return this.http.get(this.apiroot + 'getsingleaddress?address_id=' + id);
  }

  getrentersingle(id:any) {
    return this.http.get(this.apiroot + 'Getrenterifonlease?address_id=' + id);
  }

  getrent(date:any) {
    return this.http.get(this.apiroot + 'getlease?date='+ date);
  }

  getfilerdate() {
    return this.http.get(this.apiroot + 'getmonths');
  }


  // ref_tokan:any;
  // refreshTokan() {
  //   this.ref_tokan= localStorage.getItem('ref_tokan');
  //   alert(this.ref_tokan)
  //   // return this.http.get(this.apiroot + 'refresh', this.ref_tokan);
  // }
}
