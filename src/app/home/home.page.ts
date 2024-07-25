import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   divHeight:any=window.innerHeight + 'px';
  
   screenHeight:any = window.innerHeight;

  constructor(private platform: Platform,
              private keyboard: Keyboard,
              private router: Router,
              private serviceClass: TokenserviceService,
            ) {
    this.platform.keyboardDidShow.subscribe(ev => {
      const { keyboardHeight } = ev;
      this.divHeight = this.screenHeight + "px";  
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
  
    this.platform.keyboardDidHide.subscribe(() => {
      // Move input back to original location
      this.divHeight = '100%';      // Do something with the keyboard height such as translating an input above the keyboard.

    });
  }


  loginObj: any = {
    "email": "v@gmail.com",
    "password": "v@12345678"
  };
  
  onLogin() {
    // console.log(this.loginObj);
    // this.serviceClass.login(this.loginObj).subscribe((res:any)=>{
    //   console.log('Response:', res);
    //   if(res.jwt) {
    //     alert("Login Success")
    //     localStorage.setItem('hotelUser',JSON.stringify(res.data));
    //     this.router.navigateByUrl('/main-home');
    //   }
    //   else {
    //     alert('Check User Credentials')
    //   }
    // },
    // error=> {
    //   // console.log(error.error.detail)
    //   alert(error.error.detail)

    // })
  }



  
  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  centerlogo:string="assets/img/user-solid.svg"

  
}
