import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TokenserviceService } from 'src/app/services/tokenservice.service'

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listadrress',
  templateUrl: './listadrress.page.html',
  styleUrls: ['./listadrress.page.scss'],
})
export class ListadrressPage implements OnInit {
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
    this.getalldataaddr()
  }

  ngOnInit() {
  }


  backbutton(){
    this.router.navigateByUrl('/main-home');
  }

  addressdata:any;
  getalldataaddr(){
    
    this.serviceClass.getadrress().subscribe((res:any)=>{
      
      this.addressdata=res
      console.log(res)
    })  

  }


  backphoto:string="assets/img/pexels-photo-2310713.jpeg"

}
