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
    this.kaybordfun();
    this.get_id();
  }








ngOnInit() {
  this.selectedDate = this.formatDate(new Date().toISOString());
  this.fullselectedDate = this.formatDate(new Date().toISOString());
}












// to set height
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












// back button fun 
backbutton(){
  this.router.navigateByUrl('/remain');
}











//get remain history data
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
    this.history_data=res
    this.remain_data=this.history_data['remain_data']
    this.rent_info=this.history_data['rent_info']
    this.address= this.rent_info[0]['Area'] 
    this.building=this.rent_info[0]['Building_name']
    this.flat=this.rent_info[0]['Floor']+'/'+this.rent_info[0]['Flat_no']
    this.renter_name=this.rent_info[1]['renter_name']
    this.total_remain= this.rent_info[3][0]['total_remain']
    this.deposit= this.rent_info[2][0]['deposit']
})
}









//open single pay form
popdiplay:any="none";
blur:any;
zindex:any;
popupdata:any=[];
remainonmonth:any
for_month:any;
lease_id_selected:any;
formpopup(data:any) {
  this.popupdata=data
  this.remainonmonth=this.popupdata?.remain
  this.for_month=this.popupdata?.for_month
  this.lease_id_selected=this.popupdata?.lease_id

 

  this.paydata.lease_id = this.lease_id_selected;
  this.paydata.for_month = this.for_month;

  this.popdiplay = 'block';
  this.blur = true;
  this.hinddiv = "block"
  this.zindex = 888
}
//close single pay form
closepopup(){
  this.popdiplay = 'none';
  this.blur = false;
  this.hinddiv = "none"
}



 






// date selection for both forms  
selectedDate:any;
onDateChangesingle(event: any) {
  const dateTimeValue = event.detail.value; 
  this.selectedDate = this.formatDate(dateTimeValue);
}
fullselectedDate:any;
onDateChangefull(event: any) {
  const dateTimeValue = event.detail.value; 
  this.fullselectedDate = this.formatDate(dateTimeValue);
}


// create date formate = 'YYYY-MM-DD'
formatDate(dateTimeValue: string): string {
  const date = new Date(dateTimeValue);
  return date.toISOString().split('T')[0]; 
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

// month remain pay form
remain:any;
addremain() {
  let paid=this.paydata["paid"]?? 0;
  this.remain=this.remainonmonth - paid;
  this.paydata.remain = this.remain;
  this.paydata.date_of_pay = this.selectedDate;
  this.serviceClass.addremainpay(this.paydata).subscribe((res:any)=>{
    if(res) {
      this.successpopup()
      this.gethistorydata(this.lease_id)
    }
    else {
      // alert('Error To Send Data')
      this.wrongshowPopup();
    }
  },
  error=> {
    // console.log(error.error.detail)
    // alert(error.error.detail)
    this.wrongshowPopup();

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










// success popup after form 
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







// open full pay form
fullpopdiplay:any="none";
fullformpopup() {
  this.fullpopdiplay = 'block';
  this.blur = true;
  this.hinddiv = "block";
  this.zindex = 888
}
// close full pay form
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

// full remain pay form
for_months:any;
fullremain() {
  this.fullpaydata.lease_id=this.remain_data[0].lease_id
  this.fullpaydata.paid = parseFloat(this.remainpay) || 0.00;
  this.fullpaydata.date_of_pay = this.fullselectedDate;
  const payload = {
    fullpaydata: this.fullpaydata,
    for_months: Array.isArray(this.remain_data) ? this.remain_data.map((item: any) => ({ for_month: item.for_month })) : this.remain_data
  };
  this.serviceClass.fullremainpay(payload).subscribe((res:any)=>{
    if(res) {
      this.successpopup(true)

    }
    else {
      // alert('Error To Send Data')
      this.wrongshowPopup();
    }
  },
  error=> {
    // console.log(error.error.detail)
    // alert(error.error.detail)
    this.wrongshowPopup();

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








//For error Form Submite 
wrongpopdiplay:any="none";
wrongshowPopup() {
   this.wrongpopdiplay = 'block';
   this.hinddiv = 'block';
   this.blur = true
   setTimeout(() => {
     this.wrongpopdiplay = 'none';
     this.hinddiv = 'none';
     this.blur = false
  }, 4000);
}









get_id(){
  this.route.queryParams.subscribe(params => {
    this.lease_id = params['lease_id'];
    this.remainpay = params['remain']
    if (this.lease_id) {
      this.gethistorydata(this.lease_id);
    }
  });
}










// keybord open
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
