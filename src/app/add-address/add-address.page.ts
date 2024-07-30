import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';




@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;

  constructor(
    private platform: Platform,
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

  ngOnInit() {
  }


  formData = {
    owner_id:1,
    Area: '',
    Building_name: '',
    Floor: '',
    Flat_no: '',
    Rent: '',
    // Add more fields as needed
  };

  submitForm() {
    console.log(this.formData)
    // this.showPopup()
    this.serviceClass.addAdrress(this.formData).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.showPopup()
      }
      else {
        alert('Error To Send Data')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })


    this.formData = {
      owner_id:1,
      Area: '',
      Building_name: '',
      Floor: '',
      Flat_no: '',
      Rent: '',
      // Add more fields as needed
    };
    
  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }



  popdiplay:any="none";
  blur:any;
  showPopup() {
    this.popdiplay = 'block';
    this.blur = true
    setTimeout(() => {
      this.popdiplay = 'none';
      this.blur = false
    }, 4000); // Adjust 3000 milliseconds to change popup display duration (3 seconds in this example)
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
}
