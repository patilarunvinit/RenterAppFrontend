import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'




@Component({
  selector: 'app-rent',
  templateUrl: './rent.page.html',
  styleUrls: ['./rent.page.scss'],
})
export class RentPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;

  constructor(
    private platform: Platform,
    private router: Router,
    private serviceClass: TokenserviceService,


  ) { 
    this.kaybordfun();
    this.currentmonth();
    this.getfilterdata();

  }

  customActionSheetOptions: any = {
    header: 'Months List',
  };


  ngOnInit() {
    this.getfullrents();

    this.selectedDate = this.formatDate(new Date().toISOString());

  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }



  onSelectionChange(event: any) {
    this.currentmonthvar = event.detail.value;
    console.log('Selected value:', this.currentmonthvar);
    this.getfullrents()
  }
  
  rentdata:any;
  getfullrents(){
    
    this.serviceClass.getrent(this.currentmonthvar).subscribe((res:any)=>{
      this.rentdata=res
      // console.log(this.rentdata[0][6]?.date_of_pay[0]["date_of_pay"])
      console.log(res)
    })  

  }

  currentmonthvar:any;
 currentmonth(){
   const now = new Date();

    const lastMonthDate = new Date(now.getTime());
    lastMonthDate.setMonth(now.getMonth() - 1);
    const month = lastMonthDate.getMonth() + 1; 
    const year = lastMonthDate.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    this.currentmonthvar= `${year}-${formattedMonth}`
 }


  filterdata:any;
  getfilterdata(){
    
    this.serviceClass.getfilerdate().subscribe((res:any)=>{
      this.filterdata=res
      console.log(res)
    })  

  }

  


  selectedDate:any;
  onDateChange(event: any) {
    const dateTimeValue = event.detail.value; // e.g., 2024-08-14T18:17:00
    this.selectedDate = this.formatDate(dateTimeValue);
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
      
    };
 

  
  remain:any;
  addpay() {
    let paid=this.paydata["paid"]?? 0;
    let rent=this.popupdata[2]?.rent
    this.remain=rent - paid;
    this.paydata.remain = this.remain;
    this.paydata.date_of_pay=this.selectedDate;
    console.log(this.paydata)
    this.serviceClass.addpayment(this.paydata).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.successpopup()
        this.getfullrents()
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
  };

  }





  popdiplay:any="none";
  blur:any;
  popupdata:any=[];
  lease_id:any;
  for_month:any;
  formpopup(data:any) {
    this.popupdata=data
    this.lease_id=this.popupdata[0]?.lease_id
    this.for_month=this.popupdata[1]?.dateformonth
    console.log(this.popupdata[4]?.addressdata)
    this.paydata.lease_id = this.lease_id;
    this.paydata.for_month = this.for_month;



    this.popdiplay = 'block';
    this.blur = true
  }

  closepopup(){
    this.popdiplay = 'none';
    this.blur = false
  }



  forpopup:any="none";
  blur1rent:any;
  hinddiv:any="none";
  successpopup() {
    this.forpopup = 'block';
    this.hinddiv = 'block';
    this.blur1rent = true
    setTimeout(() => {
      this.forpopup = 'none';
      this.hinddiv = 'none';
      this.blur1rent = false
      this.popdiplay = 'none';
      this.blur = false
    }, 4000);
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
