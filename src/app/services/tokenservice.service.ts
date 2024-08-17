import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='http://localhost:8000/'
  constructor(private http: HttpClient) { 
    this.autoRefreshToken(),
    this.refreshTokan
    
  }

  ngOnInit(){}

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

  addremainpay(remain:any) {
    return this.http.post(this.apiroot + 'addremain',remain);
  }


  addlease(lease:any) {
    console.log(lease)
    return this.http.post(this.apiroot + 'addlease',lease);
  }

  removelease(remove:any) {
    return this.http.post(this.apiroot + 'removelease',remove);
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

  getremain() {
    return this.http.get(this.apiroot + 'getremain');
  }

  gethistory(lease_id:any) {
    return this.http.get(this.apiroot + 'remianhistory?lease_id=' + lease_id);
  }

  getremoveaddress() {
    return this.http.get(this.apiroot + 'addressonlease');
  }

  getremoveinfo(address_id:any) {
    return this.http.get(this.apiroot + 'getremovedata?address_id=' + address_id);
  }



  ref_tokan:any;
  refreshTokan() {
    this.ref_tokan= localStorage.getItem('ref_tokan');
    this.ref_tokan = this.ref_tokan.replace(/^"(.*)"$/, '$1');
    console.log({'refresh':this.ref_tokan})
    this.http.post(this.apiroot + 'refresh', {'refresh':this.ref_tokan}).subscribe((res:any)=>{
      console.log('Response:', res.access);
      if(res.access) {
        localStorage.setItem('hotelUser',JSON.stringify(res.access));

        }
      else {
        alert('Check User Credentials')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

  }


  autoRefreshToken() {


    setInterval(() => {
      this.refreshTokan();
    }, 8 * 1000); // 1 minute in milliseconds
  }




  isUserAuthenticated(): boolean {
    const datalocal = localStorage.getItem('hotelUser');
    if (!datalocal) {
      return false;
    }
    else{
      return true;   
    }
    
    
  }





}
