import { Component, OnInit } from '@angular/core';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.page.html',
  styleUrls: ['./main-home.page.scss'],
})
export class MainHomePage implements OnInit {
  loadcardtext:any = "inline-block"

  constructor(
    private serviceClass: TokenserviceService,
    private router: Router,
  ) {}
  




  ngOnInit() {
    this.ownerD();
  }







  // to fatch data like owner data and address count
  mobile_no:any;
  name:any;
  owner_dp:any
  b_date:any;
  dp:any;
  url:any="https://adnyatech.pythonanywhere.com/"
  addresscount:any;
  ownerD(){
    
    this.serviceClass.Ownerdata().subscribe((res:any)=>{
      // to stop lead 
      this.loadcardtext = "none"
      this.bottompopup(); 

      // to set data
      this.mobile_no = res.mobile_no
      this.name = res.name
      this.owner_dp = res.owner_photo
      this.dp=this.url + this.owner_dp
      this.b_date = res.b_date
      
    }) 
    
    this.serviceClass.addAdrresscount().subscribe((res:any)=>{
      this.addresscount=res['addresscount']
      
    })  
    

  }





  // menu button click
  token:any;
  menubuttons(menu:any){
      this.router.navigateByUrl('/' + menu);
      this.token= localStorage.getItem('hotelUser');
      this.error = '';  
  }






  // logout button
  error:any;
  logout(){

    this.serviceClass.logoutApi().subscribe((res:any)=>{
      localStorage.removeItem('ref_tokan');
      localStorage.removeItem('hotelUser');
      this.router.navigateByUrl('/home');
      this.error = '';    
    },
    error=> {
      this.error = error.error.detail;
    })  
        
  }







  // wellcome msg popup
  popupdisplay:any="none";
  bottompopup(){
    this.popupdisplay="block"
    setInterval(() => {
      this.popupdisplay="none"

    }, 8 * 1000); 
  }




  

  // images
  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  all_flats:string="assets/img/all_flats.png"
  manage:string="assets/img/manage.png"
  rent:string="assets/img/rent.png"
  remain:string="assets/img/remain.png"
  add_renter:string="assets/img/add_renter.png"
  add_home:string="assets/img/add_home.png"
  card_pic:string="assets/img/card_img1.jpeg"


}
