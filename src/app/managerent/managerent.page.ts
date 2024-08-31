import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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
    this.dataforinputs();    
    this.selectedDateAdd = this.formatDate(new Date().toISOString());
    this.selectedDateRemove = this.formatDate(new Date().toISOString());

  }





  //select date fun for both
  selectedDateAdd:any;
  onDateChangeAdd(event: any) {
    const dateTimeValue = event.detail.value; 
    this.selectedDateAdd = this.formatDate(dateTimeValue);
  }
  selectedDateRemove:any;
  onDateChangeRemove(event: any) {
    const dateTimeValue = event.detail.value; 
    this.selectedDateRemove = this.formatDate(dateTimeValue);
  }



  // Convert to 'YYYY-MM-DD'
  formatDate(dateTimeValue: string): string {
    const date = new Date(dateTimeValue);
    return date.toISOString().split('T')[0]; 
  }





   // data for drop inputs
   errorremoveaddress:any;
   erroraddaddress:any;
   erroraddrenter:any;
   dataforinputs(){

    //add lease address
    this.serviceClass.getadrressforlease().subscribe((res:any)=>{
      this.addressdata=res
    },
    error=> {
      this.erroraddaddress = error.error.detail
    })  

    //add lease renter
    this.serviceClass.getreanterforlease().subscribe((res:any)=>{
      this.renterdata=res
    },
    error=> {
      this.erroraddrenter = error.error.detail
    })  

    //remove lease address
    this.serviceClass.getremoveaddress().subscribe((res:any)=>{
        this.removeaddress=res
    },
    error=> {
      this.errorremoveaddress = error.error.detail
    }) 

   }






   

  // add form function start
  addfromdata = {
    renter_id:'',
    address_id: '',
    start_date: '',
    rent:'',
    deposit:''
  };

  //check form validations
  isFormInvalid(form: NgForm): boolean {
    return !form.valid || !!this.erroraddrenter || !!this.erroraddaddress;
  }

 
  //add from
  error:any
  addFrom() {
 
    this.addfromdata.start_date=this.selectedDateAdd;

    this.serviceClass.addlease(this.addfromdata).subscribe((res:any)=>{
      if(res) {
        this.showPopup()
        this.dataforinputs();
      }
      else {
        this.error = 'Error To Send Data'
        this.wrongshowPopup()
      }
    },
    error=> {
      this.error = error.error.detail
      this.wrongshowPopup()

    })
    
    this.addfromdata = {
      renter_id:'',
      address_id: '',
      start_date: '',
      rent:'',
      deposit:''
    };

  }





  //remove from start 
  removefromdata = {
    address_id: '',
    end_date: '',
  };

  //check form validations
  isFormInvalidremove(form: NgForm): boolean {
    return !form.valid || !!this.errorremoveaddress ;
  }

  //remove form
  removeerror:any;
  removeFrom() {
    this.removefromdata.end_date=this.selectedDateRemove;
    this.serviceClass.removelease(this.removefromdata).subscribe((res:any)=>{
      if(res) {
        this.extradiv='none'
        this.removePopup()
        this.dataforinputs();
      }
      else {
        this.extradiv='none'
        this.removeerror = 'Error To Send Data'
        this.wrongshowPopup()
      }
    },
    error=> {
      this.extradiv='none'
      this.removeerror = error.error.detail
      this.wrongshowPopup()

    })

    this.removefromdata = {
      address_id: '',
      end_date: '',
    };
  
  }




  // extra data for remove forms 
  extradiv:any='none';
  address_id:any;
  removeinfo:any;
  renter_name:any;
  total_remain:any;
  deposit:any;
  to_pay:any;
  OnAddressSelect(event: any) {
    const selectedValue = event.detail.value;
    this.address_id = selectedValue;
    this.serviceClass.getremoveinfo(this.address_id).subscribe((res:any)=>{
      this.removeinfo=res
      this.renter_name=this.removeinfo['renter_name']
      this.total_remain=this.removeinfo['total_remain']
      this.deposit=this.removeinfo['deposit']
      this.to_pay=this.removeinfo['deposite_to_pay']
    })
    this.extradiv='block'
  }




  //backbutton fun
  backbutton(){
    this.router.navigateByUrl('/main-home');
  }




  // form selection
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




  // success popup
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
    }, 4000); 
  }





  // error popup
  popdiplayremove:any="none";
  removePopup() {
    this.popdiplayremove = 'block';
    this.hinddiv = 'block';
    this.blur = true
    setTimeout(() => {
      this.popdiplayremove = 'none';
      this.hinddiv = 'none';
      this.blur = false
    }, 4000); 
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
