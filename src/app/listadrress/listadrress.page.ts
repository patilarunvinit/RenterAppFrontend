import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listadrress',
  templateUrl: './listadrress.page.html',
  styleUrls: ['./listadrress.page.scss'],
})
export class ListadrressPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;


  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
  ) { 
    this.kaybordfun()
  }



  ngOnInit() {
    this.getalldataaddr()
  }



  //backbutton fun
  backbutton(){
    this.router.navigateByUrl('/main-home');
  }
  


  //header for menu option
  customActionSheetOptions: any = {
    header: 'Address List',
  };


  
  //menu option selection default=all
  selectedValue:any="all";
  onSelectionChange(event: any) {
    this.selectedValue = event.detail.value;
    this.getalldataaddr()
  }




  //single address route with address_id
  singlepagebutton(address_id:any){
    this.router.navigateByUrl('/sigleaddress?adrress_id=' + address_id);
  }



  // get address data (full)
  addressdata:any;
  error:any;
  noData: boolean = false; 
  loading: boolean = false; 
  getalldataaddr(){
    
    this.serviceClass.getadrress(this.selectedValue).subscribe((res:any)=>{
      this.addressdata=res
      this.noData = this.addressdata.length === 0; 
      this.loading = false; 
    },
    error=> {
      this.error = error.error.detail
      this.noData = false; 
      this.loading = false; 

    })
  
  }



  //keybord open
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
