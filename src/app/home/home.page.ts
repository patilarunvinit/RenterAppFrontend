import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   divHeight:any=window.innerHeight + 'px';
  
   screenHeight:any = window.innerHeight;

  constructor(private platform: Platform,
              private keyboard: Keyboard,
              private router: Router
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
  }


  redirectToMianHome() {
    this.router.navigate(['/main-home']);
  }


  
  backphoto:string="assets/img/pexels-photo-2310713.jpeg"
  centerlogo:string="assets/img/user-solid.svg"

  
}
