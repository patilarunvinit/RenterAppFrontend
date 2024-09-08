import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router,NavigationEnd } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';
import { SplashScreen } from '@capacitor/splash-screen';
import {ScreenOrientation} from "@ionic-native/screen-orientation/ngx";




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: TokenserviceService,
    private router: Router,
    private platform: Platform,
    private screenOrientation: ScreenOrientation
  ) {
     // Initial network status check
     this.checkNetworkStatus();
     this.hidewhite();

     // Set up an event listener to detect changes in network status
     window.addEventListener('load', () => {
      this.checkNetworkStatus();
    });
    
    window.addEventListener('online', () => {
      this.updateNetworkStatus('You are online!', 'none');
    });
    
    window.addEventListener('offline', () => {
      this.updateNetworkStatus('You are offline!', 'block');
    });




     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }



  currentUrl:any;
  ngOnInit() {
    this.currentUrl = this.router.url
    this.router_fun();   
  
    this.mobile_backbutton();
  
  }



// To Check Internet Connection
network_msg:any;
netdisplay:any = 'none'
async checkNetworkStatus() {
  try {
    const status = await Network.getStatus();
    if (status.connected) {
      this.updateNetworkStatus('You are online!', 'none');
    } else {
      this.updateNetworkStatus('You are offline!', 'block');
    }
  } catch (error) {
    console.error('Error checking network status:', error);
    this.updateNetworkStatus('Network status unknown', 'block');
  }
}



updateNetworkStatus(message: string, display: string) {
  this.network_msg = message;
  this.netdisplay = display;
}





// router function
router_fun(){
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    const currentUrl = this.router.url;

    const path = currentUrl.split('?')[0]; 
    const queryParams = new URLSearchParams(currentUrl.split('?')[1] || ''); // Extract query parameters

    const emailParam = queryParams.get('email');

    if (this.authService.isUserAuthenticated()) {
      if (path === '/home') {
        this.router.navigateByUrl('/main-home');
      }
      else if(path === '/'){
        this.router.navigateByUrl('/main-home');
      }
    } else {
      if ((path !== '/cpassword' || !emailParam) && path !== '/forgot-password' && path !== '/home') {
        this.router.navigateByUrl('/home');
      }
      if(path === '/'){
        this.router.navigateByUrl('/home');
      }
    }
  });
}



//mobile back button 
mobile_backbutton() {
  App.addListener('backButton', (info) => {
    // Get the current path using the router
    const currentPath = this.router.url.split('?')[0];
    
    // Check if the current path is '/home' or '/main-home'
    if (currentPath === '/home' || currentPath === '/main-home') {
        App.exitApp();
    } else {
      if (!info.canGoBack) {
        // If there's no history to go back to, exit the app
        App.exitApp();
      }
    }
  });
}
  


hidewhite(){
  setTimeout(() => {
    SplashScreen.hide();
  }, 500);
}
  
}
