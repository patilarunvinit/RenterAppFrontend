import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Router } from '@angular/router';

import { Network, NetworkStatus } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';



interface ResponseType {
  access: any; // Adjust as needed
}



@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
  apiroot:any='https://adnyatech.pythonanywhere.com/'
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initializeNetworkStatus();
  }

  ngOnInit(){}

  // backend api call start
  login(obj: any) {
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
  // back end api call end


 


  // refresh token fun
  ref_tokan:any;
  refreshTokan(): Observable<ResponseType> {
    this.ref_tokan= localStorage.getItem('ref_tokan');
    this.ref_tokan = this.ref_tokan.replace(/^"(.*)"$/, '$1');
    //api for refresh
    return this.http.post<ResponseType>(this.apiroot + 'refresh', {'refresh':this.ref_tokan}).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('hotelUser', JSON.stringify(response.access));
        } 
      }),
      catchError((error) => {
        // if refresh token expair delete both token
        localStorage.removeItem('ref_tokan');
        localStorage.removeItem('hotelUser');
        this.router.navigateByUrl('/home');
        return throwError(error);
      })  
    ); 

  }


 



  // fun to help app component in routing process
  isUserAuthenticated(): boolean {
    const datalocal = localStorage.getItem('hotelUser');
    if (!datalocal) {
      return false;
    }
    else{
      return true;   
    }
    
    
  }







  // network check start



  // initialize a network
  private networkStatus = new BehaviorSubject<NetworkStatus | null>(null);


  //main network fun
  private async initializeNetworkStatus() {
    // Fetch the initial status
    const status = await Network.getStatus();
    this.networkStatus.next(status);

    // Listen for network status changes
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus.next(status);
    });
  }


  // fun to pass network data to app component
  public getNetworkStatus() {
    return this.networkStatus.asObservable();
  }


  // fun to check is internet is on even if wifi/net on 
  public checkInternetAccess() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
  }
  
}
