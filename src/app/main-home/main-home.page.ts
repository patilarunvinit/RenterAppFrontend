import { Component, OnInit } from '@angular/core';
import { TokenserviceService } from 'src/app/services/tokenservice.service'




@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.page.html',
  styleUrls: ['./main-home.page.scss'],
})
export class MainHomePage implements OnInit {


  constructor(
    private serviceClass: TokenserviceService,
  ) {}
  


  ngOnInit() {
    this.ownerD();
  }


  mobile_no:any;
  name:any;
  owner_dp:any
  dp:any;
  url:any="https://0696-103-148-62-157.ngrok-free.app"
  ownerD(){
    
    this.serviceClass.Ownerdata().subscribe((res:any)=>{
      this.mobile_no = res.mobile_no
      this.name = res.name
      this.owner_dp = res.owner_photo
      this.dp=this.url + this.owner_dp
      // alert(this.dp)
      // console.log(res)
      debugger
    })  

  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  // dp:string="assets/img/test1.jpg"
  all_flats:string="assets/img/all_flats.png"
  manage:string="assets/img/manage.png"
  rent:string="assets/img/rent.png"
  remain:string="assets/img/remain.png"
  add_renter:string="assets/img/add_renter.png"
  add_home:string="assets/img/add_home.png"
  card_pic:string="assets/img/card_img1.jpeg"

  
}
