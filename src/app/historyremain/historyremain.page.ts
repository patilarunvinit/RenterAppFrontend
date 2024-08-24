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
  remainpay:any;
  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,
    private route: ActivatedRoute,

  ) { 
    this.kaybordfun()
    // this.getalldataaddr()


    this.route.queryParams.subscribe(params => {
      this.lease_id = params['lease_id'];
      this.remainpay = params['remain']
      if (this.lease_id) {
        this.gethistorydata(this.lease_id);
      } else {
        console.error('Address ID is not defined.');
      }
    });
  }

  ngOnInit() {
    this.selectedDate = this.formatDate(new Date().toISOString());
    this.fullselectedDate = this.formatDate(new Date().toISOString());

  }

  heightofinfo:any="55%";
  heightofremain:any="30%";
  display1:any='block';
  display2:any='none';
  resizeheights(no:any){
    if(no==1){
      this.heightofinfo="10%";
      this.heightofremain="75%";
      this.display2='block';
     this.display1='none';
    }
    else{
      this.heightofinfo="55%";
      this.heightofremain="30%";
      this.display1='block';
      this.display2='none';

    }

  }


  backbutton(){
    this.router.navigateByUrl('/remain');
  }



  history_data:any
  remain_data:any;
  rent_info:any;
  address:any;
  building:any;
  flat:any;
  renter_name:any;
  total_remain:any;
  deposit:any;
  gethistorydata(id:any){
    this.serviceClass.gethistory(id).subscribe((res:any)=>{
      // this.address=res
      this.history_data=res
      this.remain_data=this.history_data['remain_data']
      this.rent_info=this.history_data['rent_info']
      console.log(this.remain_data[0].for_month)
      // console.log(this.rent_info[2])
      this.address= this.rent_info[0]['Area'] 
      this.building=this.rent_info[0]['Building_name']
      this.flat=this.rent_info[0]['Floor']+'/'+this.rent_info[0]['Flat_no']
      this.renter_name=this.rent_info[1]['renter_name']
      this.total_remain= this.rent_info[3][0]['total_remain']
      this.deposit= this.rent_info[2][0]['deposit']

      
    }, 
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

  }






  popdiplay:any="none";
  blur:any;
  zindex:any;
  popupdata:any=[];
  remainonmonth:any
  for_month:any;
  lease_id_selected:any;
  formpopup(data:any) {
    this.popupdata=data
    console.log(data)
    this.remainonmonth=this.popupdata?.remain
    this.for_month=this.popupdata?.for_month
    this.lease_id_selected=this.popupdata?.lease_id

    console.log(this.remainonmonth)

    this.paydata.lease_id = this.lease_id_selected;
    this.paydata.for_month = this.for_month;

    this.popdiplay = 'block';
    this.blur = true;
    this.hinddiv = "block"
    this.zindex = 888

  }

  closepopup(){
    this.popdiplay = 'none';
    this.blur = false;
    this.hinddiv = "none"

  }


  selectedDate:any;
  onDateChangesingle(event: any) {
    const dateTimeValue = event.detail.value; // e.g., 2024-08-14T18:17:00
    this.selectedDate = this.formatDate(dateTimeValue);
  }
  fullselectedDate:any;
  onDateChangefull(event: any) {
    const dateTimeValue = event.detail.value; // e.g., 2024-08-14T18:17:00
    this.fullselectedDate = this.formatDate(dateTimeValue);
  }
  
  formatDate(dateTimeValue: string): string {
    const date = new Date(dateTimeValue);
    return date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
  }
  
  
  paydata = {
    lease_id:'',
    paid:undefined,
    remain:'',
    date_of_pay: '',
    transaction_mode: '',
    for_month:'',
    is_remain_pay:1,
  };



remain:any;

addremain() {
  let paid=this.paydata["paid"]?? 0;
  this.remain=this.remainonmonth - paid;
  this.paydata.remain = this.remain;
  this.paydata.date_of_pay = this.selectedDate;
  console.log(this.paydata)
  this.serviceClass.addremainpay(this.paydata).subscribe((res:any)=>{
    console.log('Response:', res);
    if(res) {
      this.successpopup()
      this.gethistorydata(this.lease_id)
    }
    else {
      alert('Error To Send Data')
    }
  },
  error=> {
    // console.log(error.error.detail)
    alert(error.error.detail)

  })
  




  this.paydata = {
  lease_id:'',
  paid:undefined,
  remain:'',
  date_of_pay: '',
  transaction_mode: '',
  for_month:'',
  is_remain_pay:1,

};

}








forpopup:any="none";
blur1rent:any;
hinddiv:any="none";
successpopup(redirectAfterPopup: boolean = false) {
  this.forpopup = 'block';
  this.hinddiv = 'block';
  this.blur1rent = true,
  this.zindex = 1000

  setTimeout(() => {
    this.forpopup = 'none';
    this.hinddiv = 'none';
    this.blur1rent = false
    this.popdiplay = 'none';
    this.blur = false

    if (redirectAfterPopup) {
      this.router.navigateByUrl('/remain');
    }
  }, 4000);
}








  fullpopdiplay:any="none";
  fullformpopup() {
    this.fullpopdiplay = 'block';
    this.blur = true;
    this.hinddiv = "block";
    this.zindex = 888

  }

  fullclosepopup(){
    this.fullpopdiplay = 'none';
    this.blur = false;
    this.hinddiv = "none"
  }



  

  fullpaydata = {
    lease_id:'',
    paid:0.00,
    remain:0,
    date_of_pay: '',
    transaction_mode: '',
    for_month:'',
    is_remain_pay:1,
  };



for_months:any;
fullremain() {
  this.fullpaydata.lease_id=this.remain_data[0].lease_id
  this.fullpaydata.paid = parseFloat(this.remainpay) || 0.00;
  this.fullpaydata.date_of_pay = this.fullselectedDate;
  const payload = {
    fullpaydata: this.fullpaydata,
    for_months: Array.isArray(this.remain_data) ? this.remain_data.map((item: any) => ({ for_month: item.for_month })) : this.remain_data
  };
  console.log(payload)
  this.serviceClass.fullremainpay(payload).subscribe((res:any)=>{
    console.log('Response:', res);
    if(res) {
      this.successpopup(true)

    }
    else {
      alert('Error To Send Data')
    }
  },
  error=> {
    // console.log(error.error.detail)
    alert(error.error.detail)

  })
  




  this.fullpaydata = {
  lease_id:'',
  paid:0.00,
  remain:0,
  date_of_pay: '',
  transaction_mode: '',
  for_month:'',
  is_remain_pay:1,

};

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
