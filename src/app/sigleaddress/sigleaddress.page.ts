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
    this.getid();
  }


  addressId:any;
  ngOnInit() { }


  //get address id from link
  getid(){
    this.route.queryParams.subscribe(params => {
      this.addressId = params['adrress_id'];
      if (this.addressId) {
        this.getadrees(this.addressId);
        this.getrenter(this.addressId);
      } 
    });
  }


  //back button fun
  backbutton(){
    this.router.navigateByUrl('/listadrress');
  }




  // get address data
  area:any;
  flat_no:any;
  Rent:any;
  is_on_rent:any;
  owner_name:any;
  getadrees(id:any){
    this.serviceClass.getaddresssingle(id).subscribe((res:any)=>{
      
      if (res[0] && res[0][0]) {
        this.area = res[0][0].Area;
        this.flat_no = res[0][0].Floor + "/" + res[0][0].Flat_no;
        this.Rent = res[0][0].Rent;
        this.is_on_rent = res[0][0].is_on_rent;
      } 

      if (res[1]) {
        this.owner_name = res[1].owner_name;
      } 
    })

  }





  // get renter data to display
  renter_name:any;
  renter_mobile_no:any;
  id_type:any;
  id_img:any;
  on_renter_error:any;
  start_date:any;
  getrenter(id:any){
    
    this.serviceClass.getrentersingle(id).subscribe((res:any)=>{

      if (res[0]) {
        this.renter_name = res[0].renter_name;
        this.renter_mobile_no = res[0].renter_mobile_no;
        this.id_type = res[0].id_type;
        this.id_img = `https://adnyatech.pythonanywhere.com/${res[0].id_img}`;
      } 

      if (res[1]) {
        this.start_date = res[1].start_date;
      } 
    },
    error=> {
      this.on_renter_error = error.error.detail
    })

  }




  // popup image
  popdiplay:any="none";
  blur:any;
  showPopup() {
    this.popdiplay = 'block';
    this.blur = true
  }
  // close popup image
  closepopup(){
    this.popdiplay = 'none';
    this.blur = false
  }



  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
