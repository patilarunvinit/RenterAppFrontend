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
    this.platform.keyboardDidShow.subscribe(ev => {
      const { keyboardHeight } = ev;
      this.divHeight = this.screenHeight + "px";  
      // Do something with the keyboard height such as translating an input above the keyboard.
    });
  
    this.platform.keyboardDidHide.subscribe(() => {
      // Move input back to original location
      this.divHeight = '100%';      // Do something with the keyboard height such as translating an input above the keyboard.

    });


    this.currentmonth();
    this.getfilterdata();

  }

  ngOnInit() {
    this.getfullrents();
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


  popdiplay:any="none";
  blur:any;
  showPopup() {
    this.popdiplay = 'block';
    this.blur = true
  }

  closepopup(){
    this.popdiplay = 'none';
    this.blur = false
  }


  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
