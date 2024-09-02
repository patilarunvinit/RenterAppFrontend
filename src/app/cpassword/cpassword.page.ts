import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';


import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

import { TokenserviceService } from 'src/app/services/tokenservice.service'


@Component({
  selector: 'app-cpassword',
  templateUrl: './cpassword.page.html',
  styleUrls: ['./cpassword.page.scss'],
})
export class CpasswordPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;
  email:any;


  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private route: ActivatedRoute,
    private serviceClass: TokenserviceService,

  ) { 
    this. kaybordfun();
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }



  ngOnInit() {
  }




  

  //Form Data
  formData = {
    newPassword: '',
    confirmPassword: ''
  };


  
  // Function to handle form submission
  error:any;
  submitForm(form: any) {
    if (form.valid && this.passwordsMatch() && this.isPasswordValid()) {
      const tosend ={
        email:this.email,
        new_password:this.formData.newPassword
      }
      this.serviceClass.paswordchange(tosend).subscribe((res:any)=>{
        if(res) {
          this.backbutton()

        }
        this.formData = {
          newPassword: '',
          confirmPassword: ''
        };
        
      },
      error=> {
        this.error = error.error.error
        this.formData = {
          newPassword: '',
          confirmPassword: ''
        };
      })
    }
  }


  // Check if passwords match
  passwordsMatch(): boolean {
    return this.formData.newPassword === this.formData.confirmPassword;
  }

  // Check if the password meets the validation criteria
  isPasswordValid(): boolean {
    return this.hasValidLength() && this.hasCapitalLetter() && this.hasNumber() && this.hasSpecialSymbol();
  }

  // Validate password length
  hasValidLength(): boolean {
    return this.formData.newPassword.length >= 8;
  }

  // Validate password contains at least one capital letter
  hasCapitalLetter(): boolean {
    return /[A-Z]/.test(this.formData.newPassword);
  }

  // Validate password contains at least one number
  hasNumber(): boolean {
    return /[0-9]/.test(this.formData.newPassword);
  }

  // Validate password contains at least one special symbol
  hasSpecialSymbol(): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(this.formData.newPassword);
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


 

  //back button fun
  backbutton(){
    this.router.navigateByUrl('/home');
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
