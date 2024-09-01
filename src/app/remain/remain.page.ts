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
    this.getremaindata()
  }


  ngOnInit() {}





  // back button fun
  backbutton(){
    this.router.navigateByUrl('/main-home');
  }




  // get remain data to show
  remaindata:any;
  error:any;
  noData: boolean = false; 
  loading: boolean = false; 
  getremaindata(){
    
    this.serviceClass.getremain().subscribe((res:any)=>{
      this.remaindata=res
      this.noData = this.remaindata.length === 0; 
      this.loading = false; 
    },
    error=> {
      this.error = error.error.detail
      this.noData = false; 
      this.loading = false;
    })  

  }





  //redirect with lease_id and remainpay
  historypagebutton(lease_id:any,remainpay:any){
    this.router.navigateByUrl('/historyremain?lease_id=' + lease_id +'&remain='+remainpay);
  }




 
  //kaybord open
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
