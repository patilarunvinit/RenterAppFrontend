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
    this.platform.keyboardDidShow.subscribe(ev => {
      const { keyboardHeight } = ev;
      this.divHeight = this.screenHeight + "px";  
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
  
    this.platform.keyboardDidHide.subscribe(() => {
      // Move input back to original location
      this.divHeight = '100%';      // Do something with the keyboard height such as translating an input above the keyboard.

    });
    // this.getalldataaddr()
    this.getremaindata()
  }

  ngOnInit() {
  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }


  remaindata:any;
  getremaindata(){
    
    this.serviceClass.getremain().subscribe((res:any)=>{
      this.remaindata=res
    })  

  }




  historypagebutton(lease_id:any,remainpay:any){
    this.router.navigateByUrl('/historyremain?lease_id=' + lease_id +'&remain='+remainpay);
  }



  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
