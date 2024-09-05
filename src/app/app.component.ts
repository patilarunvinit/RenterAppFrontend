import { Component } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router,NavigationEnd } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Network } from '@capacitor/network';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: TokenserviceService,
    private router: Router,
    private platform: Platform
  ) {
     // Initial network status check
     this.checkNetworkStatus();

     // Set up an event listener to detect changes in network status
     window.addEventListener('online', () => this.updateNetworkStatus('','none'));
     window.addEventListener('offline', () => this.updateNetworkStatus('You are offline!','block'));

    
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
  const status = await Network.getStatus();
  if (status.connected) {
    this.updateNetworkStatus('You are online!', 'none');
  } else {
    this.updateNetworkStatus('You are offline!', 'block');
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
    } else {
      if ((path !== '/cpassword' || !emailParam) && path !== '/forgot-password' && path !== '/home') {
        this.router.navigateByUrl('/home');
      }
    }
  });
}



//mobile back button 
mobile_backbutton(){
  App.addListener('backButton', (info) => {
    const currentPath = this.currentUrl.split('?')[0];
    
    if (currentPath === '/home' || currentPath === '/main-home') {
      if (!info.canGoBack) {
        App.exitApp();
      }
    } else {
      if (info.canGoBack) {
      } else {
        App.exitApp();
      }
    }
  });
}
  



  
}
