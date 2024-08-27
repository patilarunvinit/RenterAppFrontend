import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-remain',
  templateUrl: './remain.page.html',
  styleUrls: ['./remain.page.scss'],
})
export class RemainPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
  ) { 
    this.kaybordfun()
    // this.getalldataaddr()
    this.getremaindata()
  }

  ngOnInit() {
    
  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }


  remaindata:any;
  error:any;
  noData: boolean = false; 
  loading: boolean = false; 
  getremaindata(){
    
    this.serviceClass.getremain().subscribe((res:any)=>{
      this.remaindata=res
      this.noData = this.remaindata.length === 0; // Check if data is empty
      this.loading = false; // End loading
      console.log(res)
    },
    error=> {
      this.error = error.error.detail
      this.noData = false; // Reset noData flag in case of an error
      this.loading = false; // End loading

    })  

  }




  historypagebutton(lease_id:any,remainpay:any){
    this.router.navigateByUrl('/historyremain?lease_id=' + lease_id +'&remain='+remainpay);
  }





  kaybordfun(){
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



  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
