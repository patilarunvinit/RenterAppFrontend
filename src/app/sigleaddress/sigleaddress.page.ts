import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { TokenserviceService } from 'src/app/services/tokenservice.service'


@Component({
  selector: 'app-sigleaddress',
  templateUrl: './sigleaddress.page.html',
  styleUrls: ['./sigleaddress.page.scss'],
})
export class SigleaddressPage implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceClass: TokenserviceService,

  ) {
    this.route.queryParams.subscribe(params => {
    this.addressId = params['adrress_id'];
    // console.log(this.addressId); 
    if (this.addressId) {
      this.getadrees(this.addressId);
      this.getrenter(this.addressId);
    } else {
      console.error('Address ID is not defined.');
    }
  });
}

  addressId:any;
  ngOnInit() { }


  backbutton(){
    this.router.navigateByUrl('/listadrress');
  }


  area:any;
  flat_no:any;
  Rent:any;
  is_on_rent:any;
  owner_name:any;
  getadrees(id:any){
    this.serviceClass.getaddresssingle(id).subscribe((res:any)=>{
      debugger
      if (res[0] && res[0][0]) {
        this.area = res[0][0].Area;
        this.flat_no = res[0][0].Floor + "/" + res[0][0].Flat_no;
        this.Rent = res[0][0].Rent;
        this.is_on_rent = res[0][0].is_on_rent;
      } else {
        console.error('Error: res[0] or res[0][0] is undefined');
      }

      if (res[1]) {
        this.owner_name = res[1].owner_name;
      } else {
        console.error('Error: res[1] is undefined or does not contain owner_name');
      }
    }, 
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

  }

  renter_name:any;
  renter_mobile_no:any;
  id_type:any;
  id_img:any;
  on_renter_error:any;
  start_date:any;
  getrenter(id:any){
    
    this.serviceClass.getrentersingle(id).subscribe((res:any)=>{
      debugger
      if (res[0]) {
        this.renter_name = res[0].renter_name;
        this.renter_mobile_no = res[0].renter_mobile_no;
        this.id_type = res[0].id_type;
        this.id_img = `https://f390-103-148-62-157.ngrok-free.app/${res[0].id_img}`;
      } else {
        console.error('Error: res[0] is undefined');
      }

      if (res[1]) {
        this.start_date = res[1].start_date;
      } else {
        console.error('Error: res[1] is undefined or does not contain start_date');
      }
    },
    error=> {
      this.on_renter_error=error.error.detail
      // console.log(error.error.detail)
      // alert(error.error.detail)

    })

  }




  popdiplay:any="none";
  blur:any;
  showPopup() {
    this.popdiplay = 'block';
    this.blur = true
  }

  closepopup(){
    this.popdiplay = 'none';
    this.blur = false
  }

  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
