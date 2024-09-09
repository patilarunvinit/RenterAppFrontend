import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router,NavigationEnd } from '@angular/router';
import { TokenserviceService } from './services/tokenservice.service';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { ScreenOrientation } from '@capacitor/screen-orientation';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{


  constructor(
    private authService: TokenserviceService,
    private router: Router,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
     // to check network in start of app
     this.checkNetworkStatus();
     
     // hide white screen in app opning
     this.hidewhite();

     // start loop to check internet connection
     this.networkagain()

  }



  currentUrl:any;
  async ngOnInit() {
    // for routing
    this.currentUrl = this.router.url
    await this.router_fun();   
    
    // mobile backbutton and exit app
    await this.mobile_backbutton();
    
    // check network of mobile
    this.checkNetworkStatus();

    // lock screen
    await this.lockOrientationToPortrait();
  }




  // app screen rotaion lock
  private async lockOrientationToPortrait() {
    // Lock orientation to portrait
    await ScreenOrientation.lock({ orientation: 'portrait' });
    
  }





// To Check Internet Connection
async checkNetworkStatus() {
  this.authService.getNetworkStatus().subscribe((status) => {
    if (status?.connectionType === 'cellular' || status?.connectionType === 'wifi') {
      // Check internet access
      this.authService.checkInternetAccess().subscribe(
        (res: any) => {
          this.ngZone.run(() => {
            this.updateNetworkStatus('You are online!', 'none');
          });
        },
        (error) => {
          this.ngZone.run(() => {
            this.updateNetworkStatus('You are offline!', 'block');
          });
        }
      );
    } else {
      this.ngZone.run(() => {
        this.updateNetworkStatus('You are offline!', 'block');
      });
    }
  });
}


network_msg:any;
netdisplay:any = 'none'
//set values for massage and display (network error)
updateNetworkStatus(message: string, display: string) {
  this.network_msg = message;
  this.netdisplay = display;
}


// loop to get internet error 
// we have to think again on this
networkagain() {
  setInterval(() => {
    this.checkNetworkStatus();
  }, 5000);
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
  


// hide white screen
hidewhite(){
  setTimeout(() => {
    SplashScreen.hide();
  }, 500);
}

  
}
