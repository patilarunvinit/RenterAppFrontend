import { Component } from '@angular/core';

import { StatusBar, Style } from '@capacitor/status-bar';
import { Router } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: TokenserviceService,
    private router: Router) { 
      this.initializeApp()
    }

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigateByUrl('/main-home');
    } else {
      this.router.navigateByUrl('/home');
    }
  }


  

  initializeApp() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // Set to white or any color
    // StatusBar.setStyle({ style: Style.Dark }); // Ensure icons and text are dark
  }


  
}
