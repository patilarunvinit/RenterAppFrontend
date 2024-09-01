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






  // set header for drop list
  customActionSheetOptions: any = {
    header: 'Months List',
  };







  ngOnInit() {
    this.getfullrents();
    this.selectedDate = this.formatDate(new Date().toISOString());
  }





  // back button fun
  backbutton(){
    this.router.navigateByUrl('/main-home');
  }



  




  // get rent for selected month
  rentdata:any;
  error:any;
  noData: boolean = false; 
  loading: boolean = false; 
  getfullrents(){
    
    this.serviceClass.getrent(this.currentmonthvar).subscribe((res:any)=>{
      this.rentdata=res
      this.noData = this.rentdata.length === 0; 
      this.loading = false; 
    },
    error=> {
      this.error = error.error.detail
      this.noData = false; 
      this.loading = false; 
    })
  }









  // get current month for api as well as show
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








  // get filter pay months list
  filterdata:any;
  getfilterdata(){
    
    this.serviceClass.getfilerdate().subscribe((res:any)=>{
      this.filterdata=res
    }) 
  }

  
 



  // select month from month list
  onSelectionChange(event: any) {
    this.currentmonthvar = event.detail.value;
    this.getfullrents()
  }




  // date change check
  selectedDate:any;
  onDateChange(event: any) {
    const dateTimeValue = event.detail.value; 
    this.selectedDate = this.formatDate(dateTimeValue);
  }
  //get 'YYYY-MM-DD' formate date
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
      
    };
 

  
  
  //pay form 
  remain:any;
  addpay() {
    let paid=this.paydata["paid"]?? 0;
    let rent=this.popupdata[2]?.rent
    this.remain=rent - paid;
    this.paydata.remain = this.remain;
    this.paydata.date_of_pay=this.selectedDate;
    this.serviceClass.addpayment(this.paydata).subscribe((res:any)=>{
      if(res) {
        this.successpopup()
        this.getfullrents()
      }
      else {
        // alert('Error To Send Data')
        this.wrongshowPopup()
      }
    },
    error=> {
      // alert(error.error.detail)
      this.wrongshowPopup()
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






  

  // open pay form popup
  popdiplay:any="none";
  blur:any;
  popupdata:any=[];
  lease_id:any;
  for_month:any;
  formpopup(data:any) {
    this.popupdata=data
    this.lease_id=this.popupdata[0]?.lease_id
    this.for_month=this.popupdata[1]?.dateformonth
    this.paydata.lease_id = this.lease_id;
    this.paydata.for_month = this.for_month;
    this.popdiplay = 'block';
    this.blur = true
  }
  // close pay form popup
  closepopup(){
    this.popdiplay = 'none';
    this.blur = false
  }








  // pay success popup
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




  //For error Form Submite 
  wrongpopdiplay:any="none";
  wrongshowPopup() {
    this.wrongpopdiplay = 'block';
    this.hinddiv = 'block';
    this.blur1rent = true
    setTimeout(() => {
      this.wrongpopdiplay = 'none';
      this.hinddiv = 'none';
      this.blur1rent = false
    }, 4000);
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
