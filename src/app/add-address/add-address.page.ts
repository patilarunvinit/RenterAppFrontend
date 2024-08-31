import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';


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
    private location: Location,
    private alertController: AlertController


  ){ 
    this.kaybordfun()
  }




  userId:any;
  ngOnInit() {

    this.initializeUserData();
  }




  initializeUserData() {
    const accessToken = localStorage.getItem('hotelUser');
    if (accessToken) {
      try {
        const decodedToken = jwtDecode<any>(accessToken);
        this.userId = decodedToken.user_id;
        this.initializeFormData(); // Initialize formData only after userId is set
      } catch (e) {
        this.router.navigateByUrl('/home');
      }
    } else {
        this.router.navigateByUrl('/home');
      }
  }





  formData:any;
  initializeFormData() {
    this.formData = {
      owner_id: this.userId,
      Area: '',
      Building_name: '',
      Floor: '',
      Flat_no: '',
      Rent: '',
    };
  }



  
  // for submite form 
  error:any;
  submitForm() {
    this.serviceClass.addAdrress(this.formData).subscribe((res:any)=>{
      if(res) {
        this.showPopup()
      }
      else {
        this.error = 'Error To Send Data' ; 
        this.wrongshowPopup()
      }
    },
    error=> {
      this.error = error.error.detail
      this.wrongshowPopup()

    })

    this.initializeFormData();
    
  }




  //For back button 
  backbutton(){
    this.router.navigateByUrl('/main-home');
  }






  //For success Form Submite
  popdiplay:any="none";
  blur:any;
  hinddiv:any="none"
  showPopup() {
    this.popdiplay = 'block';
    this.hinddiv = 'block';
    this.blur = true
    setTimeout(() => {
      this.popdiplay = 'none';
      this.hinddiv = 'none';
      this.blur = false
    }, 4000); 
  }






   //For error Form Submite 
   wrongpopdiplay:any="none";
   wrongshowPopup() {
     this.wrongpopdiplay = 'block';
     this.hinddiv = 'block';
     this.blur = true
     setTimeout(() => {
       this.wrongpopdiplay = 'none';
       this.hinddiv = 'none';
       this.blur = false
     }, 4000); 
   }






  //for kaybord open
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
