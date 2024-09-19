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
   leaddispay:any="none"

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
              
    ){
      this.kaybordfun();

     }

    


    // after wrong email turn text into white 
    onEmailChange() {
      if (this.emaildisplay === 'red') {
        this.emaildisplay = 'white';
      }
    }




    formData = 
    {
      email: '',
      password: '',
    };


    // main input form 
    error:any;
    submitForm() {
      if (this.formData.email && this.formData.password) {
        this.leaddispay = "block"
        this.serviceClass.login(this.formData).subscribe((res:any)=>{
        if(res.access) {
          localStorage.setItem('hotelUser',JSON.stringify(res.access));
          localStorage.setItem('ref_tokan',JSON.stringify(res.refresh));
          
          this.formData =
          {
            email:this.formData.email,
            password: ''
          };
          
          this.router.navigateByUrl('/main-home');
        }
        else {
          this.error = 'Check User Credentials'
          this.bottompopup();
        }
        this.leaddispay = "none"
      },
      error=> {
        this.leaddispay = "none"
        this.error = error.error.detail ;
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
  
    


    // from error popup
    clear:any;
    popupdisplay:any="none";
    popupTimeout:any;
    bottompopup(){

      if (this.popupTimeout) {
        clearTimeout(this.popupTimeout); 
        this.popupTimeout = undefined;
      }
      this.popupdisplay="block"
      this.popupTimeout=setTimeout(() => {
      this.popupdisplay="none";
      },  8 * 1000); 
    }


  //forgot password button
  forgotpass(){
    this.router.navigateByUrl('/forgot-password');
  }





  //key bord open
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
  centerlogo:string="assets/img/user-solid.svg"

     
}

