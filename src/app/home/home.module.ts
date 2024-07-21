import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Keyboard } from '@ionic-native/keyboard/ngx';



import { HomePageRoutingModule } from './home-routing.module';


import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    
    
  ],
  declarations: [HomePage],
  providers: [
    Keyboard, // Add Keyboard to providers array
    // Other providers if any
  ],
})
export class HomePageModule {}
