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
    private platform: Platform
  ) {}



  currentUrl:any;
  ngOnInit() {
    this.currentUrl = this.router.url
    this.router_fun();   
  
    this.mobile_backbutton();
  
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
      
        App.exitApp();
      
    } else {
      if (info.canGoBack) {
      } else {
        App.exitApp();
      }
    }
  });
}
  



  
}
