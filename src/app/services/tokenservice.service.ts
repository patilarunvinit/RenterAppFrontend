import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators'

import { Router } from '@angular/router';


interface ResponseType {
  access: any; // Adjust as needed
}



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='https://b5da-103-148-62-157.ngrok-free.app/'
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { 
    // this.autoRefreshToken(),
    // this.refreshTokan
  
  }

  ngOnInit(){}

  login(obj: any) {
    // console.log(obj);
    return this.http.post(this.apiroot + 'login', obj);
  }



  Ownerdata() {
    return this.http.get(this.apiroot + 'user',);
  }
  
  
  addAdrress(addr:any) {
    return this.http.post(this.apiroot + 'addAddress',addr);
  }


  addAdrresscount() {
    return this.http.get(this.apiroot + 'addresscount');
  }
  
  
  getadrress(filter:any) {
    
    return this.http.get(this.apiroot + 'getaddress?available=' + filter);
  }

  addRenter(renter:any) {
    console.log('renter = ' + renter)
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


  fullremainpay(data:any) {
    return this.http.post(this.apiroot + 'addfullremain',data);
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

  sendotpapi(email:any) {
    return this.http.post(this.apiroot + 'request_otp' , email);
  }

  verifyotp(data:any) {
    return this.http.post(this.apiroot + 'verify_otp', data);
  }

  paswordchange(data:any) {
    return this.http.post(this.apiroot + 'reset_password' , data);
  }

  
  logoutApi() {
    this.ref_tokan= localStorage.getItem('ref_tokan');
    this.ref_tokan = this.ref_tokan.replace(/^"(.*)"$/, '$1');
    return this.http.post(this.apiroot + 'logout', {'refresh': this.ref_tokan});
  }

//work


 
  ref_tokan:any;
  refreshTokan(): Observable<ResponseType> {
    this.ref_tokan= localStorage.getItem('ref_tokan');
    this.ref_tokan = this.ref_tokan.replace(/^"(.*)"$/, '$1');
    // console.log({'refresh':this.ref_tokan})
    return this.http.post<ResponseType>(this.apiroot + 'refresh', {'refresh':this.ref_tokan}).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('hotelUser', JSON.stringify(response.access));
        } else {
          // alert('Check User Credentials');
        }
      }),
      catchError((error) => {
        //invallied token here
        // alert(error.error.detail);

        localStorage.removeItem('ref_tokan');
        localStorage.removeItem('hotelUser');
        this.router.navigateByUrl('/home');
        return throwError(error);
      })  
    );
    
    
    
    
    
    
    // .subscribe((res:any)=>{
    //   console.log('Response:', res.access);
    //   if(res.access) {
    //     localStorage.setItem('hotelUser',JSON.stringify(res.access));

    //     }
    //   else {
    //     alert('Check User Credentials')
    //   }
    // },
    // error=> {
    //   // console.log(error.error.detail)
    //   alert(error.error.detail)

    // })

  }




  


  



  // autoRefreshToken() {

  //   if(this.ref_tokan){
  //     setInterval(() => {
  //       this.refreshTokan();
  //     }, 8 * 1000); 
  //   }
  // }




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
