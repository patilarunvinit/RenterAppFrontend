import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';


import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-addrenter',
  templateUrl: './addrenter.page.html',
  styleUrls: ['./addrenter.page.scss'],
})
export class AddrenterPage implements OnInit {
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

  token:any;
  ngOnInit() {
    

  }


  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  file!:File;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.formData.id_img = this.file; 
  }

  formData = {
    owner_id:1,
    renter_name: '',
    renter_mobile_no: '',
    id_type: '',
    id_img: null as File | null
  };

  submitForm() {
    const formData = new FormData();
    formData.append('owner_id',"1");
    formData.append('renter_name', this.formData.renter_name);
    formData.append('renter_mobile_no', this.formData.renter_mobile_no);
    formData.append('id_type', this.formData.id_type)
    if (this.file !== null) { 
      formData.append('id_img', this.file);
    }
 

    // console.log(this.formData.id_img)
    this.serviceClass.addRenter(formData).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.showPopup()
        
      }
      else {
        alert('Error To Send Data')
      }
      
    },
    error=> {
      alert(error.error.detail)
    })
    this.formData = {
      owner_id:1,
      renter_name: '',
      renter_mobile_no: '',
      id_type: '',
      id_img: null as File | null
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
