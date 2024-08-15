import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { ActivatedRoute } from '@angular/router';


import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historyremain',
  templateUrl: './historyremain.page.html',
  styleUrls: ['./historyremain.page.scss'],
})
export class HistoryremainPage implements OnInit {

  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;
  lease_id:any;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
    private route: ActivatedRoute,

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


    this.route.queryParams.subscribe(params => {
      this.lease_id = params['lease_id'];
      if (this.lease_id) {
        this.gethistorydata(this.lease_id);
      } else {
        console.error('Address ID is not defined.');
      }
    });
  }

  ngOnInit() {
  }


  backbutton(){
    this.router.navigateByUrl('/remain');
  }



  history_data:any
  remain_data:any;
  rent_info:any;
  gethistorydata(id:any){
    this.serviceClass.gethistory(id).subscribe((res:any)=>{
      // this.address=res
      this.history_data=res
      this.remain_data=this.history_data['remain_data']
      this.rent_info=this.history_data['rent_info']
      console.log(this.remain_data)
      console.log(this.rent_info)

      
    }, 
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

  }


  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
