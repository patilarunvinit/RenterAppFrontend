import { Component } from '@angular/core';

import { StatusBar, Style } from '@capacitor/status-bar';
import { Router,NavigationEnd } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';
import { filter } from 'rxjs/operators';

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

      if (this.authService.isUserAuthenticated()) {
        // Redirect to /main-home if the current URL is /home
        if (currentUrl === '/home') {
          this.router.navigateByUrl('/main-home');
        }
      } else {
        // If not authenticated, redirect to /home unless on /forgot-password
        if (currentUrl !== '/forgot-password' && currentUrl !== '/home') {
          this.router.navigateByUrl('/home');
        }
      }
    });
  
  }


  

  initializeApp() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // Set to white or any color
    // StatusBar.setStyle({ style: Style.Dark }); // Ensure icons and text are dark
  }


  
}
