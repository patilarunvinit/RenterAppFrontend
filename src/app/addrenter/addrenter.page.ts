import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { ElementRef, ViewChild } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


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
     this.kaybordfun();
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
      owner_id: this.userId || '',
      renter_name: '',
      renter_mobile_no: '',
      id_type: '',
      id_img: null as File | null
    };
  }



  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  //file change event
  file!:File;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.formData.id_img = this.file; 
  }

  //Form For Add renter 
  error:any;
  submitForm() {
    const formData = new FormData();
    formData.append('owner_id',this.userId);
    formData.append('renter_name', this.formData.renter_name);
    formData.append('renter_mobile_no', this.formData.renter_mobile_no);
    formData.append('id_type', this.formData.id_type)
    if (this.file !== null) { 
      formData.append('id_img', this.file);
    }
 
    this.serviceClass.addRenter(formData).subscribe((res:any)=>{
      if(res) {
        this.showPopup()
        
      }
      else {
        this.wrongshowPopup();
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
  hinddiv:any="none";
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
}
