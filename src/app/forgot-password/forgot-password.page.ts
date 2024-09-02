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
  divHeight:any=window.innerHeight + 'px';
   screenHeight:any = window.innerHeight;

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
 







  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }








//check email is valid  
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












//start counter for 30 sec to resend
countdown = 0;         
private countdownSubscription: Subscription | undefined;
startCountdown() {
  this.countdown = 30; 
  this.countdownSubscription = interval(1000).subscribe(() => {
    if (this.countdown > 0) {
      this.countdown--;
      
    } else {
      this.countdownSubscription?.unsubscribe();
      this.otpSent = true; 
    }
  });
}








//form data
formData = 
     {
      email: '',
      otp_code:''
};






//main from with email and otp
mainerror:any;
submitForm() {
      let email = this.formData.email
      this.serviceClass.verifyotp(this.formData).subscribe((res:any)=>{
        if(res) {
          this.router.navigateByUrl('/cpassword?email=' + email);
          this.mainerror = '';
        }
        
      },
      error=> {
        this.mainerror = error.error.error;
        this.formData = 
         {
          email: this.formData.email,
          otp_code:''
        };
        
      })

}






 //send otp button click
 otpSent = false;
 error:any;
 sendOtp() {
   if (this.isEmailValid) {
     if (!this.otpSent) {
       let email ={'email': this.formData.email}

       this.serviceClass.sendotpapi(email).subscribe((res:any)=>{
         if(res) {
           this.otpSent = true; 
           this.startCountdown();
           this.error=''
         }
         
       },
       error=> {
         this.error = error.error.error
       })

     } else {
       let email ={'email': this.formData.email}
       this.serviceClass.sendotpapi(email).subscribe((res:any)=>{
         if(res) {
           this.startCountdown();
           this.error=''
         }
         
       },
       error=> {
         this.error = error.error.error
       })
       
     }
   } else {
     this.error ='Invalid email address'
   }
 }






 //css for otp
 get otpStyle() {
  return this.otpSent && this.countdown > 0 ? {
    opacity: '0.5',
    pointerEvents: 'none'
  } : {};
}



  


// back button fun
backbutton(){
  this.router.navigateByUrl('/home');
}





//keybord open
kaybordfun(){
  this.platform.keyboardDidShow.subscribe(ev => {
    const { keyboardHeight } = ev;
    this.divHeight = this.screenHeight + "px";  
  });

  this.platform.keyboardDidHide.subscribe(() => {
    this.divHeight = '100%';  
  });
}






  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
