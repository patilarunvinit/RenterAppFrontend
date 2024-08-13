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

  ) {this.route.queryParams.subscribe(params => {
    this.addressId = params['adrress_id'];
    console.log(this.addressId); 
    if (this.addressId) {
      this.getadrees(this.addressId);
      this.getrenter(this.addressId);
    } else {
      console.error('Address ID is not defined.');
    }
  });}

  addressId:any;
  ngOnInit() { }


  backbutton(){
    this.router.navigateByUrl('/listadrress');
  }


  area:any;
  flat_no:any;
  Rent:any;
  is_on_rent:any;
  getadrees(id:any){
    this.serviceClass.getaddresssingle(id).subscribe((res:any)=>{
      // this.address=res
      this.area = res[0].Area
      this.flat_no = res[0].Floor + "/" + res[0].Flat_no
      this.Rent = res[0].Rent
      this.is_on_rent = res[0].is_on_rent
      
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
  getrenter(id:any){
    
    this.serviceClass.getrentersingle(id).subscribe((res:any)=>{
      this.renter_name = res.renter_name
      this.renter_mobile_no = res.renter_mobile_no
      this.id_type = res.id_type
      let img = res.id_img
      this.id_img = "http://localhost:8000/" + img
      // alert(this.id_img)
      console.log(res)
    },
    error=> {
      this.on_renter_error=error.error.detail
      console.log(error.error.detail)
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
