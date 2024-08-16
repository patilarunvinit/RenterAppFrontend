import { Component } from '@angular/core';

import { StatusBar, Style } from '@capacitor/status-bar';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp()
  }



  initializeApp() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // Set to white or any color
    // StatusBar.setStyle({ style: Style.Dark }); // Ensure icons and text are dark
  }
}
