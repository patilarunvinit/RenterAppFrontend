import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   divHeight:any=window.innerHeight + 'px';
   screenHeight:any = window.innerHeight;
   emaildisplay:any;
   
  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
              
    ){

      this.platform.keyboardDidShow.subscribe(ev => {
        const { keyboardHeight } = ev;
        this.divHeight = this.screenHeight + "px";  
      });
    
      this.platform.keyboardDidHide.subscribe(() => {
        this.divHeight = '100%';      
  
      });
  
      // this.initializeNotifications();

     }

     onEmailChange() {
      // Reset email color when user starts typing
      if (this.emaildisplay === 'red') {
        this.emaildisplay = 'white';
      }
     }

     formData = 
     {
      email: '',
      password: '',
    };



    error:any;
    submitForm() {
      if (this.formData.email && this.formData.password) {
        
        this.serviceClass.login(this.formData).subscribe((res:any)=>{
        if(res.access) {
          localStorage.setItem('hotelUser',JSON.stringify(res.access));
          localStorage.setItem('ref_tokan',JSON.stringify(res.refresh));
  
          this.router.navigateByUrl('/main-home');
        }
        else {
          this.error = 'Check User Credentials'
          this.bottompopup();
        }
      },
      error=> {
        this.error = error.error.detail
        if(this.error=='Invalid Email'){
          this.formData = 
          {
            email: this.formData.email,
            password: ''
          };
          this.emaildisplay='red';
        }
        else{
          this.formData = 
          {
            email:this.formData.email,
            password: ''
          };
        }
        
        this.bottompopup();
  
      })
  

      }
    }
  
    
    clear:any;
    popupdisplay:any="none";
    // bottompopup() {
    //   // Clear any existing interval
    //   if (this.clear) {
    //     clearInterval(this.clear);
    //     this.popupdisplay = 'none';

    //   }
    //   else{
    //     this.popupdisplay = 'block';

    //   }
    //   // Reset popup display and set new interval
    //   // this.popupdisplay = 'block';
    //   this.clear = setTimeout(() => {
    //     this.popupdisplay = 'none';
    //   }, 8 * 1000);  // 8 seconds
    // }
    
    popupTimeout:any;
    bottompopup(){

      if (this.popupTimeout) {
        // console.log(this.popupTimeout)
        // clearTimeout(this.popupTimeout);
        clearTimeout(this.popupTimeout); // Correctly clear the timeout
        this.popupTimeout = undefined;
        // console.log(this.popupTimeout)

      }

      this.popupdisplay="block"
      this.popupTimeout=setTimeout(() => {
        // console.log(this.popupTimeout)

        this.popupdisplay="none";
      },  8 * 1000); 
    }
  
    backphoto:string="assets/img/pexels-photo-2310713.jpeg"
    centerlogo:string="assets/img/user-solid.svg"


    
  
}




  //To SEND LOCAL NOTIFICATIONS

  
  // private async initializeNotifications() {
  //   await LocalNotifications.requestPermissions();

  //   LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
  //     console.log('Notification clicked:', notification);

  //     this.router.navigate(['/home']);
  //   });
  // }

  // public async sendNotification() {
  //   try {
  //     const result = await LocalNotifications.schedule({
  //       notifications: [
  //         {
  //           title: 'Hello',
  //           body: 'This is a simple notification!',
  //           id: Math.floor(Math.random() * 1000000),  // Generate a random integer ID
  //           schedule: { at: new Date(new Date().getTime() + 1000) },  // Schedule for 1 second from now
  //         }
  //       ]
  //     });
  //     console.log('Notification scheduled successfully:', result);
  //   } catch (error) {
  //     console.error('Error scheduling notification:', error);
  //   }
  // }





