import { Component } from '@angular/core';

import { StatusBar, Style } from '@capacitor/status-bar';
import { Router,NavigationEnd } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';
import { filter } from 'rxjs/operators';

import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: TokenserviceService,
    private router: Router,
    private platform: Platform) { 
      this.initializeApp()
    }

  currentUrl:any;
  ngOnInit() {
    this.currentUrl = this.router.url
    // if (this.authService.isUserAuthenticated()) {
    //   // Get the current route URL
    //   const currentUrl = this.router.url;
      
    //   // Redirect to main-home if the current URL is /home
    //   if (currentUrl === '/home') {
    //     this.router.navigateByUrl('/main-home');
    //   }
    // }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      console.log('Current URL:', currentUrl); // Log the current URL for debugging

      const path = currentUrl.split('?')[0]; // Get the path without query parameters
      const queryParams = new URLSearchParams(currentUrl.split('?')[1] || ''); // Extract query parameters

      const emailParam = queryParams.get('email');

      if (this.authService.isUserAuthenticated()) {
        // Redirect to /main-home if the current URL is /home
        if (path === '/home') {
          this.router.navigateByUrl('/main-home');
        }
      } else {
        // If not authenticated, redirect to /home unless on /forgot-password
        if ((path !== '/cpassword' || !emailParam) && path !== '/forgot-password' && path !== '/home') {
          this.router.navigateByUrl('/home');
        }
      }
    });


    
      // this.platform.ready().then(() => {
      //   this.platform.backButton.subscribeWithPriority(10, () => {
      //     // Handle the back button event
      //     console.log('Back button pressed!');
      //     // Add custom logic here
      //   });
      // });
    
      App.addListener('backButton', (info) => {
        if (info.canGoBack) {
          // Handle the back navigation
          console.log('Can go back');
        } else {
          // Prevent default back button behavior
          console.log('Cannot go back');
        }
      });
  
  }


  

  initializeApp() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // Set to white or any color
    // StatusBar.setStyle({ style: Style.Dark }); // Ensure icons and text are dark
  }


  
}
