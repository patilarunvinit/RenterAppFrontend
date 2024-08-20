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
        this.bottompopup();
  
      })
  
  
      this.formData = 
      {
        email: '',
        password: ''
      };
      }
    }
  
    

    popupdisplay:any="none";
    bottompopup(){
      this.popupdisplay="block"
      setInterval(() => {
        this.popupdisplay="none"
      }, 8 * 1000); 
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





