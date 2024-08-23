import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerent',
  templateUrl: './managerent.page.html',
  styleUrls: ['./managerent.page.scss'],
})
export class ManagerentPage implements OnInit {
  divHeight:any=window.innerHeight + 'px';
  screenHeight:any = window.innerHeight;
  addressdata:any;
  renterdata:any;
  removeaddress:any;

  constructor(
    private platform: Platform,
    private keyboard: Keyboard,
    private router: Router,
    private serviceClass: TokenserviceService,

  ) { 

    this.kaybordfun()
     

  }

  ngOnInit() {
    this.dataforinputs()
    
    this.selectedDateAdd = this.formatDate(new Date().toISOString());
    this.selectedDateRemove = this.formatDate(new Date().toISOString());

  }


  selectedDateAdd:any;
  onDateChangeAdd(event: any) {
    const dateTimeValue = event.detail.value; // e.g., 2024-08-14T18:17:00
    this.selectedDateAdd = this.formatDate(dateTimeValue);
  }
  selectedDateRemove:any;
  onDateChangeRemove(event: any) {
    const dateTimeValue = event.detail.value; // e.g., 2024-08-14T18:17:00
    this.selectedDateRemove = this.formatDate(dateTimeValue);
  }
  formatDate(dateTimeValue: string): string {
    const date = new Date(dateTimeValue);
    return date.toISOString().split('T')[0]; // Convert to 'YYYY-MM-DD'
  }

   dataforinputs(){

    this.serviceClass.getadrressforlease().subscribe((res:any)=>{
      
      this.addressdata=res
      console.log(res)
    })  

    this.serviceClass.getreanterforlease().subscribe((res:any)=>{
      
      this.renterdata=res
      console.log(res)
    })  


    this.serviceClass.getremoveaddress().subscribe((res:any)=>{
      
      this.removeaddress=res
      console.log(res)
    }) 

   }



  addfromdata = {
    renter_id:'',
    address_id: '',
    start_date: '',
    rent:'',
    deposit:''
  };

  addFrom() {
 
    this.addfromdata.start_date=this.selectedDateAdd;

    this.serviceClass.addlease(this.addfromdata).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.showPopup()
        this.dataforinputs();
      }
      else {
        alert('Error To Send Data')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })

    
    this.addfromdata = {
      renter_id:'',
      address_id: '',
      start_date: '',
      rent:'',
      deposit:''
  
      // Add more fields as needed
    };

  }



  removefromdata = {
    address_id: '',
    end_date: '',
  };

  removeFrom() {

    this.removefromdata.end_date=this.selectedDateRemove;

    
    console.log(this.removefromdata)
    this.serviceClass.removelease(this.removefromdata).subscribe((res:any)=>{
      console.log('Response:', res);
      if(res) {
        this.removePopup()
        this.dataforinputs();
      }
      else {
        alert('Error To Send Data')
      }
    },
    error=> {
      // console.log(error.error.detail)
      alert(error.error.detail)

    })


    this.removefromdata = {
      address_id: '',
      end_date: '',
    };
  
  }


  extradiv:any='none';
  address_id:any;
  removeinfo:any;
  renter_name:any;
  total_remain:any;
  deposit:any;
  to_pay:any;
  OnAddressSelect(event: any) {
    const selectedValue = event.detail.value;
    console.log('Selected value:', selectedValue);
    this.address_id = selectedValue;


    this.serviceClass.getremoveinfo(this.address_id).subscribe((res:any)=>{
      
      this.removeinfo=res
      this.renter_name=this.removeinfo['renter_name']
      this.total_remain=this.removeinfo['total_remain']
      this.deposit=this.removeinfo['deposit']
      this.to_pay=this.removeinfo['deposite_to_pay']

      console.log(res)
    })
    
    this.extradiv='block'
  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }





  adddispaly:any;
  removedisplay:any;
  addbackcolor:any;
  removebackcolor:any;
  add(){
     this.adddispaly= "block";
     this.removedisplay= "none";
     this.addbackcolor='rgb(61, 155, 214)';
     this.removebackcolor='rgb(61, 155, 214,0)';
  }
  remove(){
    this.adddispaly= "none";
    this.removedisplay= "block";
    this.addbackcolor='rgb(61, 155, 214,0)';
    this.removebackcolor='rgb(61, 155, 214)'
  }



  popdiplay:any="none";
  blur:any;
  hinddiv:any="none"
  showPopup() {
    this.popdiplay = 'block';
    this.hinddiv = 'block';
    this.blur = true
    setTimeout(() => {
      this.popdiplay = 'none';
      this.hinddiv = 'none';
      this.blur = false
    }, 4000); // Adjust 3000 milliseconds to change popup display duration (3 seconds in this example)
  }



  popdiplayremove:any="none";
  removePopup() {
    this.popdiplayremove = 'block';
    this.hinddiv = 'block';
    this.blur = true
    setTimeout(() => {
      this.popdiplayremove = 'none';
      this.hinddiv = 'none';
      this.blur = false
    }, 4000); // Adjust 3000 milliseconds to change popup display duration (3 seconds in this example)
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
