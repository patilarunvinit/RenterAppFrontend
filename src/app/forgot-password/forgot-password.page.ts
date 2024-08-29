import { Component, OnInit } from '@angular/core';


import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  divHeight: any;
  screenHeight: any;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,


  ) { 
    this. kaybordfun()
  }

  ngOnInit() {
  }
  kaybordfun(){
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












  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  emaildisplay = 'white'; 
  isEmailValid = false;
  otpdisplay:any = 'none';
  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  onEmailChange() {
    if (this.emailRegex.test(this.formData.email)) {
      this.emaildisplay = 'white'; 
      this.isEmailValid = true; 
      this.otpdisplay = 'block'

    } else {
      this.emaildisplay = 'red';
      this.isEmailValid = false;
      this.otpdisplay = 'bolck'
   
    }
  }

  countdown = 0;         
  private countdownSubscription: Subscription | undefined;
  startCountdown() {
    this.countdown = 30; // Set countdown to 30 seconds
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
        
      } else {
        this.countdownSubscription?.unsubscribe();
        this.otpSent = true; // Reset OTP sent status after countdown
      }
    });
  }


formData = 
     {
      email: '',
      otp_code:''
};
submitForm() {
      console.log(this.formData)
      let email = this.formData.email
      this.serviceClass.verifyotp(this.formData).subscribe((res:any)=>{
        console.log('Response:', res);
        if(res) {
          this.router.navigateByUrl('/cpassword?email=' + email)
        }
        
      },
      error=> {
        console.log(error.error.detail)
      })

    }

    otpSent = false;
    sendOtp() {
      if (this.isEmailValid) {
        if (!this.otpSent) {
          console.log('Sending OTP...');
          let email ={'email': this.formData.email}

          this.serviceClass.sendotpapi(email).subscribe((res:any)=>{
            console.log('Response:', res);
            if(res) {
              this.otpSent = true; 
              this.startCountdown();
            }
            
          },
          error=> {
            console.log(error.error.error)
          })

        } else {
          console.log('Sending OTP again...');
          let email ={'email': this.formData.email}
          this.serviceClass.sendotpapi(email).subscribe((res:any)=>{
            console.log('Response:', res);
            if(res) {
              this.startCountdown();
            }
            
          },
          error=> {
            console.log(error.error.detail)
          })
          
        }
      } else {
        console.log('Invalid email address');
        // Optionally, you can also trigger email validation here if needed
      }
    }

    get otpStyle() {
      return this.otpSent && this.countdown > 0 ? {
        opacity: '0.5',
        pointerEvents: 'none'
      } : {};
    }
  backbutton(){
    this.router.navigateByUrl('/home');
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
