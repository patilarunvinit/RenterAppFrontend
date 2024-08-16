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





    // this.initializeNotifications();

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







  
  formData = {
    email: '',
    password: ''
    // Add more fields as needed
  };


  submitForm() {
    if (this.formData.email && this.formData.password) {
      console.log(this.formData);
      
      this.serviceClass.login(this.formData).subscribe((res:any)=>{
      console.log('Response:', res.access);
      if(res.access) {
        alert("Login Success")
        // alert(res.access)
        localStorage.setItem('hotelUser',JSON.stringify(res.access));
        localStorage.setItem('ref_tokan',JSON.stringify(res.refresh));

        this.router.navigateByUrl('/main-home');
      }
      else {
        alert('Check User Credentials')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })


      this.formData = {
        email: '',
        password: ''
        // Initialize other fields as needed
      };
    }
  }


test(){
  alert("work")
}

  
  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  centerlogo:string="assets/img/user-solid.svg"

  
}
