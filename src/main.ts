import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// import { StatusBar, Style } from '@capacitor/status-bar';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


// StatusBar.setBackgroundColor({ color: '#3D9BD6' });
// StatusBar.setStyle({ style: Style.Dark }); 