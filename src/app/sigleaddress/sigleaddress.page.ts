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
      console.log(this.addressId); // Should log '1'
      if (this.addressId) {
        this.getadrees();
        this.getrenter();
      } else {
        console.error('Address ID is not defined.');
      }
    });
  }

  addressId:any;
  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.addressId = params['adrress_id'];
    //   console.log(this.addressId); // Should log '1'
    //   if (this.addressId) {
    //     this.getadrees();
    //     this.getrenter();
    //   } else {
    //     console.error('Address ID is not defined.');
    //   }
    // });
    
  }


  backbutton(){
    this.router.navigateByUrl('/listadrress');
  }


  address:any;
  getadrees(){
    this.serviceClass.getaddresssingle(this.addressId).subscribe((res:any)=>{
      this.address=res
      console.log(this.address)
    }, 
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

  }

  renter:any;
  on_renter_error:any;
  getrenter(){
    
    this.serviceClass.getrentersingle(this.addressId).subscribe((res:any)=>{
      this.renter=res
      console.log(this.renter)
    },
    error=> {
      this.on_renter_error=error.error.detail
      console.log(error.error.detail)
      // alert(error.error.detail)

    })

  }


  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
