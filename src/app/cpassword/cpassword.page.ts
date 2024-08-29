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
  divHeight: any;
  screenHeight: any;

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

  


  formData = {
    newPassword: '',
    confirmPassword: ''
  };

  // Function to handle form submission
  submitForm(form: any) {
    if (form.valid && this.passwordsMatch() && this.isPasswordValid()) {
      // Handle form submission
      console.log('Form Data:', this.formData.newPassword);
      const tosend ={
        email:this.email,
        new_password:this.formData.newPassword
      }
      console.log(tosend)
      this.serviceClass.paswordchange(tosend).subscribe((res:any)=>{
        console.log('Response:', res);
        if(res) {
          this.backbutton()

        }
        this.formData = {
          newPassword: '',
          confirmPassword: ''
        };
        
      },
      error=> {
        console.log(error.error.error)
      })
    } else {
      console.log('Form is invalid or passwords do not match');
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








  backbutton(){
    this.router.navigateByUrl('/home');
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
