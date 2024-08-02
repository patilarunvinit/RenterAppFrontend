import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerent',
  templateUrl: './managerent.page.html',
  styleUrls: ['./managerent.page.scss'],
})
export class ManagerentPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;
  addressdata:any;
  renterdata:any;

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
    this.dataforinputs()
  }

  

   dataforinputs(){

    this.serviceClass.getadrressforlease().subscribe((res:any)=>{
      
      this.addressdata=res
      console.log(res)
    })  

    this.serviceClass.getreanterforlease().subscribe((res:any)=>{
      
      this.renterdata=res
      console.log(res)
    })  

   }



  addfromdata = {
    renter_id:'',
    address_id: '',
    start_date: '',
    rent:'',
    deposit:''

    // Add more fields as needed
  };

  addFrom() {
    console.log(this.addfromdata)
    this.serviceClass.addlease(this.addfromdata).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.showPopup()
        this.dataforinputs();
      }
      else {
        alert('Error To Send Data')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

    
    this.addfromdata = {
      renter_id:'',
      address_id: '',
      start_date: '',
      rent:'',
      deposit:''
  
      // Add more fields as needed
    };

  }

  removefromdata = {
    renter_name:'',
    address: '',
    end_date: '',
    // Add more fields as needed
  };

  removeFrom() {
    console.log(this.removefromdata)
    this.showPopup()
    // if (this.formData.email && this.formData.password) {
    //   console.log(this.formData);
      
    //   this.serviceClass.login(this.formData).subscribe((res:any)=>{
    //   console.log('Response:', res);
    //   if(res.jwt) {
    //     alert("Login Success")
    //     alert(res.jwt)
    //     localStorage.setItem('hotelUser',JSON.stringify(res.jwt));
    //     this.router.navigateByUrl('/main-home');
    //   }
    //   else {
    //     alert('Check User Credentials')
    //   }
    // },
    // error=> {
    //   // console.log(error.error.detail)
    //   alert(error.error.detail)

    // })


    //   this.formData = {
    //     email: '',
    //     password: ''
    //     // Initialize other fields as needed
    //   };
    // }
  }




  backbutton(){
    this.router.navigateByUrl('/main-home');
  }





  adddispaly:any;
  removedisplay:any;
  addbackcolor:any;
  removebackcolor:any;
  add(){
     this.adddispaly= "block";
     this.removedisplay= "none";
     this.addbackcolor='rgb(61, 155, 214)';
     this.removebackcolor='rgb(61, 155, 214,0)';
  }
  remove(){
    this.adddispaly= "none";
    this.removedisplay= "block";
    this.addbackcolor='rgb(61, 155, 214,0)';
    this.removebackcolor='rgb(61, 155, 214)'
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
